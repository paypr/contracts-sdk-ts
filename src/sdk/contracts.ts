import { Sdk } from '../generated/graphql';
import { ContractDetails, loadContract } from '../graphql/contracts';

export interface ContractSdk {
  /**
   * Loads contract details by ID
   * @param contractId the contract ID
   *
   * @returns a promise to the contract details
   */
  loadContract: (contractId: string) => Promise<ContractDetails>;
}

export const getContractsSdk = (sdk: Sdk): ContractSdk => ({
  loadContract: (contractId) => loadContract(sdk, contractId),
});
