import gql from 'graphql-tag';
import { ApiTransactionRequest, ApiTransactionRequestInput, Sdk } from '../../generated/graphql';
import { ArgumentError } from '../../utils/errors';

export interface ExecuteTransactionOptions {
  transactionRequest?: ApiTransactionRequestInput | ApiTransactionRequest;
  signedTransaction?: string;
}

export const executeTransaction = async (
  sdk: Sdk,
  { transactionRequest, signedTransaction }: ExecuteTransactionOptions,
) => {
  if (!transactionRequest && !signedTransaction) {
    throw new ArgumentError('One of transaction request or signed transaction are required');
  }

  const {
    executeTransaction: {
      submission: { id: submissionId },
    },
  } = await sdk.executeTransaction({
    transactionRequest: convertToTransactionRequestInput(transactionRequest),
    signedTransaction: signedTransaction || null,
  });

  return submissionId;
};

const convertToTransactionRequestInput = (
  transactionRequest?: ApiTransactionRequestInput | ApiTransactionRequest,
): ApiTransactionRequestInput | null =>
  transactionRequest?.to ? { to: transactionRequest.to, data: transactionRequest.data } : null;

gql`
  mutation executeTransaction($transactionRequest: TransactionRequestInput, $signedTransaction: String) {
    executeTransaction(transactionRequest: $transactionRequest, signedTransaction: $signedTransaction) {
      submission {
        id
      }
    }
  }
`;
