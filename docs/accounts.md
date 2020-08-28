# Accounts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load account details](#load-account-details)
  - [Get owned items](#get-owned-items)
- [Actions](#actions)
  - [Purchase Paypr](#purchase-paypr)

## Access

Access to the Accounts SDK is available from the `accounts` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

sdk.accounts. // access the Accounts SDK functionality
```

## Information

### Load account details

Loads the account details.

```typescript
const account: AccountDetails = await sdk.accounts.loadAccount();

console.log(account.name);
```

### Get owned items

Retrieves the items owned by the account.

```typescript
const items: readonly ItemDetails[] = await sdk.accounts.getOwnedItems();

items.forEach((item) => {
  console.log(`${item.itemId} has ${item.usesLeft} uses left`);
});
```

## Actions

### Purchase Paypr

Purchases Paypr and deposits it into the account.

#### Estimate

Estimate the cost to purchase a given amount of Paypr:

```typescript
const estimate: PurchasePayprGasEstimateDetail = await sdk.accounts.estimatePurchasePaypr(amount);

console.log('Paypr cost:', estimate.payprCost);
```

#### Execute

Purchase the Paypr:

```typescript
const submissionId: string = await sdk.accounts.purchasePaypr(amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer is complete!');

const account = await sdk.accounts.loadAccount();

console.log(account.payprBalance);
```
