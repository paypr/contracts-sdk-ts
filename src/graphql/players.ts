import gql from 'graphql-tag';
import { ApiPlayerDetails, ApiPlayerReference, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';

/** Reference to the player */
export type PlayerReference = ApiPlayerReference;

/** Details for the Player */
export type PlayerDetails = ApiPlayerDetails;

export const playerReferenceFragment = gql`
  fragment PlayerReference on Player {
    id
    address
    name
  }
`;

export const playerDetailsFragment = gql`
  fragment PlayerDetails on Player {
    ...PlayerReference
    version
    needsUpgrade
    createdAt
    updatedAt
  }
  ${playerReferenceFragment}
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

export const getPlayerSkillLevel = async (sdk: Sdk, playerId: string, skillContractId: string) => {
  const { player } = await sdk.getPlayerSkillLevel({ playerId, skillContractId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  const { skillLevel } = player;
  return skillLevel;
};

gql`
  query getPlayerSkillLevel($playerId: ID!, $skillContractId: ID!) {
    player(id: $playerId) {
      skillLevel(skillContractId: $skillContractId)
    }
  }
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
