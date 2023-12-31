/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  TimeTransfersLimitsModule,
  TimeTransfersLimitsModuleInterface,
} from "../../../../../contracts/compliance/modular/modules/TimeTransfersLimitsModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "compliance",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "arraySize",
        type: "uint256",
      },
    ],
    name: "LimitsArraySizeExceeded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "ComplianceBound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "ComplianceUnbound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "compliance",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "limitTime",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "limitValue",
        type: "uint256",
      },
    ],
    name: "TimeTransferLimitUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "bindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "canComplianceBind",
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
        name: "_compliance",
        type: "address",
      },
    ],
    name: "getTimeTransferLimits",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "limitTime",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "limitValue",
            type: "uint256",
          },
        ],
        internalType: "struct TimeTransfersLimitsModule.Limit[]",
        name: "limits",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "isComplianceBound",
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
    name: "isPlugAndPlay",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "limitValues",
    outputs: [
      {
        internalType: "bool",
        name: "attributedLimit",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "limitIndex",
        type: "uint8",
      },
    ],
    stateMutability: "view",
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
    name: "moduleBurnAction",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "moduleCheck",
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
    name: "moduleMintAction",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "moduleTransferAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "limitTime",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "limitValue",
            type: "uint256",
          },
        ],
        internalType: "struct TimeTransfersLimitsModule.Limit",
        name: "_limit",
        type: "tuple",
      },
    ],
    name: "setTimeTransferLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transferLimits",
    outputs: [
      {
        internalType: "uint32",
        name: "limitTime",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "limitValue",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_compliance",
        type: "address",
      },
    ],
    name: "unbindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "usersCounters",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timer",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611248806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063388ebb1511610097578063bcc2105311610066578063bcc21053146102c7578063d09b3be0146102db578063e6f5e807146102ee578063f104a8c91461022657600080fd5b8063388ebb15146102395780634a932544146102595780634cf4d2951461026c57806353ccd57d1461029857600080fd5b8063189fa403116100d3578063189fa403146101765780632cb7e1ec146101c35780632f6bbc5d146101d6578063372491a21461022657600080fd5b8063013b7ce4146100fa5780630694a5fb1461012257806306fdde0314610137575b600080fd5b61010d610108366004610e84565b6102f5565b60405190151581526020015b60405180910390f35b610135610130366004610ed7565b6104ea565b005b604080518082018252601981527f54696d655472616e73666572734c696d6974734d6f64756c6500000000000000602082015290516101199190610efb565b6101ae610184366004610f5b565b60036020908152600093845260408085208252928452828420905282529020805460019091015482565b60408051928352602083019190915201610119565b6101356101d1366004610fa6565b6105e9565b61020d6101e4366004610fe7565b600160209081526000928352604080842090915290825290205460ff8082169161010090041682565b60408051921515835260ff909116602083015201610119565b610135610234366004611020565b610628565b61024c610247366004610ed7565b61065b565b604051610119919061104c565b610135610267366004610ed7565b6106e3565b61010d61027a366004610ed7565b6001600160a01b031660009081526020819052604090205460ff1690565b6102ab6102a6366004611020565b610816565b6040805163ffffffff9093168352602083019190915201610119565b61010d6102d5366004610ed7565b50600190565b6101356102e93660046110a1565b610859565b600161010d565b60006001600160a01b03851661030d575060016104e2565b6103178286610a9f565b15610324575060016104e2565b60006103308387610b78565b905060005b6001600160a01b0384166000908152600260205260409020548110156104db576001600160a01b038416600090815260026020526040902080548290811061037f5761037f6110b9565b9060005260206000209060020201600101548511156103a3576000925050506104e2565b6103fa848360026000886001600160a01b03166001600160a01b0316815260200190815260200160002084815481106103de576103de6110b9565b600091825260209091206002909102015463ffffffff16610ca9565b1580156104b957506001600160a01b038416600090815260026020526040902080548290811061042c5761042c6110b9565b60009182526020808320600292830201600101546001600160a01b038881168086526003845260408087209289168752918452818620908652939092529083208054919389939290919086908110610486576104866110b9565b6000918252602080832060029092029091015463ffffffff1683528201929092526040019020546104b791906110e5565b115b156104c9576000925050506104e2565b806104d3816110f8565b915050610335565b5060019150505b949350505050565b3360009081526020819052604090205460ff166105225760405162461bcd60e51b815260040161051990611111565b60405180910390fd5b6001600160a01b0381166105785760405162461bcd60e51b815260206004820152601f60248201527f696e76616c696420617267756d656e74202d207a65726f2061646472657373006044820152606401610519565b336001600160a01b038216146105a05760405162461bcd60e51b815260040161051990611148565b6001600160a01b038116600081815260208190526040808220805460ff19169055517f408b49d9be1c914c52a0227e18a077e5a892dddf32a26cfa94a5d9708fad77189190a250565b3360009081526020819052604090205460ff166106185760405162461bcd60e51b815260040161051990611111565b610623338483610ce9565b505050565b3360009081526020819052604090205460ff166106575760405162461bcd60e51b815260040161051990611111565b5050565b6001600160a01b0381166000908152600260209081526040808320805482518185028101850190935280835260609492939192909184015b828210156106d85760008481526020908190206040805180820190915260028502909101805463ffffffff168252600190810154828401529083529092019101610693565b505050509050919050565b6001600160a01b0381166107395760405162461bcd60e51b815260206004820152601f60248201527f696e76616c696420617267756d656e74202d207a65726f2061646472657373006044820152606401610519565b6001600160a01b03811660009081526020819052604090205460ff16156107a25760405162461bcd60e51b815260206004820152601860248201527f636f6d706c69616e636520616c726561647920626f756e6400000000000000006044820152606401610519565b336001600160a01b038216146107ca5760405162461bcd60e51b815260040161051990611148565b6001600160a01b038116600081815260208190526040808220805460ff19166001179055517f1f7b76c58fb697eb53c6c7c1becb96911516a136e24d7ced386b2355358b75a39190a250565b6002602052816000526040600020818154811061083257600080fd5b60009182526020909120600290910201805460019091015463ffffffff9091169250905082565b3360009081526020819052604090205460ff166108885760405162461bcd60e51b815260040161051990611111565b33600090815260016020908152604082209082906108a890850185611189565b63ffffffff16815260208082019290925260409081016000908120543382526002909352205460ff9091169150811580156108e7575060048160ff1610155b15610910576040516382f520a960e01b815233600482015260ff82166024820152604401610519565b81158015610921575060048160ff16105b156109d05733600090815260026020818152604083208054600181018255908452922085929091020161095482826111a6565b5050604080518082018252600180825260ff8416602080840191909152336000908152918152928120919261098b90870187611189565b63ffffffff16815260208082019290925260400160002082518154939092015160ff166101000261ff00199215159290921661ffff1990931692909217179055610a4a565b33600090815260026020908152604080832060018352908320869391929091906109fc90850185611189565b63ffffffff168152602081019190915260400160002054815461010090910460ff16908110610a2d57610a2d6110b9565b90600052602060002090600202018181610a4791906111a6565b50505b337f172f792abfbfd784dac801573197a4dc27fe914e9bb2756ff598a68a359c29c2610a796020860186611189565b6040805163ffffffff9092168252602080880135908301520160405180910390a2505050565b6000826001600160a01b0316636a3edf286040518163ffffffff1660e01b8152600401602060405180830381865afa158015610adf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0391906111d3565b6040516307feec1960e21b81526001600160a01b0384811660048301529190911690631ffbb06490602401602060405180830381865afa158015610b4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6f91906111f0565b90505b92915050565b6000826001600160a01b0316636a3edf286040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bdc91906111d3565b6001600160a01b031663134e18f46040518163ffffffff1660e01b8152600401602060405180830381865afa158015610c19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3d91906111d3565b604051633c3ad79560e21b81526001600160a01b038481166004830152919091169063f0eb5e5490602401602060405180830381865afa158015610c85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6f91906111d3565b6001600160a01b03928316600090815260036020908152604080832094909516825292835283812063ffffffff9290921681529152206001015442101590565b6000610cf58484610b78565b905060005b6001600160a01b038516600090815260026020526040902054811015610e0657610d71858360026000896001600160a01b03166001600160a01b031681526020019081526020016000208481548110610d5557610d556110b9565b600091825260209091206002909102015463ffffffff16610e0d565b6001600160a01b03808616600081815260036020908152604080832094871683529381528382209282526002905291822080548693919085908110610db857610db86110b9565b6000918252602080832060029092029091015463ffffffff16835282019290925260400181208054909190610dee9084906110e5565b90915550819050610dfe816110f8565b915050610cfa565b5050505050565b610e18838383610ca9565b15610623576001600160a01b038084166000908152600360209081526040808320938616835292815282822063ffffffff8516808452915291902090610e5e90426110e5565b600182015560009055505050565b6001600160a01b0381168114610e8157600080fd5b50565b60008060008060808587031215610e9a57600080fd5b8435610ea581610e6c565b93506020850135610eb581610e6c565b9250604085013591506060850135610ecc81610e6c565b939692955090935050565b600060208284031215610ee957600080fd5b8135610ef481610e6c565b9392505050565b600060208083528351808285015260005b81811015610f2857858101830151858201604001528201610f0c565b506000604082860101526040601f19601f8301168501019250505092915050565b63ffffffff81168114610e8157600080fd5b600080600060608486031215610f7057600080fd5b8335610f7b81610e6c565b92506020840135610f8b81610e6c565b91506040840135610f9b81610f49565b809150509250925092565b600080600060608486031215610fbb57600080fd5b8335610fc681610e6c565b92506020840135610fd681610e6c565b929592945050506040919091013590565b60008060408385031215610ffa57600080fd5b823561100581610e6c565b9150602083013561101581610f49565b809150509250929050565b6000806040838503121561103357600080fd5b823561103e81610e6c565b946020939093013593505050565b602080825282518282018190526000919060409081850190868401855b82811015611094578151805163ffffffff168552860151868501529284019290850190600101611069565b5091979650505050505050565b6000604082840312156110b357600080fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b80820180821115610b7257610b726110cf565b60006001820161110a5761110a6110cf565b5060010190565b6020808252601e908201527f6f6e6c7920626f756e6420636f6d706c69616e63652063616e2063616c6c0000604082015260600190565b60208082526021908201527f6f6e6c7920636f6d706c69616e636520636f6e74726163742063616e2063616c6040820152601b60fa1b606082015260800190565b60006020828403121561119b57600080fd5b8135610ef481610f49565b81356111b181610f49565b63ffffffff811663ffffffff1983541617825550602082013560018201555050565b6000602082840312156111e557600080fd5b8151610ef481610e6c565b60006020828403121561120257600080fd5b81518015158114610ef457600080fdfea264697066735822122009906bbbac4f0a82e776a6a21131f63535d84d89e4199dc0da77569221061f7164736f6c63430008110033";

type TimeTransfersLimitsModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TimeTransfersLimitsModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TimeTransfersLimitsModule__factory extends ContractFactory {
  constructor(...args: TimeTransfersLimitsModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TimeTransfersLimitsModule> {
    return super.deploy(overrides || {}) as Promise<TimeTransfersLimitsModule>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TimeTransfersLimitsModule {
    return super.attach(address) as TimeTransfersLimitsModule;
  }
  override connect(signer: Signer): TimeTransfersLimitsModule__factory {
    return super.connect(signer) as TimeTransfersLimitsModule__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimeTransfersLimitsModuleInterface {
    return new utils.Interface(_abi) as TimeTransfersLimitsModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TimeTransfersLimitsModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TimeTransfersLimitsModule;
  }
}
