import React, { useState } from 'react';
import { Settings, Save, Smartphone, Shield, QrCode, AlertTriangle, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GeneralSettingsView: React.FC = () => {
  const { settings, updateSettings, showToast, setActiveTab, users } = useApp();

  const [form, setForm] = useState({ ...settings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          App Data & General Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure payment gateways, official UPI IDs, deposit/withdrawal limits, app notice board, and maintenance toggles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment & UPI Gateway */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <QrCode className="h-4 w-4 text-amber-500" />
            UPI Gateway & QR Code Settings
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Primary UPI ID *
              </label>
              <input
                type="text"
                required
                value={form.primaryUpiId}
                onChange={e => setForm(prev => ({ ...prev, primaryUpiId: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Secondary Backup UPI ID
              </label>
              <input
                type="text"
                value={form.secondaryUpiId}
                onChange={e => setForm(prev => ({ ...prev, secondaryUpiId: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                UPI Merchant Holder Name
              </label>
              <input
                type="text"
                value={form.upiHolderName}
                onChange={e => setForm(prev => ({ ...prev, upiHolderName: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Deposit & Withdrawal Limits */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Smartphone className="h-4 w-4 text-emerald-500" />
            Transaction Thresholds & Window Hours
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Minimum Deposit (₹)
              </label>
              <input
                type="number"
                min={10}
                value={form.minDeposit}
                onChange={e => setForm(prev => ({ ...prev, minDeposit: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Maximum Deposit (₹)
              </label>
              <input
                type="number"
                value={form.maxDeposit}
                onChange={e => setForm(prev => ({ ...prev, maxDeposit: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Minimum Withdrawal (₹)
              </label>
              <input
                type="number"
                min={100}
                value={form.minWithdraw}
                onChange={e => setForm(prev => ({ ...prev, minWithdraw: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Maximum Withdrawal (₹)
              </label>
              <input
                type="number"
                value={form.maxWithdraw}
                onChange={e => setForm(prev => ({ ...prev, maxWithdraw: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Withdrawal Allowed From
              </label>
              <input
                type="text"
                placeholder="10:00 AM"
                value={form.withdrawStartTime}
                onChange={e => setForm(prev => ({ ...prev, withdrawStartTime: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Withdrawal Allowed Until
              </label>
              <input
                type="text"
                placeholder="08:00 PM"
                value={form.withdrawEndTime}
                onChange={e => setForm(prev => ({ ...prev, withdrawEndTime: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Marquee Notice & Contact */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Shield className="h-4 w-4 text-sky-500" />
            Support Contact & App Notice Marquee
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Scrolling Marquee Banner Text
              </label>
              <textarea
                rows={2}
                value={form.marqueeNotice}
                onChange={e => setForm(prev => ({ ...prev, marqueeNotice: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Support WhatsApp Number
                </label>
                <input
                  type="text"
                  value={form.contactWhatsApp}
                  onChange={e => setForm(prev => ({ ...prev, contactWhatsApp: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Support Phone
                </label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={e => setForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Support Email
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={e => setForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Maintenance Mode Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Emergency Maintenance Mode
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Temporarily pause all player logins and bet placements for server updates.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={form.maintenanceMode}
                onChange={e => setForm(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                className="h-5 w-5 rounded accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
          >
            <Save className="h-4 w-4" />
            Save Platform Settings
          </button>
        </div>
      </form>

      {/* Database Reset & Fresh Production Clear Utility */}
      <div className="rounded-xl border border-rose-300 bg-rose-50/70 p-5 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Trash2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Master Database Reset & Production Launch (0 Data)
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Purge all test users, bets, deposits, withdrawals, and game results from Firestore and RTDB to launch your panel completely fresh with 0 data, 0 users, and ₹0 balances.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('firebase-sync')}
            className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-500 whitespace-nowrap transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Launch Database Reset Tool
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
