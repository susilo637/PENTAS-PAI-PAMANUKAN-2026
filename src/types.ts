/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum BranchType {
  LCC_PAI = 'LCC_PAI',
  LDC = 'LDC',
  MTQ = 'MTQ',
  MHQ = 'MHQ',
  LKI = 'LKI',
  LPSB = 'LPSB',
  LPA = 'LPA',
}

export interface ScoringCriterion {
  id: string;
  label: string;
  max: number;
  min: number;
}

export interface CompetitionBranch {
  id: BranchType;
  name: string;
  category: 'Individu' | 'Beregu';
  teamSize: number;
  criteria: ScoringCriterion[];
}

export interface Participant {
  id: string;
  name: string;
  school: string;
  branchId: BranchType;
  gender: 'L' | 'P' | 'Regu';
  score?: number;
  details?: Record<string, number>;
}

export interface School {
  id: string;
  name: string;
}
