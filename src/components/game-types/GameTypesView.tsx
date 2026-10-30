import React, { useState } from 'react';
import { Dices, Edit2, CheckCircle, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GameType } from '../../types';

export const GameTypesView: React.FC = () => {
  const { gameTypes, updateGameType, showToast } = useApp();

  const [editingType, setEditingType] = useState<GameType | null>(null);
  const [multiplier, setMultiplier] = useState<number>(9.5);
  const [minBid, setMinBid] = useState<number>(10);
  const [maxBid, setMaxBid] = useState<number>(100000);
  const [enabled, setEnabled] = useState<boolean>(true);

  const handleEditClick = (gt: GameType) => {
    setEditingType(gt);
    setMultiplier(gt.multiplier);
    setMinBid(gt.minBid);
    setMaxBid(gt.maxBid);
    setEnabled(gt.enabled);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType) return;

    updateGameType(editingType.id, multiplier, minBid, maxBid, enabled);
    setEditingType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Game Types & Payout Rates
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Set official platform payout multipliers (e.g. Single Ank 1:9.5, Jodi 1:95) and configure minimum/maximum betting limits.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gameTypes.map(gt => (
          <div
            key={gt.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  {gt.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    gt.enabled
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                  }`}
                >
                  {gt.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Rate:</span>
                <span className="font-mono text-xl font-black text-amber-600 dark:text-amber-400">
                  1 : {gt.multiplier}
                </span>
                <span className="text-[11px] text-slate-400">
                  (₹10 gives ₹{gt.multiplier * 10})
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {gt.description}
              </p>

              <div className="mt-4 space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-500">Min Bet:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ₹{gt.minBid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Bet:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ₹{gt.maxBid.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleEditClick(gt)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Configure Limits & Rate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Edit {editingType.name} Rates
              </h3>
              <button
                onClick={() => setEditingType(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Winning Multiplier Ratio (1 : X)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={multiplier}
                  onChange={e => setMultiplier(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-base font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Min Bet Amount (₹)
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={minBid}
                    onChange={e => setMinBid(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Max Bet Amount (₹)
                  </label>
                  <input
                    type="number"
                    min={100}
                    required
                    value={maxBid}
                    onChange={e => setMaxBid(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={e => setEnabled(e.target.checked)}
                  className="h-4 w-4 rounded accent-amber-500"
                />
                Game Type Enabled for Bidding
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingType(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
