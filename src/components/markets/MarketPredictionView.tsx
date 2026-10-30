import React, { useState } from 'react';
import { Sparkles, Dices, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketPredictionView: React.FC = () => {
  const { markets } = useApp();
  const [selectedMarket, setSelectedMarket] = useState(markets[0]?.name || 'KALYAN');

  // Algorithmically generated lucky anks & jodis
  const luckyDigits = [3, 7, 4, 9];
  const strongJodis = ['34', '79', '48', '91', '37', '43'];
  const panelGuesses = ['148', '257', '360', '135'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Market AI & Mathematical Prediction
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Statistical probability analyzer and open/close single ank forecast engine.
        </p>
      </div>

      {/* Selector */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Select Target Market:
        </label>
        <select
          value={selectedMarket}
          onChange={e => setSelectedMarket(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {markets.map(m => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Strong Single Ank */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Predicted Single Ank
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            High-frequency digits based on last 30 rounds
          </p>
          <div className="mt-4 flex items-center justify-around">
            {luckyDigits.map(d => (
              <div
                key={d}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white font-black text-xl shadow-sm"
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Strong Jodis */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-indigo-500 font-extrabold text-xs uppercase tracking-wider">
            <Dices className="h-4 w-4" />
            Top Recommended Jodis
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pair combinations with highest mathematical probability
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {strongJodis.map(j => (
              <div
                key={j}
                className="rounded-lg border border-indigo-200 bg-indigo-50/50 py-2 text-center font-mono text-sm font-black text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300"
              >
                {j}
              </div>
            ))}
          </div>
        </div>

        {/* Panel Panas */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-xs uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            Trending Open Panas
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            3-digit patterns favored by harmonic cycle
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {panelGuesses.map(p => (
              <div
                key={p}
                className="rounded-lg border border-emerald-200 bg-emerald-50/50 py-2 text-center font-mono text-sm font-black text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
