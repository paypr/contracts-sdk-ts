import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const upgradePlayer = async (sdk: Sdk, playerId: string) => {
  const {
    upgradePlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.upgradePlayer({ playerId });
  return submissionId;
};

gql`
  mutation upgradePlayer($playerId: ID!) {
    upgradePlayer(playerId: $playerId) {
      submission {
        id
      }
    }
  }
`;
