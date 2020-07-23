import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferConsumableToPlayer = async (
  sdk: Sdk,
  playerId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    transferConsumableToPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferConsumableToPlayer({ playerId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation transferConsumableToPlayer($playerId: ID!, $consumableContractId: ID!, $amount: Float!) {
    transferConsumableToPlayer(playerId: $playerId, consumableContractId: $consumableContractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
