import { Sdk } from '../generated/graphql';
import {
  AccountDetails,
  getAccountConsumableBalance,
  getAccountItems,
  getAccountPayprBalance,
  loadAccount,
} from '../graphql/accounts';
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
   * Gets the account's consumable balance
   *
   * @param consumableContractId the consumable contract ID
   *
   * @returns a promise to the balance
   */
  getConsumableBalance: (consumableContractId: string) => Promise<number>;

  /**
   * Gets the account's Paypr balance
   *
   * @returns a promise to the balance
   */
  getPayprBalance: () => Promise<number>;

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
  getConsumableBalance: (consumableContractId) => getAccountConsumableBalance(sdk, consumableContractId),
  getPayprBalance: () => getAccountPayprBalance(sdk),
  getOwnedItems: (artifactContractId) => getAccountItems(sdk, artifactContractId),
  estimatePurchasePaypr: (amount) => estimatePurchasePaypr(sdk, amount),
  purchasePaypr: (amount) => purchasePaypr(sdk, amount),
});
