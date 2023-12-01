/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ModularCompliance,
  ModularComplianceInterface,
} from "../../../../contracts/compliance/modular/ModularCompliance";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "ModuleAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "ModuleInteraction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "ModuleRemoved",
    type: "event",
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
        name: "_token",
        type: "address",
      },
    ],
    name: "TokenBound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "TokenUnbound",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "addModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "bindToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "callModuleFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "canTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "created",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "destroyed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getModules",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenBound",
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
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "isModuleBound",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "removeModule",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferred",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "unbindToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506115f3806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80638da5cb5b11610097578063e1c7392a11610066578063e1c7392a14610220578063e46638e614610228578063efb22d331461023b578063f2fde38b1461024e57600080fd5b80638da5cb5b146101ab578063a0632461146101bc578063a446d49f146101cf578063b2494df31461020b57600080fd5b80636a3edf28116100d35780636a3edf2814610153578063715018a61461017d5780638baf29b4146101855780638d2ea7721461019857600080fd5b80631ed86f19146101055780633ff5aa021461011a57806340db3b501461012d5780635f8dead314610140575b600080fd5b6101186101133660046112f2565b610261565b005b6101186101283660046112f2565b610570565b61011861013b3660046112f2565b61067b565b61011861014e36600461130d565b6107c3565b6065546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b61011861090c565b610118610193366004611337565b610920565b6101186101a636600461130d565b610a94565b6033546001600160a01b0316610160565b6101186101ca3660046112f2565b610bd7565b6101fb6101dd3660046112f2565b6001600160a01b031660009081526067602052604090205460ff1690565b6040519015158152602001610174565b610213610e0f565b6040516101749190611373565b610118610e71565b6101fb610236366004611337565b610f7e565b6101186102493660046113c0565b61105b565b61011861025c3660046112f2565b611141565b6102696111b7565b6001600160a01b0381166102985760405162461bcd60e51b815260040161028f90611441565b60405180910390fd5b6001600160a01b03811660009081526067602052604090205460ff16156102f85760405162461bcd60e51b81526020600482015260146024820152731b5bd91d5b1948185b1c9958591e48189bdd5b9960621b604482015260640161028f565b6066546018101561034b5760405162461bcd60e51b815260206004820152601f60248201527f63616e6e6f7420616464206d6f7265207468616e203235206d6f64756c657300604482015260640161028f565b6000819050806001600160a01b031663e6f5e8076040518163ffffffff1660e01b8152600401602060405180830381865afa15801561038e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b29190611478565b6104875760405163bcc2105360e01b81523060048201526001600160a01b0382169063bcc2105390602401602060405180830381865afa1580156103fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041e9190611478565b6104875760405162461bcd60e51b815260206004820152603460248201527f636f6d706c69616e6365206973206e6f74207375697461626c6520666f722062604482015273696e64696e6720746f20746865206d6f64756c6560601b606482015260840161028f565b6040516312a4c95160e21b81523060048201526001600160a01b03821690634a93254490602401600060405180830381600087803b1580156104c857600080fd5b505af11580156104dc573d6000803e3d6000fd5b50506066805460018082019092557f46501879b8ca8525e8c2fd519e2fbfcfa2ebea26501294aa02cbfcfb12e943540180546001600160a01b0319166001600160a01b038716908117909155600081815260676020526040808220805460ff191690941790935591519093507fead6a006345da1073a106d5f32372d2d2204f46cb0b4bca8f5ebafcbbed12b8a9250a25050565b336105836033546001600160a01b031690565b6001600160a01b031614806105b457506065546001600160a01b03161580156105b45750336001600160a01b038216145b6106005760405162461bcd60e51b815260206004820152601c60248201527f6f6e6c79206f776e6572206f7220746f6b656e2063616e2063616c6c00000000604482015260640161028f565b6001600160a01b0381166106265760405162461bcd60e51b815260040161028f90611441565b606580546001600160a01b0319166001600160a01b0383169081179091556040519081527f2de35142b19ed5a07796cf30791959c592018f70b1d2d7c460eef8ffe713692b906020015b60405180910390a150565b3361068e6033546001600160a01b031690565b6001600160a01b031614806106ab5750336001600160a01b038216145b6106f75760405162461bcd60e51b815260206004820152601c60248201527f6f6e6c79206f776e6572206f7220746f6b656e2063616e2063616c6c00000000604482015260640161028f565b6065546001600160a01b038281169116146107545760405162461bcd60e51b815260206004820152601760248201527f5468697320746f6b656e206973206e6f7420626f756e64000000000000000000604482015260640161028f565b6001600160a01b03811661077a5760405162461bcd60e51b815260040161028f90611441565b606580546001600160a01b03191690556040516001600160a01b03821681527f28a4ca7134a3b3f9aff286e79ad3daadb4a06d1b43d037a3a98bdc074edd9b7a90602001610670565b6065546001600160a01b031633146107ed5760405162461bcd60e51b815260040161028f9061149a565b6001600160a01b0382166108135760405162461bcd60e51b815260040161028f90611441565b600081116108635760405162461bcd60e51b815260206004820181905260248201527f696e76616c696420617267756d656e74202d206e6f2076616c7565206d696e74604482015260640161028f565b60665460005b81811015610906576066818154811061088457610884611504565b60009182526020909120015460405163f104a8c960e01b81526001600160a01b038681166004830152602482018690529091169063f104a8c990604401600060405180830381600087803b1580156108db57600080fd5b505af11580156108ef573d6000803e3d6000fd5b5050505080806108fe90611530565b915050610869565b50505050565b6109146111b7565b61091e6000611211565b565b6065546001600160a01b0316331461094a5760405162461bcd60e51b815260040161028f9061149a565b6001600160a01b0383161580159061096a57506001600160a01b03821615155b6109865760405162461bcd60e51b815260040161028f90611441565b600081116109e25760405162461bcd60e51b8152602060048201526024808201527f696e76616c696420617267756d656e74202d206e6f2076616c7565207472616e60448201526339b332b960e11b606482015260840161028f565b60665460005b81811015610a8d5760668181548110610a0357610a03611504565b600091825260209091200154604051630b2df87b60e21b81526001600160a01b03878116600483015286811660248301526044820186905290911690632cb7e1ec90606401600060405180830381600087803b158015610a6257600080fd5b505af1158015610a76573d6000803e3d6000fd5b505050508080610a8590611530565b9150506109e8565b5050505050565b6065546001600160a01b03163314610abe5760405162461bcd60e51b815260040161028f9061149a565b6001600160a01b038216610ae45760405162461bcd60e51b815260040161028f90611441565b60008111610b345760405162461bcd60e51b815260206004820181905260248201527f696e76616c696420617267756d656e74202d206e6f2076616c7565206275726e604482015260640161028f565b60665460005b818110156109065760668181548110610b5557610b55611504565b600091825260209091200154604051631b9248d160e11b81526001600160a01b038681166004830152602482018690529091169063372491a290604401600060405180830381600087803b158015610bac57600080fd5b505af1158015610bc0573d6000803e3d6000fd5b505050508080610bcf90611530565b915050610b3a565b610bdf6111b7565b6001600160a01b038116610c055760405162461bcd60e51b815260040161028f90611441565b6001600160a01b03811660009081526067602052604090205460ff16610c605760405162461bcd60e51b815260206004820152601060248201526f1b5bd91d5b19481b9bdd08189bdd5b9960821b604482015260640161028f565b60665460005b81811015610e0a57826001600160a01b031660668281548110610c8b57610c8b611504565b6000918252602090912001546001600160a01b031603610df857604051630694a5fb60e01b81523060048201526001600160a01b03841690630694a5fb90602401600060405180830381600087803b158015610ce657600080fd5b505af1158015610cfa573d6000803e3d6000fd5b505050506066600183610d0d9190611549565b81548110610d1d57610d1d611504565b600091825260209091200154606680546001600160a01b039092169183908110610d4957610d49611504565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506066805480610d8857610d8861155c565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b03851680835260679091526040808320805460ff191690555190917f0a1ee69f55c33d8467c69ca59ce2007a737a88603d75392972520bf67cb513b891a2505050565b80610e0281611530565b915050610c66565b505050565b60606066805480602002602001604051908101604052809291908181526020018280548015610e6757602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610e49575b5050505050905090565b600054610100900460ff1615808015610e915750600054600160ff909116105b80610eab5750303b158015610eab575060005460ff166001145b610f0e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161028f565b6000805460ff191660011790558015610f31576000805461ff0019166101001790555b610f39611263565b8015610f7b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602001610670565b50565b606654600090815b8181101561104d5760668181548110610fa157610fa1611504565b600091825260209091200154604051624edf3960e21b81526001600160a01b0388811660048301528781166024830152604482018790523060648301529091169063013b7ce490608401602060405180830381865afa158015611008573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061102c9190611478565b61103b57600092505050611054565b8061104581611530565b915050610f86565b5060019150505b9392505050565b6110636111b7565b6001600160a01b03811660009081526067602052604090205460ff166110cb5760405162461bcd60e51b815260206004820152601960248201527f63616c6c206f6e6c79206f6e20626f756e64206d6f64756c6500000000000000604482015260640161028f565b6040518284823760008084836000865af16110ea573d6000803e3d6000fd5b50806001600160a01b03167f20d79de70adcc6e9353d8a9a5646b46dc352710d0a310b1ad1f67faeca7ef8916111208585611292565b6040516001600160e01b0319909116815260200160405180910390a2505050565b6111496111b7565b6001600160a01b0381166111ae5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161028f565b610f7b81611211565b6033546001600160a01b0316331461091e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028f565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1661128a5760405162461bcd60e51b815260040161028f90611572565b61091e6112a6565b6000600482106112a0575081355b92915050565b600054610100900460ff166112cd5760405162461bcd60e51b815260040161028f90611572565b61091e33611211565b80356001600160a01b03811681146112ed57600080fd5b919050565b60006020828403121561130457600080fd5b611054826112d6565b6000806040838503121561132057600080fd5b611329836112d6565b946020939093013593505050565b60008060006060848603121561134c57600080fd5b611355846112d6565b9250611363602085016112d6565b9150604084013590509250925092565b6020808252825182820181905260009190848201906040850190845b818110156113b45783516001600160a01b03168352928401929184019160010161138f565b50909695505050505050565b6000806000604084860312156113d557600080fd5b833567ffffffffffffffff808211156113ed57600080fd5b818601915086601f83011261140157600080fd5b81358181111561141057600080fd5b87602082850101111561142257600080fd5b60209283019550935061143891860190506112d6565b90509250925092565b6020808252601f908201527f696e76616c696420617267756d656e74202d207a65726f206164647265737300604082015260600190565b60006020828403121561148a57600080fd5b8151801515811461105457600080fd5b60208082526044908201527f6572726f72203a20746869732061646472657373206973206e6f74206120746f60408201527f6b656e20626f756e6420746f2074686520636f6d706c69616e636520636f6e746060820152631c9858dd60e21b608082015260a00190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016115425761154261151a565b5060010190565b818103818111156112a0576112a061151a565b634e487b7160e01b600052603160045260246000fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220af07cc50cfe3f6bb6afd1a9a92bf5b4d514e96369891e0b43b4305f3ee8abcc064736f6c63430008110033";

type ModularComplianceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ModularComplianceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ModularCompliance__factory extends ContractFactory {
  constructor(...args: ModularComplianceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ModularCompliance> {
    return super.deploy(overrides || {}) as Promise<ModularCompliance>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ModularCompliance {
    return super.attach(address) as ModularCompliance;
  }
  override connect(signer: Signer): ModularCompliance__factory {
    return super.connect(signer) as ModularCompliance__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ModularComplianceInterface {
    return new utils.Interface(_abi) as ModularComplianceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ModularCompliance {
    return new Contract(address, _abi, signerOrProvider) as ModularCompliance;
  }
}