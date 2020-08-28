import gql from 'graphql-tag';
import { ApiTransferItemFromPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer the item from a player */
export type TransferItemFromPlayerEstimateDetails = ApiTransferItemFromPlayerEstimateDetails;

export const estimateTransferItemFromPlayer = async (
  sdk: Sdk,
  playerId: string,
  artifactContractId: string,
  itemId: string,
): Promise<TransferItemFromPlayerEstimateDetails> => {
  const {
    estimates: { transferItemFromPlayer },
  } = await sdk.estimateTransferItemFromPlayer({ playerId, artifactContractId, itemId });
  return transferItemFromPlayer;
};

gql`
  query estimateTransferItemFromPlayer($playerId: ID!, $artifactContractId: ID!, $itemId: String!) {
    estimates {
      transferItemFromPlayer(playerId: $playerId, artifactContractId: $artifactContractId, itemId: $itemId) {
        ...TransferItemFromPlayerEstimateDetails
      }
    }
  }

  fragment TransferItemFromPlayerEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
