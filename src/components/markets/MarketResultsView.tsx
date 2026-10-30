import React, { useState } from 'react';
import { Trophy, CheckCircle, RefreshCw, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketResultsView: React.FC = () => {
  const { markets, declareResult, showToast } = useApp();

  const [selectedMarketId, setSelectedMarketId] = useState<string>(markets[0]?.id || '');
  const [openPana, setOpenPana] = useState('');
  const [openDigit, setOpenDigit] = useState('');
  const [closeDigit, setCloseDigit] = useState('');
  const [closePana, setClosePana] = useState('');

  const targetMarket = markets.find(m => m.id === selectedMarketId);

  // Auto-calculate single ank digit when 3-digit pana is entered
  const handleOpenPanaChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 3);
    setOpenPana(clean);
    if (clean.length === 3) {
      let sum = 0;
      for (const c of clean) sum += parseInt(c, 10);
      setOpenDigit((sum % 10).toString());
    }
  };

  const handleClosePanaChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 3);
    setClosePana(clean);
    if (clean.length === 3) {
      let sum = 0;
      for (const c of clean) sum += parseInt(c, 10);
      setCloseDigit((sum % 10).toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMarket) return;

    declareResult(targetMarket.id, openPana, openDigit, closeDigit, closePana);
    showToast(`Result declared for ${targetMarket.name}: ${openPana || '***'}-${openDigit || '*'}${closeDigit || '*'}-${closePana || '***'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Declare Market Results
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fast-track result declaration engine with automatic digit sum calculations and instant player wallet credit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Declaration Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Trophy className="h-4 w-4 text-amber-500" />
            Publish Market Outcome
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose Market
              </label>
              <select
                value={selectedMarketId}
                onChange={e => {
                  const id = e.target.value;
                  setSelectedMarketId(id);
                  const m = markets.find(x => x.id === id);
                  if (m) {
                    setOpenPana(m.openPana || '');
                    setOpenDigit(m.openDigit || '');
                    setCloseDigit(m.closeDigit || '');
                    setClosePana(m.closePana || '');
                  }
                }}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {markets.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.openTime} - {m.closeTime})
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Live Preview Card */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-center dark:border-amber-900/40 dark:bg-amber-950/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Display Result Jodi
              </span>
              <div className="mt-1 font-mono-numbers text-2xl font-black text-slate-900 dark:text-white">
                {openPana || '***'} - <span className="text-amber-600 dark:text-amber-400">{openDigit || '*'}{closeDigit || '*'}</span> - {closePana || '***'}
              </div>
            </div>

            {/* Open Session Inputs */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Open Session Result
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Open Pana (3-digit)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. 137"
                    value={openPana}
                    onChange={e => handleOpenPanaChange(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 p-2 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Open Ank (Single)
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="e.g. 1"
                    value={openDigit}
                    onChange={e => setOpenDigit(e.target.value.replace(/\D/g, ''))}
                    className="mt-1 w-full rounded-md border border-slate-200 p-2 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Close Session Inputs */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                2. Close Session Result
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Close Ank (Single)
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="e.g. 8"
                    value={closeDigit}
                    onChange={e => setCloseDigit(e.target.value.replace(/\D/g, ''))}
                    className="mt-1 w-full rounded-md border border-slate-200 p-2 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Close Pana (3-digit)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. 459"
                    value={closePana}
                    onChange={e => handleClosePanaChange(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 p-2 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-white shadow-sm shadow-amber-500/20 transition hover:bg-amber-600"
            >
              Declare & Publish Result
            </button>
          </form>
        </div>

        {/* Right: Live Current Results Board */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Live Result Status Board
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current results broadcast to all user apps & web frontends
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              Live Broadcast Active
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {markets.map(m => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMarketId(m.id);
                  setOpenPana(m.openPana || '');
                  setOpenDigit(m.openDigit || '');
                  setCloseDigit(m.closeDigit || '');
                  setClosePana(m.closePana || '');
                }}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  m.id === selectedMarketId
                    ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-500/30 dark:bg-amber-950/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                    {m.name}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      m.isOpenNow
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {m.isOpenNow ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-center rounded-lg bg-slate-50 py-2 font-mono-numbers text-base font-black text-slate-900 dark:bg-slate-800 dark:text-white">
                  {m.openPana || '***'} -{' '}
                  <span className="text-amber-600 dark:text-amber-400">
                    {m.openDigit || '*'}{m.closeDigit || '*'}
                  </span>{' '}
                  - {m.closePana || '***'}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Open: {m.openResultTime}</span>
                  <span>Close: {m.closeResultTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
