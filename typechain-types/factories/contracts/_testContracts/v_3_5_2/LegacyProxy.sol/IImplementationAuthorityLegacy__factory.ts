/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IImplementationAuthorityLegacy,
  IImplementationAuthorityLegacyInterface,
} from "../../../../../contracts/_testContracts/v_3_5_2/LegacyProxy.sol/IImplementationAuthorityLegacy";

const _abi = [
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
] as const;

export class IImplementationAuthorityLegacy__factory {
  static readonly abi = _abi;
  static createInterface(): IImplementationAuthorityLegacyInterface {
    return new utils.Interface(_abi) as IImplementationAuthorityLegacyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IImplementationAuthorityLegacy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IImplementationAuthorityLegacy;
  }
}