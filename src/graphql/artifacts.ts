import gql from 'graphql-tag';
import { Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { consumableAmountAndBalanceReferenceFragment } from './consumableAmount';
import { itemDetailsFragment } from './items';

export const getItemDetails = async (sdk: Sdk, artifactContractId: string, itemId: string) => {
  const { contract } = await sdk.getItemDetails({ artifactContractId, itemId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('item' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.item;
};

gql`
  query getItemDetails($artifactContractId: ID!, $itemId: String!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        item(itemId: $itemId) {
          ...ItemDetails
        }
      }
    }
  }
  ${itemDetailsFragment}
`;

export const getConsumableAmountsNeededToMintItem = async (sdk: Sdk, artifactContractId: string) => {
  const { contract } = await sdk.getConsumableAmountsNeededToMintItem({ artifactContractId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('consumableAmountsNeededToMintItem' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.consumableAmountsNeededToMintItem;
};

gql`
  query getConsumableAmountsNeededToMintItem($artifactContractId: ID!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        consumableAmountsNeededToMintItem {
          ...ConsumableAmountAndBalanceReference
        }
      }
    }
  }
  ${consumableAmountAndBalanceReferenceFragment}
`;
