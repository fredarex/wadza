/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface ERC20 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ERC20;
  clone(): ERC20;
  methods: {
    name(): NonPayableTransactionObject<string>;

    approve(
      _spender: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    totalSupply(): NonPayableTransactionObject<string>;

    transferFrom(
      _from: string,
      _to: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    decimals(): NonPayableTransactionObject<string>;

    balanceOf(_owner: string): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    transfer(
      _to: string,
      _value: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    allowance(
      _owner: string,
      _spender: string
    ): NonPayableTransactionObject<string>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
