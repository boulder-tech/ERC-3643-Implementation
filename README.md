### BoulderTech's ERC-3643: Enhancing Security Token Transactions

---

<br><br>

<p align="center">
  <a href="https://bouldertech.fi/">
  <img src="./docs/img/bouldertech logo simple.jpeg" width="150" title="BoulderTech">
  </a>
</p>

**Introduction**

Welcome to the BoulderTech ERC-3643 implementation repository. Here, we leverage the power of the T-REX (Token for Regulated EXchanges) protocol, a robust suite of Solidity smart contracts based on the ERC-3643 standard. Our implementation is tailored to streamline the issuance, management, and transfer of security tokens, ensuring compliance with global regulations and providing a secure, transparent environment for token exchanges.

**Overview**

BoulderTech's adaptation of the T-REX protocol incorporates a series of innovative smart contracts, each designed to address specific aspects of security token management in a regulated environment. Our focus is on enhancing the interoperability, efficiency, and regulatory compliance of security token transactions.

**Key Components**

Our ERC-3643 implementation consists of several critical components, each contributing to the secure and compliant management of security tokens:

1. **ONCHAINID**: A user-deployed smart contract facilitating interactions with the security token. It stores keys and claims pertinent to a specific identity, ensuring secure identity management on the blockchain.
2. **Trusted Issuers Registry**: This contract maintains a list of all trusted claim issuers linked to a particular token, centralizing trust and simplifying verification processes.
3. **Claim Topics Registry**: This registry keeps track of all trusted claim topics associated with the security token, ensuring clarity and uniformity in claim management.
4. **Identity Registry**: Holding the addresses of all authorized token holders, this contract verifies claims and manages investor eligibility, crucial for compliance and security.
5. **Compliance Smart Contract**: Operating autonomously, this contract checks each transfer against the rules established for the token, ensuring all transactions adhere to regulatory standards.
6. **Security Token Contract**: Interacting with the Identity Registry, this contract verifies investor eligibility, enabling secure holding and transactions of the token.

**Getting Started**

To integrate BoulderTech's ERC-3643 in your project:

1. Clone the repository: **`git clone https://github.com/boulder-tech/erc-3643-implementation.git`**
2. Install dependencies: **`yarn`**
3. Add Hardhat: **`yarn add --dev hardhat`**
4. Install ts-node: **`npm install --save-dev ts-node`**
5. Compile the contracts: **`yarn hardhat compile`**
6. Run tests: **`yarn hardhat test`** (Expect 660 tests to pass successfully)

**Documentation**

For an in-depth understanding of our ERC-3643 implementation and how it aligns with the T-REX protocol, please refer to our comprehensive documentation and whitepaper. All functionalities of our adapted smart contracts are thoroughly described in these resources.

**ERC-3643 Standard**

Our implementation follows the [ERC-3643 standard](https://eips.ethereum.org/EIPS/eip-3643), a set of guidelines and specifications for security token contracts on the Ethereum blockchain. This standard ensures compatibility and interoperability with other projects and platforms.

**Contributing**

We actively encourage community contributions to this project. For guidelines on how to contribute, please refer to our CONTRIBUTING document.

**License**

This project is licensed under the GNU General Public License v3.0, ensuring open-source accessibility and collaborative improvement.

**Security Audit**

Our smart contract has been rigorously audited by Hacken to ensure top-notch security and compliance standards.
