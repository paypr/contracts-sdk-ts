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

// access the Contracts SDK functionality with sdk.contracts
```

## Information

### Load contract details

Loads the contract details.

```typescript
const contract: ContractDetails = await sdk.contracts.loadContract();

console.log(contract.name);
```

## Actions

No actions at this time.
