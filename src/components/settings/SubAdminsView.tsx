import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Edit2, X, Check, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubAdmin } from '../../types';

export const SubAdminsView: React.FC = () => {
  const { subAdmins, addSubAdmin, updateSubAdmin, deleteSubAdmin } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Market Manager' as SubAdmin['role'],
    permissions: {
      manageMarkets: true,
      declareResults: true,
      manageUsers: false,
      approveWithdrawals: false,
      manageDeposits: false,
      viewLedgers: true,
      systemSettings: false
    },
    status: 'active' as const
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    addSubAdmin(form);
    setIsAddOpen(false);
    setForm({
      name: '',
      email: '',
      role: 'Market Manager',
      permissions: {
        manageMarkets: true,
        declareResults: true,
        manageUsers: false,
        approveWithdrawals: false,
        manageDeposits: false,
        viewLedgers: true,
        systemSettings: false
      },
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Sub Admins & Staff Access Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Grant granular permissions to operations staff (Market Result Declaration, Deposit Verification, Ledger Audits).
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Create Sub Admin
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {subAdmins.map(sa => (
          <div
            key={sa.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {sa.role}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    sa.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {sa.status.toUpperCase()}
                </span>
              </div>

              <h3 className="mt-3 font-extrabold text-base text-slate-900 dark:text-white">
                {sa.name}
              </h3>
              <p className="font-mono text-xs text-slate-400">{sa.email}</p>

              {/* Permissions Checklist */}
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Privileges:</span>
                <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${sa.permissions.manageMarkets ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Manage Markets: {sa.permissions.manageMarkets ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${sa.permissions.declareResults ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Declare Results: {sa.permissions.declareResults ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${sa.permissions.manageUsers ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Manage Users & Balances: {sa.permissions.manageUsers ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${sa.permissions.approveWithdrawals ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Approve Withdrawals: {sa.permissions.approveWithdrawals ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${sa.permissions.manageDeposits ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Verify Deposits: {sa.permissions.manageDeposits ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Active: {sa.lastActive}</span>
              <button
                onClick={() => deleteSubAdmin(sa.id)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE SUB ADMIN MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Add Sub Admin User
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Staff Member Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikas Gupta"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Login *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikas.ops@rama77.in"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Assigned Staff Role
                </label>
                <select
                  value={form.role}
                  onChange={e => setForm(prev => ({ ...prev, role: e.target.value as any }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Market Manager">Market Manager</option>
                  <option value="Accountant">Accountant / Finance</option>
                  <option value="Support">Support Desk</option>
                  <option value="Manager">General Manager</option>
                </select>
              </div>

              {/* Granular Permissions */}
              <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Granular Permissions:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.manageMarkets}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, manageMarkets: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    Manage Markets
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.declareResults}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, declareResults: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    Declare Results
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.manageUsers}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, manageUsers: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    Manage Users
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.approveWithdrawals}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, approveWithdrawals: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    Approve Withdrawals
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.manageDeposits}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, manageDeposits: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    Verify Deposits
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.permissions.viewLedgers}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          permissions: { ...p.permissions, viewLedgers: e.target.checked }
                        }))
                      }
                      className="rounded accent-emerald-600"
                    />
                    View Ledgers
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
