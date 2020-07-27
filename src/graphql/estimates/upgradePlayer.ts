import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';
import { GasEstimateDetails, gasEstimateDetailsFragment } from '../gasEstimate';

export const estimateUpgradePlayer = async (sdk: Sdk, playerId: string): Promise<GasEstimateDetails> => {
  const {
    estimates: { upgradePlayer },
  } = await sdk.estimateUpgradePlayer({ playerId });
  return upgradePlayer;
};

gql`
  query estimateUpgradePlayer($playerId: ID!) {
    estimates {
      upgradePlayer(playerId: $playerId) {
        ...GasEstimateDetails
      }
    }
  }
  ${gasEstimateDetailsFragment}
`;
