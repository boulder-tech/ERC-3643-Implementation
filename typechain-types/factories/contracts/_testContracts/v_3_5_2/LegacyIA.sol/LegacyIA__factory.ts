/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  LegacyIA,
  LegacyIAInterface,
} from "../../../../../contracts/_testContracts/v_3_5_2/LegacyIA.sol/LegacyIA";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "UpdatedImplementation",
    type: "event",
  },
  {
    inputs: [],
    name: "getImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address",
      },
    ],
    name: "updateImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161048538038061048583398101604081905261002f916100c7565b600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b0319166001600160a01b0383169081179091556040519081527f87c4e67a766ffddda27f441d63853a36ae64fbb07775a7c59d395e064b204eeb9060200160405180910390a1506100f7565b6000602082840312156100d957600080fd5b81516001600160a01b03811681146100f057600080fd5b9392505050565b61037f806101066000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063025b22bc146100675780635c60da1b1461007c578063715018a6146100ab5780638da5cb5b146100b3578063aaf10f42146100c4578063f2fde38b146100d5575b600080fd5b61007a6100753660046102d3565b6100e8565b005b60015461008f906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61007a61016f565b6000546001600160a01b031661008f565b6001546001600160a01b031661008f565b61007a6100e33660046102d3565b6101e3565b6000546001600160a01b0316331461011b5760405162461bcd60e51b815260040161011290610303565b60405180910390fd5b600180546001600160a01b0319166001600160a01b0383169081179091556040519081527f87c4e67a766ffddda27f441d63853a36ae64fbb07775a7c59d395e064b204eeb9060200160405180910390a150565b6000546001600160a01b031633146101995760405162461bcd60e51b815260040161011290610303565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b0316331461020d5760405162461bcd60e51b815260040161011290610303565b6001600160a01b0381166102785760405162461bcd60e51b815260206004820152602c60248201527f4f776e61626c654c65676163793a206e6577206f776e6572206973207468652060448201526b7a65726f206164647265737360a01b6064820152608401610112565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000602082840312156102e557600080fd5b81356001600160a01b03811681146102fc57600080fd5b9392505050565b60208082526026908201527f4f776e61626c654c65676163793a2063616c6c6572206973206e6f74207468656040820152651037bbb732b960d11b60608201526080019056fea26469706673582212202ccad5b520bdc8e9b1b61e8d5e72295c221283dee9438180dd8612e7aa2b92d264736f6c63430008110033";

type LegacyIAConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LegacyIAConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LegacyIA__factory extends ContractFactory {
  constructor(...args: LegacyIAConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _implementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LegacyIA> {
    return super.deploy(_implementation, overrides || {}) as Promise<LegacyIA>;
  }
  override getDeployTransaction(
    _implementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_implementation, overrides || {});
  }
  override attach(address: string): LegacyIA {
    return super.attach(address) as LegacyIA;
  }
  override connect(signer: Signer): LegacyIA__factory {
    return super.connect(signer) as LegacyIA__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LegacyIAInterface {
    return new utils.Interface(_abi) as LegacyIAInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LegacyIA {
    return new Contract(address, _abi, signerOrProvider) as LegacyIA;
  }
}