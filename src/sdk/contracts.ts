/*
 * Copyright (c) 2020 The Paypr Company, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * Paypr Contracts SDK and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Sdk } from '../generated/graphql';
import { getConsumableAmountsNeededToMintItem, getItemDetails } from '../graphql/artifacts';
import { ConsumableAmountAndBalanceReference } from '../graphql/consumableAmount';
import {
  ContractDetails,
  getContractConsumableBalance,
  getContractPayprBalance,
  loadContract,
} from '../graphql/contracts';
import { estimateMintConsumableForContract } from '../graphql/estimates/mintConsumableForContract';
import {
  estimateTransferConsumableFromContract,
  TransferConsumableFromContractEstimateDetails,
} from '../graphql/estimates/transferConsumableFromContract';
import { estimateTransferConsumableToContract } from '../graphql/estimates/transferConsumableToContract';
import {
  estimateTransferPayprFromContract,
  TransferPayprFromContractEstimateDetails,
} from '../graphql/estimates/transferPayprFromContract';
import { estimateTransferPayprToContract } from '../graphql/estimates/transferPayprToContract';
import { GasAndPayprEstimateDetails, GasAndTransactionEstimateDetails } from '../graphql/gasEstimate';
import { ItemDetails } from '../graphql/items';
import { executeTransaction, ExecuteTransactionOptions } from '../graphql/mutations/executeTransaction';

export interface ContractSdk {
  /**
   * Loads contract details by ID
   * @param contractId the contract ID
   *
   * @returns a promise to the contract details
   */
  loadContract: (contractId: string) => Promise<ContractDetails>;

  /**
   * Gets the item details for the given item ID
   * @param artifactContractId the artifact contract ID
   * @param itemId the item ID
   *
   * @returns a promise to the item details, if found
   */
  getItemDetails: (artifactContractId: string, itemId: string) => Promise<ItemDetails | null>;

  /**
   * Gets the consumable amounts, and available balances, needed to mint an item of the given artifact
   * @param artifactContractId The artifact contract ID
   *
   * @returns a promise to a list of consumable amounts and balances
   */
  getConsumableAmountsNeededToMintItem: (
    artifactContractId: string,
  ) => Promise<readonly ConsumableAmountAndBalanceReference[]>;

  /**
   * Gets the contract's consumable balance, if it's a consumable holder
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   *
   * @returns a promise to the balance
   */
  getConsumableBalance: (contractId: string, consumableContractId: string) => Promise<number>;

  /**
   * Gets the contract's Paypr balance
   *
   * @param contractId the contract ID
   *
   * @returns a promise to the balance
   */
  getPayprBalance: (contractId: string) => Promise<number>;

  /**
   * Estimate how much it would cost to mint the given amount of consumable for the contract
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to mint
   *
   * @returns a promise to the estimate details
   */
  estimateMintConsumable: (
    contractId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<GasAndPayprEstimateDetails>;

  /**
   * Estimate how much it would cost to transfer the given amount of consumable to the contract
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferConsumableToContract: (
    contractId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<GasAndTransactionEstimateDetails>;

  /**
   * Estimate to transfer the given amount of consumable from the contract.
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to the estimate
   */
  estimateTransferConsumableFromContract: (
    contractId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<TransferConsumableFromContractEstimateDetails>;

  /**
   * Estimate how much it would cost to transfer the given amount of Paypr to the contract
   *
   * @param contractId the contract ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferPayprToContract: (contractId: string, amount: number) => Promise<GasAndTransactionEstimateDetails>;

  /**
   * Estimate to transfer the given amount of Paypr from the contract.
   *
   * @param contractId the contract ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate
   */
  estimateTransferPayprFromContract: (
    contractId: string,
    amount: number,
  ) => Promise<TransferPayprFromContractEstimateDetails>;

  /**
   * Executes a transaction on a contract
   *
   * @param options either a transaction request or a signed transaction
   *
   * @returns a promise to a submission id
   */
  executeTransaction: (options: ExecuteTransactionOptions) => Promise<string>;
}

export const getContractsSdk = (sdk: Sdk): ContractSdk => ({
  loadContract: (contractId) => loadContract(sdk, contractId),

  getItemDetails: (artifactContractId: string, itemId: string) => getItemDetails(sdk, artifactContractId, itemId),

  getConsumableAmountsNeededToMintItem: (artifactContractId) =>
    getConsumableAmountsNeededToMintItem(sdk, artifactContractId),

  getConsumableBalance: (contractId, consumableContractId) =>
    getContractConsumableBalance(sdk, contractId, consumableContractId),

  getPayprBalance: (contractId) => getContractPayprBalance(sdk, contractId),

  estimateMintConsumable: (contractId, consumableContractId, amount) =>
    estimateMintConsumableForContract(sdk, contractId, consumableContractId, amount),

  estimateTransferConsumableToContract: (contractId, consumableContractId, amount) =>
    estimateTransferConsumableToContract(sdk, contractId, consumableContractId, amount),

  estimateTransferConsumableFromContract: (contractId, consumableContractId, amount) =>
    estimateTransferConsumableFromContract(sdk, contractId, consumableContractId, amount),

  estimateTransferPayprToContract: (contractId, amount) => estimateTransferPayprToContract(sdk, contractId, amount),

  estimateTransferPayprFromContract: (contractId, amount) => estimateTransferPayprFromContract(sdk, contractId, amount),

  executeTransaction: (options) => executeTransaction(sdk, options),
});
