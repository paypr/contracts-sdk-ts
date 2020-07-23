import gql from 'graphql-tag';
import { ApiContractDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { consumableAmountReferenceFragment } from './consumableAmount';
import { contractReferenceFragment } from './contractReference';
import { skillLevelReferenceFragment } from './skillLevel';

/** Details for the Contract */
export type ContractDetails = ApiContractDetails;

export const contractDetailsFragment = gql`
  fragment ContractDetails on Contract {
    ...ContractReference

    discoverable
    createdAt
    updatedAt

    ... on BaseContract {
      description
    }

    ... on SkillConstrained {
      requiredSkills {
        ...SkillLevelReference
      }
    }

    ... on ConsumableConsumer {
      requiredConsumables {
        ...ConsumableAmountReference
      }
    }

    ... on ConsumableProvider {
      providedConsumables {
        ...ConsumableAmountReference
      }
    }

    ... on ArtifactContract {
      symbol
      initialUses
    }

    ... on ConsumableContract {
      symbol
      exchangeRate
      totalSupply
      accountBalance
    }
    ${contractReferenceFragment}
  }

  ${consumableAmountReferenceFragment}
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
