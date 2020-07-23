# Accounts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load account details](#load-account-details)
- [Actions](#actions)
  - [Purchase Paypr](#purchase-paypr)

## Access

Access to the Accounts SDK is available from the `accounts` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

// access the Accounts SDK functionality with sdk.accounts
```

## Information

### Load account details

Loads the account details.

```typescript
const account: AccountDetails = await sdk.accounts.loadAccount();

console.log(account.name);
```

## Actions

### Purchase Paypr

Purchases Paypr.

```typescript
const submissionId: string = await sdk.accounts.purchasePaypr(amount: 100);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer is complete!');

const account = await sdk.accounts.loadAccount();

console.log(account.payprBalance);
```
