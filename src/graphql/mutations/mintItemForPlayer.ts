import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const mintItemForPlayer = async (sdk: Sdk, playerId: string, artifactContractId: string) => {
  const {
    mintItemForPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.mintItemForPlayer({
    playerId,
    artifactContractId,
  });
  return submissionId;
};

gql`
  mutation mintItemForPlayer($playerId: ID!, $artifactContractId: ID!) {
    mintItemForPlayer(playerId: $playerId, artifactContractId: $artifactContractId) {
      submission {
        id
      }
    }
  }
`;
