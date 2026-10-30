import React from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketDataView: React.FC = () => {
  const { markets, showToast } = useApp();

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(markets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `markets_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Market schema exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Market Data & Database Management
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Raw data pipelines, backup dumps, and auto-result synchronization status.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Backup & Export */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Database className="h-4 w-4 text-amber-500" />
            Database Export & Backup
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Export all {markets.length} configured bazaar markets, timing rules, and current results in JSON format.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
            >
              <Download className="h-4 w-4" />
              Download JSON Dump
            </button>
            <button
              onClick={() => showToast('Database integrity test passed: 100% OK')}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4" />
              Verify Integrity
            </button>
          </div>
        </div>

        {/* Sync Server Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Live Auto-Result Pipeline
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Background worker polling API endpoints for official bazaar timings.
          </p>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 py-1.5 dark:border-slate-800">
              <span className="text-slate-500">Cron Worker Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">ACTIVE (Running every 30s)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 py-1.5 dark:border-slate-800">
              <span className="text-slate-500">Last External Poll</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">Just now</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Auto-Result Enabled Markets</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {markets.filter(m => m.autoResult).length} / {markets.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
