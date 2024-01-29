// imports
import { BigNumber, Contract, Signer, utils } from 'ethers';
import { ethers, network } from 'hardhat';
import { deployIdentityProxy } from '../test/fixtures/deploy-full-suite.fixture';
import OnchainID from '@onchain-id/solidity';
import 'dotenv/config';
import Web3 from 'web3';
import { Event } from 'ethers';

import * as fs from 'fs';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL!
const PRIVATE_KEY_DEVELOPER = process.env.PRIVATE_KEY_DEVELOPER!
const PRIVATE_KEY_TOKEN_ISSUER = process.env.PRIVATE_KEY_TOKEN_ISSUER!
const PRIVATE_KEY_TOKEN_AGENT = process.env.PRIVATE_KEY_TOKEN_AGENT!
const PRIVATE_KEY_TOKEN_ADMIN = process.env.PRIVATE_KEY_TOKEN_ADMIN!
const PRIVATE_KEY_CLAIM_ISSUER = process.env.PRIVATE_KEY_CLAIM_ISSUER!
const PRIVATE_KEY_TOKEN_HOLDER = process.env.PRIVATE_KEY_TOKEN_HOLDER!
const PATH_TO_TREXFactory_CONTRACTS = process.env.PATH_TO_TREXFactory_CONTRACTS!
const PATH_TO_TOKENPROXY_CONTRACTS = process.env.PATH_TO_TOKENPROXY_CONTRACTS!

// ! Here you are just telling the compiler that, 
// even though it cannot verify this, you are sure process.env.PRIVATE_KEY
//  will be defined

function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function main() {

    const gasLimit = 20000000 // 15000000; // era esto inicialmente: 20000000 ¿Subió mucho el gas?

    const claimIssuerSigningKey = ethers.Wallet.createRandom(); 

    const deployerProvider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);

    const deployer = new ethers.Wallet(PRIVATE_KEY_DEVELOPER, deployerProvider);
    console.log('Deployer Address:', deployer.address);
    console.log('Deployer Balance:', (await deployer.getBalance()).toString());
    const tokenIssuer = new ethers.Wallet(PRIVATE_KEY_TOKEN_ISSUER, deployerProvider);
    console.log('tokenIssuer Address:', tokenIssuer.address);
    const tokenAgent = new ethers.Wallet(PRIVATE_KEY_TOKEN_AGENT, deployerProvider);
    console.log('tokenAgent Address:', tokenAgent.address);
    const tokenAdmin = new ethers.Wallet(PRIVATE_KEY_TOKEN_ADMIN, deployerProvider);
    console.log('tokenAdmin Address:', tokenAdmin.address);
    const claimIssuer = new ethers.Wallet(PRIVATE_KEY_CLAIM_ISSUER, deployerProvider);
    console.log('claimIssuer Address:', claimIssuer.address);

    const startBalance: BigNumber = await deployer.getBalance();

    console.log('Getting needed addresses - From BT-14 deployed ones')

    const tokenName = "BoulderTest-14-F";
    const tokenSymbol = "BT-14-F";
    const tokenDecimals = BigNumber.from("0");

    console.log('Identity Registry Storage address')
    const identityRegistryStorageAddress = '0x5cc815439d77374581EA1537B624A1E205019343'

    console.log('trexFactory Address')
    const trexFactoryAddress = '0x0C3b15aFC9451f555e8f34fF2185bE0d027b5705'
    const trexFactory = await ethers.getContractAt('TREXFactory', trexFactoryAddress); 

    const claimIssuerContractAddress = '0xBD427E605797738986dCBE9f8E532648aba5309b'
    
    console.log('starting new token generation')
    const tx = await trexFactory.connect(deployer).deployTREXSuite(
        tokenName,
        {
          owner: deployer.address,
          name: tokenName,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          irs: ethers.constants.AddressZero, // ¿¿?? identityRegistryStorageAddress, //
          ONCHAINID: ethers.constants.AddressZero, // ¿¿??
          irAgents: [],
          tokenAgents: [], 
          complianceModules: [],
          complianceSettings: [],
        },
        {
          claimTopics: [],
          issuers: [],
          issuerClaims: [],
        },
      );
    
    const receipt = await tx.wait();

    const tokenAddress = await trexFactory.getToken(tokenName);

    const token = await ethers.getContractAt('Token', tokenAddress); 

    console.log(`Deployed token at: ${token.address}`)

    console.log(`Token Name: ${await token.name()}`)
    console.log(`Token Symbol: ${await token.symbol()}`)

    console.log('Deployer Balance:', (await deployer.getBalance()).toString());

    const endBalance: BigNumber = await deployer.getBalance();

    const totalCost: BigNumber = startBalance.sub(endBalance);
    const totalCostInEth: string = utils.formatUnits(totalCost, 18);

    console.log(`Total cost ${totalCostInEth}`)

    const identityRegistryAddress = receipt.events.find((event: Event) => event.event === 'TREXSuiteDeployed').args[1]

    console.log(`identityRegistry address for ${await token.symbol()}: ${identityRegistryAddress} `)

    // const identityRegistryAddress = '0x45cD5DBD1e67CdEa5100d59286766f610aE7F048'
    const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress); 

    const agentManagerAddress = '0xeF2e31F3905C8e6b69cA1164A7d88537d7642cF7'
    const agentManager = await ethers.getContractAt('AgentManager', agentManagerAddress);

    const claimTopicsRegistryAddress = '0x671158C6D4B2EBF970fE6E7265843fB490af84ae'
    const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryAddress);

    await token.connect(deployer).addAgent(tokenAgent.address);

    console.log(`token Connected deployer with tokenAgent`)

    console.log(`adding tokenAgent to identityRegistry`)
    await identityRegistry.connect(deployer).addAgent(tokenAgent.address);
    console.log(`added tokenAgent to identityRegistry`)
    // console.log(`adding token to identityRegistry`)
    // await identityRegistry.connect(deployer).addAgent(token.address);
    // console.log(`added token to identityRegistry`)

    console.log('Removing claimTopics if they exists');
    try {
      const topics = await claimTopicsRegistry.getClaimTopics();
      console.log(`topics: ${topics}`);
      if (topics.length > 0) {
        await claimTopicsRegistry.removeClaimTopic(topics[0], { gasLimit: gasLimit });
      } else {
        console.log(`There are no topics`)
      }
    } catch (error) {
      console.error('Error:', error);
    }   
    

    // Adding a time sleep just to wait till contracts are deployed
    console.log('waiting 20 sec')
    await sleep(20);
    console.log('continuing...')

    // console.log('Adding claimTopic')    
    // const claimTopics = [ethers.utils.id(`CLAIM_TOPIC_${tokenSymbol}`)];
    // await claimTopicsRegistry.connect(deployer).addClaimTopic(claimTopics[0]);

    // console.log(`Connected deployer with claimTopicsRegistry`)

    // const trustedIssuersRegistryAddress = '0x498D7B7d34CA38bA7D43D5CfDfF08bAa63A692A9'
    // const trustedIssuersRegistry = await ethers.getContractAt('TrustedIssuersRegistry', trustedIssuersRegistryAddress)

    // await trustedIssuersRegistry.connect(deployer).addTrustedIssuer(claimIssuerContractAddress, claimTopics); //claimIssuerContract.address, claimTopics);

    // console.log(`Connected deployer with trustedIssuersRegistry`)

    // --------- BLOQUE PARA BORRAR TOPICS
    // console.log('Removing claim topics')

    // const topics = await claimTopicsRegistry.getClaimTopics();
    // console.log(`topics: ${topics}`)
    // await Promise.all(topics.map((topic) => claimTopicsRegistry.removeClaimTopic(topic, {gasLimit: gasLimit})));
    // // await claimTopicsRegistry.removeClaimTopic(topics[0], {gasLimit: gasLimit});
    // console.log(`topics: ${topics}`)
    // --------- BLOQUE PARA BORRAR TOPICS

    const tokenHolderWallet = new ethers.Wallet(PRIVATE_KEY_TOKEN_HOLDER, deployerProvider);

    // console.log(`Deploying identity proxy for tokenHolder...`)
    // const tokenHolderIdentity = await deployIdentityProxy(identityImplementationAuthority.address, tokenHolderWallet.address, deployer);
    // console.log(`tokenHolder's identity deployed...`)
    // console.log(`adding tokenAgent to identityRegistry`)
    // await identityRegistry.connect(deployer).addAgent(tokenAgent.address);
    // console.log(`added tokenAgent to identityRegistry`)
    // console.log(`adding token to identityRegistry`)

    // await identityRegistry.connect(deployer).addAgent(token.address); // esto lo hace el deployTREXSuite
    // console.log(`added token ${await token.name()} to identityRegistry`)

    // Adding a time sleep just to wait till contracts are deployed
    console.log('waiting 20 sec')
    await sleep(20);
    console.log('continuing...')

    const tokenHolderIdentityAddress = '0xD479d768a7b973757746d60e97c49A034f512FC1'
    const tokenHolderIdentity = await ethers.getContractAt('Identity', tokenHolderIdentityAddress)

    // console.log('Claiming for tokenHolder...')
    // const claimFortokenHolder = {
    //     data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
    //     issuer: claimIssuerContractAddress,
    //     topic: claimTopics[0],
    //     scheme: 1,
    //     identity: tokenHolderIdentityAddress,
    //     signature: "",
    // };
    // console.log('Signature Claim for tokenHolder')
    // claimFortokenHolder.signature = await claimIssuerSigningKey.signMessage(
    //     ethers.utils.arrayify(
    //     ethers.utils.keccak256(
    //         ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimFortokenHolder.identity, claimFortokenHolder.topic, claimFortokenHolder.data]),
    //     ),
    //     ),
    // );

    // console.log(`Awaiting tokenHolder's identity`) // remuevo esto porque tira error, quizás el error era la cantidad de topics creados
    // await tokenHolderIdentity
    //     .connect(tokenHolderWallet)
    //     .addClaim(claimFortokenHolder.topic, claimFortokenHolder.scheme, claimFortokenHolder.issuer, claimFortokenHolder.signature, claimFortokenHolder.data, "", {gasLimit: gasLimit});
    
    // Acá hay que agregar que espere que se verifique porque ahora sale que está verificado

    const tokenHolderIdentityVerif = await identityRegistry.isVerified(tokenHolderWallet.address)

    console.log(`tokenHolder identity: ${tokenHolderIdentityVerif}`)
    
    if (tokenHolderIdentityVerif == false) {
      await identityRegistry.connect(tokenAgent).registerIdentity(tokenHolderWallet.address, tokenHolderIdentityAddress, 0); 
      console.log('waiting 20 sec, to register token Holder identity') // Pero por qué tengo que verificarla si estaría verificada?
      await sleep(20);
      console.log('continuing...')

      console.log('Checking tokenHolder identity verification')
      const tokenHolderIdentityVerif = await identityRegistry.isVerified(tokenHolderWallet.address)

      console.log(`tokenHolder identity: ${tokenHolderIdentityVerif}`)
    }
    
    console.log(`Minting tokens to tokenHolder's wallet`)
    await token.connect(tokenAgent).mint(tokenHolderWallet.address, 1000, {gasLimit: gasLimit}); 
    console.log(`${await token.symbol()} minted at tokenHolder's wallet`)

    // await agentManager.connect(tokenAgent).addAgentAdmin(tokenAdmin.address);
    await token.connect(deployer).addAgent(agentManager.address);
    // await identityRegistry.connect(deployer).addAgent(agentManager.address);

    await token.connect(tokenAgent).unpause();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });