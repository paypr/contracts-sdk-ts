import gql from 'graphql-tag';
import { ApiAccountDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { itemDetailsFragment } from './items';

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

export const getAccountItems = async (sdk: Sdk, artifactContractId: string) => {
  const { contract } = await sdk.getAccountItems({ artifactContractId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('accountItems' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.accountItems;
};

gql`
  query getAccountItems($artifactContractId: ID!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        accountItems {
          ...ItemDetails
        }
      }
    }
  }
  ${itemDetailsFragment}
`;
