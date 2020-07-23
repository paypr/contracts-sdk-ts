import { Sdk } from '../generated/graphql';
import { AccountDetails, loadAccount } from '../graphql/accounts';
import { estimatePurchasePaypr, PurchasePayprEstimateDetails } from '../graphql/estimates/purchasePaypr';
import { purchasePaypr } from '../graphql/mutations/purchasePaypr';

export interface AccountsSdk {
  /**
   * Load the account details
   *
   * @returns a promise to the account details
   */
  loadAccount: () => Promise<AccountDetails>;

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
  estimatePurchasePaypr: (amount: number) => estimatePurchasePaypr(sdk, amount),
  purchasePaypr: (amount: number) => purchasePaypr(sdk, amount),
});
