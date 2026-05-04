/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  Plus, 
  Search,
  ChevronRight,
  GraduationCap,
  School as SchoolIcon,
  Medal,
  X,
  Save,
  Trash2,
  Edit2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BranchType, Participant } from './types.ts';
import { COMPETITION_BRANCHES } from './constants.ts';
import { usePentasData } from './hooks/usePentasData.ts';

type View = 'dashboard' | 'participants' | 'scoring' | 'recap';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const { participants, addParticipant, updateParticipant, deleteParticipant, saveScore } = usePentasData();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [scoringTarget, setScoringTarget] = useState<Participant | null>(null);

  // Participant Form State
  const [newParticipant, setNewParticipant] = useState<Omit<Participant, 'id'>>({
    name: '',
    school: '',
    branchId: BranchType.LCC_PAI,
    gender: 'L'
  });

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.school.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [participants, searchQuery]);

  const stats = useMemo(() => {
    return {
      totalParticipants: participants.length,
      totalSchools: new Set(participants.map(p => p.school)).size,
      completedScoring: participants.filter(p => p.score !== undefined).length
    };
  }, [participants]);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    addParticipant(newParticipant);
    setShowAddModal(false);
    setNewParticipant({ name: '', school: '', branchId: BranchType.LCC_PAI, gender: 'L' });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-text overflow-hidden">
      {/* Top Navigation Header */}
      <header className="h-16 bg-brand text-white flex items-center justify-between px-6 md:px-8 shadow-md flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">P</div>
          <div>
            <h1 className="text-lg font-bold leading-none">SIP-PAI 2026</h1>
            <p className="text-[10px] text-brand-light opacity-80 uppercase tracking-widest mt-1">Sistem Informasi Penilaian Pentas PAI</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs font-medium text-brand-light">Panitia Pelaksana</p>
            <p className="text-[10px] text-brand-accent uppercase">Kec. Pamanukan</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand/50 border-2 border-brand-accent/30 overflow-hidden flex items-center justify-center font-bold">
            P
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-panel border-r border-border hidden md:flex flex-col">
          <div className="p-4 border-b border-border bg-surface">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Menu Utama</label>
            <div className="space-y-1">
              <NavItem active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<BarChart3 size={18} />} label="Dashboard" />
              <NavItem active={activeView === 'participants'} onClick={() => setActiveView('participants')} icon={<Users size={18} />} label="Daftar Peserta" />
              <NavItem active={activeView === 'scoring'} onClick={() => setActiveView('scoring')} icon={<ClipboardCheck size={18} />} label="Input Nilai" />
              <NavItem active={activeView === 'recap'} onClick={() => setActiveView('recap')} icon={<Medal size={18} />} label="Rekapitulasi Akhir" />
            </div>
          </div>
          
          <div className="p-4 mt-auto border-t border-border">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-[10px] font-bold text-amber-800 uppercase mb-1 underline">Status Juknis</p>
              <p className="text-[10px] text-amber-700 leading-tight italic">Mengikuti Juknis Pentas PAI Kecamatan Pamanukan 2026.</p>
            </div>
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-panel border-t border-border p-2 flex justify-around z-30 shadow-lg">
          <button onClick={() => setActiveView('dashboard')} className={`p-2 rounded-lg ${activeView === 'dashboard' ? 'text-brand' : 'text-text-muted'}`}><BarChart3 size={20}/></button>
          <button onClick={() => setActiveView('participants')} className={`p-2 rounded-lg ${activeView === 'participants' ? 'text-brand' : 'text-text-muted'}`}><Users size={20}/></button>
          <button onClick={() => setActiveView('scoring')} className={`p-2 rounded-lg ${activeView === 'scoring' ? 'text-brand' : 'text-text-muted'}`}><ClipboardCheck size={20}/></button>
          <button onClick={() => setActiveView('recap')} className={`p-2 rounded-lg ${activeView === 'recap' ? 'text-brand' : 'text-text-muted'}`}><Medal size={20}/></button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-surface pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 max-w-7xl mx-auto">
                <header>
                  <h2 className="text-2xl font-bold text-text">Dashboard Overview</h2>
                  <p className="text-text-muted text-sm">Ringkasan status kegiatan Pentas PAI.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard label="Total Peserta" value={stats.totalParticipants} color="brand" />
                  <StatCard label="Asal Sekolah" value={stats.totalSchools} color="slate" />
                  <StatCard label="Selesai Dinilai" value={stats.completedScoring} color="emerald" border />
                  <StatCard label="Belum Dinilai" value={stats.totalParticipants - stats.completedScoring} color="amber" border />
                </div>

              {participants.length === 0 && (
                <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8 text-center space-y-4">
                  <h3 className="text-xl font-bold">Mulai dengan Data Sampel?</h3>
                  <p className="text-sm text-primary/60 max-w-lg mx-auto">Kami dapat mengisikan beberapa data peserta dan nilai contoh agar Anda dapat langsung mencoba fitur penilaian dan rekapitulasi.</p>
                  <button 
                    onClick={() => {
                      const samples = [
                        { name: 'Ahmad Fauzi', school: 'SDN 1 Pamanukan', branchId: BranchType.LPA, gender: 'L' as const },
                        { name: 'Siti Aminah', school: 'SDN 2 Pamanukan', branchId: BranchType.MTQ, gender: 'P' as const },
                        { name: 'Regu Ar-Rahman', school: 'SDIT Qurrota A\'yun', branchId: BranchType.LCC_PAI, gender: 'Regu' as const },
                        { name: 'Budi Santoso', school: 'SDN 1 Pamanukan', branchId: BranchType.MHQ, gender: 'L' as const },
                        { name: 'Laila Husna', school: 'SDIT Qurrota A\'yun', branchId: BranchType.LKI, gender: 'P' as const }
                      ];
                      samples.forEach(s => addParticipant(s));
                    }}
                    className="bg-secondary text-primary px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-secondary/10"
                  >
                    Generate Data Sampel
                  </button>
                </div>
              )}

              <div>
                <h3 className="text-2xl mb-4">Cabang Lomba</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMPETITION_BRANCHES.map(branch => {
                     const branchParticipants = participants.filter(p => p.branchId === branch.id);
                     const branchScored = branchParticipants.filter(p => p.score !== undefined).length;
                     return (
                      <div key={branch.id} className="p-5 bg-white rounded-2xl border border-primary/5 hover:border-secondary/30 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-warm rounded-lg group-hover:bg-secondary/10 transition-colors">
                            <GraduationCap className="text-primary" size={20} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">{branch.category}</span>
                        </div>
                        <h4 className="text-lg font-semibold mb-1">{branch.name}</h4>
                        <p className="text-xs text-primary/60 mb-4">{branchParticipants.length} Peserta Terdaftar</p>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => { setActiveView('scoring'); setSearchQuery(branch.name); }}
                            className="text-xs font-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            Buka Penilaian <ChevronRight size={14} />
                          </button>
                        </div>

                        {branchScored > 0 && branchScored === branchParticipants.length && (
                          <div className="absolute -right-2 -top-2 p-4 bg-secondary/10 rounded-bl-full">
                            <CheckCircle2 size={16} className="text-secondary ml-4 -mt-2" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'participants' && (
             <motion.div key="participants" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl">Daftar Peserta</h2>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-warm px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    <Plus size={18} /> Tambah Peserta
                  </button>
                </div>

              <div className="bg-panel rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface">
                  <h2 className="font-bold text-text">Data Peserta Pentas PAI</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 text-xs font-medium bg-brand text-white rounded-lg hover:bg-brand/90 transition-all flex items-center gap-2"
                    >
                      <Plus size={16} /> Tambah Peserta
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-surface border-b border-border">
                  <SearchInput value={searchQuery} onChange={setSearchQuery} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead>
                      <tr className="bg-surface text-[11px] font-bold text-text-muted uppercase tracking-wider">
                        <th className="px-6 py-4">Nama Peserta / Utusan</th>
                        <th className="px-6 py-4">Asal Sekolah</th>
                        <th className="px-6 py-4">Cabang Lomba</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-border">
                      {filteredParticipants.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-20 text-center text-text-muted italic">
                            Belum ada data peserta.
                          </td>
                        </tr>
                      ) : (
                        filteredParticipants.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50 bg-panel transition-colors">
                             <td className="px-6 py-4">
                               <div className="font-bold text-text">{p.name}</div>
                               <div className="text-[10px] text-text-muted uppercase tracking-wider">{p.gender === 'Regu' ? 'Regu' : p.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                             </td>
                             <td className="px-6 py-4 text-text-muted">{p.school}</td>
                             <td className="px-6 py-4">
                               <span className="px-2 py-1 bg-brand-light text-brand rounded text-[10px] font-bold uppercase">
                                 {COMPETITION_BRANCHES.find(b => b.id === p.branchId)?.name.split('(')[1]?.replace(')', '') || 'UMUM'}
                               </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                               <div className="flex justify-end gap-2">
                                 <button onClick={() => deleteParticipant(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                   <Trash2 size={16} />
                                 </button>
                               </div>
                             </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
             </motion.div>
          )}

          {activeView === 'scoring' && (
            <motion.div key="scoring" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl">Panel Penilaian</h2>
              </div>
              
              <SearchInput value={searchQuery} onChange={setSearchQuery} />

              <div className="grid grid-cols-1 gap-4">
                {filteredParticipants.map(p => {
                  const branch = COMPETITION_BRANCHES.find(b => b.id === p.branchId);
                  return (
                    <div key={p.id} className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.score !== undefined ? 'bg-green-100 text-green-600' : 'bg-secondary/10 text-secondary'}`}>
                          {p.score !== undefined ? <CheckCircle2 /> : <ClipboardCheck />}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{p.name}</h4>
                          <p className="text-xs text-primary/60">{p.school} • {branch?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        {p.score !== undefined && (
                          <div className="text-right">
                            <p className="text-[10px] uppercase font-bold text-primary/30 tracking-widest leading-none mb-1">Skor Total</p>
                            <p className="text-2xl font-display font-bold text-primary italic">{p.score}</p>
                          </div>
                        )}
                        <button 
                          onClick={() => setScoringTarget(p)}
                          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            p.score !== undefined 
                              ? 'border border-primary/10 hover:bg-warm' 
                              : 'bg-secondary text-primary shadow-lg shadow-secondary/20 hover:scale-[1.02]'
                          }`}
                        >
                          {p.score !== undefined ? 'Edit Nilai' : 'Input Nilai'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeView === 'recap' && (
            <motion.div key="recap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16 pb-20">
               <div className="text-center space-y-2 mb-10">
                 <h2 className="text-4xl font-display italic">Hasil Rekapitulasi Nilai</h2>
                 <p className="text-primary/60 uppercase tracking-[0.2em] text-xs font-bold leading-relaxed">Pentas PAI Tingkat Kecamatan Pamanukan<br/>Tahun 1447 H / 2026 M</p>
               </div>

               {/* Overall Champion Section */}
               <section className="bg-primary text-warm rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                   <Trophy size={200} />
                 </div>
                 <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                       <div className="space-y-4">
                         <h3 className="text-3xl font-serif">Klasemen Juara Umum</h3>
                         <p className="text-warm/60 text-sm max-w-md">Juara umum ditentukan berdasarkan perolehan medali emas (Juara 1), perak (Juara 2), dan perunggu (Juara 3).</p>
                       </div>
                       <div className="flex flex-wrap gap-4">
                         <button 
                           onClick={() => window.print()}
                           className="bg-secondary text-primary px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
                         >
                           Cetak Hasil
                         </button>
                         <button 
                            onClick={() => { if(confirm('Hapus semua data?')) { localStorage.clear(); window.location.reload(); } }}
                            className="bg-red-500/20 text-red-100 hover:bg-red-500/30 px-6 py-2 rounded-xl text-sm font-bold transition-all"
                         >
                           Reset Data
                         </button>
                       </div>
                    </div>

                    <div className="mt-12 overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-warm/10">
                             <th className="py-4 text-xs font-bold uppercase tracking-widest opacity-60">Peringkat</th>
                             <th className="py-4 text-xs font-bold uppercase tracking-widest opacity-60">Nama Sekolah</th>
                             <th className="py-4 text-center text-xs font-bold uppercase tracking-widest opacity-60">Emas</th>
                             <th className="py-4 text-center text-xs font-bold uppercase tracking-widest opacity-60">Perak</th>
                             <th className="py-4 text-center text-xs font-bold uppercase tracking-widest opacity-60">Perunggu</th>
                             <th className="py-4 text-center text-xs font-bold uppercase tracking-widest opacity-60">Total Poin</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-warm/5">
                           {(() => {
                             const schoolStats: Record<string, { gold: number, silver: number, bronze: number, points: number }> = {};
                             
                             COMPETITION_BRANCHES.forEach(branch => {
                               const sorted = participants
                                 .filter(p => p.branchId === branch.id && p.score !== undefined)
                                 .sort((a, b) => (b.score || 0) - (a.score || 0));
                               
                               sorted.slice(0, 3).forEach((p, idx) => {
                                 if (!schoolStats[p.school]) schoolStats[p.school] = { gold: 0, silver: 0, bronze: 0, points: 0 };
                                 if (idx === 0) { schoolStats[p.school].gold++; schoolStats[p.school].points += 5; }
                                 if (idx === 1) { schoolStats[p.school].silver++; schoolStats[p.school].points += 3; }
                                 if (idx === 2) { schoolStats[p.school].bronze++; schoolStats[p.school].points += 1; }
                               });
                             });

                             return Object.entries(schoolStats)
                               .sort((a, b) => {
                                 if (b[1].gold !== a[1].gold) return b[1].gold - a[1].gold;
                                 if (b[1].silver !== a[1].silver) return b[1].silver - a[1].silver;
                                 if (b[1].bronze !== a[1].bronze) return b[1].bronze - a[1].bronze;
                                 return b[1].points - a[1].points;
                               })
                               .map(([name, stats], idx) => (
                                 <tr key={name} className={idx === 0 ? 'text-secondary font-bold' : ''}>
                                   <td className="py-4 font-mono">{idx + 1}</td>
                                   <td className="py-4">{name} {idx === 0 && '🏆'}</td>
                                   <td className="py-4 text-center">{stats.gold}</td>
                                   <td className="py-4 text-center">{stats.silver}</td>
                                   <td className="py-4 text-center">{stats.bronze}</td>
                                   <td className="py-4 text-center font-bold">{stats.points}</td>
                                 </tr>
                               ));
                           })()}
                        </tbody>
                      </table>
                    </div>
                 </div>
               </section>

               <div className="space-y-12 pt-10">
                 {COMPETITION_BRANCHES.map(branch => {
                   const branchParticipants = [...participants]
                     .filter(p => p.branchId === branch.id && p.score !== undefined)
                     .sort((a, b) => (b.score || 0) - (a.score || 0));

                   if (branchParticipants.length === 0) return null;

                   return (
                     <div key={branch.id} className="space-y-6">
                       <div className="flex items-center gap-4">
                         <h3 className="text-2xl font-serif italic text-primary">{branch.name}</h3>
                         <div className="h-px flex-1 bg-primary/10"></div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {branchParticipants.slice(0, 3).map((p, idx) => (
                           <div key={p.id} className={`p-6 rounded-2xl relative overflow-hidden border transition-transform hover:-translate-y-1 ${
                             idx === 0 ? 'bg-secondary/10 border-secondary shadow-lg shadow-secondary/5' : 'bg-white border-primary/5'
                           }`}>
                             <div className="absolute -right-4 -bottom-4 text-8xl font-display italic opacity-[0.03] select-none">
                               {idx + 1}
                             </div>
                             <div className="flex justify-between items-start mb-4">
                               <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-secondary text-primary' : 'bg-warm text-primary font-bold'}`}>
                                 {idx === 0 ? <Trophy size={20} /> : <Medal size={20} />}
                               </div>
                               <span className="text-3xl font-display font-bold italic text-primary">{p.score}</span>
                             </div>
                             <h4 className="text-lg font-bold truncate pr-10">{p.name}</h4>
                             <p className="text-sm text-primary/60 mb-6 truncate">{p.school}</p>
                             <div className="flex items-center gap-2">
                               <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                 idx === 0 ? 'bg-secondary text-primary' : 'bg-primary/5 text-primary/40'
                               }`}>
                                 Juara {idx + 1}
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   );
                 })}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>

      {/* Sticky Footer Detail */}
      <footer className="h-8 bg-slate-800 text-slate-400 px-6 flex items-center justify-between text-[10px] tracking-wide shrink-0 z-40">
        <div className="flex items-center gap-4">
          <span>SESI: BABAK PENYISIHAN</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-500">SERVER: LOCAL-NODE-01</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span>SISTEM AKTIF & TERHUBUNG</span>
        </div>
      </footer>

          {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-panel rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-border">
            <div className="p-6 bg-brand text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Tambah Peserta Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddParticipant} className="p-6 space-y-4">
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Nama Lengkap / Nama Regu</label>
                 <input 
                   required
                   type="text" 
                   value={newParticipant.name}
                   onChange={e => setNewParticipant({...newParticipant, name: e.target.value})}
                   className="w-full bg-surface rounded-lg px-4 py-2.5 border border-border focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all text-sm" 
                 />
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Asal Sekolah</label>
                 <input 
                   required
                   type="text" 
                   value={newParticipant.school}
                   onChange={e => setNewParticipant({...newParticipant, school: e.target.value})}
                   className="w-full bg-surface rounded-lg px-4 py-2.5 border border-border focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all text-sm" 
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Cabang Lomba</label>
                   <select 
                     value={newParticipant.branchId}
                     onChange={e => {
                       const branch = COMPETITION_BRANCHES.find(b => b.id === e.target.value);
                       setNewParticipant({...newParticipant, branchId: e.target.value as BranchType, gender: branch?.category === 'Beregu' ? 'Regu' : 'L'});
                     }}
                     className="w-full bg-surface rounded-lg px-4 py-2.5 border border-border outline-none text-sm"
                   >
                     {COMPETITION_BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name.split(' ')[0]}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Jenis Kelamin</label>
                   <select 
                     value={newParticipant.gender}
                     onChange={e => setNewParticipant({...newParticipant, gender: e.target.value as any})}
                     className="w-full bg-surface rounded-lg px-4 py-2.5 border border-border outline-none text-sm"
                   >
                     {COMPETITION_BRANCHES.find(b => b.id === newParticipant.branchId)?.category === 'Beregu' ? (
                        <option value="Regu">Regu</option>
                     ) : (
                        <>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </>
                     )}
                   </select>
                 </div>
               </div>
               <div className="pt-4 flex gap-3">
                 <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-surface transition-all">Batal</button>
                 <button type="submit" className="flex-1 px-4 py-2.5 bg-brand text-white rounded-lg text-sm font-bold shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all">Simpan Peserta</button>
               </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Scoring Modal */}
      {scoringTarget && (
        <ScoringModal 
          participant={scoringTarget} 
          branch={COMPETITION_BRANCHES.find(b => b.id === scoringTarget.branchId)!}
          onClose={() => setScoringTarget(null)}
          onSave={(details, total) => {
            saveScore(scoringTarget.id, details, total);
            setScoringTarget(null);
          }}
        />
      )}
    </div>
  );
}

function ScoringModal({ participant, branch, onClose, onSave }: { 
  participant: Participant, 
  branch: typeof COMPETITION_BRANCHES[0], 
  onClose: () => void, 
  onSave: (details: Record<string, number>, total: number) => void 
}) {
  const [details, setDetails] = useState<Record<string, number>>(() => {
    return participant.details || branch.criteria.reduce((acc, c) => ({ ...acc, [c.id]: c.min }), {} as Record<string, number>);
  });

  const total = useMemo(() => {
    return (Object.values(details) as number[]).reduce((sum, val) => sum + val, 0);
  }, [details]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm overflow-y-auto">
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl w-full max-w-2xl my-auto m-4 overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8 bg-primary text-warm">
           <div className="flex justify-between items-start mb-2">
             <div>
               <h3 className="text-2xl font-serif">{participant.name}</h3>
               <p className="text-secondary text-sm font-medium">{branch.name}</p>
             </div>
             <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X/></button>
           </div>
           <p className="text-xs text-warm/60 uppercase tracking-widest">{participant.school}</p>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {branch.id === BranchType.LCC_PAI ? (
            <div className="space-y-4">
              <div className="p-4 bg-warm rounded-2xl border border-primary/5">
                <p className="text-xs font-bold text-primary/40 uppercase mb-4">Input Skor Manual (Lemparan & Rebutan)</p>
                <div className="grid grid-cols-2 gap-4">
                   {branch.criteria.map(c => (
                     <div key={c.id}>
                       <label className="block text-xs font-medium mb-1">{c.label}</label>
                       <input 
                         type="number" 
                         value={details[c.id]} 
                         onChange={e => setDetails({...details, [c.id]: parseInt(e.target.value) || 0})}
                         className="w-full bg-white border border-primary/10 rounded-xl px-4 py-2"
                       />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ) : (
            branch.criteria.map(c => (
              <div key={c.id} className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-primary/80">{c.label}</label>
                  <span className="text-xl font-display italic font-bold text-secondary">{details[c.id]} <span className="text-xs text-primary/30 not-italic">/ {c.max}</span></span>
                </div>
                <input 
                  type="range" 
                  min={c.min} 
                  max={c.max} 
                  step="1"
                  value={details[c.id]}
                  onChange={e => setDetails({...details, [c.id]: parseInt(e.target.value)})}
                  className="w-full h-1.5 bg-warm rounded-full appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[10px] text-primary/30 font-bold uppercase tracking-tighter">
                  <span>Min: {c.min}</span>
                  <span>Maks: {c.max}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-primary/5 bg-warm/30 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
             <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Akumulasi Skor Akhir</p>
             <p className="text-5xl font-display italic font-bold text-primary leading-none">{total}</p>
           </div>
           <button 
             onClick={() => onSave(details, total)}
             className="w-full md:w-auto px-10 py-4 bg-primary text-warm rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
           >
             <Save size={20} /> Simpan Penilaian
           </button>
        </div>
      </motion.div>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all ${
        active 
          ? 'bg-brand-light text-brand font-bold' 
          : 'text-text-muted hover:bg-surface hover:text-text'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>}
    </button>
  );
}

function StatCard({ label, value, color, border }: { label: string, value: number, color: string, border?: boolean }) {
  const colorStyles: Record<string, string> = {
    brand: 'border-l-4 border-l-brand',
    emerald: 'border-l-4 border-l-emerald-500',
    amber: 'border-l-4 border-l-amber-500',
    slate: 'bg-panel',
  };

  return (
    <div className={`bg-panel p-5 rounded-xl shadow-sm border border-border ${colorStyles[color] || ''}`}>
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-text">{value}</h3>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
      <input 
        type="text" 
        placeholder="Cari nama atau sekolah..." 
        className="w-full bg-panel border border-border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 transition-all text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

