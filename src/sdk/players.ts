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

import { Sdk } from '../generated/graphql';
import {
  AcquireNextSkillLevelForPlayerEstimateDetails,
  AcquireNextSkillLevelForPlayerOptions,
  estimateAcquireNextSkillLevelForPlayer,
} from '../graphql/estimates/acquireNextSkillLevelForPlayer';
import { estimateCreatePlayer } from '../graphql/estimates/createPlayer';
import {
  estimateExecuteActivityForPlayer,
  ExecuteActivityForPlayerEstimateDetails,
  ExecuteActivityForPlayerOptions,
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
import { GasAndPayprEstimateDetails, GasAndTransactionEstimateDetails } from '../graphql/gasEstimate';
import { ItemDetails } from '../graphql/items';
import { createPlayer, CreatePlayerOptions } from '../graphql/mutations/createPlayer';
import { executeTransaction, ExecuteTransactionOptions } from '../graphql/mutations/executeTransaction';
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
  estimateCreatePlayer: () => Promise<GasAndTransactionEstimateDetails>;

  /**
   * Create a player with the given details
   * @param name the name of the player
   * @param options the transaction request or a signed transaction
   *
   * @returns a promise to a submission id
   */
  createPlayer: (name: string, options: CreatePlayerOptions) => Promise<string>;

  /**
   * Estimate upgrading a player
   * @param playerId the player id
   *
   * @returns a promise to the estimate
   */
  estimateUpgradePlayer: (playerId: string) => Promise<GasAndTransactionEstimateDetails>;

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
  ) => Promise<GasAndTransactionEstimateDetails>;

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
   * Estimate to mint an item for the player.
   *
   * @param playerId the player ID
   * @param artifactContractId the artifact contract ID
   *
   * @returns a promise to the estimate
   */
  estimateMintItem: (playerId: string, artifactContractId: string) => Promise<MintItemForPlayerEstimateDetails>;

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
  ) => Promise<GasAndTransactionEstimateDetails>;

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
   * Estimate how much it would cost to transfer the given amount of Paypr to the player
   *
   * @param playerId the player ID
   * @param amount the amount of Paypr to transfer
   *
   * @returns a promise to the estimate details
   */
  estimateTransferPayprToPlayer: (playerId: string, amount: number) => Promise<GasAndTransactionEstimateDetails>;

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
   * Executes a transaction on a player
   *
   * @param options either a transaction request or a signed transaction
   *
   * @returns a promise to a submission id
   */
  executeTransaction: (options: ExecuteTransactionOptions) => Promise<string>;
}

export const getPlayersSdk = (sdk: Sdk): PlayersSdk => ({
  estimateCreatePlayer: () => estimateCreatePlayer(sdk),
  createPlayer: (name, options) => createPlayer(sdk, name, options),

  estimateUpgradePlayer: (playerId: string) => estimateUpgradePlayer(sdk, playerId),

  loadPlayer: (playerId) => loadPlayer(sdk, playerId),
  getOwnedItems: (playerId, artifactContractId) => getPlayerItems(sdk, playerId, artifactContractId),

  getSkillLevel: (playerId, skillContractId) => getPlayerSkillLevel(sdk, playerId, skillContractId),

  getConsumableBalance: (playerId, consumableContractId) =>
    getPlayerConsumableBalance(sdk, playerId, consumableContractId),

  getPayprBalance: (playerId) => getPlayerPayprBalance(sdk, playerId),

  estimateMintConsumable: (playerId, consumableContractId, amount) =>
    estimateMintConsumableForPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableToPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableToPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableFromPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),

  estimateMintItem: (playerId, artifactContractId) => estimateMintItemForPlayer(sdk, playerId, artifactContractId),

  estimateTransferItemToPlayer: (playerId, artifactContractId, itemId) =>
    estimateTransferItemToPlayer(sdk, playerId, artifactContractId, itemId),

  estimateTransferItemFromPlayer: (playerId, artifactContractId, itemId) =>
    estimateTransferItemFromPlayer(sdk, playerId, artifactContractId, itemId),

  estimateTransferPayprToPlayer: (playerId, amount) => estimateTransferPayprToPlayer(sdk, playerId, amount),

  estimateTransferPayprFromPlayer: (playerId, amount) => estimateTransferPayprFromPlayer(sdk, playerId, amount),

  estimateAcquireNextSkillLevel: (playerId, skillContractId, options?) =>
    estimateAcquireNextSkillLevelForPlayer(sdk, playerId, skillContractId, options),

  estimateExecuteActivity: (playerId, activityContractId, options?) =>
    estimateExecuteActivityForPlayer(sdk, playerId, activityContractId, options),

  executeTransaction: (options) => executeTransaction(sdk, options),
});
