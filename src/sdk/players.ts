import { ApiCreatePlayerInput, Sdk } from '../generated/graphql';
import { estimateCreatePlayer } from '../graphql/estimates/createPlayer';
import {
  estimateTransferConsumableFromPlayer,
  TransferConsumableFromPlayerEstimateDetails,
} from '../graphql/estimates/transferConsumableFromPlayer';
import { estimateTransferConsumableToPlayer } from '../graphql/estimates/transferConsumableToPlayer';
import { GasAndPayprEstimateDetails, GasEstimateDetails } from '../graphql/gasEstimate';
import { createPlayer } from '../graphql/mutations/createPlayer';
import { transferConsumableFromPlayer } from '../graphql/mutations/transferConsumableFromPlayer';
import { transferConsumableToPlayer } from '../graphql/mutations/transferConsumableToPlayer';
import { getPlayerConsumableBalance, getPlayerSkillLevel, loadPlayer, PlayerDetails } from '../graphql/players';

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
   * Loads player details by ID
   * @param playerId the player ID
   *
   * @returns a promise to the player details
   */
  loadPlayer: (playerId: string) => Promise<PlayerDetails>;

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
   * Transfer's the given amount of consumable to the player
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
   * @returns a promise to a submission id
   */
  estimateTransferConsumableFromPlayer: (
    playerId: string,
    consumableContractId: string,
    amount: number,
  ) => Promise<TransferConsumableFromPlayerEstimateDetails>;

  /**
   * Transfer's the given amount of consumable from the player.
   *
   * @param playerId the player ID
   * @param consumableContractId the consumable contract ID
   * @param amount the amount of consumable to transfer
   *
   * @returns a promise to a submission id
   */
  transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) => Promise<string>;
}

export const getPlayersSdk = (sdk: Sdk): PlayersSdk => ({
  estimateCreatePlayer: (input: ApiCreatePlayerInput) => estimateCreatePlayer(sdk, input),
  createPlayer: (input: ApiCreatePlayerInput) => createPlayer(sdk, input),

  loadPlayer: (playerId: string) => loadPlayer(sdk, playerId),

  getSkillLevel: (playerId: string, skillContractId: string) => getPlayerSkillLevel(sdk, playerId, skillContractId),

  getConsumableBalance: (playerId: string, consumableContractId: string) =>
    getPlayerConsumableBalance(sdk, playerId, consumableContractId),

  estimateTransferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    estimateTransferConsumableToPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    transferConsumableToPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    estimateTransferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    transferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),
});
