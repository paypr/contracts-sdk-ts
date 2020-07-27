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

export const consumableAmountAndBalanceReferenceFragment = gql`
  fragment ConsumableAmountAndBalanceReference on ConsumableAmountAndBalance {
    consumable {
      ...ContractReference
      exchangeRate
    }

    amount
    balance
  }
  ${contractReferenceFragment}
`;
