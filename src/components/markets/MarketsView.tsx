import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Trophy,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  X,
  AlertCircle,
  Flame,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Market } from '../../types';

export const MarketsView: React.FC = () => {
  const {
    markets,
    createMarket,
    updateMarket,
    deleteMarket,
    declareResult,
    showToast,
    firebaseConfig
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [declaringMarket, setDeclaringMarket] = useState<Market | null>(null);
  const [deletingMarketId, setDeletingMarketId] = useState<string | null>(null);

  // Form states for Create Market
  const [createForm, setCreateForm] = useState({
    name: '',
    apiKeyName: '',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '10:00 AM',
    closeTime: '11:00 AM',
    openResultTime: '10:15 AM',
    closeResultTime: '11:15 AM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: ''
  });

  // Declare Result Form
  const [resultForm, setResultForm] = useState({
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: ''
  });

  // Filtered markets
  const filteredMarkets = markets.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.apiKeyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'open'
        ? m.isOpenNow
        : !m.isOpenNow;

    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    createMarket({
      name: createForm.name.toUpperCase(),
      apiKeyName:
        createForm.apiKeyName.trim() ||
        createForm.name.toLowerCase().replace(/\s+/g, '_'),
      isOpenNow: createForm.isOpenNow,
      isDisabled: createForm.isDisabled,
      saturdayOpen: createForm.saturdayOpen,
      sundayOpen: createForm.sundayOpen,
      autoResult: createForm.autoResult,
      previousDayCheck: createForm.previousDayCheck,
      openTime: createForm.openTime,
      closeTime: createForm.closeTime,
      openResultTime: createForm.openResultTime,
      closeResultTime: createForm.closeResultTime,
      openPana: createForm.openPana,
      openDigit: createForm.openDigit,
      closeDigit: createForm.closeDigit,
      closePana: createForm.closePana
    });

    setIsCreateOpen(false);
    setCreateForm({
      name: '',
      apiKeyName: '',
      isOpenNow: true,
      isDisabled: false,
      saturdayOpen: true,
      sundayOpen: true,
      autoResult: true,
      previousDayCheck: false,
      openTime: '10:00 AM',
      closeTime: '11:00 AM',
      openResultTime: '10:15 AM',
      closeResultTime: '11:15 AM',
      openPana: '',
      openDigit: '',
      closeDigit: '',
      closePana: ''
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarket) return;

    updateMarket(editingMarket.id, {
      name: editingMarket.name.toUpperCase(),
      apiKeyName: editingMarket.apiKeyName,
      isOpenNow: editingMarket.isOpenNow,
      isDisabled: editingMarket.isDisabled,
      saturdayOpen: editingMarket.saturdayOpen,
      sundayOpen: editingMarket.sundayOpen,
      autoResult: editingMarket.autoResult,
      previousDayCheck: editingMarket.previousDayCheck,
      openTime: editingMarket.openTime,
      closeTime: editingMarket.closeTime,
      openResultTime: editingMarket.openResultTime,
      closeResultTime: editingMarket.closeResultTime
    });

    setEditingMarket(null);
  };

  const handleDeclareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaringMarket) return;

    declareResult(
      declaringMarket.id,
      resultForm.openPana,
      resultForm.openDigit,
      resultForm.closeDigit,
      resultForm.closePana
    );

    setDeclaringMarket(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Markets Management
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage game schedules, market open/close timings, weekend availability, and live results.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Firestore Cloud Sync:
            </span>
            <span className="font-mono text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
              /markets ({firebaseConfig.projectId})
            </span>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/30 transition hover:bg-amber-600"
          >
            <Plus className="h-4 w-4" />
            Create New Market
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search market by name or ID (e.g. KALYAN)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-amber-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">All Markets ({markets.length})</option>
            <option value="open">Open Now</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Name</th>
                <th className="px-4 py-3.5">Current Status</th>
                <th className="px-4 py-3.5">Disabled?</th>
                <th className="px-4 py-3.5">Saturday</th>
                <th className="px-4 py-3.5">Sunday</th>
                <th className="px-4 py-3.5">Auto Result</th>
                <th className="px-4 py-3.5">Open Time</th>
                <th className="px-4 py-3.5">Close Time</th>
                <th className="px-4 py-3.5">Open Res. Time</th>
                <th className="px-4 py-3.5">Close Res. Time</th>
                <th className="px-4 py-3.5">Created At</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMarkets.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-8 text-center text-slate-400">
                    No markets found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredMarkets.map(market => (
                  <tr
                    key={market.id}
                    className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono-numbers font-bold text-slate-500 dark:text-slate-400">
                      {market.id}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-extrabold text-slate-900 dark:text-white">
                      <div>{market.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{market.apiKeyName}</div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          market.isOpenNow
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            market.isOpenNow ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {market.isOpenNow ? 'Open Now' : 'Closed'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${
                          market.isDisabled
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {market.isDisabled ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${
                          market.saturdayOpen
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
                        }`}
                      >
                        {market.saturdayOpen ? 'Open' : 'Close'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${
                          market.sundayOpen
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
                        }`}
                      >
                        {market.sundayOpen ? 'Open' : 'Close'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${
                          market.autoResult
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {market.autoResult ? 'On' : 'Off'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-mono-numbers text-slate-700 dark:text-slate-300">
                      {market.openTime}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-mono-numbers text-slate-700 dark:text-slate-300">
                      {market.closeTime}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-mono-numbers text-slate-600 dark:text-slate-400">
                      {market.openResultTime}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-mono-numbers text-slate-600 dark:text-slate-400">
                      {market.closeResultTime}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                      {market.createdAt}
                    </td>

                    {/* Action buttons */}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setDeclaringMarket(market);
                            setResultForm({
                              openPana: market.openPana || '',
                              openDigit: market.openDigit || '',
                              closeDigit: market.closeDigit || '',
                              closePana: market.closePana || ''
                            });
                          }}
                          title="Declare Result"
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 transition hover:bg-amber-500 hover:text-white dark:bg-amber-500/20 dark:text-amber-400"
                        >
                          <Trophy className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => setEditingMarket({ ...market })}
                          title="Edit Market"
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 transition hover:bg-sky-500 hover:text-white dark:bg-sky-500/20 dark:text-sky-400"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingMarketId(market.id)}
                          title="Delete Market"
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-500/20 dark:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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

      {/* CREATE MARKET MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Create New Market
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Writes directly to Firestore /markets
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  New markets are written directly into Cloud Firestore so connected User Apps update instantly in real-time.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Market Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MILAN NIGHT"
                    value={createForm.name}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    API Key Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. milan_night (auto-generated if empty)"
                    value={createForm.apiKeyName}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, apiKeyName: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:15 AM"
                    required
                    value={createForm.openTime}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, openTime: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:15 AM"
                    required
                    value={createForm.closeTime}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, closeTime: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Result Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:25 AM"
                    required
                    value={createForm.openResultTime}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        openResultTime: e.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Result Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:25 AM"
                    required
                    value={createForm.closeResultTime}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        closeResultTime: e.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50 sm:grid-cols-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.isOpenNow}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, isOpenNow: e.target.checked }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Open Now Status
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.isDisabled}
                    onChange={e =>
                      setCreateForm(prev => ({ ...prev, isDisabled: e.target.checked }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Disable Game
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.saturdayOpen}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        saturdayOpen: e.target.checked
                      }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Saturday Open
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.sundayOpen}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        sundayOpen: e.target.checked
                      }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Sunday Open
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.autoResult}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        autoResult: e.target.checked
                      }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Auto Result Sync
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.previousDayCheck}
                    onChange={e =>
                      setCreateForm(prev => ({
                        ...prev,
                        previousDayCheck: e.target.checked
                      }))
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Previous Day Check
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/30 transition hover:bg-amber-600"
                >
                  Save &amp; Publish directly to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MARKET MODAL (matching exact Rama77 update market layout) */}
      {editingMarket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Edit Market - {editingMarket.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update timings, API keys, and disable toggles for this market.
                </p>
              </div>
              <button
                onClick={() => setEditingMarket(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Market Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.name}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    API Key Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.apiKeyName}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, apiKeyName: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Time
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.openTime}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, openTime: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Time
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.closeTime}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, closeTime: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Result Time
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.openResultTime}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, openResultTime: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Result Time
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMarket.closeResultTime}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, closeResultTime: e.target.value } : null
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50 sm:grid-cols-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.isOpenNow}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, isOpenNow: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Open Now
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.isDisabled}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, isDisabled: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Disable Game
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.saturdayOpen}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, saturdayOpen: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Saturday Open
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.sundayOpen}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, sundayOpen: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Sunday Open
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.autoResult}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev ? { ...prev, autoResult: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Auto Result Sync
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMarket.previousDayCheck}
                    onChange={e =>
                      setEditingMarket(prev =>
                        prev
                          ? { ...prev, previousDayCheck: e.target.checked }
                          : null
                      )
                    }
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  Previous Day Check
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingMarket(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/30 transition hover:bg-amber-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DECLARE RESULT MODAL */}
      {declaringMarket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Declare Result - {declaringMarket.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter winning 3-digit pana and calculated digits
                </p>
              </div>
              <button
                onClick={() => setDeclaringMarket(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDeclareSubmit} className="mt-4 space-y-4">
              <div className="rounded-lg bg-amber-500/10 p-3 text-center dark:bg-amber-500/20">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  Preview Result Jodi
                </div>
                <div className="mt-1 font-mono-numbers text-xl font-black text-slate-900 dark:text-white">
                  {resultForm.openPana || '***'}-
                  <span className="text-amber-600 dark:text-amber-400">
                    {resultForm.openDigit || '*'}{resultForm.closeDigit || '*'}
                  </span>
                  -{resultForm.closePana || '***'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Pana (3 digits)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. 248"
                    value={resultForm.openPana}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '');
                      let sum = 0;
                      for (const ch of v) sum += parseInt(ch, 10);
                      const digit = v.length === 3 ? (sum % 10).toString() : '';
                      setResultForm(prev => ({
                        ...prev,
                        openPana: v,
                        openDigit: digit || prev.openDigit
                      }));
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Single Ank
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="e.g. 4"
                    value={resultForm.openDigit}
                    onChange={e =>
                      setResultForm(prev => ({
                        ...prev,
                        openDigit: e.target.value.replace(/\D/g, '')
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Single Ank
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="e.g. 7"
                    value={resultForm.closeDigit}
                    onChange={e =>
                      setResultForm(prev => ({
                        ...prev,
                        closeDigit: e.target.value.replace(/\D/g, '')
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Close Pana (3 digits)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. 368"
                    value={resultForm.closePana}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '');
                      let sum = 0;
                      for (const ch of v) sum += parseInt(ch, 10);
                      const digit = v.length === 3 ? (sum % 10).toString() : '';
                      setResultForm(prev => ({
                        ...prev,
                        closePana: v,
                        closeDigit: digit || prev.closeDigit
                      }));
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeclaringMarket(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/30 transition hover:bg-amber-600"
                >
                  Confirm & Credit Winners
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingMarketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Delete Market?
              </h3>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to permanently delete this market? This will stop all bets
              for this market.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeletingMarketId(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMarket(deletingMarketId);
                  setDeletingMarketId(null);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
