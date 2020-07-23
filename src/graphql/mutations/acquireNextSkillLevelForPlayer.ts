import gql from 'graphql-tag';
import { ApiConsumableAmountInput, ApiItemInput, Sdk } from '../../generated/graphql';

export interface AcquireNextSkillLevelForPlayerOptions {
  /** Items to use when acquiring the skill level (optional) */
  itemsToUse?: ApiItemInput[];
}

export const acquireNextSkillLevelForPlayer = async (
  sdk: Sdk,
  playerId: string,
  skillContractId: string,
  amountsToProvide: ApiConsumableAmountInput[],
  { itemsToUse }: AcquireNextSkillLevelForPlayerOptions = {},
) => {
  const {
    acquireNextSkillLevelForPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.acquireNextSkillLevelForPlayer({
    playerId,
    skillContractId,
    amountsToProvide,
    itemsToUse: itemsToUse || [],
  });
  return submissionId;
};

gql`
  mutation acquireNextSkillLevelForPlayer(
    $playerId: ID!
    $skillContractId: ID!
    $itemsToUse: [ItemInput!]
    $amountsToProvide: [ConsumableAmountInput!]!
  ) {
    acquireNextSkillLevelForPlayer(
      playerId: $playerId
      skillContractId: $skillContractId
      itemsToUse: $itemsToUse
      amountsToProvide: $amountsToProvide
    ) {
      submission {
        id
      }
    }
  }
`;
