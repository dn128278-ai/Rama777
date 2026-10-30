import React, { useState } from 'react';
import { Flame, Trophy, Clock, X, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DesawarMarket } from '../../types';

export const DesawarMarketsView: React.FC = () => {
  const { desawarMarkets, declareDesawarResult, showToast } = useApp();

  const [declaringMarket, setDeclaringMarket] = useState<DesawarMarket | null>(null);
  const [jodiResult, setJodiResult] = useState('');

  const handleDeclareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaringMarket) return;

    declareDesawarResult(declaringMarket.id, jodiResult);
    setDeclaringMarket(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Desawar & Gali Markets
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Special high-volume 2-digit Jodi bazaars including Disawar, Faridabad, Ghaziabad, and Gali.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400">
            4 Prime Bazaars Active
          </span>
        </div>
      </div>

      {/* Grid of Desawar Markets */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {desawarMarkets.map(m => (
          <div
            key={m.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {m.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.isOpenNow
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {m.isOpenNow ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {/* Jodi Number Display */}
              <div className="mt-4 flex items-center justify-center rounded-xl bg-slate-50 py-4 font-mono text-3xl font-black text-slate-900 dark:bg-slate-800 dark:text-white">
                <span className="text-red-600 dark:text-red-400">
                  {m.resultJodi ? m.resultJodi : '**'}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Timing:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {m.openTime} - {m.closeTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Bids:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {m.totalBids}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pool Exposure:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{m.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setDeclaringMarket(m);
                  setJodiResult(m.resultJodi || '');
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700"
              >
                <Trophy className="h-3.5 w-3.5" />
                Declare Jodi Result
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {declaringMarket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Declare {declaringMarket.name} Jodi
              </h3>
              <button
                onClick={() => setDeclaringMarket(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDeclareSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Winning 2-Digit Jodi (00 to 99)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  required
                  placeholder="e.g. 74"
                  value={jodiResult}
                  onChange={e => setJodiResult(e.target.value.replace(/\D/g, ''))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-center font-mono text-2xl font-black tracking-widest text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-red-400"
                />
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
                  className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700"
                >
                  Publish Jodi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
