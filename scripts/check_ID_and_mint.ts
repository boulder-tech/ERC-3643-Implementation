import { BigNumber, Contract, Signer, utils } from 'ethers';
import { ethers, network } from 'hardhat';
import { deployIdentityProxy } from '../test/fixtures/deploy-full-suite.fixture';
import OnchainID from '@onchain-id/solidity';
import 'dotenv/config';
import Web3 from 'web3';

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
    
    const identityRegistryAddress = '0x45cD5DBD1e67CdEa5100d59286766f610aE7F048'
    const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress); 

    const tokenHolderWallet = new ethers.Wallet(PRIVATE_KEY_TOKEN_HOLDER, deployerProvider);

    const tokenAddress = '0x436b73dD93a4aEB85fE73716397807650bc1f663'

    const token = await ethers.getContractAt('Token', tokenAddress); 

    console.log(`Token Name: ${await token.name()}`)
    console.log(`Token Symbol: ${await token.symbol()}`)

    const agentManagerAddress = '0xa2B62E20248E46FfA59958D90347720c17639b76'
    const agentManager = await ethers.getContractAt('AgentManager', agentManagerAddress);

    const claimTopicsRegistryAddress = '0x98d16D7dFFA71EBdcc9Ed8C688990E81569e9513'
    const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryAddress);

    // await token.connect(deployer).addAgent(tokenAgent.address);

    // console.log(`token Connected deployer with tokenAgent`)

    console.log('Removing claimTopics if exists');
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

    // await identityRegistry.connect(deployer).addAgent(token.address);
    // console.log(`added token ${await token.name()} to identityRegistry`)

    // Adding a time sleep just to wait till contracts are deployed
    // console.log('waiting 20 sec')
    // await sleep(20);
    // console.log('continuing...')

    const tokenHolderIdentityAddress = '0xcA8813003956ceA53033151fE88B755C16f47d70'
    const tokenHolderIdentity = await ethers.getContractAt('Identity', tokenHolderIdentityAddress)

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

}












main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });