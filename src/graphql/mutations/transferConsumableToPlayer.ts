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
      submission: { id: jobId },
    },
  } = await sdk.transferConsumableToPlayer({ playerId, consumableContractId, amount });
  return jobId;
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
