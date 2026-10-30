import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Coins,
  Ban,
  CheckCircle,
  Eye,
  CreditCard,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

export const UsersView: React.FC = () => {
  const {
    users,
    adjustUserWallet,
    toggleUserStatus,
    toggleBettingDisabled,
    createUser,
    firebaseConfig
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');

  // Adjust Wallet Modal
  const [adjustingUser, setAdjustingUser] = useState<User | null>(null);
  const [adjustType, setAdjustType] = useState<'credit' | 'debit'>('credit');
  const [adjustAmount, setAdjustAmount] = useState<number>(500);
  const [adjustRemark, setAdjustRemark] = useState('');

  // Create User Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    mobile: '',
    email: '',
    walletBalance: 1000
  });

  // User Details Drawer / Modal
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.mobile.includes(searchTerm) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ? true : u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingUser || adjustAmount <= 0) return;

    adjustUserWallet(
      adjustingUser.id,
      adjustType,
      adjustAmount,
      adjustRemark.trim() || 'Admin manual balance adjustment'
    );

    setAdjustingUser(null);
    setAdjustAmount(500);
    setAdjustRemark('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name.trim() || !newUserForm.mobile.trim()) return;

    createUser(newUserForm);
    setIsCreateOpen(false);
    setNewUserForm({ name: '', mobile: '', email: '', walletBalance: 1000 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              User Management & Wallet Ledger
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Firestore: /users ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control player access, credit/debit balances, view registration details and banking verifications.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-amber-500/20 hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Add New Player
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by player name, phone number, or ID..."
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
            <option value="all">All Players ({users.length})</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">User ID</th>
                <th className="px-4 py-3.5">Player Details</th>
                <th className="px-4 py-3.5">Wallet Balance</th>
                <th className="px-4 py-3.5">Deposited</th>
                <th className="px-4 py-3.5">Withdrawn</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Betting</th>
                <th className="px-4 py-3.5">Registered</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">
                    {user.id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">{user.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">{user.mobile}</div>
                  </td>

                  <td className="px-4 py-3 font-mono-numbers font-black text-sm text-emerald-600 dark:text-emerald-400">
                    ₹{user.walletBalance.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 font-mono-numbers font-semibold text-slate-600 dark:text-slate-400">
                    ₹{user.totalDeposited.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 font-mono-numbers font-semibold text-slate-600 dark:text-slate-400">
                    ₹{user.totalWithdrawn.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                      {user.status === 'active' ? 'Active' : 'Blocked'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleBettingDisabled(user.id)}
                      className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${
                        !user.bettingDisabled
                          ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400'
                          : 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}
                    >
                      {!user.bettingDisabled ? 'Allowed' : 'Disabled'}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {user.registeredAt}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Add/Deduct Wallet */}
                      <button
                        onClick={() => {
                          setAdjustingUser(user);
                          setAdjustType('credit');
                          setAdjustAmount(500);
                        }}
                        title="Adjust Wallet Balance"
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                      >
                        <Coins className="h-3.5 w-3.5" />
                      </button>

                      {/* View Details */}
                      <button
                        onClick={() => setViewingUser(user)}
                        title="View Player Profile"
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 hover:bg-sky-500 hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      {/* Ban / Unban */}
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                          user.status === 'active'
                            ? 'bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        <Ban className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUST WALLET BALANCE MODAL */}
      {adjustingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Adjust Wallet Balance
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Player: <strong className="text-slate-800 dark:text-slate-200">{adjustingUser.name}</strong> ({adjustingUser.mobile})
                </p>
              </div>
              <button
                onClick={() => setAdjustingUser(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="mt-4 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                <span className="text-slate-500">Current Wallet Balance:</span>
                <span className="font-mono-numbers text-base font-black text-emerald-600 dark:text-emerald-400">
                  ₹{adjustingUser.walletBalance.toLocaleString()}
                </span>
              </div>

              {/* Action Type Toggle */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Operation
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustType('credit')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                      adjustType === 'credit'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Add Money (Credit)
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustType('debit')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                      adjustType === 'debit'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <ArrowDownRight className="h-4 w-4" />
                    Deduct Money (Debit)
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={adjustAmount}
                  onChange={e => setAdjustAmount(Math.max(1, Number(e.target.value)))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-base font-black text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Remark */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Remark / Reason for Adjustment
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Promotional bonus, Cash deposit correction"
                  value={adjustRemark}
                  onChange={e => setAdjustRemark(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustingUser(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`rounded-lg px-5 py-2 text-xs font-bold text-white shadow-sm ${
                    adjustType === 'credit'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  Confirm {adjustType === 'credit' ? 'Credit' : 'Debit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Register New Player
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newUserForm.name}
                  onChange={e =>
                    setNewUserForm(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="e.g. 9822334455"
                  value={newUserForm.mobile}
                  onChange={e =>
                    setNewUserForm(prev => ({
                      ...prev,
                      mobile: e.target.value.replace(/\D/g, '')
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. player@gmail.com"
                  value={newUserForm.email}
                  onChange={e =>
                    setNewUserForm(prev => ({ ...prev, email: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Initial Wallet Balance (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={newUserForm.walletBalance}
                  onChange={e =>
                    setNewUserForm(prev => ({
                      ...prev,
                      walletBalance: Number(e.target.value)
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
                >
                  Register Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW USER DETAILS MODAL */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Player Profile: {viewingUser.name}
              </h3>
              <button
                onClick={() => setViewingUser(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                <div>
                  <span className="text-slate-500">Player ID:</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white">{viewingUser.id}</div>
                </div>
                <div>
                  <span className="text-slate-500">Phone:</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white">{viewingUser.mobile}</div>
                </div>
                <div>
                  <span className="text-slate-500">Wallet Balance:</span>
                  <div className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                    ₹{viewingUser.walletBalance.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Last Login:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{viewingUser.lastLogin}</div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white">Linked Bank & UPI Account:</span>
                {viewingUser.bankDetail ? (
                  <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    <div>Bank: {viewingUser.bankDetail.bankName}</div>
                    <div>A/C Holder: {viewingUser.bankDetail.accountHolderName}</div>
                    <div>A/C Number: {viewingUser.bankDetail.accountNumber}</div>
                    <div>IFSC: {viewingUser.bankDetail.ifsc}</div>
                    <div>UPI ID: {viewingUser.bankDetail.upiId}</div>
                  </div>
                ) : (
                  <div className="mt-1 text-slate-400">No bank details added yet.</div>
                )}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setViewingUser(null)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
