import React, { useState } from 'react';
import {
  ArrowDownCircle,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  X,
  CreditCard,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WithdrawRequest } from '../../types';

export const WithdrawHistoryView: React.FC = () => {
  const { withdraws, users, approveWithdraw, rejectWithdraw, firebaseConfig } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Approve Modal
  const [approvingWithdraw, setApprovingWithdraw] = useState<WithdrawRequest | null>(null);
  const [approvalUtr, setApprovalUtr] = useState('');
  const [approvalRemark, setApprovalRemark] = useState('');

  // Reject Modal
  const [rejectingWithdraw, setRejectingWithdraw] = useState<WithdrawRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const filtered = withdraws.filter(w => {
    const matchesSearch =
      w.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.userMobile.includes(searchTerm) ||
      w.accountDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ? true : w.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!approvingWithdraw) return;

    approveWithdraw(
      approvingWithdraw.id,
      approvalUtr || `IMPS${Date.now().toString().slice(-8)}`,
      approvalRemark || 'Dispatched via Banking Payout Gateway'
    );

    setApprovingWithdraw(null);
    setApprovalUtr('');
    setApprovalRemark('');
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingWithdraw) return;

    rejectWithdraw(
      rejectingWithdraw.id,
      rejectionReason || 'Declined due to incorrect account details'
    );

    setRejectingWithdraw(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Withdrawal Requests & Payout Ledgers
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Firestore: /withdrawals ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Process player withdrawal dispatches to Bank Accounts & UPI VPAs with automatic wallet refund protection on rejection.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            {withdraws.filter(w => w.status === 'pending').length} Pending Payouts
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by player, mobile, or bank account..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Withdrawals ({withdraws.length})</option>
            <option value="pending">Pending Only</option>
            <option value="approved">Approved</option>
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
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Player</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Payout Method</th>
                <th className="px-4 py-3.5">Account / UPI Details</th>
                <th className="px-4 py-3.5">Requested At</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(withdraw => (
                <tr key={withdraw.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">
                    {withdraw.id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {withdraw.userName}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      {withdraw.userMobile}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-mono-numbers font-black text-sm text-rose-600 dark:text-rose-400">
                    ₹{withdraw.amount.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {withdraw.paymentMethod}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-mono font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                    {withdraw.accountDetails}
                  </td>

                  <td className="px-4 py-3 font-mono-numbers text-slate-500 dark:text-slate-400">
                    {withdraw.requestedAt}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        withdraw.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : withdraw.status === 'pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                      }`}
                    >
                      {withdraw.status === 'approved' && <CheckCircle className="h-3 w-3" />}
                      {withdraw.status === 'pending' && <Clock className="h-3 w-3" />}
                      {withdraw.status === 'rejected' && <XCircle className="h-3 w-3" />}
                      {withdraw.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {withdraw.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setApprovingWithdraw(withdraw);
                              setApprovalUtr(`IMPS${Date.now().toString().slice(-8)}`);
                            }}
                            title="Approve Withdrawal"
                            className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-emerald-700"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectingWithdraw(withdraw)}
                            title="Reject & Refund"
                            className="flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-rose-700"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </button>
                        </>
                      )}
                      {withdraw.status === 'approved' && withdraw.utrOrReference && (
                        <span className="font-mono text-[10px] text-slate-500">
                          Ref: {withdraw.utrOrReference}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPROVE MODAL */}
      {approvingWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Approve Payout #{approvingWithdraw.id}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Amount: <strong className="text-emerald-600 font-mono text-sm">₹{approvingWithdraw.amount.toLocaleString()}</strong> to {approvingWithdraw.userName}
            </p>

            <form onSubmit={handleApproveSubmit} className="mt-4 space-y-4">
              <div className="rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Destination Account:</span>
                <div className="mt-1 font-mono text-slate-900 dark:text-white font-semibold">
                  {approvingWithdraw.accountDetails}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Bank Reference / IMPS UTR Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IMPS4289091823"
                  value={approvalUtr}
                  onChange={e => setApprovalUtr(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Admin Dispatch Remark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dispatched via ICICI Corporate Banking"
                  value={approvalRemark}
                  onChange={e => setApprovalRemark(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApprovingWithdraw(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                >
                  Confirm & Mark Dispatched
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectingWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Decline Withdrawal #{rejectingWithdraw.id}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              ₹{rejectingWithdraw.amount.toLocaleString()} will be refunded automatically to {rejectingWithdraw.userName}&apos;s wallet balance.
            </p>

            <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Rejection Reason *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank IFSC invalid or name mismatch"
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingWithdraw(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700"
                >
                  Decline & Refund Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
