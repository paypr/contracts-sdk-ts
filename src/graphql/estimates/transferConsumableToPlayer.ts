import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';
import { GasAndPayprEstimateDetails, gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

export const estimateTransferConsumableToPlayer = async (
  sdk: Sdk,
  playerId: string,
  consumableContractId: string,
  amount: number,
): Promise<GasAndPayprEstimateDetails> => {
  const {
    estimates: { transferConsumableToPlayer },
  } = await sdk.estimateTransferConsumableToPlayer({ playerId, consumableContractId, amount });
  return transferConsumableToPlayer;
};

gql`
  query estimateTransferConsumableToPlayer($playerId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      transferConsumableToPlayer(playerId: $playerId, consumableContractId: $consumableContractId, amount: $amount) {
        ...GasAndPayprEstimateDetails
      }
    }
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
