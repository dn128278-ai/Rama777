import React, { useState } from 'react';
import { ArrowLeftRight, Search, Download, Filter, ArrowUpRight, ArrowDownRight, Award, Coins } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const TransactionsView: React.FC = () => {
  const { transactions, firebaseConfig } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = transactions.filter(t => {
    const matchesSearch =
      t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userMobile.includes(searchTerm) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' ? true : t.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Player', 'Mobile', 'Type', 'Amount', 'Balance Before', 'Balance After', 'Description', 'Date'];
    const rows = filtered.map(t => [
      t.id,
      t.userName,
      t.userMobile,
      t.type,
      t.amount,
      t.balanceBefore,
      t.balanceAfter,
      `"${t.description.replace(/"/g, '""')}"`,
      t.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Transactions Master Ledger
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Firestore: /transactions ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time immutable financial audit trail: deposits, withdrawals, bet stakes, payouts, and manual adjustments.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Export CSV Ledger
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by transaction ID, player name, or remark..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Type:</span>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Transactions ({transactions.length})</option>
            <option value="auto_deposit">Auto-Approved UPI Top-ups</option>
            <option value="deposit">Manual Deposits</option>
            <option value="withdraw">Withdrawals</option>
            <option value="bid_won">Win Payouts</option>
            <option value="bid_placed">Bids Placed</option>
            <option value="admin_credit">Admin Manual Credit</option>
            <option value="admin_debit">Admin Manual Debit</option>
            <option value="refund">Refunds</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Txn ID</th>
                <th className="px-4 py-3.5">Player</th>
                <th className="px-4 py-3.5">Type & Mode</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Before</th>
                <th className="px-4 py-3.5">After</th>
                <th className="px-4 py-3.5">Description</th>
                <th className="px-4 py-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
              {filtered.map(t => {
                const isAuto = t.type === 'auto_deposit' || t.isAutoApproved;
                const isCredit =
                  t.type === 'deposit' ||
                  t.type === 'auto_deposit' ||
                  t.type === 'bid_won' ||
                  t.type === 'admin_credit' ||
                  t.type === 'refund';

                return (
                  <tr
                    key={t.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                      isAuto ? 'bg-emerald-500/[0.03]' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-500">
                      {t.id}
                    </td>

                    <td className="px-4 py-3 font-sans">
                      <div className="font-bold text-slate-900 dark:text-white">{t.userName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.userMobile}</div>
                    </td>

                    <td className="px-4 py-3 font-sans">
                      {isAuto ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                          AUTO-APPROVED UPI
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isCredit
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                          }`}
                        >
                          {isCredit ? '+' : '-'} {t.type.toUpperCase().replace('_', ' ')}
                        </span>
                      )}
                    </td>

                    <td
                      className={`px-4 py-3 font-mono-numbers font-black text-sm ${
                        isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCredit ? '+' : '-'}₹{t.amount.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      ₹{t.balanceBefore.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      ₹{t.balanceAfter.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 font-sans text-slate-700 dark:text-slate-300 max-w-sm truncate">
                      {t.description}
                    </td>

                    <td className="px-4 py-3 text-slate-500 font-sans whitespace-nowrap">
                      {t.createdAt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
