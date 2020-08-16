import gql from 'graphql-tag';
import { ApiContractReference } from '../generated/graphql';

/** Reference to a Contract */
export type ContractReference = ApiContractReference;

export const contractReferenceFragment = gql`
  fragment ContractReference on Contract {
    id
    contractType
    account
    name
    address

    ... on DisableableContract {
      disabled
    }
  }
`;
