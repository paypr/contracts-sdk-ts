# Contracts SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load contract details](#load-contract-details)
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

## Actions

No actions at this time.
