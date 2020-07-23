import gql from 'graphql-tag';
import { ApiContractReference } from '../generated/graphql';

/** Reference to a Contract */
export type ContractReference = ApiContractReference;

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
