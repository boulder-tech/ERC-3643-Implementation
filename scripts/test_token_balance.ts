// imports
import { BigNumber, Contract, Signer, utils } from 'ethers';
import { ethers, network } from 'hardhat'; 
import { deployIdentityProxy } from '../test/fixtures/deploy-full-suite.fixture';
import OnchainID from '@onchain-id/solidity';
// require("dotenv").config()
import 'dotenv/config';

import * as fs from 'fs';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL!
const PRIVATE_KEY_DEVELOPER = process.env.PRIVATE_KEY_DEVELOPER!
const PRIVATE_KEY_TOKEN_ISSUER = process.env.PRIVATE_KEY_TOKEN_ISSUER!
const PRIVATE_KEY_TOKEN_AGENT = process.env.PRIVATE_KEY_TOKEN_AGENT!
const PRIVATE_KEY_TOKEN_ADMIN = process.env.PRIVATE_KEY_TOKEN_ADMIN!
const PRIVATE_KEY_CLAIM_ISSUER = process.env.PRIVATE_KEY_CLAIM_ISSUER!
const PRIVATE_KEY_TOKEN_HOLDER = process.env.PRIVATE_KEY_TOKEN_HOLDER!
const RECEIVER_ADDRESS = '0xa7f4F88cc8237a2a385c0709e12585b9A5F738C0'

function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


async function main() {

    const gasLimit = 20000000;

    const deployerProvider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);
    
    const deployer = new ethers.Wallet(PRIVATE_KEY_DEVELOPER, deployerProvider);
    const tokenAgent = new ethers.Wallet(PRIVATE_KEY_TOKEN_AGENT, deployerProvider);
    const tokenAdmin = new ethers.Wallet(PRIVATE_KEY_TOKEN_ADMIN, deployerProvider);
    const tokenHolderWallet = new ethers.Wallet(PRIVATE_KEY_TOKEN_HOLDER, deployerProvider);

    const tokenAddress = '0x2ADe24d39F35C46322C56E1Ccccb99294F59E548';
    const token = await ethers.getContractAt('Token', tokenAddress);
    console.log(`Token Name: ${await token.name()}`)

    const modularComplianceImplementationAddress = '0x25cebE283Ca60bc52eE73e4538Bc6213C10A9E37';
    const compliance = await ethers.getContractAt('ModularCompliance', modularComplianceImplementationAddress);

    // await compliance.init()

    console.log(`checking if can transfer`)
    const tx = await compliance.connect(tokenAgent).canTransfer(tokenHolderWallet.address, RECEIVER_ADDRESS, 100)

    console.log(`Can transfer: ${tx}`)

    // console.log('approving transaction')
    // const approvation = await token.connect(tokenAgent).approve(tokenHolderWallet, 100, {gasLimit: gasLimit});
    // console.log(`approved: ${approvation}`)

    const identityRegistryAddress = '0xD675753A7Ee0D2E694b33fc13C6d9788a95667c2';
    const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress);

    console.log('Receiver is verified:')
    const receiverIdentityVerif = await identityRegistry.connect(tokenAgent).isVerified(RECEIVER_ADDRESS);

    console.log(`receiver identity: ${receiverIdentityVerif}`)

    if (receiverIdentityVerif == false) {
      const identityImplementationAuthorityAddress = '0x0EB2BD2F6B73219511Bb9B31bc91Feb87CB1Ab06';
      const identityImplementationAuthorityAbi = OnchainID.contracts.ImplementationAuthority.abi;
  
      const identityImplementationAuthority = await ethers.getContractAt(identityImplementationAuthorityAbi, identityImplementationAuthorityAddress);

      console.log(`Deploying identity proxy for receiver...`)
      const receiverIdentity = await deployIdentityProxy(identityImplementationAuthority.address, RECEIVER_ADDRESS, deployer); // This returns ethers.getContractAt("Identity", identity.address, signer);
  
      console.log(`receiverIdentity address: ${receiverIdentity.address}`)

      // const identityRegistryStorageAddress = '0x679429F26871a3B2A3736BE6C65f5D65fB806D9c';
      // const identityRegistryStorage = await ethers.getContractAt('IdentityRegistryStorage', identityRegistryStorageAddress);

      // await identityRegistryStorage.connect(tokenAgent).addIdentityToStorage(RECEIVER_ADDRESS, receiverIdentity.address, 42, {gasLimit: gasLimit})

      // console.log('getting claim topics registry')
      
      // const claimTopicsRegistryImplementationAddress = '0xD53740915653D119Df744FbFeBb51fB477AC57f4';
      // const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryImplementationAddress);

      // const topics = await claimTopicsRegistry.getClaimTopics();
      // console.log(`topics: ${topics}`)

      // console.log('getting trusted issuers for claim topic')

      // const trustedIssuersRegistryImplementationAddress = '0x9fF90Afc253dbD746c1eB803f613ADb84d7Dd316';
      // const trustedIssuersRegistry = await ethers.getContractAt('TrustedIssuersRegistry', trustedIssuersRegistryImplementationAddress);

      // const trustedIssuers = await trustedIssuersRegistry.getTrustedIssuersForClaimTopic(topics[0]);

      // console.log(`For ${topics[0]} trusted issuers: ${trustedIssuers}}`)
      
      // console.log(`BatchRegistryIdentity for RECEIVER's address`)
      // await identityRegistry
      // .connect(tokenAgent)
      // .batchRegisterIdentity([RECEIVER_ADDRESS], [receiverIdentity.address], [666]);
      // console.log(`Done with BatchRegistryIdentity for RECEIVER's address`)
      // // await identityRegistry.connect(tokenAgent).registerIdentity(RECEIVER_ADDRESS, receiverIdentity.address, 0, {gasLimit: gasLimit})
      

      console.log(`Deploying identity proxy for tokenHolder...`)
      const tokenHolderIdentity = await deployIdentityProxy(identityImplementationAuthority.address, tokenHolderWallet.address, deployer);
      console.log(`tokenHolder's identity deployed at: ${tokenHolderIdentity.address}`)

      const agentManagerAddress = '0x997Bcd94ce8C71EfA92d1C33EfB922B13Ba42E34'
      const agentManager = await ethers.getContractAt("AgentManager", agentManagerAddress) 
      
      // console.log('adding tokenHolderIdentity to be whitelistmanager')
      // await agentManager.connect(tokenAdmin).addWhiteListManager(tokenHolderIdentity.address);
      // console.log('added tokenHolderIdentity to be whitelistmanager')

      // console.log('paussing token')
      // await token.connect(tokenAgent).pause();

      // console.log('waiting 60 sec')
      // await sleep(60);
      // console.log('continuing...')

      const updateTx = await identityRegistry.connect(tokenAgent).updateIdentity(RECEIVER_ADDRESS, tokenHolderIdentity.address, {gasLimit: gasLimit})
      
      // agentManager
      //     .connect(tokenHolderWallet)
      //     .callRegisterIdentity(RECEIVER_ADDRESS, tokenHolderIdentity.address, 666, tokenHolderIdentity.address, {gasLimit: gasLimit}); // será que tengo que poner el que quiero que sea?
      
      console.log(`Identity updated: ${updateTx}`)

      // console.log('unpaussing token')
      // await token.connect(tokenAgent).unpause();

      console.log('waiting 60 sec')
      await sleep(60);
      console.log('continuing...')

      console.log('Is Receiver verified?')
      const receiverIdentityVerif = await identityRegistry.connect(tokenAgent).isVerified(RECEIVER_ADDRESS);
  
      console.log(`receiver identity: ${receiverIdentityVerif}`)
    
    }

    
    console.log('tokenHolder is verified:')
    const identityHolder = await identityRegistry.connect(tokenAgent).isVerified(tokenHolderWallet.address);

    console.log(`Holder identity: ${identityHolder}`)

    // console.log('doing forced transfer')
    // await token.connect(tokenAgent).forcedTransfer(tokenHolderWallet.address, RECEIVER_ADDRESS, 100, {gasLimit: gasLimit})

    // console.log(`setting compliance for tokenHolderWallet`)
    // await token.setCompliance(tokenHolderWallet.address, {gasLimit: gasLimit})
    // // console.log(`tokenHolderWallet compliance: ${compliance}`)

    // console.log('approving transaction')
    // const approvation = await token.connect(tokenHolderWallet).approve(RECEIVER_ADDRESS, 100, {gasLimit: gasLimit});

    // console.log(`RECEIVER is already verified`)

    

    // console.log('unpaussing token')
    // await token.connect(tokenAgent).unpause();

    // console.log('waiting 20 sec')
    // await sleep(20);
    // console.log('continuing...')


    // console.log('checking allowances')
    // console.log(`allowance for tokenHolder: ${await token.allowance(deployer.address, tokenHolderWallet.address)}`)
    
    // console.log('increassing allowance of tokenHolder')
    // const tx = await token.connect(deployer).increaseAllowance(tokenHolderWallet.address, 100);

    // console.log('checking allowances')
    // // console.log(`allowance for tokenHolder: ${await token.allowance(deployer.address, tokenHolderWallet.address)}`)

    // console.log(`allowance for tokenHolder to RECEIVER: ${await token.allowance(tokenHolderWallet.address, RECEIVER_ADDRESS)}`)
    // console.log(`allowance for deployer to RECEIVER: ${await token.allowance(deployer.address, RECEIVER_ADDRESS)}`)
    // // console.log('increassing allowance of RECEIVER')
    // const tx = await token.connect(deployer).increaseAllowance(RECEIVER_ADDRESS, 100);

    // console.log('paussing token')
    // await token.connect(tokenAgent).pause();

    // console.log('waiting 20 sec')
    // await sleep(20);
    // console.log('continuing...')

    // const tokenBalance1 = await token.balanceOf(tokenHolderWallet.address);

    // console.log(`El saldo del token para ${tokenHolderWallet.address} es: ${tokenBalance1.toString()}`);
    
    // const tokenReceiverBalance1 = await token.balanceOf(RECEIVER_ADDRESS);

    // console.log(`El saldo del token para RECEIVER ${RECEIVER_ADDRESS} es: ${tokenReceiverBalance1.toString()}`);

    // console.log('unpaussing token')
    // await token.connect(tokenAgent).unpause();

    // console.log('waiting 20 sec')
    // await sleep(20);
    // console.log('continuing...')

    // console.log('doing manual transfer')

    // await token.connect(deployer).transferFrom(tokenHolderWallet.address, RECEIVER_ADDRESS, 100, {gasLimit: gasLimit})
    // await token.connect(deployer).approve(RECEIVER_ADDRESS, 100);
    // const tx = await token.connect(tokenHolderWallet).transferFrom(tokenHolderWallet.address, RECEIVER_ADDRESS, 100, {gasLimit: gasLimit});
    // // await token.connect(tokenHolderWallet).transfer(RECEIVER_ADDRESS, 100, {gasLimit: gasLimit})
    // await (tx).to.emit(token, 'Transfer').withArgs(tokenHolderWallet.address, RECEIVER_ADDRESS, 100);











    // const identityRegistryAddress = '0xD675753A7Ee0D2E694b33fc13C6d9788a95667c2';
    // const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress);



    // console.log('getting claim issuer contract')
    // const claimIssuerContractAddress = '0x1eaE424dfA43C06426314a5347320ccE5b2F276D'
    // const claimIssuerContract = await ethers.getContractAt('ClaimIssuer', claimIssuerContractAddress);

    // console.log('getting trusted issuer registry')
    // const trustedIssuersRegistryAddress = '0x9fF90Afc253dbD746c1eB803f613ADb84d7Dd316'
    // const trustedIssuersRegistry = await ethers.getContractAt('TrustedIssuersRegistry', trustedIssuersRegistryAddress)

    // console.log('getting trusted issuer claim topics')
    // const claimTopics = await trustedIssuersRegistry.getTrustedIssuerClaimTopics(claimIssuerContract.address);

    // console.log('adding trusted issuer')
    // await trustedIssuersRegistry.connect(deployer).addTrustedIssuer(RECEIVER_ADDRESS, claimTopics)

    // const claimTopics = [ethers.utils.id("CLAIM_TOPIC")];

    // const claimIssuerSigningKey = ethers.Wallet.createRandom();


    // console.log('Claiming for receiver...')
    // const claimForReceiver = {
    //   data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
    //   issuer: claimIssuerContract.address,
    //   topic: claimTopics[0],
    //   scheme: 1,
    //   identity: receiverIdentity.address,
    //   signature: "",
    // };
    // console.log('Signature Claim for receiver')
    // claimForReceiver.signature = await claimIssuerSigningKey.signMessage(
    //   ethers.utils.arrayify(
    //     ethers.utils.keccak256(
    //       ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimForReceiver.identity, claimForReceiver.topic, claimForReceiver.data]),
    //     ),
    //   ),
    // );

    // console.log(`Awaiting receiver's identity`)
    // await receiverIdentity
    //   .connect(tokenHolderWallet)
    //   .addClaim(claimForReceiver.topic, claimForReceiver.scheme, claimForReceiver.issuer, claimForReceiver.signature, claimForReceiver.data, "", {gasLimit: gasLimit});
    
    // console.log('approving receiver address')
    // await token.connect(tokenHolderWallet).approve(RECEIVER_ADDRESS, 100); 

    // console.log('doing transfer')
    // await token.connect(tokenHolderWallet).transfer(RECEIVER_ADDRESS, 100, {gasLimit: gasLimit})

    // console.log('paussing token')
    // await token.connect(tokenAgent).pause();
    
    // console.log('waiting 20 sec')
    // await sleep(20);
    // console.log('continuing...')
    
    // console.log('checking balances')
    // const tokenBalance2 = await token.balanceOf(tokenHolderWallet.address);

    // console.log(`El saldo del token para ${tokenHolderWallet.address} es: ${tokenBalance2.toString()}`);
    
    // const tokenReceiverBalance2 = await token.balanceOf(RECEIVER_ADDRESS);

    // console.log(`El saldo del token para ${RECEIVER_ADDRESS} es: ${tokenReceiverBalance2.toString()}`);

    // console.log('unpaussing token')
    // await token.connect(tokenAgent).unpause();

    // const receiverIdentityAddress = '0xD675753A7Ee0D2E694b33fc13C6d9788a95667c2';
    // const receiverIdentity = await ethers.getContractAt('IdentityRegistry', receiverIdentityAddress);

    // console.log(`BatchRegistryIdentity for receiver's address`)
    // await identityRegistry
    // .connect(tokenAgent)
    // .batchRegisterIdentity([RECEIVER_ADDRESS], [receiverIdentity.address], [666]);
    // console.log(`Done with BatchRegistryIdentity for receiver's address`)

    // const claimIssuerContractAddress = '0x1eaE424dfA43C06426314a5347320ccE5b2F276D'
    // const claimIssuerContract = await ethers.getContractAt('ClaimIssuer', claimIssuerContractAddress);

    // const claimTopics = [ethers.utils.id("CLAIM_TOPIC")];

    // const claimIssuerSigningKey = ethers.Wallet.createRandom();


    // console.log('Claiming for receiver...')
    // const claimForReceiver = {
    //   data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
    //   issuer: claimIssuerContract.address,
    //   topic: claimTopics[0],
    //   scheme: 1,
    //   identity: receiverIdentity.address,
    //   signature: "",
    // };
    // console.log('Signature Claim for receiver')
    // claimForReceiver.signature = await claimIssuerSigningKey.signMessage(
    //   ethers.utils.arrayify(
    //     ethers.utils.keccak256(
    //       ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimForReceiver.identity, claimForReceiver.topic, claimForReceiver.data]),
    //     ),
    //   ),
    // );

    // const gasLimit = 20000000;

    // console.log(`Awaiting receiver's identity`)
    // await receiverIdentity
    //   .connect(tokenHolderWallet)
    //   .addClaim(claimForReceiver.topic, claimForReceiver.scheme, claimForReceiver.issuer, claimForReceiver.signature, claimForReceiver.data, "", {gasLimit: gasLimit});
  
    // // console.log('approving transaction')
    // // token.connect(tokenHolderWallet.address).approve(RECEIVER_ADDRESS, 100, {gasLimit: gasLimit});

    // // console.log('doing transaction, send token form tokenHolder to tokenReceiver')
    // // await token.connect(tokenHolderWallet.address).transfer(RECEIVER_ADDRESS, 100, {gasLimit: gasLimit});

    // console.log('doing transferFrom')
    // await token.connect(tokenHolderWallet).transferFrom(tokenHolderWallet.address, RECEIVER_ADDRESS, 100, {gasLimit: gasLimit})


    console.log('Done')

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
    