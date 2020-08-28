import gql from 'graphql-tag';
import { ApiTransferItemToPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer the item to a player */
export type TransferItemToPlayerEstimateDetails = ApiTransferItemToPlayerEstimateDetails;

export const estimateTransferItemToPlayer = async (
  sdk: Sdk,
  playerId: string,
  artifactContractId: string,
  itemId: string,
): Promise<TransferItemToPlayerEstimateDetails> => {
  const {
    estimates: { transferItemToPlayer },
  } = await sdk.estimateTransferItemToPlayer({ playerId, artifactContractId, itemId });
  return transferItemToPlayer;
};

gql`
  query estimateTransferItemToPlayer($playerId: ID!, $artifactContractId: ID!, $itemId: String!) {
    estimates {
      transferItemToPlayer(playerId: $playerId, artifactContractId: $artifactContractId, itemId: $itemId) {
        ...TransferItemToPlayerEstimateDetails
      }
    }
  }

  fragment TransferItemToPlayerEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
