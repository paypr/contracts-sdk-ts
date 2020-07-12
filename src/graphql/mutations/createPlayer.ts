import gql from 'graphql-tag';
import { ApiCreatePlayerInput, Sdk } from '../../generated/graphql';

export const createPlayer = async (sdk: Sdk, input: ApiCreatePlayerInput) => {
  const {
    createPlayer: {
      submission: { id: jobId },
    },
  } = await sdk.createPlayer({ input });
  return jobId;
};

gql`
  mutation createPlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      submission {
        id
      }
    }
  }
`;
