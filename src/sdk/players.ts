/*
 * Copyright (c) 2020 The Paypr Company, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * Paypr Contracts SDK and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { ApiConsumableAmountInput, ApiCreatePlayerInput, Sdk } from '../generated/graphql';
import {
  AcquireNextSkillLevelForPlayerEstimateDetails,
  estimateAcquireNextSkillLevelForPlayer,
} from '../graphql/estimates/acquireNextSkillLevelForPlayer';
import { estimateCreatePlayer } from '../graphql/estimates/createPlayer';
import {
  estimateExecuteActivityForPlayer,
  ExecuteActivityForPlayerEstimateDetails,
} from '../graphql/estimates/executeActivityForPlayer';
import { estimateMintConsumableForPlayer } from '../graphql/estimates/mintConsumableForPlayer';
import { estimateMintItemForPlayer, MintItemForPlayerEstimateDetails } from '../graphql/estimates/mintItemForPlayer';
import {
  estimateTransferConsumableFromPlayer,
  TransferConsumableFromPlayerEstimateDetails,
} from '../graphql/estimates/transferConsumableFromPlayer';
import { estimateTransferConsumableToPlayer } from '../graphql/estimates/transferConsumableToPlayer';
import {
  estimateTransferItemFromPlayer,
  TransferItemFromPlayerEstimateDetails,
} from '../graphql/estimates/transferItemFromPlayer';
import { estimateTransferItemToPlayer } from '../graphql/estimates/transferItemToPlayer';
import {
  estimateTransferPayprFromPlayer,
  TransferPayprFromPlayerEstimateDetails,
} from '../graphql/estimates/transferPayprFromPlayer';
import { estimateTransferPayprToPlayer } from '../graphql/estimates/transferPayprToPlayer';
import { estimateUpgradePlayer } from '../graphql/estimates/upgradePlayer';
import { GasAndPayprEstimateDetails, GasEstimateDetails } from '../graphql/gasEstimate';
import { ItemDetails } from '../graphql/items';
import {
  acquireNextSkillLevelForPlayer,
  AcquireNextSkillLevelForPlayerOptions,
} from '../graphql/mutations/acquireNextSkillLevelForPlayer';
import { createPlayer } from '../graphql/mutations/createPlayer';
import {
  executeActivityForPlayer,
  ExecuteActivityForPlayerOptions,
} from '../graphql/mutations/executeActivityForPlayer';
import { mintConsumableForPlayer } from '../graphql/mutations/mintConsumableForPlayer';
import { mintItemForPlayer } from '../graphql/mutations/mintItemForPlayer';
import { transferConsumableFromPlayer } from '../graphql/mutations/transferConsumableFromPlayer';
import { transferConsumableToPlayer } from '../graphql/mutations/transferConsumableToPlayer';
import { transferItemFromPlayer } from '../graphql/mutations/transferItemFromPlayer';
import { transferItemToPlayer } from '../graphql/mutations/transferItemToPlayer';
import { transferPayprFromPlayer } from '../graphql/mutations/transferPayprFromPlayer';
import { transferPayprToPlayer } from '../graphql/mutations/transferPayprToPlayer';
import { upgradePlayer } from '../graphql/mutations/upgradePlayer';
import {
  getPlayerConsumableBalance,
  getPlayerItems,
  getPlayerPayprBalance,
  getPlayerSkillLevel,
  loadPlayer,
  PlayerDetails,
} from '../graphql/players';

export interface PlayersSdk {
  /**
   * Estimate creating a player with the given details
   * @param input the player details
   *
   * @returns a promise to the estimate
   */
  estimateCreatePlayer: (input: ApiCreatePlayerInput) => Promise<GasEstimateDetails>;

  /**
   * Create a player with the given details
   * @param input the player details
   *
   * @returns a promise to a submission id
   */
  createPlayer: (input: ApiCreatePlayerInput) => Promise<string>;

  /**
   * Estimate upgrading a player
   * @param playerId the player id
   *
   * @returns a promise to the estimate
   */
  estimateUpgradePlayer: (playerId: string) => Promise<GasEstimateDetails>;

  /**
   * Upgrade the given player to the latest version
   * @param playerId the player id
   *
   * @returns a promise to a submission id
   */
  upgradePlayer: (playerId: string) => Promise<string>;

  /**
   * Loads player details by ID
   * @param playerId the player ID
   *
   * @returns a promise to the player details
   */
  loadPlayer: (playerId: string) => Promise<PlayerDetails>;

  /**
   * Retrieves the items owned by the player for the given artifact.
   * @param artifactContractId the artifact contract ID
   *
   * @returns a promise to a list of items
   */
  getOwnedItems: (playerId: string, artifactContractId: string) => Promise<readonly ItemDetails[]>;

  /**
   * Gets the player's skill level
   *
   * @param playerId the player ID
   * @param skillContractId the sill contract ID
   *
   * @returns a promise to the level
   */
  getSkillLevel: (playerId: string, skillContractId: string) => Promise<number>;

  /**
   * Gets the player's consumable balance
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   *
   * @returns a promise to the balance
   */
  getConsumableBalance: (playerId: string, consumableContractId: string) => Promise<number>;

  /**
   * Gets the player's Paypr balance
   *
   * @param playerId the player ID
   *
   * @returns a promise to the balance
   */
  getPayprBalance: (playerId: string) => Promise<number>;

  /**
   * Estimate how much it would cost to mint the given amount of consumable for the player
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to mint
   *
   * @returns a promise to the estimate details
   */
  estimateMintConsumable: (
    playerId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<GasAndPayprEstimateDetails>;

  /**
   * Mints the given amount of consumable for the player
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to mint
   *
   * @returns a promise to a submission id
   */
  mintConsumable: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Estimate how much it would cost to transfer the given amount of consumable to the player
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferConsumableToPlayer: (
    playerId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<GasAndPayprEstimateDetails>;

  /**
   * Transfers the given amount of consumable to the player
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Estimate to transfer the given amount of consumable from the player.
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to the estimate
   */
  estimateTransferConsumableFromPlayer: (
    playerId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<TransferConsumableFromPlayerEstimateDetails>;

  /**
   * Transfers the given amount of consumable from the player.
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;

  /**
   * Estimate to mint an item for the player.
   *
   * @param playerId the player ID
   * @param artifactContractId the artifact contract ID
   *
   * @returns a promise to the estimate
   */
  estimateMintItem: (playerId: string, artifactContractId: string) => Promise<MintItemForPlayerEstimateDetails>;

  /**
   * Mints an item for the player.
   *
   * @param playerId the player ID
   * @param artifactContractId the artifact contract ID
   *
   * @returns a promise to a submission id
   */
  mintItem: (playerId: string, artifactContractId: string) => Promise<string>;

  /**
   * Estimate how much it would cost to transfer the given item to the player
   *
   * @param playerId the player ID
   * @param artifactContractId the item contract ID
   * @param itemId the ID of the item to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferItemToPlayer: (
    playerId: string,
    artifactContractId: string,
    itemId: string,
  ) => Promise<GasEstimateDetails>;

  /**
   * Transfers the given item to the player
   *
   * @param playerId the player ID
   * @param artifactContractId the item contract ID
   * @param itemId the ID of the item to transfer
   *
   * @returns a promise to a submission id
   */
  transferItemToPlayer: (playerId: string, artifactContractId: string, itemId: string) => Promise<string>;

  /**
   * Estimate to transfer the given item from the player.
   *
   * @param playerId the player ID
   * @param artifactContractId the item contract ID
   * @param itemId the ID of the item to transfer
   *
   * @returns a promise to the estimate
   */
  estimateTransferItemFromPlayer: (
    playerId: string,
    artifactContractId: string,
    itemId: string,
  ) => Promise<TransferItemFromPlayerEstimateDetails>;

  /**
   * Transfers the given item from the player.
   *
   * @param playerId the player ID
   * @param artifactContractId the item contract ID
   * @param itemId the ID of the item to transfer
   *
   * @returns a promise to a submission id
   */
  transferItemFromPlayer: (playerId: string, artifactContractId: string, itemId: string) => Promise<string>;

  /**
   * Estimate how much it would cost to transfer the given amount of Paypr to the player
   *
   * @param playerId the player ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferPayprToPlayer: (playerId: string, amount: number) => Promise<GasEstimateDetails>;

  /**
   * Transfers the given amount of Paypr to the player
   *
   * @param playerId the player ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to a submission id
   */
  transferPayprToPlayer: (playerId: string, amount: number) => Promise<string>;

  /**
   * Estimate to transfer the given amount of Paypr from the player.
   *
   * @param playerId the player ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate
   */
  estimateTransferPayprFromPlayer: (
    playerId: string,
    amount: number,
  ) => Promise<TransferPayprFromPlayerEstimateDetails>;

  /**
   * Transfers the given amount of Paypr from the player.
   *
   * @param playerId the player ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to a submission id
   */
  transferPayprFromPlayer: (playerId: string, amount: number) => Promise<string>;

  /**
   * Estimate to acquire the next skill level for the player.
   *
   * @param playerId the player ID
   * @param skillContractId the skill contract ID
   * @param options execution options
   *
   * @returns a promise to the estimate
   */
  estimateAcquireNextSkillLevel: (
    playerId: string,
    skillContractId: string,
    options?: AcquireNextSkillLevelForPlayerOptions,
  ) => Promise<AcquireNextSkillLevelForPlayerEstimateDetails>;

  /**
   * Acquires the next skill level for the player.
   *
   * @param playerId the player ID
   * @param skillContractId the skill contract ID
   * @param amountsToProvide the amounts of consumable to provide
   * @param options execution options
   *
   * @returns a promise to a submission id
   */
  acquireNextSkillLevel: (
    playerId: string,
    skillContractId: string,
    amountsToProvide: ApiConsumableAmountInput[],
    options?: AcquireNextSkillLevelForPlayerOptions,
  ) => Promise<string>;

  /**
   * Estimate to execute an activity for the player.
   *
   * @param playerId the player ID
   * @param activityContractId the activity contract ID
   * @param options execution options
   *
   * @returns a promise to the estimate
   */
  estimateExecuteActivity: (
    playerId: string,
    activityContractId: string,
    options?: ExecuteActivityForPlayerOptions,
  ) => Promise<ExecuteActivityForPlayerEstimateDetails>;

  /**
   * Executes the activity for the player.
   *
   * @param playerId the player ID
   * @param activityContractId the activity contract ID
   * @param amountsToProvide the amounts of consumable to provide
   * @param amountsToConsume the amounts of consumable to consume
   * @param options execution options
   *
   * @returns a promise to a submission id
   */
  executeActivity: (
    playerId: string,
    activityContractId: string,
    amountsToProvide: ApiConsumableAmountInput[],
    amountsToConsume: ApiConsumableAmountInput[],
    options?: ExecuteActivityForPlayerOptions,
  ) => Promise<string>;
}

export const getPlayersSdk = (sdk: Sdk): PlayersSdk => ({
  estimateCreatePlayer: (input: ApiCreatePlayerInput) => estimateCreatePlayer(sdk, input),
  createPlayer: (input: ApiCreatePlayerInput) => createPlayer(sdk, input),

  estimateUpgradePlayer: (playerId: string) => estimateUpgradePlayer(sdk, playerId),
  upgradePlayer: (playerId: string) => upgradePlayer(sdk, playerId),

  loadPlayer: (playerId) => loadPlayer(sdk, playerId),
  getOwnedItems: (playerId, artifactContractId) => getPlayerItems(sdk, playerId, artifactContractId),

  getSkillLevel: (playerId, skillContractId) => getPlayerSkillLevel(sdk, playerId, skillContractId),

  getConsumableBalance: (playerId, consumableContractId) =>
    getPlayerConsumableBalance(sdk, playerId, consumableContractId),

  getPayprBalance: (playerId) => getPlayerPayprBalance(sdk, playerId),

  estimateMintConsumable: (playerId, consumableContractId, amount) =>
    estimateMintConsumableForPlayer(sdk, playerId, consumableContractId, amount),
  mintConsumable: (playerId, consumableContractId, amount) =>
    mintConsumableForPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableToPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableToPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableToPlayer: (playerId, consumableContractId, amount) =>
    transferConsumableToPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableFromPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableFromPlayer: (playerId, consumableContractId, amount) =>
    transferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),

  estimateMintItem: (playerId, artifactContractId) => estimateMintItemForPlayer(sdk, playerId, artifactContractId),
  mintItem: (playerId, artifactContractId) => mintItemForPlayer(sdk, playerId, artifactContractId),

  estimateTransferItemToPlayer: (playerId, artifactContractId, itemId) =>
    estimateTransferItemToPlayer(sdk, playerId, artifactContractId, itemId),
  transferItemToPlayer: (playerId, artifactContractId, itemId) =>
    transferItemToPlayer(sdk, playerId, artifactContractId, itemId),

  estimateTransferItemFromPlayer: (playerId, artifactContractId, itemId) =>
    estimateTransferItemFromPlayer(sdk, playerId, artifactContractId, itemId),
  transferItemFromPlayer: (playerId, artifactContractId, itemId) =>
    transferItemFromPlayer(sdk, playerId, artifactContractId, itemId),

  estimateTransferPayprToPlayer: (playerId, amount) => estimateTransferPayprToPlayer(sdk, playerId, amount),
  transferPayprToPlayer: (playerId, amount) => transferPayprToPlayer(sdk, playerId, amount),

  estimateTransferPayprFromPlayer: (playerId, amount) => estimateTransferPayprFromPlayer(sdk, playerId, amount),
  transferPayprFromPlayer: (playerId, amount) => transferPayprFromPlayer(sdk, playerId, amount),

  estimateAcquireNextSkillLevel: (playerId, skillContractId, options?) =>
    estimateAcquireNextSkillLevelForPlayer(sdk, playerId, skillContractId, options),
  acquireNextSkillLevel: (playerId, skillContractId, amountsToProvide, options?) =>
    acquireNextSkillLevelForPlayer(sdk, playerId, skillContractId, amountsToProvide, options),

  estimateExecuteActivity: (playerId, activityContractId, options?) =>
    estimateExecuteActivityForPlayer(sdk, playerId, activityContractId, options),
  executeActivity: (playerId, activityContractId, amountsToProvide, amountsToConsume, options?) =>
    executeActivityForPlayer(sdk, playerId, activityContractId, amountsToProvide, amountsToConsume, options),
});
