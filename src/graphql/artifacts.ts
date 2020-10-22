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
import { Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { consumableAmountAndBalanceReferenceFragment } from './consumableAmount';
import { itemDetailsFragment } from './items';

export const getItemDetails = async (sdk: Sdk, artifactContractId: string, itemId: string) => {
  const { contract } = await sdk.getItemDetails({ artifactContractId, itemId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('item' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.item;
};

gql`
  query getItemDetails($artifactContractId: ID!, $itemId: String!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        item(itemId: $itemId) {
          ...ItemDetails
        }
      }
    }
  }
  ${itemDetailsFragment}
`;

export const getConsumableAmountsNeededToMintItem = async (sdk: Sdk, artifactContractId: string) => {
  const { contract } = await sdk.getConsumableAmountsNeededToMintItem({ artifactContractId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('consumableAmountsNeededToMintItem' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.consumableAmountsNeededToMintItem;
};

gql`
  query getConsumableAmountsNeededToMintItem($artifactContractId: ID!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        consumableAmountsNeededToMintItem {
          ...ConsumableAmountAndBalanceReference
        }
      }
    }
  }
  ${consumableAmountAndBalanceReferenceFragment}
`;
