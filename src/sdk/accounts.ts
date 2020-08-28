import { Sdk } from '../generated/graphql';
import { AccountDetails, getAccountItems, loadAccount } from '../graphql/accounts';
import { estimatePurchasePaypr, PurchasePayprEstimateDetails } from '../graphql/estimates/purchasePaypr';
import { ItemDetails } from '../graphql/items';
import { purchasePaypr } from '../graphql/mutations/purchasePaypr';

export interface AccountsSdk {
  /**
   * Load the account details
   *
   * @returns a promise to the account details
   */
  loadAccount: () => Promise<AccountDetails>;

  /**
   * Retrieves the items owned by the account for the given artifact.
   * @param artifactContractId the artifact contract ID
   *
   * @returns a promise to a list of items
   */
  getOwnedItems: (artifactContractId: string) => Promise<readonly ItemDetails[]>;

  /**
   * Estimate how much it will cost to purchase a given amount of Paypr
   *
   * @param amount the amount of Paypr to purchase
   *
   * @returns a promise to the estimate details
   */
  estimatePurchasePaypr: (amount: number) => Promise<PurchasePayprEstimateDetails>;

  /**
   * Purchase the given amount of Paypr
   * @param amount the amount of Paypr to purchase
   *
   * @returns a promise to a submission id
   */
  purchasePaypr: (amount: number) => Promise<string>;
}

export const getAccountsSdk = (sdk: Sdk): AccountsSdk => ({
  loadAccount: () => loadAccount(sdk),
  getOwnedItems: (artifactContractId) => getAccountItems(sdk, artifactContractId),
  estimatePurchasePaypr: (amount) => estimatePurchasePaypr(sdk, amount),
  purchasePaypr: (amount) => purchasePaypr(sdk, amount),
});
