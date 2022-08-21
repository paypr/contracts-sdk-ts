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
import { ApiTransactionRequest, ApiTransactionRequestInput, Sdk } from '../../generated/graphql';
import { ArgumentError } from '../../utils/errors';

export interface CreatePlayerOptions {
  transactionRequest?: ApiTransactionRequestInput;
  signedTransaction?: string;
}

export const createPlayer = async (
  sdk: Sdk,
  name: string,
  { transactionRequest, signedTransaction }: CreatePlayerOptions,
) => {
  if (!transactionRequest && !signedTransaction) {
    throw new ArgumentError('One of transaction request or signed transaction are required');
  }

  const {
    createPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.createPlayer({
    name,
    transactionRequest: convertToTransactionRequestInput(transactionRequest),
    signedTransaction: signedTransaction || null,
  });
  return submissionId;
};

const convertToTransactionRequestInput = (
  transactionRequest?: ApiTransactionRequestInput | ApiTransactionRequest,
): ApiTransactionRequestInput | null =>
  transactionRequest ? { to: transactionRequest.to, data: transactionRequest.data } : null;

gql`
  mutation createPlayer($name: String!, $transactionRequest: TransactionRequestInput, $signedTransaction: String) {
    createPlayer(name: $name, transactionRequest: $transactionRequest, signedTransaction: $signedTransaction) {
      submission {
        id
      }
    }
  }
`;
