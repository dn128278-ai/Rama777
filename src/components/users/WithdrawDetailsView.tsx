import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  Building,
  Smartphone,
  Clock,
  ArrowDownCircle,
  XCircle,
  CheckCircle2,
  X,
  Wallet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WithdrawRequest } from '../../types';

export const WithdrawDetailsView: React.FC = () => {
  const { users, withdraws, approveWithdraw, rejectWithdraw, firebaseConfig } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'banking'>('pending');

  // Approval Modal
  const [approvingWithdraw, setApprovingWithdraw] = useState<WithdrawRequest | null>(null);
  const [approvalUtr, setApprovalUtr] = useState('');
  const [approvalRemark, setApprovalRemark] = useState('');

  // Rejection Modal
  const [rejectingWithdraw, setRejectingWithdraw] = useState<WithdrawRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingWithdrawals = withdraws.filter(w => w.status === 'pending');

  const filteredPending = pendingWithdrawals.filter(w => {
    const term = searchTerm.toLowerCase();
    return (
      w.userName.toLowerCase().includes(term) ||
      w.userMobile.includes(term) ||
      w.id.toLowerCase().includes(term) ||
      (w.accountDetails && w.accountDetails.toLowerCase().includes(term))
    );
  });

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    const b = u.bankDetail;
    return (
      u.name.toLowerCase().includes(term) ||
      u.mobile.includes(term) ||
      (b?.accountNumber && b.accountNumber.includes(term)) ||
      (b?.bankName && b.bankName.toLowerCase().includes(term)) ||
      (b?.upiId && b.upiId.toLowerCase().includes(term))
    );
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
              Withdraw Details & Pending Requests
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Firestore: /users & /withdrawals ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time onSnapshot synchronization of player banking profiles, live wallet balances, and pending withdrawal payouts.
          </p>
        </div>

        {/* Pending Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Clock className="h-4 w-4" />
            {pendingWithdrawals.length} Pending Payouts
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveSubTab('pending')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
            activeSubTab === 'pending'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <ArrowDownCircle className="h-4 w-4 text-rose-500" />
          <span>Pending Withdrawal Requests</span>
          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-extrabold text-rose-600 dark:text-rose-400">
            {pendingWithdrawals.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('banking')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
            activeSubTab === 'banking'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <CreditCard className="h-4 w-4 text-sky-500" />
          <span>User Banking & Wallet Details</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {users.length}
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeSubTab === 'pending'
                ? 'Search pending requests by player name, phone, or request ID...'
                : 'Search users by player name, phone, account number, or UPI ID...'
            }
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* View 1: Pending Withdrawal Requests Table */}
      {activeSubTab === 'pending' && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-slate-50/75 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Live Pending Withdrawal Requests ({filteredPending.length})
            </h2>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Auto-refreshed via onSnapshot listener (/withdrawals)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Request ID</th>
                  <th className="px-4 py-3.5">Player Name</th>
                  <th className="px-4 py-3.5">Phone Number</th>
                  <th className="px-4 py-3.5">Requested Payout</th>
                  <th className="px-4 py-3.5">User Wallet Balance</th>
                  <th className="px-4 py-3.5">Payout Method</th>
                  <th className="px-4 py-3.5">Account / UPI Details</th>
                  <th className="px-4 py-3.5">Requested At</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
                {filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400 font-sans">
                      <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
                      No pending withdrawal requests found in Firestore collection <code className="font-mono text-emerald-600 dark:text-emerald-400">/withdrawals</code>.
                    </td>
                  </tr>
                ) : (
                  filteredPending.map(withdraw => {
                    const matchedUser = users.find(u => u.id === withdraw.userId || u.mobile === withdraw.userMobile);
                    const walletBal = matchedUser?.walletBalance ?? 0;

                    return (
                      <tr key={withdraw.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono font-bold text-slate-500">
                          {withdraw.id}
                        </td>
                        <td className="px-4 py-3 font-sans">
                          <div className="font-extrabold text-slate-900 dark:text-white">
                            {withdraw.userName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {withdraw.userId}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {withdraw.userMobile}
                        </td>
                        <td className="px-4 py-3 font-mono-numbers font-black text-rose-600 dark:text-rose-400 text-sm">
                          ₹{withdraw.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-mono-numbers font-bold text-emerald-600 dark:text-emerald-400">
                          ₹{walletBal.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-sans">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {withdraw.paymentMethod}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-medium text-slate-900 dark:text-white max-w-xs truncate">
                          {withdraw.accountDetails || withdraw.upiId || withdraw.bankAccountNumber || 'UPI / Bank'}
                        </td>
                        <td className="px-4 py-3 font-sans text-[11px] text-slate-500 dark:text-slate-400">
                          {withdraw.requestedAt}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 font-sans">
                            <button
                              onClick={() => {
                                setApprovingWithdraw(withdraw);
                                setApprovalUtr(`IMPS${Date.now().toString().slice(-8)}`);
                              }}
                              className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-emerald-700"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setRejectingWithdraw(withdraw);
                                setRejectionReason('Declined by Admin');
                              }}
                              className="flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-rose-700"
                            >
                              <XCircle className="h-3 w-3" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: User Banking & Wallet Details Table */}
      {activeSubTab === 'banking' && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-slate-50/75 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Registered Player Accounts & Bank Records ({filteredUsers.length})
            </h2>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Live from Firestore collection <code className="font-mono text-emerald-600 dark:text-emerald-400">/users</code>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">User ID</th>
                  <th className="px-4 py-3.5">Player Name</th>
                  <th className="px-4 py-3.5">Phone Number</th>
                  <th className="px-4 py-3.5">Wallet Balance</th>
                  <th className="px-4 py-3.5">Bank Name</th>
                  <th className="px-4 py-3.5">Account Number</th>
                  <th className="px-4 py-3.5">IFSC Code</th>
                  <th className="px-4 py-3.5">UPI ID</th>
                  <th className="px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400 font-sans">
                      No player records match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => {
                    const b = user.bankDetail || {
                      bankName: '',
                      accountNumber: '',
                      ifsc: '',
                      upiId: '',
                      isVerified: false
                    };

                    return (
                      <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono font-bold text-slate-500">{user.id}</td>
                        <td className="px-4 py-3 font-sans font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-slate-600 dark:text-slate-400">
                          {user.mobile}
                        </td>
                        <td className="px-4 py-3 font-mono-numbers font-black text-emerald-600 dark:text-emerald-400">
                          ₹{(Number(user.walletBalance) || 0).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-sans font-medium text-slate-700 dark:text-slate-300">
                          {b.bankName || '—'}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                          {b.accountNumber || '—'}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-600 dark:text-slate-400">
                          {b.ifsc || '—'}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                          {b.upiId || '—'}
                        </td>
                        <td className="px-4 py-3 font-sans">
                          {b.accountNumber || b.upiId ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                              <CheckCircle className="h-3 w-3" />
                              Saved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              Not Provided
                            </span>
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
      )}

      {/* Approve Modal */}
      {approvingWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Approve Withdrawal Payout
                </h3>
              </div>
              <button
                onClick={() => setApprovingWithdraw(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleApproveSubmit} className="mt-4 space-y-4">
              <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Player:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {approvingWithdraw.userName} ({approvingWithdraw.userMobile})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payout Amount:</span>
                  <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm">
                    ₹{approvingWithdraw.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {approvingWithdraw.accountDetails || approvingWithdraw.upiId}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bank Reference / UTR Number
                </label>
                <input
                  type="text"
                  required
                  value={approvalUtr}
                  onChange={e => setApprovalUtr(e.target.value)}
                  placeholder="e.g. IMPS63920194819"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Payout Remark (Optional)
                </label>
                <input
                  type="text"
                  value={approvalRemark}
                  onChange={e => setApprovalRemark(e.target.value)}
                  placeholder="e.g. Dispatched via Banking Payout Gateway"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApprovingWithdraw(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Confirm & Sync to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-500" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Reject Withdrawal Request
                </h3>
              </div>
              <button
                onClick={() => setRejectingWithdraw(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
              <div className="rounded-xl bg-rose-50/50 p-3.5 dark:bg-rose-950/20 space-y-1.5 text-xs border border-rose-200 dark:border-rose-900/40">
                <p className="text-rose-700 dark:text-rose-300 font-medium">
                  Rejecting will automatically refund ₹{rejectingWithdraw.amount.toLocaleString()} back to {rejectingWithdraw.userName}&apos;s wallet in Firestore.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rejection Reason
                </label>
                <textarea
                  required
                  rows={3}
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder="e.g. Incorrect bank account number or invalid IFSC code."
                  className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingWithdraw(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700"
                >
                  <XCircle className="h-4 w-4" />
                  Confirm Rejection & Refund Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
