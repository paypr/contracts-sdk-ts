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
import { ApiTransferItemFromPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer the item from a player */
export type TransferItemFromPlayerEstimateDetails = ApiTransferItemFromPlayerEstimateDetails;

export const estimateTransferItemFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  artifactContractId: string,
  itemId: string,
): Promise<TransferItemFromPlayerEstimateDetails> => {
  const {
    estimates: { transferItemFromPlayer },
  } = await sdk.estimateTransferItemFromPlayer({ playerId, artifactContractId, itemId });
  return transferItemFromPlayer;
};

gql`
  query estimateTransferItemFromPlayer($playerId: ID!, $artifactContractId: ID!, $itemId: String!) {
    estimates {
      transferItemFromPlayer(playerId: $playerId, artifactContractId: $artifactContractId, itemId: $itemId) {
        ...TransferItemFromPlayerEstimateDetails
      }
    }
  }

  fragment TransferItemFromPlayerEstimateDetails on GasEstimate {
    ...GasAndTransactionEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
