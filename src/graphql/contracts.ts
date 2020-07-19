import gql from 'graphql-tag';
import { ApiContractDetails, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';

/** Details for the Contract */
export type ContractDetails = ApiContractDetails;

export const contractDetailsFragment = gql`
  fragment ContractDetails on Contract {
    id
    address
    contractType
    discoverable
    createdAt
    updatedAt

    ... on BaseContract {
      account
      name
      description
    }

    ... on DisableableContract {
      disabled
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
