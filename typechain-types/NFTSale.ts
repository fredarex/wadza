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

export type ListingAdded = ContractEventLog<{
  _tokenAddress: string;
  _tokenId: string;
  _seller: string;
  _owner: string;
  _payToken: string;
  _price: string;
  _timestamp: string;
  _startingDate: string;
  _endingDate: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
}>;
export type ListingCancelled = ContractEventLog<{
  _tokenAddress: string;
  _tokenId: string;
  _seller: string;
  _timestamp: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type ListingPriceUpdated = ContractEventLog<{
  _tokenAddress: string;
  _tokenId: string;
  _seller: string;
  _price: string;
  _timestamp: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type OfferMade = ContractEventLog<{
  buyer: string;
  nftAddress: string;
  nftId: string;
  price: string;
  timestamp: string;
  expiryTime: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Sold = ContractEventLog<{
  _tokenAddress: string;
  _tokenId: string;
  _seller: string;
  _buyer: string;
  _price: string;
  _timestamp: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}>;

export interface NFTSale extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): NFTSale;
  clone(): NFTSale;
  methods: {
    acceptOffer(
      _offerSender: string,
      _amount: number | string | BN,
      _nftAddress: string,
      _nftId: number | string | BN,
      _timestamp: number | string | BN,
      _expiryTime: number | string | BN,
      _sigR: string | number[],
      _sigS: string | number[],
      _sigV: number | string | BN,
      _creatorAddresses: string[],
      _creatorFeePercentages: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    addAllowedCurrency(_currency: string): NonPayableTransactionObject<void>;

    allowedCurrencies(): NonPayableTransactionObject<string[]>;

    batchListingNFT(
      _nftIds: (number | string | BN)[],
      _nftAddresses: string[],
      _currencies: string[],
      _startingDates: (number | string | BN)[],
      _endingDates: (number | string | BN)[],
      _prices: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    cancelListing(
      _nftAddress: string,
      _nftId: number | string | BN
    ): NonPayableTransactionObject<void>;

    cancelOffer(
      _offerSender: string,
      _amount: number | string | BN,
      _nftAddress: string,
      _nftId: number | string | BN,
      _timestamp: number | string | BN,
      _expiryTime: number | string | BN,
      _sigR: string | number[],
      _sigS: string | number[],
      _sigV: number | string | BN
    ): NonPayableTransactionObject<void>;

    getChainId(): NonPayableTransactionObject<string>;

    getDomainSeperator(): NonPayableTransactionObject<string>;

    getListing(
      _nftAddress: string,
      _nftId: number | string | BN
    ): NonPayableTransactionObject<
      [string, string, string, string, string, boolean]
    >;

    isTrustedForwarder(forwarder: string): NonPayableTransactionObject<boolean>;

    listingNFT(
      _nftId: number | string | BN,
      _nftAddress: string,
      _currency: string,
      _startingDate: number | string | BN,
      _endingDate: number | string | BN,
      _price: number | string | BN
    ): NonPayableTransactionObject<void>;

    listings(arg0: string | number[]): NonPayableTransactionObject<{
      price: string;
      seller: string;
      currency: string;
      startingDate: string;
      endingDate: string;
      isActive: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: boolean;
    }>;

    makeOffer(
      _offerSender: string,
      _amount: number | string | BN,
      _nftAddress: string,
      _nftId: number | string | BN,
      _timestamp: number | string | BN,
      _expiryTime: number | string | BN
    ): NonPayableTransactionObject<void>;

    multiPurchaseNFT(
      _nftsData: (string | number[])[]
    ): PayableTransactionObject<void>;

    offers(arg0: string | number[]): NonPayableTransactionObject<{
      buyer: string;
      nftAddress: string;
      nftId: string;
      price: string;
      timestamp: string;
      expiryTime: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    }>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: number | string | BN,
      arg3: string | number[]
    ): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    purchaseNFT(
      _nftAddress: string,
      _nftId: number | string | BN,
      _seller: string,
      _price: number | string | BN,
      _currency: string,
      _creatorAddresses: string[],
      _creatorFeePercentages: (number | string | BN)[]
    ): PayableTransactionObject<void>;

    removeAllowedCurrency(_currency: string): NonPayableTransactionObject<void>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    setTreasuryAddress(
      _treasuryAddress: string
    ): NonPayableTransactionObject<void>;

    setTreasuryPercentage(
      _currency: string,
      _percentage: number | string | BN
    ): NonPayableTransactionObject<void>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    treasuryAddress(): NonPayableTransactionObject<string>;

    treasuryPercentage(arg0: string): NonPayableTransactionObject<string>;

    trustedForwarder(): NonPayableTransactionObject<string>;

    updateListingPrice(
      _nftAddress: string,
      _nftId: number | string | BN,
      _price: number | string | BN
    ): NonPayableTransactionObject<void>;
  };
  events: {
    ListingAdded(cb?: Callback<ListingAdded>): EventEmitter;
    ListingAdded(
      options?: EventOptions,
      cb?: Callback<ListingAdded>
    ): EventEmitter;

    ListingCancelled(cb?: Callback<ListingCancelled>): EventEmitter;
    ListingCancelled(
      options?: EventOptions,
      cb?: Callback<ListingCancelled>
    ): EventEmitter;

    ListingPriceUpdated(cb?: Callback<ListingPriceUpdated>): EventEmitter;
    ListingPriceUpdated(
      options?: EventOptions,
      cb?: Callback<ListingPriceUpdated>
    ): EventEmitter;

    OfferMade(cb?: Callback<OfferMade>): EventEmitter;
    OfferMade(options?: EventOptions, cb?: Callback<OfferMade>): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Sold(cb?: Callback<Sold>): EventEmitter;
    Sold(options?: EventOptions, cb?: Callback<Sold>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "ListingAdded", cb: Callback<ListingAdded>): void;
  once(
    event: "ListingAdded",
    options: EventOptions,
    cb: Callback<ListingAdded>
  ): void;

  once(event: "ListingCancelled", cb: Callback<ListingCancelled>): void;
  once(
    event: "ListingCancelled",
    options: EventOptions,
    cb: Callback<ListingCancelled>
  ): void;

  once(event: "ListingPriceUpdated", cb: Callback<ListingPriceUpdated>): void;
  once(
    event: "ListingPriceUpdated",
    options: EventOptions,
    cb: Callback<ListingPriceUpdated>
  ): void;

  once(event: "OfferMade", cb: Callback<OfferMade>): void;
  once(
    event: "OfferMade",
    options: EventOptions,
    cb: Callback<OfferMade>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Sold", cb: Callback<Sold>): void;
  once(event: "Sold", options: EventOptions, cb: Callback<Sold>): void;
}
