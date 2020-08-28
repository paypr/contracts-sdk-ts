import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferItemFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  artifactContractId: string,
  itemId: string,
) => {
  const {
    transferItemFromPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferItemFromPlayer({ playerId, artifactContractId, itemId });
  return submissionId;
};

gql`
  mutation transferItemFromPlayer($playerId: ID!, $artifactContractId: ID!, $itemId: String!) {
    transferItemFromPlayer(playerId: $playerId, artifactContractId: $artifactContractId, itemId: $itemId) {
      submission {
        id
      }
    }
  }
`;
