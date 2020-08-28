import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferItemToPlayer = async (sdk: Sdk, playerId: string, artifactContractId: string, itemId: string) => {
  const {
    transferItemToPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferItemToPlayer({ playerId, artifactContractId, itemId });
  return submissionId;
};

gql`
  mutation transferItemToPlayer($playerId: ID!, $artifactContractId: ID!, $itemId: String!) {
    transferItemToPlayer(playerId: $playerId, artifactContractId: $artifactContractId, itemId: $itemId) {
      submission {
        id
      }
    }
  }
`;
