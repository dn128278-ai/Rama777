import React, { useState } from 'react';
import { Gift, Plus, Sparkles, Trophy, Users, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GiftsView: React.FC = () => {
  const { showToast } = useApp();

  const [giftsList, setGiftsList] = useState([
    { id: 'GFT-1', title: 'Daily Login Lucky Scratch Card', rewardAmount: 25, criteria: 'Daily app login', active: true, claimedCount: 1420 },
    { id: 'GFT-2', title: 'Refer & Earn Friend Reward', rewardAmount: 100, criteria: 'Friend first deposit min ₹500', active: true, claimedCount: 384 },
    { id: 'GFT-3', title: 'Weekend Festival Cash Drop', rewardAmount: 250, criteria: 'Min 5 market bets on Saturday', active: true, claimedCount: 195 }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [rewardAmount, setRewardAmount] = useState(50);
  const [criteria, setCriteria] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setGiftsList(prev => [
      ...prev,
      {
        id: `GFT-${Date.now().toString().slice(-3)}`,
        title,
        rewardAmount,
        criteria: criteria || 'General Player Bonus',
        active: true,
        claimedCount: 0
      }
    ]);

    setIsAddOpen(false);
    setTitle('');
    setRewardAmount(50);
    setCriteria('');
    showToast('New Gift voucher program published!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Gifts & Rewards Program
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure player scratch cards, referral reward disbursements, and incentive bonus campaigns.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          Create Gift Campaign
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {giftsList.map(g => (
          <div
            key={g.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400">
                  <Gift className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <h3 className="mt-3 font-extrabold text-sm text-slate-900 dark:text-white">
                {g.title}
              </h3>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">Reward:</span>
                <span className="font-mono text-xl font-black text-pink-600 dark:text-pink-400">
                  ₹{g.rewardAmount}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                Rule: {g.criteria}
              </p>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-2.5 text-xs dark:bg-slate-800">
                <span className="text-slate-500">Claimed:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {g.claimedCount.toLocaleString()} times
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => showToast(`Disbursed instant rewards for ${g.title}!`)}
                className="w-full rounded-lg bg-pink-50 py-2 text-xs font-bold text-pink-600 hover:bg-pink-100 dark:bg-pink-950/30 dark:text-pink-400"
              >
                Disburse to Qualified Users
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Create New Gift Campaign
            </h3>

            <form onSubmit={handleAdd} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwale Mega Scratch Card"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Reward Amount (₹) *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={rewardAmount}
                  onChange={e => setRewardAmount(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Criteria / Unlock Requirement
                </label>
                <input
                  type="text"
                  placeholder="e.g. Min 3 consecutive daily deposits"
                  value={criteria}
                  onChange={e => setCriteria(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
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
                  className="rounded-lg bg-pink-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-pink-700"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
