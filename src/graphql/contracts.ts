import gql from 'graphql-tag';
import { ApiContractDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { consumableAmountAndBalanceReferenceFragment } from './consumableAmount';
import { contractReferenceFragment } from './contractReference';
import { skillLevelReferenceFragment } from './skillLevel';

/** Details for the Contract */
export type ContractDetails = ApiContractDetails;

export const contractDetailsFragment = gql`
  fragment ContractDetails on Contract {
    ...ContractReference

    description
    discoverable
    payprBalance
    createdAt
    updatedAt

    ... on SkillConstrained {
      requiredSkills {
        ...SkillLevelReference
      }
    }

    ... on ConsumableConsumer {
      requiredConsumables {
        ...ConsumableAmountAndBalanceReference
      }
    }

    ... on ConsumableProvider {
      providedConsumables {
        ...ConsumableAmountAndBalanceReference
      }
    }

    ... on ArtifactContract {
      symbol
      initialUses
      totalItems
      totalUsesLeft
    }

    ... on ConsumableContract {
      symbol
      asymmetricalExchangeRate
      purchasePriceExchangeRate
      intrinsicValueExchangeRate
      totalSupply
      accountBalance
    }
    ${contractReferenceFragment}
  }

  ${consumableAmountAndBalanceReferenceFragment}
  ${skillLevelReferenceFragment}
`;

export const loadContract = async (sdk: Sdk, contractId: string) => {
  const { contract } = await sdk.loadContract({ contractId });
  if (!contract) {
    throw new ArgumentError(`Contract not found: ${contractId}`);
  }
  return contract;
};

gql`
  query loadContract($contractId: ID!) {
    contract(id: $contractId) {
      ...ContractDetails
    }
  }
  ${contractDetailsFragment}
`;

export const getContractConsumableBalance = async (
  sdk: Sdk,
  contractId: string,
  consumableContractId: string,
): Promise<number> => {
  const { contract } = await sdk.getContractConsumableBalance({ contractId, consumableContractId });
  if (!contract) {
    throw new ArgumentError(`Contract not found: ${contractId}`);
  }
  if (!('consumableBalance' in contract)) {
    return 0;
  }
  const { consumableBalance } = contract;
  return consumableBalance;
};

gql`
  query getContractConsumableBalance($contractId: ID!, $consumableContractId: ID!) {
    contract(id: $contractId) {
      consumableBalance(consumableContractId: $consumableContractId)
    }
  }
`;

export const getContractPayprBalance = async (sdk: Sdk, contractId: string) => {
  const { contract } = await sdk.getContractPayprBalance({ contractId });
  if (!contract) {
    throw new ArgumentError(`Contract not found: ${contractId}`);
  }
  const { payprBalance } = contract;
  return payprBalance;
};

gql`
  query getContractPayprBalance($contractId: ID!) {
    contract(id: $contractId) {
      payprBalance
    }
  }
`;
