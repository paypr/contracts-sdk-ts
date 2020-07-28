# Players SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load player details](#load-player-details)
  - [Get skill level](#get-skill-level)
  - [Get consumable balance](#get-consumable-balance)
- [Actions](#actions)
  - [Estimate create a player](#estimate-create-a-player)
  - [Create a player](#create-a-player)
  - [Estimate transfer consumable to a player](#estimate-transfer-consumable-to-a-player)
  - [Transfer consumable to a player](#transfer-consumable-to-a-player)
  - [Estimate transfer consumable from a player](#estimate-transfer-consumable-from-a-player)
  - [Transfer consumable from a player](#transfer-consumable-from-a-player)
  - [Estimate upgrade player](#estimate-upgrade-a-player)
  - [Upgrade a player](#upgrade-a-player)

## Access

Access to the Players SDK is available from the `players` field off the main
sdk object:

```typescript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

sdk.players. // access the Players SDK functionality
```

## Information

### Load player details

Loads the player details.

```typescript
const player: PlayerDetails = await sdk.players.loadPlayer(playerId);

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

### Estimate create a player

Estimates creating a new player with the given name.

```typescript
const estimate = await sdk.players.estimateCreatePlayer({ name: 'Tom Jones' });

console.log(estimate.gasCost);
```

### Create a player

Creates a new player with the given name.

```typescript
const submissionId = await sdk.players.createPlayer({ name: 'Tom Jones' });

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log(player.name);
```

### Estimate upgrade a player

Estimates upgrading the player with the given ID.

```typescript
const estimate = await sdk.players.estimateUpgradePlayer(playerId);

console.log(estimate.gasCost);
```

### Upgrade a player

Upgrades the player with the given ID.

```typescript
const submissionId = await sdk.players.upgradePlayer(playerId);

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log(player.version);
```

### Estimate transfer consumable to a player

Estimates the cost in dollars and Paypr to transfer a given amount of consumable
to a player.

```typescript
const estimate = await sdk.players.estimateTransferConsumableToPlayer(playerId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Paypr amount:', estimate.payprAmount);
```

### Transfer consumable to a player

Transfers a specific amount of consumable from your account to a player.

```typescript
const submissionId = await sdk.players.transferConsumableToPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Estimate transfer consumable from a player

Estimates the cost to transfer a given amount of consumable from a player.

```typescript
const estimate = await sdk.players.estimateTransferConsumableFromPlayer(playerId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Player consumable balance:', estimate.playerConsumableBalance);
```

### Transfer consumable from a player

Transfers a specific amount of consumable from a player to your account.

```typescript
const submissionId = await sdk.players.transferConsumableFromPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Estimate acquire the next skill level for a player

Estimates the cost and consumables to acquire the next skill level for a player.

```typescript
const estimate = await sdk.players.estimateAcquireNextSkillLevelForPlayer(playerId, skillContractId);

console.log('Consumables needed:', estimate.consumableAmountsNeeded);
```

### Acquire the next skill level for a player

Acquires the next skill level for a player.

```typescript
const submissionId = await sdk.players.acquireNextSkillLevelForPlayer(
  playerId,
  skillContractId,
  consumableAmountsToProvide,
);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Skill acquired!');
console.log('New skill level:', await sdk.players.getSkillLevel(playerId, skillContractId));
```
