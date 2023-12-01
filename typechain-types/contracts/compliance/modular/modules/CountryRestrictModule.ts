/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface CountryRestrictModuleInterface extends utils.Interface {
  functions: {
    "addCountryRestriction(uint16)": FunctionFragment;
    "batchRestrictCountries(uint16[])": FunctionFragment;
    "batchUnrestrictCountries(uint16[])": FunctionFragment;
    "bindCompliance(address)": FunctionFragment;
    "canComplianceBind(address)": FunctionFragment;
    "isComplianceBound(address)": FunctionFragment;
    "isCountryRestricted(address,uint16)": FunctionFragment;
    "isPlugAndPlay()": FunctionFragment;
    "moduleBurnAction(address,uint256)": FunctionFragment;
    "moduleCheck(address,address,uint256,address)": FunctionFragment;
    "moduleMintAction(address,uint256)": FunctionFragment;
    "moduleTransferAction(address,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "removeCountryRestriction(uint16)": FunctionFragment;
    "unbindCompliance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addCountryRestriction"
      | "batchRestrictCountries"
      | "batchUnrestrictCountries"
      | "bindCompliance"
      | "canComplianceBind"
      | "isComplianceBound"
      | "isCountryRestricted"
      | "isPlugAndPlay"
      | "moduleBurnAction"
      | "moduleCheck"
      | "moduleMintAction"
      | "moduleTransferAction"
      | "name"
      | "removeCountryRestriction"
      | "unbindCompliance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addCountryRestriction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "batchRestrictCountries",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchUnrestrictCountries",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "bindCompliance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "canComplianceBind",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isComplianceBound",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isCountryRestricted",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isPlugAndPlay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "moduleBurnAction",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "moduleCheck",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "moduleMintAction",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "moduleTransferAction",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeCountryRestriction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "unbindCompliance",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addCountryRestriction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchRestrictCountries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchUnrestrictCountries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bindCompliance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canComplianceBind",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isComplianceBound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isCountryRestricted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPlugAndPlay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moduleBurnAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moduleCheck",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moduleMintAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moduleTransferAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeCountryRestriction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unbindCompliance",
    data: BytesLike
  ): Result;

  events: {
    "AddedRestrictedCountry(address,uint16)": EventFragment;
    "ComplianceBound(address)": EventFragment;
    "ComplianceUnbound(address)": EventFragment;
    "RemovedRestrictedCountry(address,uint16)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddedRestrictedCountry"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComplianceBound"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComplianceUnbound"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemovedRestrictedCountry"): EventFragment;
}

export interface AddedRestrictedCountryEventObject {
  _compliance: string;
  _country: number;
}
export type AddedRestrictedCountryEvent = TypedEvent<
  [string, number],
  AddedRestrictedCountryEventObject
>;

export type AddedRestrictedCountryEventFilter =
  TypedEventFilter<AddedRestrictedCountryEvent>;

export interface ComplianceBoundEventObject {
  _compliance: string;
}
export type ComplianceBoundEvent = TypedEvent<
  [string],
  ComplianceBoundEventObject
>;

export type ComplianceBoundEventFilter = TypedEventFilter<ComplianceBoundEvent>;

export interface ComplianceUnboundEventObject {
  _compliance: string;
}
export type ComplianceUnboundEvent = TypedEvent<
  [string],
  ComplianceUnboundEventObject
>;

export type ComplianceUnboundEventFilter =
  TypedEventFilter<ComplianceUnboundEvent>;

export interface RemovedRestrictedCountryEventObject {
  _compliance: string;
  _country: number;
}
export type RemovedRestrictedCountryEvent = TypedEvent<
  [string, number],
  RemovedRestrictedCountryEventObject
>;

export type RemovedRestrictedCountryEventFilter =
  TypedEventFilter<RemovedRestrictedCountryEvent>;

export interface CountryRestrictModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CountryRestrictModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchRestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchUnrestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    canComplianceBind(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isCountryRestricted(
      _compliance: PromiseOrValue<string>,
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<[boolean]>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moduleCheck(
      arg0: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    moduleMintAction(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moduleTransferAction(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string] & { _name: string }>;

    removeCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addCountryRestriction(
    _country: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchRestrictCountries(
    _countries: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchUnrestrictCountries(
    _countries: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bindCompliance(
    _compliance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  canComplianceBind(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isComplianceBound(
    _compliance: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isCountryRestricted(
    _compliance: PromiseOrValue<string>,
    _country: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isPlugAndPlay(overrides?: CallOverrides): Promise<boolean>;

  moduleBurnAction(
    _from: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moduleCheck(
    arg0: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    _compliance: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  moduleMintAction(
    _to: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moduleTransferAction(
    _from: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  removeCountryRestriction(
    _country: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unbindCompliance(
    _compliance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    batchRestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchUnrestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    canComplianceBind(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isCountryRestricted(
      _compliance: PromiseOrValue<string>,
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<boolean>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleCheck(
      arg0: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    moduleMintAction(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleTransferAction(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    removeCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AddedRestrictedCountry(address,uint16)"(
      _compliance?: PromiseOrValue<string> | null,
      _country?: null
    ): AddedRestrictedCountryEventFilter;
    AddedRestrictedCountry(
      _compliance?: PromiseOrValue<string> | null,
      _country?: null
    ): AddedRestrictedCountryEventFilter;

    "ComplianceBound(address)"(
      _compliance?: PromiseOrValue<string> | null
    ): ComplianceBoundEventFilter;
    ComplianceBound(
      _compliance?: PromiseOrValue<string> | null
    ): ComplianceBoundEventFilter;

    "ComplianceUnbound(address)"(
      _compliance?: PromiseOrValue<string> | null
    ): ComplianceUnboundEventFilter;
    ComplianceUnbound(
      _compliance?: PromiseOrValue<string> | null
    ): ComplianceUnboundEventFilter;

    "RemovedRestrictedCountry(address,uint16)"(
      _compliance?: PromiseOrValue<string> | null,
      _country?: null
    ): RemovedRestrictedCountryEventFilter;
    RemovedRestrictedCountry(
      _compliance?: PromiseOrValue<string> | null,
      _country?: null
    ): RemovedRestrictedCountryEventFilter;
  };

  estimateGas: {
    addCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchRestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchUnrestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    canComplianceBind(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isCountryRestricted(
      _compliance: PromiseOrValue<string>,
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<BigNumber>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moduleCheck(
      arg0: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleMintAction(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moduleTransferAction(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    removeCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchRestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchUnrestrictCountries(
      _countries: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    canComplianceBind(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isCountryRestricted(
      _compliance: PromiseOrValue<string>,
      _country: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moduleCheck(
      arg0: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moduleMintAction(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moduleTransferAction(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeCountryRestriction(
      _country: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}