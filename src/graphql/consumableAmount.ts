import gql from 'graphql-tag';
import { ApiConsumableAmountAndBalanceReference, ApiConsumableAmountReference } from '../generated/graphql';
import { contractReferenceFragment } from './contractReference';

/** Represents a consumable and an associated amount */
export type ConsumableAmountReference = ApiConsumableAmountReference;

/** Represents a Consumable amount along with the balance for the object */
export type ConsumableAmountAndBalanceReference = ApiConsumableAmountAndBalanceReference;

export const consumableAmountReferenceFragment = gql`
  fragment ConsumableAmountReference on ConsumableAmount {
    consumable {
      ...ContractReference
      asymmetricalExchangeRate
      purchasePriceExchangeRate
      intrinsicValueExchangeRate
    }

    amount
  }
  ${contractReferenceFragment}
`;

export const consumableAmountAndBalanceReferenceFragment = gql`
  fragment ConsumableAmountAndBalanceReference on ConsumableAmountAndBalance {
    consumable {
      ...ContractReference
      asymmetricalExchangeRate
      purchasePriceExchangeRate
      intrinsicValueExchangeRate
    }

    amount
    balance
  }
  ${contractReferenceFragment}
`;
