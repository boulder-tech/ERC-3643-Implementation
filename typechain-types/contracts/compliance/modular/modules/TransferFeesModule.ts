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

export declare namespace TransferFeesModule {
  export type FeeStruct = {
    rate: PromiseOrValue<BigNumberish>;
    collector: PromiseOrValue<string>;
  };

  export type FeeStructOutput = [BigNumber, string] & {
    rate: BigNumber;
    collector: string;
  };
}

export interface TransferFeesModuleInterface extends utils.Interface {
  functions: {
    "bindCompliance(address)": FunctionFragment;
    "canComplianceBind(address)": FunctionFragment;
    "getFee(address)": FunctionFragment;
    "isComplianceBound(address)": FunctionFragment;
    "isPlugAndPlay()": FunctionFragment;
    "moduleBurnAction(address,uint256)": FunctionFragment;
    "moduleCheck(address,address,uint256,address)": FunctionFragment;
    "moduleMintAction(address,uint256)": FunctionFragment;
    "moduleTransferAction(address,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setFee(uint256,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unbindCompliance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bindCompliance"
      | "canComplianceBind"
      | "getFee"
      | "isComplianceBound"
      | "isPlugAndPlay"
      | "moduleBurnAction"
      | "moduleCheck"
      | "moduleMintAction"
      | "moduleTransferAction"
      | "name"
      | "owner"
      | "renounceOwnership"
      | "setFee"
      | "transferOwnership"
      | "unbindCompliance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bindCompliance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "canComplianceBind",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFee",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isComplianceBound",
    values: [PromiseOrValue<string>]
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
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unbindCompliance",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "bindCompliance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canComplianceBind",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isComplianceBound",
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
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unbindCompliance",
    data: BytesLike
  ): Result;

  events: {
    "ComplianceBound(address)": EventFragment;
    "ComplianceUnbound(address)": EventFragment;
    "FeeUpdated(address,uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ComplianceBound"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComplianceUnbound"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

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

export interface FeeUpdatedEventObject {
  compliance: string;
  _rate: BigNumber;
  _collector: string;
}
export type FeeUpdatedEvent = TypedEvent<
  [string, BigNumber, string],
  FeeUpdatedEventObject
>;

export type FeeUpdatedEventFilter = TypedEventFilter<FeeUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TransferFeesModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TransferFeesModuleInterface;

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
    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    canComplianceBind(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getFee(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[TransferFeesModule.FeeStructOutput]>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<[boolean]>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moduleCheck(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
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

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      _rate: PromiseOrValue<BigNumberish>,
      _collector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  bindCompliance(
    _compliance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  canComplianceBind(
    _compliance: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getFee(
    _compliance: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<TransferFeesModule.FeeStructOutput>;

  isComplianceBound(
    _compliance: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isPlugAndPlay(overrides?: CallOverrides): Promise<boolean>;

  moduleBurnAction(
    _from: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moduleCheck(
    _from: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
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

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    _rate: PromiseOrValue<BigNumberish>,
    _collector: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unbindCompliance(
    _compliance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    canComplianceBind(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getFee(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<TransferFeesModule.FeeStructOutput>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<boolean>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleCheck(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
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

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setFee(
      _rate: PromiseOrValue<BigNumberish>,
      _collector: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
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

    "FeeUpdated(address,uint256,address)"(
      compliance?: PromiseOrValue<string> | null,
      _rate?: null,
      _collector?: null
    ): FeeUpdatedEventFilter;
    FeeUpdated(
      compliance?: PromiseOrValue<string> | null,
      _rate?: null,
      _collector?: null
    ): FeeUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    canComplianceBind(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFee(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<BigNumber>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moduleCheck(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
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

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      _rate: PromiseOrValue<BigNumberish>,
      _collector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    canComplianceBind(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFee(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isComplianceBound(
      _compliance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPlugAndPlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    moduleBurnAction(
      _from: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moduleCheck(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
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

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      _rate: PromiseOrValue<BigNumberish>,
      _collector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}