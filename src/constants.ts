/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BranchType, CompetitionBranch } from './types.ts';

export const COMPETITION_BRANCHES: CompetitionBranch[] = [
  {
    id: BranchType.LCC_PAI,
    name: 'Lomba Cerdas Cermat PAI (LCC-PAI)',
    category: 'Beregu',
    teamSize: 3,
    criteria: [
      { id: 'lemparan', label: 'Soal Lemparan', max: 1000, min: 0 },
      { id: 'rebutan', label: 'Soal Rebutan', max: 1000, min: -1000 },
    ],
  },
  {
    id: BranchType.LDC,
    name: 'Lomba Da’i Cilik (LDC)',
    category: 'Individu',
    teamSize: 1,
    criteria: [
      { id: 'tema', label: 'Kesesuaian tema dan isi', max: 30, min: 15 },
      { id: 'sistematika', label: 'Sistematika (pembuka, isi, penutup)', max: 30, min: 15 },
      { id: 'penguasaan', label: 'Penguasaan Materi', max: 40, min: 20 },
      { id: 'bahasa', label: 'Gaya Bahasa', max: 30, min: 15 },
      { id: 'ekspresi', label: 'Ekspresi wajah dan retorika', max: 30, min: 15 },
      { id: 'kefasihan', label: 'Kefasihan melafazkan ayat/hadits', max: 30, min: 15 },
      { id: 'waktu', label: 'Ketepatan Waktu', max: 10, min: 5 },
    ],
  },
  {
    id: BranchType.MTQ,
    name: 'Musabaqah Tilawatil Qur’an (MTQ)',
    category: 'Individu',
    teamSize: 1,
    criteria: [
      { id: 'tajwid', label: 'Bidang Tajwid Makharijul Huruf', max: 60, min: 30 },
      { id: 'fashahah', label: 'Bidang Fashahah wal Adab', max: 40, min: 20 },
      { id: 'suara', label: 'Bidang Suara', max: 40, min: 20 },
      { id: 'lagu', label: 'Bidang Lagu/Nagmah', max: 60, min: 30 },
    ],
  },
  {
    id: BranchType.MHQ,
    name: 'Musabaqah Hifdzil Qur’an (MHQ)',
    category: 'Individu',
    teamSize: 1,
    criteria: [
      { id: 'tajwid', label: 'Bidang Tajwid', max: 50, min: 25 },
      { id: 'fashahah', label: 'Bidang Fashahah wal Adab', max: 50, min: 25 },
      { id: 'tahfidz', label: 'Bidang Tahfidz (Hafalan)', max: 100, min: 50 },
    ],
  },
  {
    id: BranchType.LKI,
    name: 'Lomba Kaligrafi Islam (LKI)',
    category: 'Individu',
    teamSize: 1,
    criteria: [
      { id: 'kaidah', label: 'Ketetapan Kaidah Tulisan', max: 100, min: 50 },
      { id: 'kebersihan', label: 'Kebersihan, Keindahan Penulisan', max: 10, min: 5 },
      { id: 'keserasian', label: 'Keserasian Warna & Ornament', max: 90, min: 45 },
    ],
  },
  {
    id: BranchType.LPSB,
    name: 'Lomba Praktek Sholat Berjamaah (LPSB)',
    category: 'Beregu',
    teamSize: 3,
    criteria: [
      { id: 'bacaan', label: 'Kesempurnaan bacaan', max: 100, min: 50 },
      { id: 'gerakan', label: 'Kesempurnaan gerakan', max: 100, min: 50 },
      { id: 'pakaian', label: 'Pakaian', max: 50, min: 25 },
    ],
  },
  {
    id: BranchType.LPA,
    name: 'Lomba Praktek Adzan (LPA)',
    category: 'Individu',
    teamSize: 1,
    criteria: [
      { id: 'tajwid', label: 'Bidang Tajwid dan Fashohah', max: 100, min: 50 },
      { id: 'irama', label: 'Bidang Irama & Suara', max: 100, min: 50 },
      { id: 'adab', label: 'Adab, Kerapihan', max: 25, min: 15 },
      { id: 'doa', label: 'Pembacaan Do’a sesudah adzan', max: 25, min: 15 },
    ],
  },
];
