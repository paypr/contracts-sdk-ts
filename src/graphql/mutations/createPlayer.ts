import gql from 'graphql-tag';
import { ApiCreatePlayerInput, Sdk } from '../../generated/graphql';

export const createPlayer = async (sdk: Sdk, input: ApiCreatePlayerInput) => {
  const {
    createPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.createPlayer({ input });
  return submissionId;
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
