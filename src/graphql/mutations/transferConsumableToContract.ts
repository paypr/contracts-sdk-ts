import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferConsumableToContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    transferConsumableToContract: {
      submission: { id: submissionId },
    },
  } = await sdk.transferConsumableToContract({ contractId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation transferConsumableToContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    transferConsumableToContract(
      contractId: $contractId
      consumableContractId: $consumableContractId
      amount: $amount
    ) {
      submission {
        id
      }
    }
  }
`;
