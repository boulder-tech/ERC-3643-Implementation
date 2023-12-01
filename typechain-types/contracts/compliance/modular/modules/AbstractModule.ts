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

export interface AbstractModuleInterface extends utils.Interface {
  functions: {
    "bindCompliance(address)": FunctionFragment;
    "canComplianceBind(address)": FunctionFragment;
    "isComplianceBound(address)": FunctionFragment;
    "isPlugAndPlay()": FunctionFragment;
    "moduleBurnAction(address,uint256)": FunctionFragment;
    "moduleCheck(address,address,uint256,address)": FunctionFragment;
    "moduleMintAction(address,uint256)": FunctionFragment;
    "moduleTransferAction(address,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "unbindCompliance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bindCompliance"
      | "canComplianceBind"
      | "isComplianceBound"
      | "isPlugAndPlay"
      | "moduleBurnAction"
      | "moduleCheck"
      | "moduleMintAction"
      | "moduleTransferAction"
      | "name"
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
  decodeFunctionResult(
    functionFragment: "unbindCompliance",
    data: BytesLike
  ): Result;

  events: {
    "ComplianceBound(address)": EventFragment;
    "ComplianceUnbound(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ComplianceBound"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComplianceUnbound"): EventFragment;
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

export interface AbstractModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AbstractModuleInterface;

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

    unbindCompliance(
      _compliance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}