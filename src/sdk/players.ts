import { ApiConsumableAmountInput, ApiCreatePlayerInput, Sdk } from '../generated/graphql';
import {
  AcquireNextSkillLevelForPlayerEstimateDetails,
  estimateAcquireNextSkillLevelForPlayer,
} from '../graphql/estimates/acquireNextSkillLevelForPlayer';
import { estimateCreatePlayer } from '../graphql/estimates/createPlayer';
import {
  estimateTransferConsumableFromPlayer,
  TransferConsumableFromPlayerEstimateDetails,
} from '../graphql/estimates/transferConsumableFromPlayer';
import { estimateTransferConsumableToPlayer } from '../graphql/estimates/transferConsumableToPlayer';
import { GasAndPayprEstimateDetails, GasEstimateDetails } from '../graphql/gasEstimate';
import {
  acquireNextSkillLevelForPlayer,
  AcquireNextSkillLevelForPlayerOptions,
} from '../graphql/mutations/acquireNextSkillLevelForPlayer';
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

  /**
   * Estimate to acquire the next skill level for the player.
   *
   * @param playerId the player ID
   * @param skillContractId the skill contract ID
   * @param options execution options
   *
   * @returns a promise to a submission id
   */
  estimateAcquireNextSkillLevel: (
    playerId: string,
    skillContractId: string,
    options?: AcquireNextSkillLevelForPlayerOptions,
  ) => Promise<AcquireNextSkillLevelForPlayerEstimateDetails>;

  /**
   * Transfer's the given amount of consumable from the player.
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
}

export const getPlayersSdk = (sdk: Sdk): PlayersSdk => ({
  estimateCreatePlayer: (input: ApiCreatePlayerInput) => estimateCreatePlayer(sdk, input),
  createPlayer: (input: ApiCreatePlayerInput) => createPlayer(sdk, input),

  loadPlayer: (playerId) => loadPlayer(sdk, playerId),

  getSkillLevel: (playerId, skillContractId) => getPlayerSkillLevel(sdk, playerId, skillContractId),

  getConsumableBalance: (playerId, consumableContractId) =>
    getPlayerConsumableBalance(sdk, playerId, consumableContractId),

  estimateTransferConsumableToPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableToPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableToPlayer: (playerId, consumableContractId, amount) =>
    transferConsumableToPlayer(sdk, playerId, consumableContractId, amount),

  estimateTransferConsumableFromPlayer: (playerId, consumableContractId, amount) =>
    estimateTransferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableFromPlayer: (playerId, consumableContractId, amount) =>
    transferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),

  estimateAcquireNextSkillLevel: (playerId, skillContractId, options?) =>
    estimateAcquireNextSkillLevelForPlayer(sdk, playerId, skillContractId, options),

  acquireNextSkillLevel: (playerId, skillContractId, amountsToProvide, options?) =>
    acquireNextSkillLevelForPlayer(sdk, playerId, skillContractId, amountsToProvide, options),
});
