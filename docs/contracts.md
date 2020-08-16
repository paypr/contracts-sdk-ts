# Contracts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load contract details](#load-contract-details)
  - [Get consumable balance](#get-consumable-balance)
  - [Estimate transfer consumable to a contract](#estimate-transfer-consumable-to-a-contract)
  - [Transfer consumable to a contract](#transfer-consumable-to-a-contract)
  - [Estimate transfer consumable from a contract](#estimate-transfer-consumable-from-a-contract)
  - [Transfer consumable from a contract](#transfer-consumable-from-a-contract)
- [Actions](#actions)

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

## Actions

### Estimate transfer consumable to a contract

Estimates the cost in dollars and Paypr to transfer a given amount of consumable
to a contract.

```typescript
const estimate = await sdk.contracts.estimateTransferConsumableToContract(contractId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Paypr amount:', estimate.payprAmount);
```

### Transfer consumable to a contract

Transfers a specific amount of consumable from your account to a contract.

```typescript
const submissionId = await sdk.contracts.transferConsumableToContract(contractId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to contract is complete!');
console.log('New balance:', await sdk.contracts.getConsumableBalance(contractId, consumableContractId));
```

### Estimate transfer consumable from a contract

Estimates the cost to transfer a given amount of consumable from a contract.

```typescript
const estimate = await sdk.contracts.estimateTransferConsumableFromContract(contractId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Contract consumable balance:', estimate.contractConsumableBalance);
```

### Transfer consumable from a contract

Transfers a specific amount of consumable from a contract to your account.

```typescript
const submissionId = await sdk.contracts.transferConsumableFromContract(contractId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from contract is complete!');
console.log('New balance:', await sdk.contracts.getConsumableBalance(contractId, consumableContractId));
```
