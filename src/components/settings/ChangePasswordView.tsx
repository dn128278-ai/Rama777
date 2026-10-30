import React, { useState } from 'react';
import { KeyRound, Shield, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChangePasswordView: React.FC = () => {
  const { showToast } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match!');
      return;
    }

    showToast('Admin password updated successfully. Session re-authenticated.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Change Master Administrator Password
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ensure high complexity for your root administrative credentials.
        </p>
      </div>

      <div className="max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Current Admin Password *
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                required
                placeholder="Enter existing password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              New Password *
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Confirm New Password *
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                required
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="h-4 w-4" />
              Password Security Guidelines
            </div>
            <p className="mt-1 text-[11px] leading-relaxed">
              Use a combination of uppercase letters, numbers, and symbols to protect sensitive financial operations and payout dispatch keys.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
            >
              <KeyRound className="h-4 w-4" />
              Update Administrator Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
