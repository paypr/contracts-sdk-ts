import gql from 'graphql-tag';
import { contractReferenceFragment } from './contractReference';

export const skillLevelReferenceFragment = gql`
  fragment SkillLevelReference on SkillLevel {
    skill {
      ...ContractReference
    }

    level
  }
  ${contractReferenceFragment}
`;
