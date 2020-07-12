import { GraphQLClient } from 'graphql-request/dist';
import { ApiCreatePlayerInput, getSdk } from './generated/graphql';
import { createPlayer } from './graphql/mutations/createPlayer';
import { loadPlayer, PlayerDetails } from './graphql/players';
import { loadSubmission, SubmissionDetails, waitForSubmissionDone } from './graphql/submissions';

export interface ContractsSdk {
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
   * @returns the player details
   */
  loadPlayer: (playerId: string) => Promise<PlayerDetails>;

  /**
   * Loads submission details by ID
   * @param submissionId the submission ID
   *
   * @returns the submission details
   */
  loadSubmission: (submissionId: string) => Promise<SubmissionDetails>;

  /**
   * Wait for a submission to be done. Returns the submission details when done
   * @param submissionId the submission ID
   *
   * @returns the submission details, once done
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
export const createContractsSdk = (options: ContractsSdkOptions = {}): ContractsSdk => {
  const contractsApiClient = createContractsApiClient(options);

  const contractsApiSdk = getSdk(contractsApiClient);

  return {
    createPlayer: (input: ApiCreatePlayerInput) => createPlayer(contractsApiSdk, input),
    loadPlayer: (playerId: string) => loadPlayer(contractsApiSdk, playerId),

    loadSubmission: (submissionId: string) => loadSubmission(contractsApiSdk, submissionId),
    waitForSubmissionDone: (submissionId: string) => waitForSubmissionDone(contractsApiSdk, submissionId),
  };
};

const createContractsApiClient = ({ apiKey, graphqlUrl }: ContractsSdkOptions = {}) =>
  new GraphQLClient(graphqlUrl || defaultGraphqlUrl, { headers: { 'x-api-key': apiKey || defaultApiKey } });
