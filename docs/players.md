# Players SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load player details](#load-player-details)
  - [Get consumable balance](#get-consumable-balance)
- [Actions](#actions)
  - [Create a player](#create-a-player)
  - [Transfer consumable to a player](#transfer-consumable-to-a-player)
  - [Transfer consumable from a player](#transfer-consumable-from-a-player)

## Access

Access to the Players SDK is available from the `players` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

// access the Players SDK functionality with sdk.players
```

## Information

### Load player details

Loads the player details.

```typescript
const player: PlayerDetails = await sdk.players.loadPlayer();

console.log(player.name);
```

### Get skill level

Gets the skill level for a given player.

```typescript
const playerSkillLevel: number = await sdk.players.getSkillLevel(playerId, skillContractId);

console.log('Current level:', playerSkillLevel);
```

### Get consumable balance

Gets the consumable balance for a given player.

```typescript
const playerConsumableBalance: number = await sdk.players.getConsumableBalance(playerId, consumableContractId);

console.log('Current balance:', playerConsumableBalance);
```

## Actions

### Create a player

Creates a new player with the given name.

```typescript
const submissionId: string = await sdk.players.createPlayer({ name: 'Tom Jones' });

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log(player.name);
```

### Transfer consumable to a player

Transfers a specific amount of consumable from your account to a player.

```typescript
const submissionId: string = await sdk.players.transferConsumableToPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Transfer consumable from a player

Transfers a specific amount of consumable from a player to your account.

```typescript
const submissionId: string = await sdk.players.transferConsumableFromPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```
