import gql from 'graphql-tag';
import { ApiTransferConsumableFromPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer consumable from a player */
export type TransferConsumableFromPlayerEstimateDetails = ApiTransferConsumableFromPlayerEstimateDetails;

export const estimateTransferConsumableFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  consumableContractId: string,
  amount: number,
): Promise<TransferConsumableFromPlayerEstimateDetails> => {
  const {
    estimates: { transferConsumableFromPlayer },
  } = await sdk.estimateTransferConsumableFromPlayer({ playerId, consumableContractId, amount });
  return transferConsumableFromPlayer;
};

gql`
  query estimateTransferConsumableFromPlayer($playerId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      transferConsumableFromPlayer(playerId: $playerId, consumableContractId: $consumableContractId, amount: $amount) {
        ...TransferConsumableFromPlayerEstimateDetails
      }
    }
  }

  fragment TransferConsumableFromPlayerEstimateDetails on TransferConsumableFromPlayerEstimate {
    ...GasEstimateDetails
    consumableBalance
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
