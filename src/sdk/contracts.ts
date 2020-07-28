import { Sdk } from '../generated/graphql';
import { ContractDetails, getContractConsumableBalance, loadContract } from '../graphql/contracts';
import {
  estimateTransferConsumableFromContract,
  TransferConsumableFromContractEstimateDetails,
} from '../graphql/estimates/transferConsumableFromContract';
import { transferConsumableFromContract } from '../graphql/mutations/transferConsumableFromContract';

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

  estimateTransferConsumableFromContract: (contractId, consumableContractId, amount) =>
    estimateTransferConsumableFromContract(sdk, contractId, consumableContractId, amount),
  transferConsumableFromContract: (contractId, consumableContractId, amount) =>
    transferConsumableFromContract(sdk, contractId, consumableContractId, amount),
});
