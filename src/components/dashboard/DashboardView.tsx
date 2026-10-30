import React, { useMemo } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Coins,
  Filter,
  AlertTriangle,
  PlayCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    dashboardMetrics,
    markets,
    selectedLiveMarket,
    setSelectedLiveMarket,
    selectedLiveSession,
    setSelectedLiveSession,
    liveBids,
    setActiveTab,
    kotakAutoDepositVpa,
    simulateAutoApprovedTopup
  } = useApp();

  // Find highest exposure digit
  const highestBidDigit = useMemo(() => {
    if (!liveBids || liveBids.length === 0) return null;
    return [...liveBids].sort((a, b) => b.totalAmount - a.totalAmount)[0];
  }, [liveBids]);

  const totalSessionTurnover = useMemo(() => {
    return liveBids.reduce((acc, b) => acc + b.totalAmount, 0);
  }, [liveBids]);

  const totalSessionBidsCount = useMemo(() => {
    return liveBids.reduce((acc, b) => acc + b.totalBids, 0);
  }, [liveBids]);

  // Metric cards array
  const metricCards = [
    {
      title: 'Total Markets',
      value: dashboardMetrics.totalMarkets.toString(),
      subtext: `${markets.filter(m => m.isOpenNow).length} Markets Open Now`,
      icon: Building2,
      color: 'amber',
      actionTab: 'markets' as const
    },
    {
      title: 'Total Users',
      value: dashboardMetrics.totalUsers.toLocaleString(),
      subtext: '0 Users Today',
      icon: Users,
      color: 'blue',
      actionTab: 'users' as const
    },
    {
      title: 'Today Bid Amount',
      value: `₹${dashboardMetrics.todayBidAmount.toLocaleString()}`,
      subtext: 'Active live bets turnover',
      icon: TrendingUp,
      color: 'indigo',
      actionTab: 'transactions' as const
    },
    {
      title: 'Today Win Amount',
      value: `₹${dashboardMetrics.todayWinAmount.toLocaleString()}`,
      subtext: 'Settled player payouts',
      icon: Award,
      color: 'purple',
      actionTab: 'market-win-history' as const
    },
    {
      title: 'Today Deposit',
      value: `₹${dashboardMetrics.todayDeposit.toLocaleString()}`,
      subtext: 'Auto-credited Kotak UPI & deposits',
      icon: ArrowUpRight,
      color: 'emerald',
      actionTab: 'deposit-history' as const
    },
    {
      title: 'Today Withdraw',
      value: `₹${dashboardMetrics.todayWithdraw.toLocaleString()}`,
      subtext: 'Processed IMPS dispatches',
      icon: ArrowDownRight,
      color: 'rose',
      actionTab: 'withdraw-history' as const
    },
    {
      title: 'Total Wallet Balance',
      value: `₹${dashboardMetrics.totalWalletBalance.toLocaleString()}`,
      subtext: 'Live updated across player wallets',
      icon: Wallet,
      color: 'sky',
      actionTab: 'users' as const
    },
    {
      title: 'Total Manually Added Wallet Balance',
      value: `₹${dashboardMetrics.totalManuallyAddedBalance.toLocaleString()}`,
      subtext: 'Adjusted by administrator',
      icon: Coins,
      color: 'orange',
      actionTab: 'transactions' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Overview and real-time control center for Rama77 operations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Live Auto-Deposit Listener Indicator */}
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Kotak UPI Live Listener:
            </span>
            <span className="font-mono text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
              {kotakAutoDepositVpa}
            </span>
          </div>

          <button
            onClick={() => simulateAutoApprovedTopup(1000)}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-600 px-3 py-1.5 text-xs font-black text-white shadow-sm hover:bg-emerald-500 transition"
            title="Simulate instant player UPI deposit credited automatically to wallet"
          >
            <Zap className="h-3.5 w-3.5" />
            + Test Kotak Auto-Topup
          </button>

          <button
            onClick={() => setActiveTab('firebase-sync')}
            className="flex items-center gap-1.5 rounded-lg border border-rose-400 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 shadow-sm hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/60 transition"
            title="Open Master Database Reset & Production 0-Data Utility"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-500" />
            Database Reset (0 Clean)
          </button>

          <button
            onClick={() => setActiveTab('market-results')}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/20 transition hover:from-amber-600 hover:to-amber-700"
          >
            <PlayCircle className="h-4 w-4" />
            Declare Result
          </button>
        </div>
      </div>

      {/* 8 Summary Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(card.actionTab)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {card.title}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-amber-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-300">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3">
                <div className="font-mono-numbers text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                  {card.value}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {card.title === 'Total Users' ? (
                    <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {card.subtext}
                    </span>
                  ) : (
                    <span>{card.subtext}</span>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end text-[11px] font-bold text-amber-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-amber-400">
                View details <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Bids on Single Ank Section (Core Rama77 feature) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Section Header with Game Name and Market Time Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Live Bids on Single Ank
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time liability distribution & risk assessment for digits 0 to 9
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Game Name Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Game Name:
              </label>
              <select
                value={selectedLiveMarket}
                onChange={e => setSelectedLiveMarket(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {markets.map(m => (
                  <option key={m.id} value={m.name}>
                    {m.name} {m.isOpenNow ? '(Open)' : '(Closed)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Time Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Market Time:
              </label>
              <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedLiveSession('OPEN')}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                    selectedLiveSession === 'OPEN'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  OPEN
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLiveSession('CLOSE')}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                    selectedLiveSession === 'CLOSE'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Exposure Summary Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200/60 bg-amber-50/50 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Selected Session Exposure: <span className="text-amber-600 dark:text-amber-400">{selectedLiveMarket} ({selectedLiveSession})</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                Highest bid on Digit <strong className="font-bold text-red-600 dark:text-red-400">[{highestBidDigit?.digit}]</strong> with ₹{highestBidDigit?.totalAmount.toLocaleString()} exposure (Payout Liability: ₹{highestBidDigit?.liability.toLocaleString()})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Total Bids: </span>
              <span className="font-mono-numbers font-bold text-slate-900 dark:text-white">{totalSessionBidsCount}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Turnover: </span>
              <span className="font-mono-numbers font-bold text-emerald-600 dark:text-emerald-400">₹{totalSessionTurnover.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 10-Digit Interactive Grid (0 to 9) */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {liveBids.map(item => {
            const isHighest = highestBidDigit?.digit === item.digit;
            return (
              <div
                key={item.digit}
                className={`flex flex-col items-center justify-between rounded-xl border p-3 text-center transition-all ${
                  isHighest
                    ? 'border-red-400 bg-red-50/70 shadow-sm ring-2 ring-red-400/40 dark:border-red-500/60 dark:bg-red-950/40'
                    : 'border-slate-200 bg-slate-50/80 hover:border-amber-300 dark:border-slate-700/80 dark:bg-slate-800/60'
                }`}
              >
                {/* Digit Badge */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-black text-lg ${
                    isHighest
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  }`}
                >
                  {item.digit}
                </div>

                {/* Total Bids */}
                <div className="mt-2.5 w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Total Bids
                  </div>
                  <div className="font-mono-numbers text-xs font-extrabold text-slate-900 dark:text-white">
                    {item.totalBids}
                  </div>
                </div>

                {/* Total Amount */}
                <div className="mt-2 w-full border-t border-slate-200/80 pt-2 dark:border-slate-700">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Amount
                  </div>
                  <div
                    className={`font-mono-numbers text-xs font-black ${
                      isHighest
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    ₹{item.totalAmount.toLocaleString()}
                  </div>
                </div>

                {isHighest && (
                  <span className="mt-2 rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                    Max Risk
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Today Markets Quick Strip */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Today Active Markets Board
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live status, published pana digits, and betting schedule
            </p>
          </div>
          <button
            onClick={() => setActiveTab('markets')}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            Manage All Markets <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {markets.slice(0, 8).map(m => (
            <div
              key={m.id}
              className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {m.name}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.isOpenNow
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      m.isOpenNow ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                  {m.isOpenNow ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {/* Published Result Display */}
              <div className="mt-3 flex items-center justify-center rounded-md bg-white py-1.5 font-mono-numbers text-sm font-black text-slate-800 shadow-xs dark:bg-slate-900 dark:text-slate-100">
                {m.openPana ? m.openPana : '***'}-
                <span className="text-amber-600 dark:text-amber-400">
                  {m.openDigit || '*'}{m.closeDigit || '*'}
                </span>
                -{m.closePana ? m.closePana : '***'}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {m.openTime} - {m.closeTime}
                </span>
                <button
                  onClick={() => setActiveTab('market-results')}
                  className="font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  Result →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
