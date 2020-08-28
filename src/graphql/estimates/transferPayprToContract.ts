import gql from 'graphql-tag';
import { ApiTransferPayprToContractEstimateDetails, Sdk } from '../../generated/graphql';
import { gasAndPayprEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to transfer Paypr to a contract */
export type TransferPayprToContractEstimateDetails = ApiTransferPayprToContractEstimateDetails;
5;
export const estimateTransferPayprToContract = async (
  sdk: Sdk,
  contractId: string,
  amount: number,
): Promise<TransferPayprToContractEstimateDetails> => {
  const {
    estimates: { transferPayprToContract },
  } = await sdk.estimateTransferPayprToContract({ contractId, amount });
  return transferPayprToContract;
};

gql`
  query estimateTransferPayprToContract($contractId: ID!, $amount: Float!) {
    estimates {
      transferPayprToContract(contractId: $contractId, amount: $amount) {
        ...TransferPayprToContractEstimateDetails
      }
    }
  }

  fragment TransferPayprToContractEstimateDetails on GasEstimate {
    ...GasEstimateDetails
  }
  ${gasAndPayprEstimateDetailsFragment}
`;
