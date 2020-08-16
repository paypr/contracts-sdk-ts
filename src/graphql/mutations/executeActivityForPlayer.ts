import gql from 'graphql-tag';
import { ApiConsumableAmountInput, ApiItemInput, Sdk } from '../../generated/graphql';

export interface ExecuteActivityForPlayerOptions {
  /** Items to use when executing the activity (optional) */
  itemsToUse?: ApiItemInput[];
}

export const executeActivityForPlayer = async (
  sdk: Sdk,
  playerId: string,
  activityContractId: string,
  amountsToProvide: ApiConsumableAmountInput[],
  amountsToConsume: ApiConsumableAmountInput[],
  { itemsToUse }: ExecuteActivityForPlayerOptions = {},
) => {
  const {
    executeActivityForPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.executeActivityForPlayer({
    playerId,
    activityContractId,
    amountsToProvide,
    amountsToConsume,
    itemsToUse: itemsToUse || [],
  });
  return submissionId;
};

gql`
  mutation executeActivityForPlayer(
    $playerId: ID!
    $activityContractId: ID!
    $itemsToUse: [ItemInput!]
    $amountsToProvide: [ConsumableAmountInput!]!
    $amountsToConsume: [ConsumableAmountInput!]
  ) {
    executeActivityForPlayer(
      playerId: $playerId
      activityContractId: $activityContractId
      itemsToUse: $itemsToUse
      amountsToProvide: $amountsToProvide
      amountsToConsume: $amountsToConsume
    ) {
      submission {
        id
      }
    }
  }
`;
