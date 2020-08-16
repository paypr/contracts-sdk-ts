import gql from 'graphql-tag';
import { ApiPurchasePayprEstimateDetails, Sdk } from '../../generated/graphql';
import { gasEstimateDetailsFragment } from '../gasEstimate';

/** Estimate of the cost to purchase the Paypr */
export type PurchasePayprEstimateDetails = ApiPurchasePayprEstimateDetails;

export const estimatePurchasePaypr = async (sdk: Sdk, amount: number): Promise<PurchasePayprEstimateDetails> => {
  const {
    estimates: { purchasePaypr },
  } = await sdk.estimatePurchasePaypr({ amount });
  return purchasePaypr;
};

gql`
  query estimatePurchasePaypr($amount: Float!) {
    estimates {
      purchasePaypr(amount: $amount) {
        ...PurchasePayprEstimateDetails
      }
    }
  }

  fragment PurchasePayprEstimateDetails on PurchasePayprEstimate {
    ...GasEstimateDetails
    payprCost
    totalCost
  }
  ${gasEstimateDetailsFragment}
`;
