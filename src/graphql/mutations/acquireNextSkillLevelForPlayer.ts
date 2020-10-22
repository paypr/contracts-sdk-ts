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
import { ApiConsumableAmountInput, ApiItemInput, Sdk } from '../../generated/graphql';

export interface AcquireNextSkillLevelForPlayerOptions {
  /** Items to use when acquiring the skill level (optional) */
  itemsToUse?: ApiItemInput[];
}

export const acquireNextSkillLevelForPlayer = async (
  sdk: Sdk,
  playerId: string,
  skillContractId: string,
  amountsToProvide: ApiConsumableAmountInput[],
  { itemsToUse }: AcquireNextSkillLevelForPlayerOptions = {},
) => {
  const {
    acquireNextSkillLevelForPlayer: {
      submission: { id: submissionId },
    },
  } = await sdk.acquireNextSkillLevelForPlayer({
    playerId,
    skillContractId,
    amountsToProvide,
    itemsToUse: itemsToUse || [],
  });
  return submissionId;
};

gql`
  mutation acquireNextSkillLevelForPlayer(
    $playerId: ID!
    $skillContractId: ID!
    $itemsToUse: [ItemInput!]
    $amountsToProvide: [ConsumableAmountInput!]!
  ) {
    acquireNextSkillLevelForPlayer(
      playerId: $playerId
      skillContractId: $skillContractId
      itemsToUse: $itemsToUse
      amountsToProvide: $amountsToProvide
    ) {
      submission {
        id
      }
    }
  }
`;
