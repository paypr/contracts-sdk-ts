import gql from 'graphql-tag';
import { Sdk } from '../../generated/graphql';
import { GasAndPayprEstimateDetails, gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

export const estimateMintConsumableForContract = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
  amount: number,
): Promise<GasAndPayprEstimateDetails> => {
  const {
    estimates: { mintConsumableForContract },
  } = await sdk.estimateMintConsumableForContract({ contractId, consumableContractId, amount });
  return mintConsumableForContract;
};

gql`
  query estimateMintConsumableForContract($contractId: ID!, $consumableContractId: ID!, $amount: Float!) {
    estimates {
      mintConsumableForContract(contractId: $contractId, consumableContractId: $consumableContractId, amount: $amount) {
        ...GasAndPayprEstimateDetails
      }
    }
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
