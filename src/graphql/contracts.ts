import gql from 'graphql-tag';
import { ApiContractDetails, ApiContractReference, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';

/** Reference to a Contract */
export type ContractReference = ApiContractReference;

/** Details for the Contract */
export type ContractDetails = ApiContractDetails;

export const contractReferenceFragment = gql`
  fragment ContractReference on Contract {
    id
    contractType
    address

    ... on BaseContract {
      account
      name
    }

    ... on DisableableContract {
      disabled
    }
  }
`;

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

  fragment SkillLevelReference on SkillLevel {
    skill {
      id
      name
      account
      disabled
    }

    level
  }

  fragment ConsumableAmountReference on ConsumableAmount {
    consumable {
      id
      name
      account
      disabled
      exchangeRate
    }

    amount
  }
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
