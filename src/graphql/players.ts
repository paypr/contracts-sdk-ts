import gql from 'graphql-tag';
import { ApiPlayerDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';

/** Details for the PLayer */
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
  const { player } = await sdk.loadQuery({ playerId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  return player;
};

gql`
  query loadQuery($playerId: ID!) {
    player(id: $playerId) {
      ...PlayerDetails
    }
  }
  ${playerDetailsFragment}
`;
