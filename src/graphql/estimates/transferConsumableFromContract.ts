import gql from 'graphql-tag';
import { ApiTransferConsumableFromContractEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer consumable from a contract */
export type TransferConsumableFromContractEstimateDetails = ApiTransferConsumableFromContractEstimateDetails;

export const estimateTransferConsumableFromContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
): Promise<TransferConsumableFromContractEstimateDetails> => {
  const {
    estimates: { transferConsumableFromSkill },
  } = await sdk.estimateTransferConsumableFromContract({ contractId, consumableContractId, amount });
  return transferConsumableFromSkill;
};

gql`
  query estimateTransferConsumableFromContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      transferConsumableFromSkill(
        skillContractId: $contractId
        consumableContractId: $consumableContractId
        amount: $amount
      ) {
        ...TransferConsumableFromContractEstimateDetails
      }
    }
  }

  fragment TransferConsumableFromContractEstimateDetails on TransferConsumableFromSkillEstimate {
    ...GasEstimateDetails
    skillConsumableBalance
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
