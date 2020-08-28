import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferPayprFromPlayer = async (sdk: Sdk, playerId: string, amount: number) => {
  const {
    transferPayprFromPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferPayprFromPlayer({ playerId, amount });
  return submissionId;
};

gql`
  mutation transferPayprFromPlayer($playerId: ID!, $amount: Float!) {
    transferPayprFromPlayer(playerId: $playerId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
