/*
 * Copyright (c) 2020 The Paypr Company, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * Paypr Contracts SDK and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
