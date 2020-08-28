import gql from 'graphql-tag';
import { ApiTransferPayprToPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer Paypr to a player */
export type TransferPayprToPlayerEstimateDetails = ApiTransferPayprToPlayerEstimateDetails;
5;
export const estimateTransferPayprToPlayer = async (
  sdk: Sdk,
  playerId: string,
  amount: number,
): Promise<TransferPayprToPlayerEstimateDetails> => {
  const {
    estimates: { transferPayprToPlayer },
  } = await sdk.estimateTransferPayprToPlayer({ playerId, amount });
  return transferPayprToPlayer;
};

gql`
  query estimateTransferPayprToPlayer($playerId: ID!, $amount: Float!) {
    estimates {
      transferPayprToPlayer(playerId: $playerId, amount: $amount) {
        ...TransferPayprToPlayerEstimateDetails
      }
    }
  }

  fragment TransferPayprToPlayerEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
