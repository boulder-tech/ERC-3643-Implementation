import '@xyrusworx/hardhat-solidity-json';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';
import '@nomiclabs/hardhat-solhint';
import '@primitivefi/hardhat-dodoc';
import 'dotenv/config';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY_DEVELOPER = process.env.PRIVATE_KEY_DEVELOPER!
const PRIVATE_KEY_TOKEN_ISSUER = process.env.PRIVATE_KEY_TOKEN_ISSUER!
const PRIVATE_KEY_TOKEN_AGENT = process.env.PRIVATE_KEY_TOKEN_AGENT!
const PRIVATE_KEY_TOKEN_ADMIN = process.env.PRIVATE_KEY_TOKEN_ADMIN!
const PRIVATE_KEY_CLAIM_ISSUER = process.env.PRIVATE_KEY_CLAIM_ISSUER!
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY


const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
        url: SEPOLIA_RPC_URL,
        accounts: [PRIVATE_KEY_DEVELOPER, PRIVATE_KEY_TOKEN_ISSUER, PRIVATE_KEY_TOKEN_AGENT, PRIVATE_KEY_TOKEN_ADMIN, PRIVATE_KEY_CLAIM_ISSUER],
        chainId: 11155111,
        // allowUnlimitedContractSize: true,
        // gas: 20000000,
        // gasPrice: 8000000000,
    },
    localhost: {
        url: "http://127.0.0.1:8545/",
        // accounts: [PRIVATE_KEY],
        chainId: 31337,
    },
  },
  gasReporter: {
    enabled: true,
  },
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    outputDir: "./docgen",
    freshOutput: true,
  },
};

export default config;
