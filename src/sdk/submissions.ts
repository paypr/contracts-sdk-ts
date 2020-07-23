import { Sdk } from '../generated/graphql';
import { loadSubmission, SubmissionDetails, waitForSubmissionDone } from '../graphql/submissions';

export interface SubmissionsSDK {
  /**
   * Loads submission details by ID
   * @param submissionId the submission ID
   *
   * @returns a promise to the submission details
   */
  loadSubmission: (submissionId: string) => Promise<SubmissionDetails>;

  /**
   * Wait for a submission to be done. Returns the submission details when done
   * @param submissionId the submission ID
   *
   * @returns a promise to the submission details, once done
   */
  waitForSubmissionDone: (submissionId: string) => Promise<SubmissionDetails>;
}

export const getSubmissionsSdk = (sdk: Sdk): SubmissionsSDK => ({
  loadSubmission: (submissionId: string) => loadSubmission(sdk, submissionId),
  waitForSubmissionDone: (submissionId: string) => waitForSubmissionDone(sdk, submissionId),
});
