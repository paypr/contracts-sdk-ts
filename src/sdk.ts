import { GraphQLClient } from 'graphql-request/dist';
import { ApiCreatePlayerInput, getSdk } from './generated/graphql';
import { AccountDetails, loadAccount } from './graphql/accounts';
import { ContractDetails, loadContract } from './graphql/contracts';
import { createPlayer } from './graphql/mutations/createPlayer';
import { purchasePaypr } from './graphql/mutations/purchasePaypr';
import { transferConsumableFromPlayer } from './graphql/mutations/transferConsumableFromPlayer';
import { transferConsumableToPlayer } from './graphql/mutations/transferConsumableToPlayer';
import { getPlayerConsumableBalance, loadPlayer, PlayerDetails } from './graphql/players';
import { loadSubmission, SubmissionDetails, waitForSubmissionDone } from './graphql/submissions';

export interface ContractsSdk {
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

  /**
   * Loads contract details by ID
   * @param contractId the contract ID
   *
   * @returns a promise to the contract details
   */
  loadContract: (contractId: string) => Promise<ContractDetails>;

  /**
   * Create a player with the given details
   * @param input the player details
   *
   * @returns a promise to a submission id
   */
  createPlayer: (input: ApiCreatePlayerInput) => Promise<string>;

  /**
   * Loads player details by ID
   * @param playerId the player ID
   *
   * @returns a promise to the player details
   */
  loadPlayer: (playerId: string) => Promise<PlayerDetails>;

  /**
   * Gets the player's consumable balance
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   *
   * @returns a promise to the balance
   */
  getPlayerConsumableBalance: (playerId: string, consumableContractId: string) => Promise<number>;

  /**
   * Transfer's the given amount of consumable to the player
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Transfer's the given amount of consumable from the player.
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Loads submission details by ID
   * @param submissionId the submission ID
   *
   * @returns a promise to the submission details
   */
  loadSubmission: (submissionId: string) => Promise<SubmissionDetails>;

  /**
   * Wait for a submission to be done. Returns the submission details when done
   * @param submissionId the submission ID
   *
   * @returns a promise to the submission details, once done
   */
  waitForSubmissionDone: (submissionId: string) => Promise<SubmissionDetails>;
}

export interface ContractsSdkOptions {
  /**
   * Sets the API key. If undefined, will use PAYPR_API_KEY environment variable
   */
  apiKey?: string;

  /**
   * Sets the GraphQL. If undefined, will use PAYPR_API_GRAPHQL_URL environment variable if present.
   */
  graphqlUrl?: string;
}

const defaultApiKey = process.env.PAYPR_API_KEY || '';
const defaultGraphqlUrl = process.env.PAYPR_API_GRAPHQL_URL || 'https://api.paypr.money/designer/api/graphql';

/**
 * Create the Contracts SDK
 * @param options SDK options
 *
 * @returns the Contracts SDK
 */
export const getContractsSdk = (options: ContractsSdkOptions = {}): ContractsSdk => {
  const contractsApiClient = getContractsApiClient(options);

  const contractsApiSdk = getSdk(contractsApiClient);

  return {
    loadAccount: () => loadAccount(contractsApiSdk),
    purchasePaypr: (amount: number) => purchasePaypr(contractsApiSdk, amount),

    loadContract: (contractId: string) => loadContract(contractsApiSdk, contractId),

    createPlayer: (input: ApiCreatePlayerInput) => createPlayer(contractsApiSdk, input),
    loadPlayer: (playerId: string) => loadPlayer(contractsApiSdk, playerId),

    getPlayerConsumableBalance: (playerId: string, consumableContractId: string) =>
      getPlayerConsumableBalance(contractsApiSdk, playerId, consumableContractId),

    transferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) =>
      transferConsumableToPlayer(contractsApiSdk, playerId, consumableContractId, amount),
    transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) =>
      transferConsumableFromPlayer(contractsApiSdk, playerId, consumableContractId, amount),

    loadSubmission: (submissionId: string) => loadSubmission(contractsApiSdk, submissionId),
    waitForSubmissionDone: (submissionId: string) => waitForSubmissionDone(contractsApiSdk, submissionId),
  };
};

const getContractsApiClient = ({ apiKey, graphqlUrl }: ContractsSdkOptions = {}) =>
  new GraphQLClient(graphqlUrl || defaultGraphqlUrl, { headers: { 'x-api-key': apiKey || defaultApiKey } });
