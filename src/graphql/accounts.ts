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

import gql from 'graphql-tag';
import { ApiAccountDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { itemDetailsFragment } from './items';

/** Details for the Account */
export type AccountDetails = ApiAccountDetails;

export const accountDetailsFragment = gql`
  fragment AccountDetails on Account {
    id
    name
    nickname
    balance
    payprBalance
    createdAt
    updatedAt
  }
`;

export const loadAccount = async (sdk: Sdk) => {
  const { account } = await sdk.loadAccount();
  return account;
};

gql`
  query loadAccount {
    account {
      ...AccountDetails
    }
  }
  ${accountDetailsFragment}
`;

export const getAccountConsumableBalance = async (sdk: Sdk, consumableContractId: string) => {
  const { account } = await sdk.getAccountConsumableBalance({ consumableContractId });
  const { consumableBalance } = account;
  return consumableBalance;
};

gql`
  query getAccountConsumableBalance($consumableContractId: ID!) {
    account {
      consumableBalance(consumableContractId: $consumableContractId)
    }
  }
`;

export const getAccountPayprBalance = async (sdk: Sdk) => {
  const { account } = await sdk.getAccountPayprBalance();
  const { payprBalance } = account;
  return payprBalance;
};

gql`
  query getAccountPayprBalance {
    account {
      payprBalance
    }
  }
`;

export const getAccountItems = async (sdk: Sdk, artifactContractId: string) => {
  const { contract } = await sdk.getAccountItems({ artifactContractId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('accountItems' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.accountItems;
};

gql`
  query getAccountItems($artifactContractId: ID!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        accountItems {
          ...ItemDetails
        }
      }
    }
  }
  ${itemDetailsFragment}
`;
