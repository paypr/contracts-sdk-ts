import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferPayprToContract = async (sdk: Sdk, contractId: string, amount: number) => {
  const {
    transferPayprToContract: {
      submission: { id: submissionId },
    },
  } = await sdk.transferPayprToContract({ contractId, amount });
  return submissionId;
};

gql`
  mutation transferPayprToContract($contractId: ID!, $amount: Float!) {
    transferPayprToContract(contractId: $contractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
