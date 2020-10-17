# Players SDK

## Contents

- [Access](#access)
- [Information](#information)
  - [Load player details](#load-player-details)
  - [Get consumable balance](#get-consumable-balance)
  - [Get Paypr balance](#get-paypr-balance)
  - [Get owned items](#get-owned-items)
  - [Get skill level](#get-skill-level)
- [Actions](#actions)
  - [Create a player](#create-a-player)
  - [Mint consumable for a player](#mint-consumable-for-a-player)
  - [Transfer consumable to a player](#transfer-consumable-to-a-player)
  - [Transfer consumable from a player](#transfer-consumable-from-a-player)
  - [Mint an item for a player](#mint-an-item-for-a-player)
  - [Transfer an item to a player](#transfer-an-item-to-a-player)
  - [Transfer an item from a player](#transfer-an-item-from-a-player)
  - [Transfer Paypr to a player](#transfer-paypr-to-a-player)
  - [Transfer Paypr from a player](#transfer-paypr-from-a-player)
  - [Upgrade a player](#upgrade-a-player)
  - [Acquire the next skill level for a player](#acquire-the-next-skill-level-for-a-player)
  - [Execute an activity level for a player](#execute-an-activity-for-a-player)

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

### Get consumable balance

Gets the consumable balance for a given player.

```typescript
const playerConsumableBalance: number = await sdk.players.getConsumableBalance(playerId, consumableContractId);

console.log('Current balance:', playerConsumableBalance);
```

### Get Paypr balance

Gets the Paypr balance for a given player.

```typescript
const playerPayprBalance: number = await sdk.players.getPayprBalance(playerId);

console.log('Current balance:', playerPayprBalance);
```

### Get owned items

Retrieves the items owned by the given player.

```typescript
const items: readonly ItemDetails[] = await sdk.players.getOwnedItems(playerId);

items.forEach((item) => {
  console.log(`${item.itemId} has ${item.usesLeft} uses left`);
});
```

### Get skill level

Gets the skill level for a given player.

```typescript
const playerSkillLevel: number = await sdk.players.getSkillLevel(playerId, skillContractId);

console.log('Current level:', playerSkillLevel);
```

## Actions

### Create a player

Creates a new player with the given name.

#### Estimate

Estimate creating the player:

```typescript
const estimate = await sdk.players.estimateCreatePlayer({ name: 'Tom Jones' });

console.log(estimate.gasCost);
```

#### Execute

Create the player:

```typescript
const submissionId = await sdk.players.createPlayer({ name: 'Tom Jones' });

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log(player.name);
```

### Upgrade a player

Upgrades a player with a given ID to the latest version of the Ethereum contract.

#### Estimate

Estimate upgrading the player:

```typescript
const estimate = await sdk.players.estimateUpgradePlayer(playerId);

console.log(estimate.gasCost);
```

#### Execute

Upgrade the player:

```typescript
const submissionId = await sdk.players.upgradePlayer(playerId);

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log(player.version);
```

### Mint consumable for a player

Mints a specific amount of consumable for a player.

#### Estimate

Estimate the cost in dollars and Paypr to mint the consumable:

```typescript
const estimate = await sdk.players.estimateMintConsumable(playerId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Paypr amount:', estimate.payprAmount);
```

#### Execute

Mint the consumable:

```typescript
const submissionId = await sdk.players.mintConsumable(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Mint consuamble is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Transfer consumable to a player

Transfers a specific amount of consumable from your account to a player.

#### Estimate

Estimate the cost in dollars and Paypr for the transfer:

```typescript
const estimate = await sdk.players.estimateTransferConsumableToPlayer(playerId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
console.log('Paypr amount:', estimate.payprAmount);
```

#### Execute

Transfer the consumable:

```typescript
const submissionId = await sdk.players.transferConsumableToPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Transfer consumable from a player

Transfers a specific amount of consumable from a player to your account.

#### Estimate

Estimate the cost to transfer the consumable:

```typescript
const estimate = await sdk.players.estimateTransferConsumableFromPlayer(playerId, consumableContractId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the consumable:

```typescript
const submissionId = await sdk.players.transferConsumableFromPlayer(playerId, consumableContractId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from player is complete!');
console.log('New balance:', await sdk.players.getConsumableBalance(playerId, consumableContractId));
```

### Mint an item for a player

Mint an item for a player.

#### Estimate

Estimate the cost to mint the item:

```typescript
const estimate = await sdk.players.estimateMintItem(playerId, activityContractId);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Execute the item:

```typescript
const submissionId = await sdk.players.mintItem(playerId, activityContractId);

const submission = await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Item minted:', submission.item?.itemId);
```

### Transfer an item to a player

Transfers a specific item from your account to a player.

#### Estimate

Estimate the cost for the transfer:

```typescript
const estimate = await sdk.players.estimateTransferItemToPlayer(playerId, artifactContractId, itemId);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the item:

```typescript
const submissionId = await sdk.players.transferItemToPlayer(playerId, artifactContractId, itemId);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to player is complete!');
```

### Transfer an item from a player

Transfers a specific item from a player to your account.

#### Estimate

Estimate the cost to transfer the item:

```typescript
const estimate = await sdk.players.estimateTransferItemFromPlayer(playerId, artifactContractId, itemId);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the item:

```typescript
const submissionId = await sdk.players.transferItemFromPlayer(playerId, artifactContractId, itemId);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from player is complete!');
```

### Transfer Paypr to a player

Transfers a specific amount of Paypr from your account to a player.

#### Estimate

Estimate the cost for the transfer:

```typescript
const estimate = await sdk.players.estimateTransferPayprToPlayer(playerId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the Paypr:

```typescript
const submissionId = await sdk.players.transferPayprToPlayer(playerId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer to player is complete!');

const playerPayprBalance = await sdk.players.getPayprBalance(playerId);
console.log('New balance:', playerPayprBalance);
```

### Transfer Paypr from a player

Transfers a specific amount of Paypr from a player to your account.

#### Estimate

Estimate the cost to transfer the Paypr:

```typescript
const estimate = await sdk.players.estimateTransferPayprFromPlayer(playerId, amount);

console.log('Gas cost:', estimate.gasCost);
```

#### Execute

Transfer the Paypr:

```typescript
const submissionId = await sdk.players.transferPayprFromPlayer(playerId, amount);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Transfer from player is complete!');

const playerPayprBalance = await sdk.players.getPayprBalance(playerId);
console.log('New balance:', playerPayprBalance);
```

### Acquire the next skill level for a player

Acquires the next skill level for a player.

#### Estimate

Estimate the cost and consumables needed to acquire the skill level:

```typescript
const estimate = await sdk.players.estimateAcquireNextSkillLevel(playerId, skillContractId);

console.log('Consumables needed:', estimate.consumableAmountsNeeded);
```

#### Execute

Acquire the skill level:

```typescript
const submissionId = await sdk.players.acquireNextSkillLevel(playerId, skillContractId, consumableAmountsToProvide);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Skill acquired!');
console.log('New skill level:', await sdk.players.getSkillLevel(playerId, skillContractId));
```

### Execute an activity for a player

Executes an activity for a player.

#### Estimate

Estimate the cost and consumables needed to execute the activity:

```typescript
const estimate = await sdk.players.estimateExecuteActivity(playerId, activityContractId);

console.log('Consumables needed:', estimate.consumableAmountsNeeded);
console.log('Consumables provided:', estimate.consumableAmountsProvided);
```

#### Execute

Execute the activity:

```typescript
const submissionId = await sdk.players.executeActivity(
  playerId,
  activityContractId,
  consumableAmountsToProvide,
  consumableAmountsToConsume,
);

await sdk.submissions.waitForSubmissionDone(submissionId);

console.log('Activity executed!');
```
