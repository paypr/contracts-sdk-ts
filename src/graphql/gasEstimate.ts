import gql from 'graphql-tag';
import { ApiGasAndPayprEstimateDetails, ApiGasEstimateDetails } from '../generated/graphql';

/** Details of how much it will cost to execute a contract */
export type GasEstimateDetails = ApiGasEstimateDetails;

export const gasEstimateDetailsFragment = gql`
  fragment GasEstimateDetails on GasEstimate {
    gasAmount
    gasCost
    balance
    prepayCharge
  }
`;

/** Details of how much money and Paypr it will cost to execute a contract */
export type GasAndPayprEstimateDetails = ApiGasAndPayprEstimateDetails;

export const gasAndPayprEstimateDetailsFragment = gql`
  fragment GasAndPayprEstimateDetails on GasAndPayprEstimate {
    gasAmount
    gasCost
    payprAmount
    payprBalance
    balance
    prepayCharge
  }
`;
