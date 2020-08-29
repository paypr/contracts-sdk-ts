# Contracts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load contract details](#load-contract-details)
  - [Get consumable balance](#get-consumable-balance)
  - [Get Paypr balance](#get-paypr-balance)
  - [Get item details](#get-item-details)
  - [Get consumable amounts needed to mint an item](#get-consumable-amounts-needed-to-mint-an-item)
- [Actions](#actions)
  - [Transfer consumable to a contract](#transfer-consumable-to-a-contract)
  - [Transfer consumable from a contract](#transfer-consumable-from-a-contract)
  - [Transfer Paypr to a contract](#transfer-paypr-to-a-contract)
  - [Transfer Paypr from a contract](#transfer-paypr-from-a-contract)

## Access

Access to the Contracts SDK is available from the `contracts` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

sdk.contracts. // access the Contracts SDK functionality
```

## Information

### Load contract details

Loads the contract details.

```typescript
const contract: ContractDetails = await sdk.contracts.loadContract(contractId);

console.log(contract.name);
```

### Get consumable balance

Gets the consumable balance for a given contract.

```typescript
const contractConsumableBalance: number = await sdk.contracts.getConsumableBalance(contractId, consumableContractId);

console.log('Current balance:', contractConsumableBalance);
```

### Get Paypr balance

Gets the Paypr balance for a given contract.

```typescript
const contractPayprBalance: number = await sdk.contracts.getPayprBalance(contractId);

console.log('Current balance:', contractPayprBalance);
```

### Get item details

Gets the item details for a given item ID.

```typescript
const itemDetails: number = await sdk.contracts.getConsumableBalance(artifactContractId, itemId);

console.log('Num uses left:', itemDetails.usesLeft);
```

### Get consumable amounts needed to mint an item

Gets the consumable amounts needed to mint an item, along with the available balance for each consumable in the artifact.

```typescript
const consumableBalancesNeeded: readonly ConsumableAmountAndBalanceReference[] = await sdk.contracts.getConsumableAmountsNeededToMintItem(
  artifactContractId,
);

consumableBalancesNeeded.forEach(({ consumable, amount, balance }) => {
  console.log('Required consumable:', consumable.name);
  console.log('Required amount:', amount);
  console.log('Available balance:', balance);
});
```

## Actions

### Transfer consumable to a contract

Transfers a specific amount of consumable from your account to a contract.

#### Estimate

Estimate the cost in dollars and Paypr to transfer the consumable:

```typescript
const estimate = await sdk.contracts.estimateTransferConsumableToContract(contractId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Paypr amount:', estimate.payprAmount);
```

#### Execute

Transfer the consumable:

```typescript
const submissionId = await sdk.contracts.transferConsumableToContract(contractId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to contract is complete!');
console.log('New balance:', await sdk.contracts.getConsumableBalance(contractId, consumableContractId));
```

### Transfer consumable from a contract

Transfers a specific amount of consumable from a contract to your account.

#### Estimate

Estimate the cost to transfer the given amount of consumable:

```typescript
const estimate = await sdk.contracts.estimateTransferConsumableFromContract(contractId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the consumable:

```typescript
const submissionId = await sdk.contracts.transferConsumableFromContract(contractId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from contract is complete!');
console.log('New balance:', await sdk.contracts.getConsumableBalance(contractId, consumableContractId));
```

### Transfer Paypr to a contract

Transfers a specific amount of Paypr from your account to a contract.

#### Estimate

Estimate the cost to transfer the Paypr:

```typescript
const estimate = await sdk.contracts.estimateTransferPayprToContract(contractId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the Paypr:

```typescript
const submissionId = await sdk.contracts.transferPayprToContract(contractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to contract is complete!');

const contractPayprBalance = await sdk.contracts.getPayprBalance(contractId);
console.log('New balance:', contractPayprBalance);
```

### Transfer Paypr from a contract

Transfers a specific amount of Paypr from a contract to your account.

#### Estimate

Estimate the cost to transfer the given amount of Paypr:

```typescript
const estimate = await sdk.contracts.estimateTransferPayprFromContract(contractId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the Paypr:

```typescript
const submissionId = await sdk.contracts.transferPayprFromContract(contractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from contract is complete!');

const contractPayprBalance = await sdk.contracts.getPayprBalance(contractId);
console.log('New balance:', contractPayprBalance);
```
