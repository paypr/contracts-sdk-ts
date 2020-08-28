import gql from 'graphql-tag';
import { ApiMintItemForPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { gasEstimateDetailsFragment } from '../gasEstimate';

/** Estimate to mint an item for a player */
export type MintItemForPlayerEstimateDetails = ApiMintItemForPlayerEstimateDetails;

export const estimateMintItemForPlayer = async (
  sdk: Sdk,
  playerId: string,
  artifactContractId: string,
): Promise<MintItemForPlayerEstimateDetails> => {
  const {
    estimates: { mintItemForPlayer },
  } = await sdk.estimateMintItemForPlayer({
    playerId,
    artifactContractId,
  });
  return mintItemForPlayer;
};

gql`
  query estimateMintItemForPlayer($playerId: ID!, $artifactContractId: ID!) {
    estimates {
      mintItemForPlayer(playerId: $playerId, artifactContractId: $artifactContractId) {
        ...MintItemForPlayerEstimateDetails
      }
    }
  }

  fragment MintItemForPlayerEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }

  ${gasEstimateDetailsFragment}
`;
