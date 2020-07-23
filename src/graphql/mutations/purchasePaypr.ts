import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const purchasePaypr = async (sdk: Sdk, amount: number) => {
  const {
    purchasePaypr: {
      submission: { id: submissionId },
    },
  } = await sdk.purchasePaypr({ amount });
  return submissionId;
};

gql`
  mutation purchasePaypr($amount: Float!) {
    purchasePaypr(amount: $amount) {
      submission {
        id
      }
    }
  }
`;
