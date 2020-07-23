import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferConsumableFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    transferConsumableFromPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferConsumableFromPlayer({ playerId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation transferConsumableFromPlayer($playerId: ID!, $consumableContractId: ID!, $amount: Float!) {
    transferConsumableFromPlayer(playerId: $playerId, consumableContractId: $consumableContractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
