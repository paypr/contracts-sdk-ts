import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferPayprFromContract = async (sdk: Sdk, contractId: string, amount: number) => {
  const {
    transferPayprFromContract: {
      submission: { id: submissionId },
    },
  } = await sdk.transferPayprFromContract({ contractId, amount });
  return submissionId;
};

gql`
  mutation transferPayprFromContract($contractId: ID!, $amount: Float!) {
    transferPayprFromContract(contractId: $contractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
