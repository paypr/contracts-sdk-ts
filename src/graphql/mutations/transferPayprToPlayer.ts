import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';

export const transferPayprToPlayer = async (sdk: Sdk, playerId: string, amount: number) => {
  const {
    transferPayprToPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.transferPayprToPlayer({ playerId, amount });
  return submissionId;
};

gql`
  mutation transferPayprToPlayer($playerId: ID!, $amount: Float!) {
    transferPayprToPlayer(playerId: $playerId, amount: $amount) {
      submission {
        id
      }
    }
  }
`;
