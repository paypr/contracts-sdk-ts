# Submissions SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load submission details](#load-submission-details)
  - [Wait for Submission Done](#wait-for-submission-done)
- [Actions](#actions)

## Access

Access to the Submissions SDK is available from the `submissions` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

// access the Submissions SDK functionality with sdk.submissions
```

## Information

### Load submission details

Loads the submission details.

```typescript
const submission: SubmissionDetails = await sdk.submissions.loadSubmission();

console.log(submission.name);
```

### Wait for Submission Done

Waits until the submission with the given ID is either completed or failed.

```typescript
const submissionId: string = ''; // do something that returns a submission id
const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);
```

## Actions

No actions at this time.
