import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferConsumableFromContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    transferConsumableFromSkill: {
      submission: { id: submissionId },
    },
  } = await sdk.transferConsumableFromContract({ contractId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation transferConsumableFromContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    transferConsumableFromSkill(
      skillContractId: $contractId
      consumableContractId: $consumableContractId
      amount: $amount
    ) {
      submission {
        id
      }
    }
  }
`;
