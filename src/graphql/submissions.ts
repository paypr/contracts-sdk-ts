/*
 * Copyright (c) 2020 The Paypr Company, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * Paypr Contracts SDK and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import gql from 'graphql-tag';
import { ApiSubmissionDetails, Sdk } from '../generated/graphql';
import { sleep } from '../utils/async';
import { ArgumentError, TimeoutError } from '../utils/errors';
import { contractReferenceFragment } from './contractReference';
import { itemDetailsFragment } from './items';
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
    item {
      ...ItemDetails
    }
    createdAt
    updatedAt
  }
  ${contractReferenceFragment}
  ${playerReferenceFragment}
  ${itemDetailsFragment}
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
