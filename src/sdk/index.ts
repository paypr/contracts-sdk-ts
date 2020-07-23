import { GraphQLClient } from 'graphql-request/dist';
import { getSdk as getGraphqlSdk } from '../generated/graphql';
import { getAccountsSdk } from './accounts';
import { getContractsSdk } from './contracts';
import { getPlayersSdk } from './players';
import { getSubmissionsSdk } from './submissions';

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
 * Get access to the SDK
 * @param options SDK options
 *
 * @returns the Contracts SDK
 */
export const getSdk = (options: ContractsSdkOptions = {}) => {
  const contractsApiClient = getContractsApiClient(options);

  const sdk = getGraphqlSdk(contractsApiClient);

  return {
    accounts: getAccountsSdk(sdk),
    contracts: getContractsSdk(sdk),
    players: getPlayersSdk(sdk),
    submissions: getSubmissionsSdk(sdk),
  };
};

const getContractsApiClient = ({ apiKey, graphqlUrl }: ContractsSdkOptions = {}) =>
  new GraphQLClient(graphqlUrl || defaultGraphqlUrl, { headers: { 'x-api-key': apiKey || defaultApiKey } });
