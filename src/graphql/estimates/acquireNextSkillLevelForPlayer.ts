import gql from 'graphql-tag';
import { ApiAcquireNextSkillLevelForPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { consumableAmountReferenceFragment } from '../consumableAmount';
import { gasEstimateDetailsFragment } from '../gasEstimate';
import { AcquireNextSkillLevelForPlayerOptions } from '../mutations/acquireNextSkillLevelForPlayer';

/** Estimate to acquire next skill level for a player */
export type AcquireNextSkillLevelForPlayerEstimateDetails = ApiAcquireNextSkillLevelForPlayerEstimateDetails;

export const estimateAcquireNextSkillLevelForPlayer = async (
  sdk: Sdk,
  playerId: string,
  skillContractId: string,
  { itemsToUse }: AcquireNextSkillLevelForPlayerOptions = {},
): Promise<AcquireNextSkillLevelForPlayerEstimateDetails> => {
  const {
    estimates: { acquireNextSkillLevelForPlayer },
  } = await sdk.estimateAcquireNextSkillLevelForPlayer({
    playerId,
    skillContractId,
    itemsToUse: itemsToUse || [],
  });
  return acquireNextSkillLevelForPlayer;
};

gql`
  query estimateAcquireNextSkillLevelForPlayer($playerId: ID!, $skillContractId: ID!, $itemsToUse: [ItemInput!]) {
    estimates {
      acquireNextSkillLevelForPlayer(playerId: $playerId, skillContractId: $skillContractId, itemsToUse: $itemsToUse) {
        ...AcquireNextSkillLevelForPlayerEstimateDetails
      }
    }
  }

  fragment AcquireNextSkillLevelForPlayerEstimateDetails on AcquireNextSkillLevelForPlayerEstimate {
    ...GasEstimateDetails
    consumableAmountsNeeded {
      ...ConsumableAmountReference
    }
  }

  ${gasEstimateDetailsFragment}
  ${consumableAmountReferenceFragment}
`;
