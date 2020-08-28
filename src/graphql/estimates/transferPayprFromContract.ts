import gql from 'graphql-tag';
import { ApiTransferPayprFromContractEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer Paypr from a contract */
export type TransferPayprFromContractEstimateDetails = ApiTransferPayprFromContractEstimateDetails;

export const estimateTransferPayprFromContract = async (
  sdk: Sdk,
  contractId: string,
  amount: number,
): Promise<TransferPayprFromContractEstimateDetails> => {
  const {
    estimates: { transferPayprFromContract },
  } = await sdk.estimateTransferPayprFromContract({ contractId, amount });
  return transferPayprFromContract;
};

gql`
  query estimateTransferPayprFromContract($contractId: ID!, $amount: Float!) {
    estimates {
      transferPayprFromContract(contractId: $contractId, amount: $amount) {
        ...TransferPayprFromContractEstimateDetails
      }
    }
  }

  fragment TransferPayprFromContractEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
