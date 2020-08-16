import { Sdk } from '../generated/graphql';
import { ContractDetails, getContractConsumableBalance, loadContract } from '../graphql/contracts';
import {
  estimateTransferConsumableFromContract,
  TransferConsumableFromContractEstimateDetails,
} from '../graphql/estimates/transferConsumableFromContract';
import { estimateTransferConsumableToContract } from '../graphql/estimates/transferConsumableToContract';
import { GasAndPayprEstimateDetails } from '../graphql/gasEstimate';
import { transferConsumableFromContract } from '../graphql/mutations/transferConsumableFromContract';
import { transferConsumableToContract } from '../graphql/mutations/transferConsumableToContract';

export interface ContractSdk {
  /**
   * Loads contract details by ID
   * @param contractId the contract ID
   *
   * @returns a promise to the contract details
   */
  loadContract: (contractId: string) => Promise<ContractDetails>;

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
   * @returns a promise to a submission id
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
}

export const getContractsSdk = (sdk: Sdk): ContractSdk => ({
  loadContract: (contractId) => loadContract(sdk, contractId),

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
});
