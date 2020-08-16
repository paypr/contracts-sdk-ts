import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';
import { GasAndPayprEstimateDetails, gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

export const estimateTransferConsumableToContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
): Promise<GasAndPayprEstimateDetails> => {
  const {
    estimates: { transferConsumableToContract },
  } = await sdk.estimateTransferConsumableToContract({ contractId, consumableContractId, amount });
  return transferConsumableToContract;
};

gql`
  query estimateTransferConsumableToContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      transferConsumableToContract(
        contractId: $contractId
        consumableContractId: $consumableContractId
        amount: $amount
      ) {
        ...GasAndPayprEstimateDetails
        consumableBalance
      }
    }
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
