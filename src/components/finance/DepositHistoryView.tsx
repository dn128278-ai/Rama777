import React, { useState } from 'react';
import {
  ArrowUpCircle,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  X,
  CreditCard,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DepositRequest } from '../../types';

export const DepositHistoryView: React.FC = () => {
  const { deposits, kotakAutoDepositVpa, simulateAutoApprovedTopup, firebaseConfig } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'auto-approved' | 'approved' | 'pending' | 'rejected'>('all');
  const [isSimulating, setIsSimulating] = useState(false);

  // Slip Preview Modal
  const [previewSlip, setPreviewSlip] = useState<DepositRequest | null>(null);

  const filtered = deposits.filter(d => {
    const matchesSearch =
      d.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.userMobile.includes(searchTerm) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.method && d.method.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.receiverVpa && d.receiverVpa.toLowerCase().includes(searchTerm.toLowerCase()));

    const isAutoApproved = d.status === 'auto-approved' || d.isAutoApproved;
    const isApproved = d.status === 'approved' || isAutoApproved;

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'auto-approved'
        ? isAutoApproved
        : filterStatus === 'approved'
        ? isApproved
        : filterStatus === 'pending'
        ? d.status === 'pending'
        : d.status === 'rejected';

    return matchesSearch && matchesStatus;
  });

  const totalAmount = deposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const autoApprovedDeposits = deposits.filter(d => d.status === 'auto-approved' || d.isAutoApproved);
  const autoApprovedCount = autoApprovedDeposits.length;
  const autoApprovedTotal = autoApprovedDeposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const approvedCount = deposits.filter(d => d.status === 'approved' || d.status === 'auto-approved' || d.isAutoApproved).length;
  const pendingCount = deposits.filter(d => d.status === 'pending').length;

  const handleTestAutoTopup = async () => {
    setIsSimulating(true);
    try {
      await simulateAutoApprovedTopup(1000, '9876543210', 'Rahul Verma');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Deposit History & Requests
            </h1>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {deposits.length} Records
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Firestore: /deposits ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time ledger of player wallet top-ups. Instant Kotak UPI payments are automatically approved zero-touch without requiring manual admin approval or UTR checks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live Auto-Approval Receiver Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Kotak UPI Auto-Approved:
            </span>
            <span className="font-mono text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
              {kotakAutoDepositVpa}
            </span>
          </div>

          <button
            onClick={handleTestAutoTopup}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50 transition"
            title="Simulate instant player UPI deposit credited automatically without manual approval"
          >
            <Zap className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            + Simulate Kotak Auto-Topup
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Deposits Volume</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ArrowUpCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-xl font-black text-slate-900 dark:text-white">
            ₹{totalAmount.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">Cumulative player deposits</p>
        </div>

        <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Kotak Auto-Approved
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{autoApprovedTotal.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[11px] text-emerald-700/80 dark:text-emerald-400/80 font-medium">
            {autoApprovedCount} Zero-Touch instant top-ups
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">All Settled Deposits</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-xl font-black text-slate-900 dark:text-white">
            {approvedCount}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">Credited directly to player wallets</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Manual Review</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-xl font-black text-amber-600 dark:text-amber-400">
            {pendingCount}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">Non-automated deposit slips</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by player name, mobile, or deposit ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Filter:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Deposits ({deposits.length})</option>
            <option value="auto-approved">⚡ Auto-Approved Kotak UPI ({autoApprovedCount})</option>
            <option value="approved">All Settled ({approvedCount})</option>
            <option value="pending">Pending ({pendingCount})</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Deposit ID</th>
                <th className="px-4 py-3.5">Player</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Payment Method / Channel</th>
                <th className="px-4 py-3.5">Date & Time</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Audit / Slip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-500">
                    No deposit records found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map(deposit => {
                  const isAuto = deposit.status === 'auto-approved' || deposit.isAutoApproved;
                  const isSettled = deposit.status === 'approved' || isAuto;

                  return (
                    <tr
                      key={deposit.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                        isAuto ? 'bg-emerald-500/[0.02] dark:bg-emerald-500/[0.03]' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-mono font-bold text-slate-600 dark:text-slate-300">
                        {deposit.id}
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-extrabold text-slate-900 dark:text-white">
                          {deposit.userName}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          {deposit.userMobile}
                        </div>
                      </td>

                      <td className="px-4 py-3 font-mono-numbers font-black text-sm text-emerald-600 dark:text-emerald-400">
                        ₹{deposit.amount.toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        {isAuto || deposit.method === 'Kotak UPI' ? (
                          <div>
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                              <Zap className="h-3 w-3 text-emerald-500" />
                              Kotak UPI Instant
                            </span>
                            <div className="mt-0.5 font-mono text-[9px] text-slate-400">
                              {deposit.receiverVpa || kotakAutoDepositVpa}
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <CreditCard className="h-3 w-3 text-slate-400" />
                            {deposit.method || 'UPI'}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 font-mono-numbers text-slate-500 dark:text-slate-400">
                        <div>{deposit.requestedAt}</div>
                        {isAuto ? (
                          <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                            Zero-Touch Auto-Settled
                          </div>
                        ) : deposit.processedAt ? (
                          <div className="text-[10px] text-slate-400">
                            Processed: {deposit.processedAt}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-4 py-3">
                        {isAuto ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-black text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                            <Zap className="h-3 w-3 text-emerald-500 animate-pulse" />
                            AUTO-APPROVED
                          </span>
                        ) : isSettled ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                            <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                            SETTLED
                          </span>
                        ) : deposit.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                            <Clock className="h-3 w-3" />
                            PENDING
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
                            <XCircle className="h-3 w-3" />
                            REJECTED
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {isAuto ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Verified
                          </span>
                        ) : deposit.screenshotUrl ? (
                          <button
                            onClick={() => setPreviewSlip(deposit)}
                            title="View Payment Slip"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Slip Modal */}
      {previewSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Payment Slip Preview
                </h3>
                <p className="text-xs text-slate-500">Deposit ID: {previewSlip.id}</p>
              </div>
              <button
                onClick={() => setPreviewSlip(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <img
                  src={previewSlip.screenshotUrl}
                  alt="Deposit Payment Receipt"
                  className="max-h-80 w-full object-contain bg-slate-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800">
                  <span className="text-slate-400">Player:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{previewSlip.userName}</div>
                  <div className="font-mono text-[10px] text-slate-500">{previewSlip.userMobile}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800">
                  <span className="text-slate-400">Amount:</span>
                  <div className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400">
                    ₹{previewSlip.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewSlip(null)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
