import { ApiCreatePlayerInput, Sdk } from '../generated/graphql';
import { createPlayer } from '../graphql/mutations/createPlayer';
import { transferConsumableFromPlayer } from '../graphql/mutations/transferConsumableFromPlayer';
import { transferConsumableToPlayer } from '../graphql/mutations/transferConsumableToPlayer';
import { getPlayerConsumableBalance, getPlayerSkillLevel, loadPlayer, PlayerDetails } from '../graphql/players';

export interface PlayersSdk {
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
  createPlayer: (input: ApiCreatePlayerInput) => createPlayer(sdk, input),
  loadPlayer: (playerId: string) => loadPlayer(sdk, playerId),

  getSkillLevel: (playerId: string, skillContractId: string) => getPlayerSkillLevel(sdk, playerId, skillContractId),

  getConsumableBalance: (playerId: string, consumableContractId: string) =>
    getPlayerConsumableBalance(sdk, playerId, consumableContractId),

  transferConsumableToPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    transferConsumableToPlayer(sdk, playerId, consumableContractId, amount),
  transferConsumableFromPlayer: (playerId: string, consumableContractId: string, amount: number) =>
    transferConsumableFromPlayer(sdk, playerId, consumableContractId, amount),
});
