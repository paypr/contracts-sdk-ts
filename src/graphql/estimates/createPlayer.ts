import gql from 'graphql-tag';
import { ApiCreatePlayerInput, Sdk } from '../../generated/graphql';
import { GasEstimateDetails, gasEstimateDetailsFragment } from '../gasEstimate';

export const estimateCreatePlayer = async (sdk: Sdk, input: ApiCreatePlayerInput): Promise<GasEstimateDetails> => {
  const {
    estimates: { createPlayer },
  } = await sdk.estimateCreatePlayer({ input });
  return createPlayer;
};

gql`
  query estimateCreatePlayer($input: CreatePlayerInput!) {
    estimates {
      createPlayer(input: $input) {
        ...GasEstimateDetails
      }
    }
  }
  ${gasEstimateDetailsFragment}
`;
