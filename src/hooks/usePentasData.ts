/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Participant, BranchType } from '../types.ts';

export function usePentasData() {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('pentas_participants');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pentas_participants', JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (p: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...p,
      id: Math.random().toString(36).substr(2, 9),
    };
    setParticipants(prev => [...prev, newParticipant]);
  };

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const saveScore = (participantId: string, details: Record<string, number>, total: number) => {
    updateParticipant(participantId, { details, score: total });
  };

  return {
    participants,
    addParticipant,
    updateParticipant,
    deleteParticipant,
    saveScore
  };
}
