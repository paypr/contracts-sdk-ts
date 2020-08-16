import gql from 'graphql-tag';
import { ApiExecuteActivityForPlayerEstimateDetails, Sdk } from '../../generated/graphql';
import { consumableAmountAndBalanceReferenceFragment, consumableAmountReferenceFragment } from '../consumableAmount';
import { gasEstimateDetailsFragment } from '../gasEstimate';
import { ExecuteActivityForPlayerOptions } from '../mutations/executeActivityForPlayer';

/** Estimate to execute an activity for a player */
export type ExecuteActivityForPlayerEstimateDetails = ApiExecuteActivityForPlayerEstimateDetails;

export const estimateExecuteActivityForPlayer = async (
  sdk: Sdk,
  playerId: string,
  activityContractId: string,
  { itemsToUse }: ExecuteActivityForPlayerOptions = {},
): Promise<ExecuteActivityForPlayerEstimateDetails> => {
  const {
    estimates: { executeActivityForPlayer },
  } = await sdk.estimateExecuteActivityForPlayer({
    playerId,
    activityContractId,
    itemsToUse: itemsToUse || [],
  });
  return executeActivityForPlayer;
};

gql`
  query estimateExecuteActivityForPlayer($playerId: ID!, $activityContractId: ID!, $itemsToUse: [ItemInput!]) {
    estimates {
      executeActivityForPlayer(playerId: $playerId, activityContractId: $activityContractId, itemsToUse: $itemsToUse) {
        ...ExecuteActivityForPlayerEstimateDetails
      }
    }
  }

  fragment ExecuteActivityForPlayerEstimateDetails on ExecuteActivityForPlayerEstimate {
    ...GasEstimateDetails
    consumableAmountsNeeded {
      ...ConsumableAmountAndBalanceReference
    }
    consumableAmountsProvided {
      ...ConsumableAmountReference
    }
  }

  ${gasEstimateDetailsFragment}
  ${consumableAmountReferenceFragment}
  ${consumableAmountAndBalanceReferenceFragment}
`;
