import gql from 'graphql-tag';
import { contractReferenceFragment } from './contractReference';

export const consumableAmountReferenceFragment = gql`
  fragment ConsumableAmountReference on ConsumableAmount {
    consumable {
      ...ContractReference
      exchangeRate
    }

    amount
  }
  ${contractReferenceFragment}
`;
