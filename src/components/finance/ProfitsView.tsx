import React, { useState } from 'react';
import { TrendingUp, Award, ArrowUpRight, DollarSign, Calendar, BarChart2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfitsView: React.FC = () => {
  const { dashboardMetrics, markets } = useApp();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');

  const grossBids = dateRange === 'today' ? 482350 : dateRange === 'week' ? 3240500 : 14280000;
  const grossWins = dateRange === 'today' ? 214900 : dateRange === 'week' ? 1490200 : 6450000;
  const netProfit = grossBids - grossWins;
  const marginPercent = ((netProfit / grossBids) * 100).toFixed(1);

  // Market wise P&L
  const marketProfits = [
    { name: 'KALYAN', bids: 142000, wins: 58000, profit: 84000, margin: '59.1%' },
    { name: 'MILAN MORNING', bids: 68500, wins: 28400, profit: 40100, margin: '58.5%' },
    { name: 'TIME BAZAR', bids: 82000, wins: 41200, profit: 40800, margin: '49.7%' },
    { name: 'SRIDEVI', bids: 54000, wins: 19800, profit: 34200, margin: '63.3%' },
    { name: 'MADHUR DAY', bids: 46000, wins: 22500, profit: 23500, margin: '51.1%' },
    { name: 'SUPREME DAY', bids: 38500, wins: 16400, profit: 22100, margin: '57.4%' },
    { name: 'MILAN NIGHT', bids: 51350, wins: 28600, profit: 22750, margin: '44.3%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Profits & Revenue Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time platform financial performance, bet turnovers vs payouts, and market-level yield margins.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => setDateRange('today')}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              dateRange === 'today'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateRange('week')}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              dateRange === 'week'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setDateRange('month')}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              dateRange === 'month'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Bids */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Bets Turnover
          </span>
          <div className="mt-2 font-mono-numbers text-2xl font-black text-slate-900 dark:text-white">
            ₹{grossBids.toLocaleString()}
          </div>
          <span className="mt-1 inline-block text-[11px] font-medium text-slate-400">
            Gross customer wager volume
          </span>
        </div>

        {/* Total Wins */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Player Payouts Settled
          </span>
          <div className="mt-2 font-mono-numbers text-2xl font-black text-rose-600 dark:text-rose-400">
            ₹{grossWins.toLocaleString()}
          </div>
          <span className="mt-1 inline-block text-[11px] font-medium text-slate-400">
            Total prize winnings credited
          </span>
        </div>

        {/* Net House Profit */}
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Net House Profit (NGR)
            </span>
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white">
              {marginPercent}% Margin
            </span>
          </div>
          <div className="mt-2 font-mono-numbers text-2xl font-black text-emerald-700 dark:text-emerald-400">
            +₹{netProfit.toLocaleString()}
          </div>
          <span className="mt-1 inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Retained operator earnings
          </span>
        </div>
      </div>

      {/* Market-wise Breakdown Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Market-wise Profitability Breakdown
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparative performance matrix across individual bazaar contracts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Market Name</th>
                <th className="px-4 py-3.5">Turnover (Bids)</th>
                <th className="px-4 py-3.5">Payouts (Wins)</th>
                <th className="px-4 py-3.5">Net Profit</th>
                <th className="px-4 py-3.5">Hold Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
              {marketProfits.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-sans font-extrabold text-slate-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">
                    ₹{item.bids.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-rose-600 dark:text-rose-400">
                    ₹{item.wins.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-black text-emerald-600 dark:text-emerald-400">
                    ₹{item.profit.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                    {item.margin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
