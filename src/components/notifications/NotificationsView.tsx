import React, { useState } from 'react';
import {
  BellRing,
  Send,
  Clock,
  Users,
  CheckCircle,
  Trash2,
  Sparkles,
  Radio,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { notifications, sendNotification, deleteNotification, firebaseConfig } = useApp();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState<'all' | 'active' | 'specific'>('all');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    try {
      await sendNotification(title.trim(), message.trim(), target);
      setTitle('');
      setMessage('');
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickTemplate = (templateTitle: string, templateMsg: string) => {
    setTitle(templateTitle);
    setMessage(templateMsg);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Push Notifications & Player Broadcasts
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-bold text-teal-700 dark:text-teal-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
              </span>
              Firestore: /notifications ({firebaseConfig.projectId})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transmit real-time system alerts, result declarations, and deposit/withdrawal updates directly to user apps via Cloud Firestore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-400 border border-teal-500/20">
            {notifications.length} Broadcasts Recorded
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form Column */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
              <BellRing className="h-4 w-4 text-teal-500" />
              Dispatch New Broadcast
            </h2>
            <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-extrabold text-teal-700 dark:bg-teal-950/50 dark:text-teal-400">
              Direct Firestore Write
            </span>
          </div>

          {/* Quick Announcement Presets */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Quick Templates
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    'Kalyan Open Result Declared!',
                    'Kalyan Open Digit 6 declared with Pana 259. Single Ank winning payouts have been credited to player wallets.'
                  )
                }
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Kalyan Result
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    'Instant UPI Top-up Active',
                    'Zero-delay automated UPI deposits are active 24x7 via Kotak UPI QR. Balances reflect immediately.'
                  )
                }
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                UPI Top-up
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    'Fast Withdrawal Payouts Released',
                    'All pending UPI & Bank withdrawals have been verified and dispatched to player accounts.'
                  )
                }
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Payout Dispatched
              </button>
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kalyan Market Open Result Declared!"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Saved as both <code className="text-teal-600 dark:text-teal-400">title</code> and <code className="text-teal-600 dark:text-teal-400">heading</code>
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Message Body *
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Kalyan Open Pana 259 Digit 6 published. All single ank winning bids credited to wallets."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Saved as both <code className="text-teal-600 dark:text-teal-400">message</code> and <code className="text-teal-600 dark:text-teal-400">body</code>
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target Audience
              </label>
              <select
                value={target}
                onChange={e => setTarget(e.target.value as any)}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Registered Players (Broadcast)</option>
                <option value="active">Active Online Players Only</option>
                <option value="specific">VIP / High-Rollers Only</option>
              </select>
            </div>

            {/* Firestore Schema Spec Card */}
            <div className="rounded-lg border border-slate-200/80 bg-slate-50 p-3 text-[11px] dark:border-slate-800 dark:bg-slate-800/50 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                Firestore Document Schema:
              </div>
              <ul className="font-mono text-[10px] text-slate-600 dark:text-slate-400 space-y-0.5 list-disc list-inside">
                <li><code>title</code> & <code>heading</code>: string</li>
                <li><code>message</code> & <code>body</code>: string</li>
                <li><code>type</code>: &apos;broadcast&apos;</li>
                <li><code>read</code>: false</li>
                <li><code>createdAt</code>: serverTimestamp()</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 disabled:opacity-50 transition"
            >
              <Send className={`h-4 w-4 ${isSending ? 'animate-bounce' : ''}`} />
              {isSending ? 'Publishing to Firestore...' : 'Dispatch Broadcast to User App'}
            </button>
          </form>
        </div>

        {/* History Log Column */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Live Broadcast History ({notifications.length})
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Synced in real-time via <code className="font-mono text-teal-600 dark:text-teal-400">onSnapshot(/notifications)</code>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle className="h-3 w-3" />
              Real-time Firestore
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 dark:border-slate-800">
                No broadcast notifications found in collection <code>/notifications</code>.
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {n.title || n.heading}
                        </span>
                        <span className="rounded bg-teal-100 px-1.5 py-0.2 text-[9px] font-extrabold text-teal-700 dark:bg-teal-950/80 dark:text-teal-400 uppercase">
                          {n.type || 'broadcast'}
                        </span>
                        {!n.read && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-extrabold text-blue-700 dark:bg-blue-950/80 dark:text-blue-400">
                            Unread
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400">
                        Doc ID: {n.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">
                        {n.sentAt}
                      </span>
                      <button
                        onClick={() => deleteNotification(n.id)}
                        title="Delete notification from Firestore"
                        className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    {n.message || n.body}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 font-bold uppercase dark:bg-slate-700 dark:text-slate-300">
                      Target: {n.target || 'all'}
                    </span>
                    <span className="text-emerald-600 font-semibold dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Synced to Mobile App
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
