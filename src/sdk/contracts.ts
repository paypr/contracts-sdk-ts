import { Sdk } from '../generated/graphql';
import { getConsumableAmountsNeededToMintItem } from '../graphql/artifacts';
import { ConsumableAmountAndBalanceReference } from '../graphql/consumableAmount';
import { ContractDetails, getContractConsumableBalance, loadContract } from '../graphql/contracts';
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
import { GasAndPayprEstimateDetails, GasEstimateDetails } from '../graphql/gasEstimate';
import { transferConsumableFromContract } from '../graphql/mutations/transferConsumableFromContract';
import { transferConsumableToContract } from '../graphql/mutations/transferConsumableToContract';
import { transferPayprFromContract } from '../graphql/mutations/transferPayprFromContract';
import { transferPayprToContract } from '../graphql/mutations/transferPayprToContract';

export interface ContractSdk {
  /**
   * Loads contract details by ID
   * @param contractId the contract ID
   *
   * @returns a promise to the contract details
   */
  loadContract: (contractId: string) => Promise<ContractDetails>;

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
  ) => Promise<GasAndPayprEstimateDetails>;

  /**
   * Transfer's the given amount of consumable to the contract
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableToContract: (contractId: string, consumableContractId: string, amount: number) => Promise<string>;

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
   * Transfer's the given amount of consumable from the contract.
   *
   * @param contractId the contract ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableFromContract: (contractId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Estimate how much it would cost to transfer the given amount of Paypr to the contract
   *
   * @param contractId the contract ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferPayprToContract: (contractId: string, amount: number) => Promise<GasEstimateDetails>;

  /**
   * Transfer's the given amount of Paypr to the contract
   *
   * @param contractId the contract ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to a submission id
   */
  transferPayprToContract: (contractId: string, amount: number) => Promise<string>;

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
   * Transfer's the given amount of Paypr from the contract.
   *
   * @param contractId the contract ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to a submission id
   */
  transferPayprFromContract: (contractId: string, amount: number) => Promise<string>;
}

export const getContractsSdk = (sdk: Sdk): ContractSdk => ({
  loadContract: (contractId) => loadContract(sdk, contractId),

  getConsumableAmountsNeededToMintItem: (artifactContractId) =>
    getConsumableAmountsNeededToMintItem(sdk, artifactContractId),

  getConsumableBalance: (contractId, consumableContractId) =>
    getContractConsumableBalance(sdk, contractId, consumableContractId),

  estimateTransferConsumableToContract: (contractId, consumableContractId, amount) =>
    estimateTransferConsumableToContract(sdk, contractId, consumableContractId, amount),
  transferConsumableToContract: (contractId, consumableContractId, amount) =>
    transferConsumableToContract(sdk, contractId, consumableContractId, amount),

  estimateTransferConsumableFromContract: (contractId, consumableContractId, amount) =>
    estimateTransferConsumableFromContract(sdk, contractId, consumableContractId, amount),
  transferConsumableFromContract: (contractId, consumableContractId, amount) =>
    transferConsumableFromContract(sdk, contractId, consumableContractId, amount),

  estimateTransferPayprToContract: (contractId, amount) => estimateTransferPayprToContract(sdk, contractId, amount),
  transferPayprToContract: (contractId, amount) => transferPayprToContract(sdk, contractId, amount),

  estimateTransferPayprFromContract: (contractId, amount) => estimateTransferPayprFromContract(sdk, contractId, amount),
  transferPayprFromContract: (contractId, amount) => transferPayprFromContract(sdk, contractId, amount),
});
