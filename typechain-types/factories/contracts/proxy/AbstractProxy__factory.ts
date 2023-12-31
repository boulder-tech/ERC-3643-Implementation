/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  AbstractProxy,
  AbstractProxyInterface,
} from "../../../contracts/proxy/AbstractProxy";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_implementationAuthority",
        type: "address",
      },
    ],
    name: "ImplementationAuthoritySet",
    type: "event",
  },
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
    inputs: [],
    name: "getImplementationAuthority",
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
        name: "_newImplementationAuthority",
        type: "address",
      },
    ],
    name: "setImplementationAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class AbstractProxy__factory {
  static readonly abi = _abi;
  static createInterface(): AbstractProxyInterface {
    return new utils.Interface(_abi) as AbstractProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AbstractProxy {
    return new Contract(address, _abi, signerOrProvider) as AbstractProxy;
  }
}
