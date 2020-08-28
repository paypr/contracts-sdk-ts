import gql from 'graphql-tag';
import { Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { consumableAmountAndBalanceReferenceFragment } from './consumableAmount';

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
