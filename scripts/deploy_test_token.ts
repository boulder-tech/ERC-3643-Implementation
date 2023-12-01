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

// ! Here you are just telling the compiler that, 
// even though it cannot verify this, you are sure process.env.PRIVATE_KEY
//  will be defined

function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// async main
async function main() {
  // const [deployer, tokenAgent, tokenAdmin, claimIssuer, aliceWallet, bobWallet, charlieWallet, davidWallet, anotherWallet] =
  //   await ethers.getSigners();
  // const [deployer, tokenIssuer, tokenAgent, tokenAdmin, claimIssuer, aliceWallet, bobWallet, charlieWallet, davidWallet, anotherWallet] =
  //   await ethers.getSigners();
  const claimIssuerSigningKey = ethers.Wallet.createRandom(); // ver estas dos SigningKey y ActionKey que son
  const aliceActionKey = ethers.Wallet.createRandom();

  // pruebo que tokenIssuer == deployer

  // const tokenIssuer = deployer

  // console.log(`Deployer address: ${deployer.address}`);
  // console.log(`tokenIssuer address: ${tokenIssuer.address}`);
  // console.log(`tokenAgent address: ${tokenAgent.address}`);
  // console.log(`tokenAdmin address: ${tokenAdmin.address}`);
  // console.log(`claimIssuer address: ${claimIssuer.address}`);

  const deployerProvider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL); // for some reasson hardhat.config didn't work. Check later
  // console.log('deployerProvider:', deployerProvider);
  const deployer = new ethers.Wallet(PRIVATE_KEY_DEVELOPER, deployerProvider);
  console.log('Deployer Address:', deployer.address);
  console.log('Deployer Balance:', (await deployer.getBalance()).toString());
  const tokenIssuer = new ethers.Wallet(PRIVATE_KEY_TOKEN_ISSUER, deployerProvider);// deployer; // 
  console.log('tokenIssuer Address:', tokenIssuer.address);
  const tokenAgent = new ethers.Wallet(PRIVATE_KEY_TOKEN_AGENT, deployerProvider);
  console.log('tokenAgent Address:', tokenAgent.address);
  const tokenAdmin = new ethers.Wallet(PRIVATE_KEY_TOKEN_ADMIN, deployerProvider);
  console.log('tokenAdmin Address:', tokenAdmin.address);
  const claimIssuer = new ethers.Wallet(PRIVATE_KEY_CLAIM_ISSUER, deployerProvider);
  console.log('claimIssuer Address:', claimIssuer.address);

///////// Todo esto no lo debería correr devuelta, solo usar las direcciones de más abajo

  const startBalance: BigNumber = await deployer.getBalance();

  // Deploy implementations
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
  // original
  // const trexFactory = await ethers.deployContract("TREXFactory", [trexImplementationAuthority.address, identityFactory.address], deployer);
  // await identityFactory.connect(deployer).addTokenFactory(trexFactory.address);

  // modified
  const trexFactoryParams = [
    trexImplementationAuthority.address,
    identityFactory.address,
  ];

  const TREXFactoryJson = JSON.parse(fs.readFileSync('/home/pablo/Trabajo/BTech/test/erc-3643-test-5/test-erc-3643/artifacts/contracts/factory/TREXFactory.sol/TREXFactory.json', 'utf8'));

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
  
  console.log('Deploying ClaimTopicsRegistryProxy...')

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
  console.log(`tokenOID deployed`)
  const tokenName = "BoulderTest-2";
  const tokenSymbol = "BT-2";
  const tokenDecimals = BigNumber.from("0");
  // original ------------------------------
  // const token = await ethers
  //   .deployContract(
  //     "TokenProxy",
  //     [
  //       trexImplementationAuthority.address,
  //       identityRegistry.address,
  //       defaultCompliance.address,
  //       tokenName,
  //       tokenSymbol,
  //       tokenDecimals,
  //       tokenOID.address,
  //     ],
  //     deployer,
  //   )
  //   .then(async (proxy) => {
  //     // Esperar a que la transacción de despliegue del contrato termine
  //     await proxy.deployed();
  //     console.log(`TokenProxy deployed at: ${proxy.address}`);

  //     // Obtener el contrato Token ahora que está desplegado
  //     return ethers.getContractAt("Token", proxy.address);
  //   });  //ethers.getContractAt("Token", proxy.address));
  // original ------------------------------
  
  const tokenproxyJson = JSON.parse(fs.readFileSync('/home/pablo/Trabajo/BTech/test/erc-3643-test-5/test-erc-3643/artifacts/contracts/proxy/TokenProxy.sol/TokenProxy.json', 'utf8'));

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
    // Esperar a que la transacción de despliegue del contrato termine
    await proxy.deployed();
    console.log(`TokenProxy deployed at: ${proxy.address}`);

    // Obtener el contrato Token ahora que está desplegado
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

  // Resultados:
  // tokenIssuer Address: 0xF13b282C1a8f3965A384D71D78683dF208162753
  // Deployer Address: 0xa8F48F1a969AE4a1abfC431B7a5eD4A38322B3E1
  // Deployer Balance: 98516789090614739574
  // Deploying Implementations...
  // Deployed claimTopicsRegistryImplementation at: 0x00B6A156d7c6bbc96158A5AB7365f896AC79b176
  // Deployed trustedIssuersRegistryImplementation at: 0x331bBEcb87C6075577D1f66Af669f8e36655e346
  // Deployed identityRegistryStorageImplementation at: 0xaf0ce9Ca0C88a12E5B39A0c9cea318b1DF54620B
  // Deployed identityRegistryImplementation at: 0x457F071bf475881d55500E6cf5e8cB4D8B1b4743
  // Deployed modularComplianceImplementation at: 0xCdb89ea0e8169F430456Bb5718e821D824EDe4ae
  // Deployed tokenImplementation at: 0xB97b4b90B9DEe2F3FAE35a70cBdCc71C4314Faf4
  // Deploying Identity Implementation Authority...
  // Deployed Identity Implementation Authority at: 0xd149A35d95f7f4d4133c9f0C25AC571A07408f34 
  // Deploying Identity Factory...
  // Deployed Identity Factory at: 0x633E2146338B3710D770963330dA75526fAc947c 
  // Deploying TREXImplementationAuthority...
  // Deployed trexImplementationAuthority at: 0x31f4632b9301086a355383A61076C2A4065b904B
  // Deploying TREXFactory...
  // Deployed Trex Factory at: 0x8C3f774435Fc58B430394B6574494Fc55a0Af3A4
  // Deploying ClaimTopicsRegistryProxy...
  // Deployed claimTopicsRegistry at: 0x08300d86b8A437024709CbC9f4e535F0D42CE6FB
  // Deploying ClaimTopicsRegistryProxy...
  // Deployed trustedIssuersRegistry at: 0x35030e54ea788737a80E6DcAfB8dB316e86d115a
  // Deploying identityRegistryStorage...
  // Deployed identityRegistryStorage at: 0x8F59c5cAebcc005a8fD41CcD210fF9Ab6E6838c8
  // Deploying defaultCompliance...
  // Deployed defaultCompliance at: 0x44D8bAC1eFCfb9522Bf6e775879065B6005A6A9F
  // Deploying identityRegistry...
  // Deployed identityRegistry at: 0xC574518243195134DA26FEa819e2a49fD18F3B52
  // TokenProxy deployed at: 0x2B13a65581d76F1B8882FE355CbDa6B4Bf6f24D4
  // Deployed token at: 0x2B13a65581d76F1B8882FE355CbDa6B4Bf6f24D4
  // Token Name: BoulderTest-1
  // Token Symbol: BT-1
  // Deployer Balance: 98459477008981694406
  // Total cost 0.057312081633045168
  // Done in 132.25s.

  // Token Name: BoulderTest-1
  // Deployed agentManager at: 0x6d8B94795EFb8440377A6D9B5425b43c7BE797E4
  // Connected deployer with identityRegistry
  // Done in 13.51s.

/////// Todo eso no lo tengo que hacer devuelta
  // const claimTopicsRegistryImplementationAddress = '0x00B6A156d7c6bbc96158A5AB7365f896AC79b176';
  // const claimTopicsRegistryImplementation = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryImplementationAddress);

  // const trustedIssuersRegistryImplementationAddress = '0x331bBEcb87C6075577D1f66Af669f8e36655e346';
  // const trustedIssuersRegistryImplementation = await ethers.getContractAt('TrustedIssuersRegistry', trustedIssuersRegistryImplementationAddress);

  // const identityRegistryStorageImplementationAddress = '0xaf0ce9Ca0C88a12E5B39A0c9cea318b1DF54620B';
  // const identityRegistryStorageImplementation = await ethers.getContractAt('IdentityRegistryStorage', identityRegistryStorageImplementationAddress);

  // const identityRegistryImplementationAddress = '0x457F071bf475881d55500E6cf5e8cB4D8B1b4743';
  // const identityRegistryImplementation = await ethers.getContractAt('IdentityRegistry', identityRegistryImplementationAddress);

  // const modularComplianceImplementationAddress = '0xCdb89ea0e8169F430456Bb5718e821D824EDe4ae';
  // const modularComplianceImplementation = await ethers.getContractAt('ModularCompliance', modularComplianceImplementationAddress);

  // const tokenImplementationAddress = '0xB97b4b90B9DEe2F3FAE35a70cBdCc71C4314Faf4';
  // const tokenImplementation = await ethers.getContractAt('Token', tokenImplementationAddress);

  // // const identityImplementationAuthorityAddress = '0xd149A35d95f7f4d4133c9f0C25AC571A07408f34'; 
  // // const identityImplementationAuthority = await ethers.getContractAt('identityImplementationAuthority', identityImplementationAuthorityAddress);

  // const identityImplementationAuthorityAddress = '0xd149A35d95f7f4d4133c9f0C25AC571A07408f34';
  // const identityImplementationAuthorityAbi = OnchainID.contracts.ImplementationAuthority.abi;

  // const identityImplementationAuthority = await ethers.getContractAt(identityImplementationAuthorityAbi, identityImplementationAuthorityAddress);

  // // const identityFactoryAddress = '0x633E2146338B3710D770963330dA75526fAc947c'
  // // const identityFactory = await ethers.getContractAt('identityFactory', identityFactoryAddress);

  // const trexImplementationAuthorityAddress = '0x31f4632b9301086a355383A61076C2A4065b904B'
  // const trexImplementationAuthority = await ethers.getContractAt('TREXImplementationAuthority', trexImplementationAuthorityAddress);

  // // const TREXFactoryAddress = '0x8C3f774435Fc58B430394B6574494Fc55a0Af3A4'
  // // const trexFactory = await ethers.getContractAt('trexFactory', TREXFactoryAddress);

  // const claimTopicsRegistryAddress = '0x08300d86b8A437024709CbC9f4e535F0D42CE6FB'
  // const claimTopicsRegistry = await ethers.getContractAt('ClaimTopicsRegistry', claimTopicsRegistryAddress);

  // const trustedIssuersRegistryAddress = '0x35030e54ea788737a80E6DcAfB8dB316e86d115a'
  // const trustedIssuersRegistry = await ethers.getContractAt('TrustedIssuersRegistry', trustedIssuersRegistryAddress)

  // const identityRegistryStorageAddress = '0x8F59c5cAebcc005a8fD41CcD210fF9Ab6E6838c8';
  // const identityRegistryStorage = await ethers.getContractAt('IdentityRegistryStorage', identityRegistryStorageAddress);

  // const defaultComplianceAddress = '0x44D8bAC1eFCfb9522Bf6e775879065B6005A6A9F'
  // const defaultCompliance = await ethers.getContractAt('DefaultCompliance', identityRegistryStorageAddress);

  // const identityRegistryAddress = '0xC574518243195134DA26FEa819e2a49fD18F3B52';
  // const identityRegistry = await ethers.getContractAt('IdentityRegistry', identityRegistryAddress);

  // const tokenAddress = '0x2B13a65581d76F1B8882FE355CbDa6B4Bf6f24D4';
  // const token = await ethers.getContractAt('Token', tokenAddress);
  // console.log(`Token Name: ${await token.name()}`)

  //// esto ya lo corrí
  console.log('Deploying agentManager...')
  const agentManager = await ethers.deployContract("AgentManager", [token.address], tokenAgent);

  console.log(`Deployed agentManager at: ${agentManager.address}`)

  console.log('Deploying identityRegistryStorage...')
  await identityRegistryStorage.connect(deployer).bindIdentityRegistry(identityRegistry.address);

  console.log(`Connected deployer with identityRegistryStorage and binded IndentityRegistry`)
  /////

  /// 23/11 acá continuar...

  // const agentManagerAddress = '0x6d8B94795EFb8440377A6D9B5425b43c7BE797E4'
  // const agentManager = await ethers.getContractAt('AgentManager', agentManagerAddress);

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

  // const claimIssuerContractAddress = '0x9C2d8C42b674eB86Bce1d24e995ceEe1490a6327'
  // const claimIssuerContract = await ethers.getContractAt('ClaimIssuer', claimIssuerContractAddress);

  console.log(`Deployed claimIssuerContract at: ${claimIssuerContract.address}`) 

  await trustedIssuersRegistry.connect(deployer).addTrustedIssuer(claimIssuerContract.address, claimTopics);

  console.log(`Connected deployer with trustedIssuersRegistry`)

  const tokenHolderWallet = new ethers.Wallet(PRIVATE_KEY_TOKEN_HOLDER, deployerProvider);

  // const aliceIdentity = await deployIdentityProxy(identityImplementationAuthority.address, aliceWallet.address, deployer);
  // await aliceIdentity
  //   .connect(aliceWallet)
  //   .addKey(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [aliceActionKey.address])), 2, 1);
  // const bobIdentity = await deployIdentityProxy(identityImplementationAuthority.address, bobWallet.address, deployer);
  // const charlieIdentity = await deployIdentityProxy(identityImplementationAuthority.address, charlieWallet.address, deployer);

  console.log(`Deploying identity proxy for tokenHolder...`)
  const tokenHolderIdentity = await deployIdentityProxy(identityImplementationAuthority.address, tokenHolderWallet.address, deployer);
  console.log(`tokenHolder's identity deployed...`)
  console.log(`adding tokenAgent to identityRegistry`)
  await identityRegistry.connect(deployer).addAgent(tokenAgent.address);
  console.log(`added tokenAgent to identityRegistry`)
  console.log(`adding token to identityRegistry`)
  await identityRegistry.connect(deployer).addAgent(token.address);
  console.log(`added token to identityRegistry`)
  // await identityRegistry
  //   .connect(tokenAgent)
  //   .batchRegisterIdentity([aliceWallet.address, bobWallet.address], [aliceIdentity.address, bobIdentity.address], [42, 666]);

  console.log('waiting 20 sec')
  await sleep(20);
  console.log('continuing...')

  console.log(`BatchRegistryIdentity for tokenHolder's address`)
  await identityRegistry
  .connect(tokenAgent)
  .batchRegisterIdentity([tokenHolderWallet.address], [tokenHolderIdentity.address], [666]);
  console.log(`Done with BatchRegistryIdentity for tokenHolder's address`)

  // const claimForAlice = {
  //   data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
  //   issuer: claimIssuerContract.address,
  //   topic: claimTopics[0],
  //   scheme: 1,
  //   identity: aliceIdentity.address,
  //   signature: "",
  // };
  // claimForAlice.signature = await claimIssuerSigningKey.signMessage(
  //   ethers.utils.arrayify(
  //     ethers.utils.keccak256(
  //       ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimForAlice.identity, claimForAlice.topic, claimForAlice.data]),
  //     ),
  //   ),
  // );

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

  // await aliceIdentity
  //   .connect(aliceWallet)
  //   .addClaim(claimForAlice.topic, claimForAlice.scheme, claimForAlice.issuer, claimForAlice.signature, claimForAlice.data, "");

  console.log(`Awaiting tokenHolder's identity`)
  await tokenHolderIdentity
    .connect(tokenHolderWallet)
    .addClaim(claimFortokenHolder.topic, claimFortokenHolder.scheme, claimFortokenHolder.issuer, claimFortokenHolder.signature, claimFortokenHolder.data, "", {gasLimit: gasLimit});

  // const claimForBob = {
  //   data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Some claim public data.")),
  //   issuer: claimIssuerContract.address,
  //   topic: claimTopics[0],
  //   scheme: 1,
  //   identity: bobIdentity.address,
  //   signature: "",
  // };
  // claimForBob.signature = await claimIssuerSigningKey.signMessage(
  //   ethers.utils.arrayify(
  //     ethers.utils.keccak256(
  //       ethers.utils.defaultAbiCoder.encode(["address", "uint256", "bytes"], [claimForBob.identity, claimForBob.topic, claimForBob.data]),
  //     ),
  //   ),
  // );

  // await bobIdentity
  //   .connect(bobWallet)
  //   .addClaim(claimForBob.topic, claimForBob.scheme, claimForBob.issuer, claimForBob.signature, claimForBob.data, "");

  console.log(`Minting tokens to tokenHolder's wallet`)
  await token.connect(tokenAgent).mint(tokenHolderWallet.address, 1000, {gasLimit: gasLimit});
  // await token.connect(tokenAgent).mint(bobWallet.address, 500);
  console.log(`${token.symbol()} minted at tokenHolder's wallet`)
  

  await agentManager.connect(tokenAgent).addAgentAdmin(tokenAdmin.address);
  await token.connect(deployer).addAgent(agentManager.address);
  await identityRegistry.connect(deployer).addAgent(agentManager.address);

  await token.connect(tokenAgent).unpause();

  // return {
  //   accounts: {
  //     deployer,
  //     tokenIssuer,
  //     tokenAgent,
  //     tokenAdmin,
  //     claimIssuer,
  //     claimIssuerSigningKey,
  //     aliceActionKey,
  //     aliceWallet,
  //     bobWallet,
  //     charlieWallet,
  //     davidWallet,
  //     anotherWallet,
  //   },
  //   identities: {
  //     aliceIdentity,
  //     bobIdentity,
  //     charlieIdentity,
  //   },
  //   suite: {
  //     claimIssuerContract,
  //     claimTopicsRegistry,
  //     trustedIssuersRegistry,
  //     identityRegistryStorage,
  //     defaultCompliance,
  //     identityRegistry,
  //     tokenOID,
  //     token,
  //     agentManager,
  //   },
  //   authorities: {
  //     trexImplementationAuthority,
  //     identityImplementationAuthority,
  //   },
  //   factories: {
  //     trexFactory,
  //     identityFactory,
  //   },
  //   implementations: {
  //     identityImplementation,
  //     claimTopicsRegistryImplementation,
  //     trustedIssuersRegistryImplementation,
  //     identityRegistryStorageImplementation,
  //     identityRegistryImplementation,
  //     modularComplianceImplementation,
  //     tokenImplementation,
  //   },
  // };
}


// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
