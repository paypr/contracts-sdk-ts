import gql from 'graphql-tag';
import { ApiAccountDetails, Sdk } from '../generated/graphql';

/** Details for the Account */
export type AccountDetails = ApiAccountDetails;

export const accountDetailsFragment = gql`
  fragment AccountDetails on Account {
    id
    name
    nickname
    balance
    payprBalance
    createdAt
    updatedAt
  }
`;

export const loadAccount = async (sdk: Sdk) => {
  const { account } = await sdk.loadAccount();
  return account;
};

gql`
  query loadAccount {
    account {
      ...AccountDetails
    }
  }
  ${accountDetailsFragment}
`;
