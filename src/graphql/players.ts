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

import gql from 'graphql-tag';
import { ApiPlayerDetails, ApiPlayerReference, Sdk } from '../generated/graphql';
import { ArgumentError } from '../utils/errors';
import { itemDetailsFragment } from './items';

/** Reference to the player */
export type PlayerReference = ApiPlayerReference;

/** Details for the Player */
export type PlayerDetails = ApiPlayerDetails;

export const playerReferenceFragment = gql`
  fragment PlayerReference on Player {
    id
    address
    name
  }
`;

export const playerDetailsFragment = gql`
  fragment PlayerDetails on Player {
    ...PlayerReference
    version
    needsUpgrade
    payprBalance
    createdAt
    updatedAt
  }
  ${playerReferenceFragment}
`;

export const loadPlayer = async (sdk: Sdk, playerId: string) => {
  const { player } = await sdk.loadPlayer({ playerId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  return player;
};

gql`
  query loadPlayer($playerId: ID!) {
    player(id: $playerId) {
      ...PlayerDetails
    }
  }
  ${playerDetailsFragment}
`;

export const getPlayerSkillLevel = async (sdk: Sdk, playerId: string, skillContractId: string) => {
  const { player } = await sdk.getPlayerSkillLevel({ playerId, skillContractId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  const { skillLevel } = player;
  return skillLevel;
};

gql`
  query getPlayerSkillLevel($playerId: ID!, $skillContractId: ID!) {
    player(id: $playerId) {
      skillLevel(skillContractId: $skillContractId)
    }
  }
`;

export const getPlayerConsumableBalance = async (sdk: Sdk, playerId: string, consumableContractId: string) => {
  const { player } = await sdk.getPlayerConsumableBalance({ playerId, consumableContractId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  const { consumableBalance } = player;
  return consumableBalance;
};

gql`
  query getPlayerConsumableBalance($playerId: ID!, $consumableContractId: ID!) {
    player(id: $playerId) {
      consumableBalance(consumableContractId: $consumableContractId)
    }
  }
`;

export const getPlayerPayprBalance = async (sdk: Sdk, playerId: string) => {
  const { player } = await sdk.getPlayerPayprBalance({ playerId });
  if (!player) {
    throw new ArgumentError(`Player not found: ${playerId}`);
  }
  const { payprBalance } = player;
  return payprBalance;
};

gql`
  query getPlayerPayprBalance($playerId: ID!) {
    player(id: $playerId) {
      payprBalance
    }
  }
`;

export const getPlayerItems = async (sdk: Sdk, playerId: string, artifactContractId: string) => {
  const { contract } = await sdk.getPlayerItems({ playerId, artifactContractId });
  if (!contract) {
    throw new ArgumentError(`Artifact not found: ${artifactContractId}`);
  }

  if (!('playerItems' in contract)) {
    throw new ArgumentError(`Contract does not appear to be an artifact: ${artifactContractId}`);
  }

  return contract.playerItems;
};

gql`
  query getPlayerItems($playerId: ID!, $artifactContractId: ID!) {
    contract(id: $artifactContractId) {
      ... on ArtifactContract {
        playerItems(playerId: $playerId) {
          ...ItemDetails
        }
      }
    }
  }
  ${itemDetailsFragment}
`;
