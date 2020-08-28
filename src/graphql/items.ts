import gql from 'graphql-tag';
import { ApiItemDetails } from '../generated/graphql';

/** Details for an item */
export type ItemDetails = ApiItemDetails;

export const itemDetailsFragment = gql`
  fragment ItemDetails on Item {
    itemId
    usesLeft
  }
`;
