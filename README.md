# Paypr Contracts SDK for JavaScript and Typescript

The Paypr Contracts SDK for JavaScript and Typescript is a simple client that
can be used to manipulate contracts based on Paypr within the Ethereum network.

See [https://paypr.money/](https://paypr.money/) for more details about Paypr.

## Installation

```
$ npm install @paypr/contracts-sdk-ts
```

## Usage

### Getting access to the SDK

`@paypr/contracts-sdk-ts` exposes the `getContractsSdk` function to get
the Contracts SDK.

To get the SDK, make sure that your API key is in the `PAYPR_API_KEY`
environment variable:

```javascript
import { getContractsSdk } from '@paypr/contracts-sdk-ts/dist';

const contractsSdk = getContractsSdk();

// access the SDK functionality with contractsSdk
```

Alternatively, pass your API key via the options:

```javascript
import { getContractsSdk } from '@paypr/contracts-sdk-ts/dist';

const contractsSdk = getContractsSdk({ apiKey: 'your-api-key-goes-here' });

// access the SDK functionality with contractsSdk
```

### Executing functions

All of the functionality is available as async functions on the API.

For example, to create a player, use the following:

```typescript
const submissionId: string = await contractsSdk.createPlayer({ name: 'Tom Jones' });

const submission: SubmissionDetails = await contractsSdk.waitForSubmissionDone(submissionId);

const player: PlayerDetails = submission.player;

console.log('Player:', player.name);
```

## Functionality

### Actions

#### Purchase

Creates a new player with the given name.

```typescript
const submissionId: string = await contractsSdk.createPlayer({ name: 'Tom Jones' });
```

#### Create a player

Creates a new player with the given name.

```typescript
const submissionId: string = await contractsSdk.createPlayer({ name: 'Tom Jones' });
```

#### Transfer consumable to/from a player

Transfers a specific amount of consumable to or from a player.

```typescript
const submissionId: string = await contractsSdk.transferConsumableToPlayer(playerId, consumableContractId, amount);

const submissionId: string = await contractsSdk.transferConsumableFromPlayer(playerId, consumableContractId, amount);
```

### Information

#### Load account details

Loads the account details.

```typescript
const account: AccountDetails = await contractsSdk.loadAccount();
```

#### Load contract details

Loads contract details by ID.

```typescript
const contract: ContractDetails = await contractsSdk.loadContract(contractId);
```

#### Load a player

Loads player details by ID.

```typescript
const player: PlayerDetails = await contractsSdk.loadPlayer(submissionId);
```

#### Get player consumable balance

Gets the consumable balance for a given player.

```typescript
const playerConsumableBalance: number = await contractsSdk.getPlayerConsumableBalance(playerId, consumableContractId);
```

#### Load a submission

Loads submission details by ID.

```typescript
const submission: SubmissionDetails = await contractsSdk.loadSubmission(submissionId);
```

### Utilities

#### Wait for Submission Done

Waits until the submission with the given ID is either completed or failed.

```typescript
const submissionId: string = // do something that returns a submission id
const submission: SubmissionDetails = await contractsSdk.waitForSubmissionDone(submissionId);
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more details about how to build
and test the software to help contribute.

## License

UNLICENSED
