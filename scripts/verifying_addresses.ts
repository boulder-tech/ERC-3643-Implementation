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
const CLIENT_ADDRESS = '0xc43C0C5B8184404ff1F304315524e9a86a79f780' //GUILLE: '0xf4C889BB1D1eBf1703cc0E912C80a0BB036F8184' //RODRI:'0x71d17aa8783024f10e7850dD0EB3694c9b6CeB15'

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

    const identityRegistryAddress = '0xD675753A7Ee0D2E694b33fc13C6d9788a95667c2';
    const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress);

    const identityImplementationAuthorityAddress = '0x0EB2BD2F6B73219511Bb9B31bc91Feb87CB1Ab06';
    const identityImplementationAuthorityAbi = OnchainID.contracts.ImplementationAuthority.abi;

    const identityImplementationAuthority = await ethers.getContractAt(identityImplementationAuthorityAbi, identityImplementationAuthorityAddress);

    console.log(`Deploying identity proxy for client...`)
    const clientIdentity = await deployIdentityProxy(identityImplementationAuthority.address, CLIENT_ADDRESS, deployer); // This returns ethers.getContractAt("Identity", identity.address, signer);

    console.log(`clientIdentity address: ${clientIdentity.address}`)

    const clientIdentityVerif = await identityRegistry.isVerified(CLIENT_ADDRESS);

    console.log(`client identity: ${clientIdentityVerif}`)

    await identityRegistry.connect(tokenAgent).registerIdentity(CLIENT_ADDRESS, clientIdentity.address, 0); 

    // console.log('waiting 60 sec')
    // await sleep(60);
    // console.log('continuing...')

    // // const claimTopicsRegistryAddress = '0xD53740915653D119Df744FbFeBb51fB477AC57f4'
    // // const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryAddress);

    // // const topics = await claimTopicsRegistry.getClaimTopics();
    // // console.log(`topics: ${topics}`)
    // // await Promise.all(topics.map((topic) => claimTopicsRegistry.removeClaimTopic(topic)));
    // // console.log(`topics: ${topics}`)

    // const clientIdentityVerif2 = await identityRegistry.isVerified(CLIENT_ADDRESS)

    // console.log(`receiver identity: ${clientIdentityVerif2}`)
    
    
    
    
    
    
    
    
    
    
    
    
    
    // console.log(`Deploying identity proxy for receiver...`)
    // const receiverIdentity = await deployIdentityProxy(identityImplementationAuthority.address, RECEIVER_ADDRESS, deployer); // This returns ethers.getContractAt("Identity", identity.address, signer);

    // console.log(`receiverIdentity address: ${receiverIdentity.address}`)

    // // await identityRegistry.connect(tokenAgent).registerIdentity(RECEIVER_ADDRESS, receiverIdentity.address, 0); // address stored already

    // const receiverIdentityVerif = await identityRegistry.isVerified(RECEIVER_ADDRESS);

    // console.log(`receiver identity: ${receiverIdentityVerif}`)

    // const claimTopicsRegistryAddress = '0xD53740915653D119Df744FbFeBb51fB477AC57f4'
    // const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryAddress);

    // const topics = await claimTopicsRegistry.getClaimTopics();
    // console.log(`topics: ${topics}`)
    // await Promise.all(topics.map((topic) => claimTopicsRegistry.removeClaimTopic(topic)));
    // console.log(`topics: ${topics}`)

    // const receiverIdentityVerif2 = await identityRegistry.isVerified(RECEIVER_ADDRESS)

    // console.log(`receiver identity: ${receiverIdentityVerif2}`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
