import gql from 'graphql-tag';
import { ApiTransferPayprFromPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer Paypr from a player */
export type TransferPayprFromPlayerEstimateDetails = ApiTransferPayprFromPlayerEstimateDetails;

export const estimateTransferPayprFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  amount: number,
): Promise<TransferPayprFromPlayerEstimateDetails> => {
  const {
    estimates: { transferPayprFromPlayer },
  } = await sdk.estimateTransferPayprFromPlayer({ playerId, amount });
  return transferPayprFromPlayer;
};

gql`
  query estimateTransferPayprFromPlayer($playerId: ID!, $amount: Float!) {
    estimates {
      transferPayprFromPlayer(playerId: $playerId, amount: $amount) {
        ...TransferPayprFromPlayerEstimateDetails
      }
    }
  }

  fragment TransferPayprFromPlayerEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
