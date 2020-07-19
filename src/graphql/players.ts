import gql from 'graphql-tag';
import { ApiPlayerDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';

/** Details for the Player */
export type PlayerDetails = ApiPlayerDetails;

export const playerDetailsFragment = gql`
  fragment PlayerDetails on Player {
    id
    address
    name
    createdAt
    updatedAt
  }
`;

export const loadPlayer = async (sdk: Sdk, playerId: string) => {
  const { player } = await sdk.loadPlayer({ playerId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  return player;
};

gql`
  query loadPlayer($playerId: ID!) {
    player(id: $playerId) {
      ...PlayerDetails
    }
  }
  ${playerDetailsFragment}
`;

export const getPlayerConsumableBalance = async (sdk: Sdk, playerId: string, consumableContractId: string) => {
  const { player } = await sdk.getPlayerConsumableBalance({ playerId, consumableContractId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  const { consumableBalance } = player;
  return consumableBalance;
};

gql`
  query getPlayerConsumableBalance($playerId: ID!, $consumableContractId: ID!) {
    player(id: $playerId) {
      consumableBalance(consumableContractId: $consumableContractId)
    }
  }
`;
