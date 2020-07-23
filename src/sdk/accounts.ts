import { Sdk } from '../generated/graphql';
import { AccountDetails, loadAccount } from '../graphql/accounts';
import { purchasePaypr } from '../graphql/mutations/purchasePaypr';

export interface AccountsSdk {
  /**
   * Load the account details
   *
   * @returns a promise to the account details
   */
  loadAccount: () => Promise<AccountDetails>;

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
  purchasePaypr: (amount: number) => purchasePaypr(sdk, amount),
});
