import React, { useState } from 'react';
import { Zap, Trophy, Clock, X, CheckCircle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StarlineMarket } from '../../types';

export const StarlineMarketsView: React.FC = () => {
  const { starlineMarkets, declareStarlineResult, showToast } = useApp();

  const [declaringMarket, setDeclaringMarket] = useState<StarlineMarket | null>(null);
  const [openPana, setOpenPana] = useState('');
  const [openDigit, setOpenDigit] = useState('');

  const handlePanaChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 3);
    setOpenPana(clean);
    if (clean.length === 3) {
      let sum = 0;
      for (const ch of clean) sum += parseInt(ch, 10);
      setOpenDigit((sum % 10).toString());
    }
  };

  const handleDeclareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaringMarket) return;

    declareStarlineResult(declaringMarket.id, openPana, openDigit);
    setDeclaringMarket(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Start Line Markets (Starline)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hourly rapid draw bazaar games from 10:00 AM to 09:00 PM with single-pana declarations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-600 dark:text-yellow-400">
            12 Hourly Rounds Today
          </span>
        </div>
      </div>

      {/* Grid of Starline Rounds */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {starlineMarkets.map(m => (
          <div
            key={m.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {m.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.isOpenNow
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {m.isOpenNow ? 'Bidding Open' : 'Closed'}
                </span>
              </div>

              {/* Display Pana & Digit */}
              <div className="mt-3 flex items-center justify-center rounded-lg bg-slate-50 py-2.5 font-mono text-base font-black text-slate-900 dark:bg-slate-800 dark:text-white">
                {m.openPana ? m.openPana : '***'} -{' '}
                <span className="text-yellow-600 dark:text-yellow-400">
                  {m.openDigit || '*'}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Total Bids: <strong>{m.totalBids}</strong></span>
                <span>Pool: <strong className="text-emerald-600">₹{m.totalAmount.toLocaleString()}</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setDeclaringMarket(m);
                  setOpenPana(m.openPana || '');
                  setOpenDigit(m.openDigit || '');
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600"
              >
                <Trophy className="h-3.5 w-3.5" />
                Declare Starline Result
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {declaringMarket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Declare {declaringMarket.name}
              </h3>
              <button
                onClick={() => setDeclaringMarket(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDeclareSubmit} className="mt-4 space-y-4">
              <div className="rounded-lg bg-yellow-500/10 p-3 text-center dark:bg-yellow-500/20">
                <div className="text-xs font-bold text-yellow-700 dark:text-yellow-400">
                  Preview Outcome
                </div>
                <div className="font-mono text-xl font-black text-slate-900 dark:text-white">
                  {openPana || '***'} - <span className="text-yellow-600 dark:text-yellow-400">{openDigit || '*'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Open Pana (3-digit)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. 137"
                    required
                    value={openPana}
                    onChange={e => handlePanaChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Single Ank Digit
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="e.g. 1"
                    required
                    value={openDigit}
                    onChange={e => setOpenDigit(e.target.value.replace(/\D/g, ''))}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
