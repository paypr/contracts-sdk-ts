import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const mintConsumableForPlayer = async (
  sdk: Sdk,
  playerId: string,
  consumableContractId: string,
  amount: number,
) => {
  const {
    mintConsumableForPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.mintConsumableForPlayer({ playerId, consumableContractId, amount });
  return submissionId;
};

gql`
  mutation mintConsumableForPlayer($playerId: ID!, $consumableContractId: ID!, $amount: Float!) {
    mintConsumableForPlayer(playerId: $playerId, consumableContractId: $consumableContractId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
