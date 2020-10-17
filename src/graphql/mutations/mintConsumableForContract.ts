import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const mintConsumableForContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    mintConsumableForContract: {
      submission: { id: submissionId },
    },
  } = await sdk.mintConsumableForContract({ contractId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation mintConsumableForContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    mintConsumableForContract(contractId: $contractId, consumableContractId: $consumableContractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
