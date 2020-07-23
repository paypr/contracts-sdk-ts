# Accounts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load account details](#load-account-details)
- [Actions](#actions)
  - [Estimate Paypr purchase cost](#estimate-paypr-purchase-cost)
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

### Estimate Paypr purchase cost

Estimates the cost to purchase a given amount of Paypr.

```typescript
const estimate: PurchasePayprGasEstimateDetail = await sdk.accounts.estimatePurchasePaypr(amount);

console.log('Paypr cost:', estimate.payprCost);
```

### Purchase Paypr

Purchases Paypr.

```typescript
const submissionId: string = await sdk.accounts.purchasePaypr(amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer is complete!');

const account = await sdk.accounts.loadAccount();

console.log(account.payprBalance);
```
