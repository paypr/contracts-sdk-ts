import gql from 'graphql-tag';
import { ApiSubmissionDetails, Sdk } from '../generated/graphql';
import { sleep } from '../utils/async';
import { ArgumentError, TimeoutError } from '../utils/errors';
import { contractReferenceFragment } from './contractReference';
import { playerReferenceFragment } from './players';

/** Details of the Submission */
export type SubmissionDetails = ApiSubmissionDetails;

export const submissionDetailsFragment = gql`
  fragment SubmissionDetails on Submission {
    id
    submissionType
    errorDetails
    done
    contract {
      ...ContractReference
    }
    player {
      ...PlayerReference
    }
    createdAt
    updatedAt
  }
  ${contractReferenceFragment}
  ${playerReferenceFragment}
`;

const maxFetchTimes = 300; // about 5 minutes
const waitTimeBetweenFetches = 1000;

export const waitForSubmissionDone = async (sdk: Sdk, submissionId: string) => {
  let numFetchTimes = 0;
  while (numFetchTimes < maxFetchTimes) {
    await sleep(waitTimeBetweenFetches);
    const submission = await loadSubmission(sdk, submissionId);
    if (submission.done) {
      return submission;
    }

    numFetchTimes += 1;
  }

  throw new TimeoutError(`Timeout waiting for submission ${submissionId}' to be done`);
};

export const loadSubmission = async (sdk: Sdk, submissionId: string) => {
  const { submission } = await sdk.loadSubmission({ submissionId });
  if (!submission) {
    throw new ArgumentError(`Submission not found: ${submissionId}`);
  }
  return submission;
};

gql`
  query loadSubmission($submissionId: ID!) {
    submission(id: $submissionId) {
      ...SubmissionDetails
    }
  }
  ${submissionDetailsFragment}
`;
