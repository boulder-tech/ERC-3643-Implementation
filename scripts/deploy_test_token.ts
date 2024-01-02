// imports
import { BigNumber, Contract, Signer, utils } from 'ethers';
import { ethers, network } from 'hardhat';
import { deployIdentityProxy } from '../test/fixtures/deploy-full-suite.fixture';
import OnchainID from '@onchain-id/solidity';
import 'dotenv/config';

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

  // Deploying implementations
  console.log('Deploying Implementations...')
  const claimTopicsRegistryImplementation = await ethers.deployContract("ClaimTopicsRegistry", deployer);
  console.log(`Deployed claimTopicsRegistryImplementation at: ${claimTopicsRegistryImplementation.address}`)
  const trustedIssuersRegistryImplementation = await ethers.deployContract("TrustedIssuersRegistry", deployer);
  console.log(`Deployed trustedIssuersRegistryImplementation at: ${trustedIssuersRegistryImplementation.address}`)
  const identityRegistryStorageImplementation = await ethers.deployContract("IdentityRegistryStorage", deployer);
  console.log(`Deployed identityRegistryStorageImplementation at: ${identityRegistryStorageImplementation.address}`)
  const identityRegistryImplementation = await ethers.deployContract("IdentityRegistry", deployer);
  console.log(`Deployed identityRegistryImplementation at: ${identityRegistryImplementation.address}`)
  const modularComplianceImplementation = await ethers.deployContract("ModularCompliance", deployer);
  console.log(`Deployed modularComplianceImplementation at: ${modularComplianceImplementation.address}`)
  const tokenImplementation = await ethers.deployContract("Token", deployer);
  console.log(`Deployed tokenImplementation at: ${tokenImplementation.address}`)
  const identityImplementation = await new ethers.ContractFactory(
    OnchainID.contracts.Identity.abi,
    OnchainID.contracts.Identity.bytecode,
    deployer,
  ).deploy(deployer.address, true);

  console.log('Deploying Identity Implementation Authority...')
  const identityImplementationAuthority = await new ethers.ContractFactory(
    OnchainID.contracts.ImplementationAuthority.abi,
    OnchainID.contracts.ImplementationAuthority.bytecode,
    deployer,
  ).deploy(identityImplementation.address);

  console.log(`Deployed Identity Implementation Authority at: ${identityImplementationAuthority.address} `)

  console.log('Deploying Identity Factory...')

  const identityFactory = await new ethers.ContractFactory(
    OnchainID.contracts.Factory.abi, 
    OnchainID.contracts.Factory.bytecode, 
    deployer).deploy(identityImplementationAuthority.address,);

  console.log(`Deployed Identity Factory at: ${identityFactory.address} `)

  console.log('Deploying TREXImplementationAuthority...')
  const trexImplementationAuthority = await ethers.deployContract(
    "TREXImplementationAuthority",
    [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
    deployer,
  );
  const versionStruct = {
    major: 4,
    minor: 0,
    patch: 0,
  };
  const contractsStruct = {
    tokenImplementation: tokenImplementation.address,
    ctrImplementation: claimTopicsRegistryImplementation.address,
    irImplementation: identityRegistryImplementation.address,
    irsImplementation: identityRegistryStorageImplementation.address,
    tirImplementation: trustedIssuersRegistryImplementation.address,
    mcImplementation: modularComplianceImplementation.address,
  };
  await trexImplementationAuthority.connect(deployer).addAndUseTREXVersion(versionStruct, contractsStruct);


  console.log(`Deployed trexImplementationAuthority at: ${trexImplementationAuthority.address}`)
  console.log('Deploying TREXFactory...')

  const trexFactoryParams = [
    trexImplementationAuthority.address,
    identityFactory.address,
  ];

  const TREXFactoryJson = JSON.parse(fs.readFileSync(PATH_TO_TREXFactory_CONTRACTS, 'utf8'));

  const trexFactoryAbi: any[] = TREXFactoryJson.abi;
  const trexFactoryBytecode: string = TREXFactoryJson.bytecode;

  const TREXFactoryFactory = new ethers.ContractFactory(
    trexFactoryAbi, 
    trexFactoryBytecode,
    deployer
  );

  const gasLimit = 20000000;

  const trexFactory = await TREXFactoryFactory.deploy(...trexFactoryParams, { gasLimit: gasLimit });

  await trexFactory.deployed();

  console.log(`Deployed Trex Factory at: ${trexFactory.address}`)

  await identityFactory.connect(deployer).addTokenFactory(trexFactory.address);

  console.log(`Connected identityFactory with trexFactory`)
  
  console.log('Deploying ClaimTopicsRegistryProxy...')

  const claimTopicsRegistry = await ethers
    .deployContract("ClaimTopicsRegistryProxy", [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt("ClaimTopicsRegistry", proxy.address));

  console.log(`Deployed claimTopicsRegistry at: ${claimTopicsRegistry.address}`)
  
  console.log('Deploying trustedIssuersRegistry...')

  const trustedIssuersRegistry = await ethers
    .deployContract("TrustedIssuersRegistryProxy", [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt("TrustedIssuersRegistry", proxy.address));

  console.log(`Deployed trustedIssuersRegistry at: ${trustedIssuersRegistry.address}`)

  console.log('Deploying identityRegistryStorage...')

  const identityRegistryStorage = await ethers
    .deployContract("IdentityRegistryStorageProxy", [trexImplementationAuthority.address], deployer)
    .then(async (proxy) => ethers.getContractAt("IdentityRegistryStorage", proxy.address));

  console.log(`Deployed identityRegistryStorage at: ${identityRegistryStorage.address}`)

  console.log('Deploying defaultCompliance...')

  const defaultCompliance = await ethers.deployContract("DefaultCompliance", deployer);

  console.log(`Deployed defaultCompliance at: ${defaultCompliance.address}`)

  console.log('Deploying identityRegistry...')

  const identityRegistry = await ethers
    .deployContract(
      "IdentityRegistryProxy",
      [trexImplementationAuthority.address, trustedIssuersRegistry.address, claimTopicsRegistry.address, identityRegistryStorage.address],
      deployer,
    )
    .then(async (proxy) => ethers.getContractAt("IdentityRegistry", proxy.address));

  console.log(`Deployed identityRegistry at: ${identityRegistry.address}`)
  console.log(`Deploying tokenOID...`)
  const tokenOID = await deployIdentityProxy(identityImplementationAuthority.address, tokenIssuer.address, deployer);
  console.log(`tokenOID deployed at: ${tokenOID.address}`)
  const tokenName = "BoulderTest-6";
  const tokenSymbol = "BT-6";
  const tokenDecimals = BigNumber.from("0");
  
  const tokenproxyJson = JSON.parse(fs.readFileSync(PATH_TO_TOKENPROXY_CONTRACTS, 'utf8'));

  const tokenproxyAbi: any[] = tokenproxyJson.abi;
  const tokenproxyBytecode: string = tokenproxyJson.bytecode;

  const tokenFactory = new ethers.ContractFactory(
    tokenproxyAbi, 
    tokenproxyBytecode,
    deployer
  );

  const tokenParams = [
    trexImplementationAuthority.address,
    identityRegistry.address,
    defaultCompliance.address,
    tokenName,
    tokenSymbol,
    tokenDecimals,
    tokenOID.address,
  ];

  const token = await tokenFactory.deploy(...tokenParams, { gasLimit: gasLimit }).then(async (proxy) => {
    await proxy.deployed();
    console.log(`TokenProxy deployed at: ${proxy.address}`);

    return ethers.getContractAt("Token", proxy.address);
  });

  await token.deployed();

  console.log(`Deployed token at: ${token.address}`)

  console.log(`Token Name: ${await token.name()}`)
  console.log(`Token Symbol: ${await token.symbol()}`)

  console.log('Deployer Balance:', (await deployer.getBalance()).toString());

  const endBalance: BigNumber = await deployer.getBalance();

  const totalCost: BigNumber = startBalance.sub(endBalance);
  const totalCostInEth: string = utils.formatUnits(totalCost, 18);

  console.log(`Total cost ${totalCostInEth}`)

  console.log('Deploying agentManager...')
  const agentManager = await ethers.deployContract("AgentManager", [token.address], tokenAgent);

  console.log(`Deployed agentManager at: ${agentManager.address}`)

  console.log('Binding identityRegistryStorage with IdentityRegistry...')
  await identityRegistryStorage.connect(deployer).bindIdentityRegistry(identityRegistry.address);

  console.log(`Connected deployer with identityRegistryStorage and binded IndentityRegistry`)

  await token.connect(deployer).addAgent(tokenAgent.address);

  console.log(`Connected deployer with tokenAgent`)

  const claimTopics = [ethers.utils.id("CLAIM_TOPIC")];
  await claimTopicsRegistry.connect(deployer).addClaimTopic(claimTopics[0]);

  console.log(`Connected deployer with claimTopicsRegistry`)
  console.log('Deploying claimIssuerContract')
  const claimIssuerContract = await ethers.deployContract("ClaimIssuer", [claimIssuer.address], claimIssuer);
  await claimIssuerContract
    .connect(claimIssuer)
    .addKey(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [claimIssuerSigningKey.address])), 3, 1);

  console.log(`Deployed claimIssuerContract at: ${claimIssuerContract.address}`) 

  await trustedIssuersRegistry.connect(deployer).addTrustedIssuer(claimIssuerContract.address, claimTopics);

  console.log(`Connected deployer with trustedIssuersRegistry`)

  const tokenHolderWallet = new ethers.Wallet(PRIVATE_KEY_TOKEN_HOLDER, deployerProvider);

  console.log(`Deploying identity proxy for tokenHolder...`)
  const tokenHolderIdentity = await deployIdentityProxy(identityImplementationAuthority.address, tokenHolderWallet.address, deployer);
  console.log(`tokenHolder's identity deployed at: ${tokenHolderIdentity.address}`)
  console.log(`adding tokenAgent to identityRegistry`)
  await identityRegistry.connect(deployer).addAgent(tokenAgent.address);
  console.log(`added tokenAgent to identityRegistry`)
  console.log(`adding token to identityRegistry`)
  await identityRegistry.connect(deployer).addAgent(token.address);
  console.log(`added token to identityRegistry`)

  // Adding a time sleep just to wait till contracts are deployed
  console.log('waiting 20 sec')
  await sleep(20);
  console.log('continuing...')

  console.log(`BatchRegistryIdentity for tokenHolder's address`)
  await identityRegistry
  .connect(tokenAgent)
  .batchRegisterIdentity([tokenHolderWallet.address], [tokenHolderIdentity.address], [666]);
  console.log(`Done with BatchRegistryIdentity for tokenHolder's address`)

  console.log('Claiming for tokenHolder...')
  const claimFortokenHolder = {
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
    issuer: claimIssuerContract.address,
    topic: claimTopics[0],
    scheme: 1,
    identity: tokenHolderIdentity.address,
    signature: "",
  };
  console.log('Signature Claim for tokenHolder')
  claimFortokenHolder.signature = await claimIssuerSigningKey.signMessage(
    ethers.utils.arrayify(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimFortokenHolder.identity, claimFortokenHolder.topic, claimFortokenHolder.data]),
      ),
    ),
  );

  console.log(`Awaiting tokenHolder's identity`)
  await tokenHolderIdentity
    .connect(tokenHolderWallet)
    .addClaim(claimFortokenHolder.topic, claimFortokenHolder.scheme, claimFortokenHolder.issuer, claimFortokenHolder.signature, claimFortokenHolder.data, "", {gasLimit: gasLimit});

  console.log(`Minting tokens to tokenHolder's wallet`) // chequear si acá el tokenHolder está verificado
  await token.connect(tokenAgent).mint(tokenHolderWallet.address, 1000, {gasLimit: gasLimit});

  console.log(`${await token.symbol()} minted at tokenHolder's wallet`)

  await agentManager.connect(tokenAgent).addAgentAdmin(tokenAdmin.address);
  await token.connect(deployer).addAgent(agentManager.address);
  await identityRegistry.connect(deployer).addAgent(agentManager.address);

  await token.connect(tokenAgent).unpause();

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
