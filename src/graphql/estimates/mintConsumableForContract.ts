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
import { Sdk } from '../../generated/graphql';
import { GasAndPayprEstimateDetails, gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

export const estimateMintConsumableForContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
): Promise<GasAndPayprEstimateDetails> => {
  const {
    estimates: { mintConsumableForContract },
  } = await sdk.estimateMintConsumableForContract({ contractId, consumableContractId, amount });
  return mintConsumableForContract;
};

gql`
  query estimateMintConsumableForContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      mintConsumableForContract(contractId: $contractId, consumableContractId: $consumableContractId, amount: $amount) {
        ...GasAndPayprEstimateDetails
      }
    }
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
