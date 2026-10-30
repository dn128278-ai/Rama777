import React, { useState } from 'react';
import {
  Flame,
  CheckCircle,
  RefreshCw,
  Upload,
  Database,
  ShieldCheck,
  Server,
  Activity,
  FileCode,
  Layers,
  ArrowRight,
  Users,
  Radio,
  Zap,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  AlertTriangle,
  RotateCcw,
  Loader2,
  DollarSign,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { parseGoogleServicesJson, DEFAULT_FIREBASE_CONFIG } from '../../services/firebase';

export const FirebaseSyncView: React.FC = () => {
  const {
    firebaseConfig,
    updateFirebaseConfig,
    firebaseSyncStatus,
    syncAllMarketsToFirebaseNow,
    syncEventsLog,
    showToast,
    markets,
    setActiveTab,
    users,
    deposits,
    withdraws,
    transactions,
    bets,
    notifications,
    kotakAutoDepositVpa,
    simulateAutoApprovedTopup,
    isPurgingDatabase,
    clearDatabaseForProduction,
    restoreDemoData
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'status' | 'app-config' | 'google-services' | 'manual-config' | 'logs' | 'reset-utility'>('status');
  const [googleServicesJsonText, setGoogleServicesJsonText] = useState('');
  const [manualConfig, setManualConfig] = useState(firebaseConfig);
  const [isSyncingMarkets, setIsSyncingMarkets] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Database Reset Modal state
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeType, setPurgeType] = useState<'production' | 'nuclear'>('production');
  const [confirmInput, setConfirmInput] = useState('');
  const [lastPurgeSummary, setLastPurgeSummary] = useState<Record<string, number> | null>(null);

  const exactWebSnippet = `// Rama77 User App & Admin Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "${firebaseConfig.apiKey || 'AIzaSyCp9oyDecD1CuHKUQ6sMDqZVT8zsVZaHyg'}",
  authDomain: "${firebaseConfig.authDomain || 'rama777-37ef1.firebaseapp.com'}",
  projectId: "${firebaseConfig.projectId || 'rama777-37ef1'}",
  storageBucket: "${firebaseConfig.storageBucket || 'rama777-37ef1.firebasestorage.app'}",
  messagingSenderId: "${firebaseConfig.messagingSenderId || '711131800920'}",
  appId: "${firebaseConfig.appId || '1:711131800920:web:f04d3746c99ecd099b12d'}",
  measurementId: "${firebaseConfig.measurementId || 'G-R1D44F3E4L'}"
};

// Initialize Firebase SDK
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);`;

  const exactAndroidSnippet = `{
  "project_info": {
    "project_number": "${firebaseConfig.messagingSenderId || '711131800920'}",
    "firebase_url": "${firebaseConfig.databaseURL || 'https://rama777-37ef1-default-rtdb.firebaseio.com'}",
    "project_id": "${firebaseConfig.projectId || 'rama777-37ef1'}",
    "storage_bucket": "${firebaseConfig.storageBucket || 'rama777-37ef1.firebasestorage.app'}"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "${firebaseConfig.appId || '1:711131800920:android:client'}",
        "android_client_info": {
          "package_name": "com.rama77.matka"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "${firebaseConfig.apiKey || 'AIzaSyCp9oyDecD1CuHKUQ6sMDqZVT8zsVZaHyg'}"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}`;

  const exactFlutterSnippet = `// File: lib/firebase_options.dart
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    return const FirebaseOptions(
      apiKey: '${firebaseConfig.apiKey || 'AIzaSyCp9oyDecD1CuHKUQ6sMDqZVT8zsVZaHyg'}',
      appId: '${firebaseConfig.appId || '1:711131800920:web:f04d3746c99ecd099b12d'}',
      messagingSenderId: '${firebaseConfig.messagingSenderId || '711131800920'}',
      projectId: '${firebaseConfig.projectId || 'rama777-37ef1'}',
      authDomain: '${firebaseConfig.authDomain || 'rama777-37ef1.firebaseapp.com'}',
      databaseURL: '${firebaseConfig.databaseURL || 'https://rama777-37ef1-default-rtdb.firebaseio.com'}',
      storageBucket: '${firebaseConfig.storageBucket || 'rama777-37ef1.firebasestorage.app'}',
      measurementId: '${firebaseConfig.measurementId || 'G-R1D44F3E4L'}',
    );
  }
}`;

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    showToast(`Copied ${format} configuration to clipboard!`);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleImportGoogleServices = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleServicesJsonText.trim()) {
      showToast('Please paste the contents of google-services.json');
      return;
    }

    const parsed = parseGoogleServicesJson(googleServicesJsonText);
    if (!parsed) {
      showToast('Invalid google-services.json format. Please verify the JSON structure.');
      return;
    }

    updateFirebaseConfig(parsed);
    setManualConfig(prev => ({ ...prev, ...parsed }));
    showToast(`Firebase configuration updated from google-services.json! Connected to ${parsed.projectId || 'Firebase Project'}`);
    setActiveSubTab('status');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setGoogleServicesJsonText(content);
      const parsed = parseGoogleServicesJson(content);
      if (parsed) {
        updateFirebaseConfig(parsed);
        setManualConfig(prev => ({ ...prev, ...parsed }));
        showToast(`Loaded ${file.name} successfully! Project ID: ${parsed.projectId}`);
      } else {
        showToast('File read, but could not parse as google-services.json.');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveManualConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateFirebaseConfig(manualConfig);
    showToast(`Saved and connected to Firebase project: ${manualConfig.projectId}!`);
    setActiveSubTab('status');
  };

  const handleResetToDefaultConfig = () => {
    setManualConfig(DEFAULT_FIREBASE_CONFIG);
    updateFirebaseConfig(DEFAULT_FIREBASE_CONFIG);
    showToast(`Configuration updated to default live project: ${DEFAULT_FIREBASE_CONFIG.projectId}!`);
  };

  const handleSyncMarkets = async () => {
    setIsSyncingMarkets(true);
    try {
      const count = await syncAllMarketsToFirebaseNow();
      showToast(`Successfully broadcast ${count} markets to Firebase (Firestore & RTDB)!`);
    } catch {
      showToast('Market broadcast completed with local fallback.');
    } finally {
      setIsSyncingMarkets(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Flame className="h-5 w-5" />
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Firebase Firestore Live Sync & App Config
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Real-time live synchronization bridge connecting User App and Admin Panel for wallets, deposits, bids, and results in project{' '}
            <strong className="text-amber-500 font-mono">{firebaseConfig.projectId}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {firebaseSyncStatus.statusText}
          </span>
          <button
            onClick={() => setActiveTab('markets')}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400"
          >
            <Database className="h-3.5 w-3.5" />
            Manage Markets
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        <button
          onClick={() => setActiveSubTab('status')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'status'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="h-4 w-4" />
          Live Connection Status
        </button>

        <button
          onClick={() => setActiveSubTab('app-config')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'app-config'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          User App Configuration (App Tab)
        </button>

        <button
          onClick={() => setActiveSubTab('google-services')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'google-services'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <FileCode className="h-4 w-4" />
          Import google-services.json
        </button>

        <button
          onClick={() => setActiveSubTab('manual-config')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'manual-config'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Server className="h-4 w-4" />
          Credentials & Paths
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'logs'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="h-4 w-4" />
          Real-time Event Stream ({syncEventsLog.length})
        </button>

        <button
          onClick={() => setActiveSubTab('reset-utility')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            activeSubTab === 'reset-utility'
              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/50'
              : 'text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 border border-rose-500/30'
          }`}
        >
          <Trash2 className="h-4 w-4 text-rose-500" />
          Master Database Reset (0 Clean)
        </button>
      </div>

      {/* Tab: Status & Quick Operations */}
      {activeSubTab === 'status' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Firebase Project</span>
                <span className="rounded-md bg-amber-500/10 p-1.5 text-amber-500">
                  <Flame className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-lg font-black text-slate-900 dark:text-white truncate font-mono">
                {firebaseConfig.projectId}
              </p>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Live Firestore & RTDB Active
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Player Wallets Sync</span>
                <span className="rounded-md bg-emerald-500/10 p-1.5 text-emerald-500">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                {users.length} Connected Accounts
              </p>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Real-time `/users` Firestore sync
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Markets & Results</span>
                <span className="rounded-md bg-blue-500/10 p-1.5 text-blue-500">
                  <Database className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                {markets.length} Markets Synced
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Live timing & result broadcast</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Real-time Bids & Top-ups</span>
                <span className="rounded-md bg-purple-500/10 p-1.5 text-purple-500">
                  <ShieldCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                Firestore + RTDB
              </p>
              <p className="mt-1 text-[11px] text-purple-600 dark:text-purple-400 font-medium">Dual live listener channels</p>
            </div>
          </div>

          {/* Quick Actions & Live Market Sync */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Card: Market Timings & Results Broadcast */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <Database className="h-4 w-4 text-amber-500" />
                Push Markets & Timings to Firebase
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Instantly writes all {markets.length} market definitions, opening/closing times, and declared game results to project <strong className="font-mono text-slate-700 dark:text-slate-300">{firebaseConfig.projectId}</strong> so User App home screens reflect them immediately.
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Active Firebase destinations:</div>
                <ul className="mt-1 space-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <li>• Firestore Markets: <code>/markets/&#123;marketId&#125;</code></li>
                  <li>• Realtime DB Timings: <code>markets/&#123;marketId&#125;</code></li>
                  <li>• Declared Results: <code>/market_results/&#123;marketId&#125;_&#123;date&#125;</code> &amp; <code>live_results/&#123;marketId&#125;</code></li>
                  <li>• Live Player Bids: <code>/bids/&#123;bidId&#125;</code></li>
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSyncMarkets}
                  disabled={isSyncingMarkets}
                  className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncingMarkets ? 'animate-spin' : ''}`} />
                  {isSyncingMarkets ? 'Syncing to Firebase...' : `Broadcast All ${markets.length} Markets Now`}
                </button>
                <button
                  onClick={() => setActiveTab('markets')}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Edit Individual Market Timings
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Card: Connection Status & Real-time Broadcasting Overview */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <Radio className="h-4 w-4 text-emerald-500" />
                Live Configuration Status
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                User App and Admin Panel are configured with matching Firebase credentials:
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-800/50">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Project ID:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {firebaseConfig.projectId}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-800/50">
                  <span className="font-medium text-slate-600 dark:text-slate-300">API Key:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {firebaseConfig.apiKey ? `${firebaseConfig.apiKey.slice(0, 14)}...` : 'Not set'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-800/50">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Auth Domain:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {firebaseConfig.authDomain}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-800/50">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Storage Bucket:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {firebaseConfig.storageBucket}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-800/50">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Measurement ID:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {firebaseConfig.measurementId || 'G-R1D44F3E4L'}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveSubTab('app-config')}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  View User App Integration (App Tab)
                </button>
                <button
                  onClick={() => setActiveSubTab('manual-config')}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400"
                >
                  Edit Credentials
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Kotak Automated UPI Live Receiver Card */}
          <div className="rounded-xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/5 via-slate-900/10 to-amber-500/5 p-5 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Live Auto-Approved Engine Active
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Listening on Firestore: /auto_deposits in {firebaseConfig.projectId}
                  </span>
                </div>
                <h2 className="mt-2 text-base font-black text-slate-900 dark:text-white sm:text-lg">
                  Automated Kotak UPI Instant Top-Up Engine
                </h2>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Player payments made to Kotak VPA <strong className="font-mono text-emerald-600 dark:text-emerald-400">{kotakAutoDepositVpa}</strong> are automatically recorded as <strong className="text-emerald-500">Auto-Approved</strong>, crediting player wallet balances and bumping dashboard metrics in real-time. Zero manual admin approval or UTR checks required.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => simulateAutoApprovedTopup(1000)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Simulate Live Auto-Topup (+₹1,000)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('deposit-history')}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  View Auto-Approved Ledger
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Master Database Reset & Production Zero-State Banner */}
          <div className="rounded-xl border border-rose-300 bg-rose-50/70 p-5 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Trash2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Master Database Reset & 0-Data Production Launch Utility
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    Purge all test/demo players, bids, ledger transactions, deposits, and withdrawal records in Firestore project <strong className="font-mono text-rose-600 dark:text-rose-400">{firebaseConfig.projectId}</strong> so your admin panel launches fresh with 0 data.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('reset-utility')}
                className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-500 whitespace-nowrap transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Open Reset Utility
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: User App Integration Config (App Tab) */}
      {activeSubTab === 'app-config' && (
        <div className="space-y-6">
          {/* Main Info Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900 dark:text-white">
                  <Smartphone className="h-5 w-5 text-amber-500" />
                  User App & Mobile Integration Credentials (App Tab)
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Paste this exact Firebase configuration into your mobile player application (Android Studio, Flutter, or Web/React Native) to establish bidirectional real-time synchronization with this Admin Panel.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(exactWebSnippet, 'JavaScript / Web')}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400 transition"
              >
                {copiedFormat === 'JavaScript / Web' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy JavaScript Config
              </button>
            </div>

            {/* Live Synchronized Collections Grid */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 dark:bg-emerald-950/20">
                <div className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">1. User Wallets</div>
                <div className="mt-1 font-mono text-xs font-extrabold text-slate-900 dark:text-white">/users/&#123;userId&#125;</div>
                <p className="mt-0.5 text-[11px] text-slate-500">Live sync of player balances, status, and deposits.</p>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 dark:bg-amber-950/20">
                <div className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">2. Instant Auto-Deposits</div>
                <div className="mt-1 font-mono text-xs font-extrabold text-slate-900 dark:text-white">/auto_deposits/&#123;id&#125;</div>
                <p className="mt-0.5 text-[11px] text-slate-500">Kotak UPI payments credit player wallets zero-touch.</p>
              </div>

              <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 dark:bg-blue-950/20">
                <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">3. Player Bids & Bets</div>
                <div className="mt-1 font-mono text-xs font-extrabold text-slate-900 dark:text-white">/bids/&#123;bidId&#125;</div>
                <p className="mt-0.5 text-[11px] text-slate-500">User bets appear in Admin Panel in real time.</p>
              </div>

              <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3 dark:bg-purple-950/20">
                <div className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">4. Live Results Broadcast</div>
                <div className="mt-1 font-mono text-xs font-extrabold text-slate-900 dark:text-white">/market_results/ &amp; live_results</div>
                <p className="mt-0.5 text-[11px] text-slate-500">Declared results push instantly to player devices.</p>
              </div>
            </div>

            {/* Code Tabs */}
            <div className="mt-6 space-y-5">
              {/* Web / React / Node.js Snippet */}
              <div>
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Option A: Web / React Native / Node.js
                    </span>
                    <span className="text-[11px] text-slate-400">Exact requested firebaseConfig</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(exactWebSnippet, 'JavaScript / Web')}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400"
                  >
                    <Copy className="h-3 w-3" />
                    Copy Code
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs text-amber-300 leading-relaxed">
{exactWebSnippet}
                </pre>
              </div>

              {/* Android Studio google-services.json Snippet */}
              <div>
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Option B: Android Studio (`app/google-services.json`)
                    </span>
                    <span className="text-[11px] text-slate-400">Native Kotlin/Java Android User App</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(exactAndroidSnippet, 'Android google-services.json')}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400"
                  >
                    <Copy className="h-3 w-3" />
                    Copy JSON
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
{exactAndroidSnippet}
                </pre>
              </div>

              {/* Flutter Snippet */}
              <div>
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Option C: Flutter (`lib/firebase_options.dart`)
                    </span>
                    <span className="text-[11px] text-slate-400">Cross-Platform Flutter Player App</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(exactFlutterSnippet, 'Flutter firebase_options.dart')}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400"
                  >
                    <Copy className="h-3 w-3" />
                    Copy Dart
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs text-sky-300 leading-relaxed">
{exactFlutterSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Google Services JSON Import */}
      {activeSubTab === 'google-services' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <FileCode className="h-4 w-4 text-amber-500" />
                Upload or Paste google-services.json
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Upload the <code>google-services.json</code> file from your Android app (`app/google-services.json`) or paste its raw JSON below.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-amber-500/50 bg-amber-500/5 px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/10 dark:text-amber-400">
              <Upload className="h-4 w-4" />
              <span>Choose google-services.json file</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleImportGoogleServices} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Raw JSON Contents
              </label>
              <textarea
                rows={10}
                value={googleServicesJsonText}
                onChange={e => setGoogleServicesJsonText(e.target.value)}
                placeholder={`{\n  "project_info": {\n    "project_number": "${firebaseConfig.messagingSenderId || '711131800920'}",\n    "project_id": "${firebaseConfig.projectId || 'rama777-37ef1'}",\n    "storage_bucket": "${firebaseConfig.storageBucket || 'rama777-37ef1.firebasestorage.app'}"\n  },\n  "client": [\n    {\n      "api_key": [\n        {\n          "current_key": "${firebaseConfig.apiKey || 'AIzaSy...'}"\n        }\n      ]\n    }\n  ]\n}`}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-500">
                The parser will automatically map <code>current_key</code>, <code>project_id</code>, and Realtime Database endpoints.
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Parse & Connect Admin Panel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Manual Config */}
      {activeSubTab === 'manual-config' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <Server className="h-4 w-4 text-amber-500" />
                Manual Firebase Credentials & URLs
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Directly configure Firebase Web SDK credentials for project <strong>{manualConfig.projectId}</strong>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetToDefaultConfig}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset to rama777-37ef1 Defaults
            </button>
          </div>

          <form onSubmit={handleSaveManualConfig} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Project ID
                </label>
                <input
                  type="text"
                  value={manualConfig.projectId}
                  onChange={e => setManualConfig({ ...manualConfig, projectId: e.target.value })}
                  placeholder="rama777-37ef1"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Firebase Web API Key (apiKey)
                </label>
                <input
                  type="text"
                  value={manualConfig.apiKey}
                  onChange={e => setManualConfig({ ...manualConfig, apiKey: e.target.value })}
                  placeholder="AIzaSyCp9oyDecD1CuHKUQ6sMDqZVT8zsVZaHyg"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Auth Domain
                </label>
                <input
                  type="text"
                  value={manualConfig.authDomain}
                  onChange={e => setManualConfig({ ...manualConfig, authDomain: e.target.value })}
                  placeholder="rama777-37ef1.firebaseapp.com"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  value={manualConfig.storageBucket || ''}
                  onChange={e => setManualConfig({ ...manualConfig, storageBucket: e.target.value })}
                  placeholder="rama777-37ef1.firebasestorage.app"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Messaging Sender ID
                </label>
                <input
                  type="text"
                  value={manualConfig.messagingSenderId || ''}
                  onChange={e => setManualConfig({ ...manualConfig, messagingSenderId: e.target.value })}
                  placeholder="711131800920"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  App ID
                </label>
                <input
                  type="text"
                  value={manualConfig.appId || ''}
                  onChange={e => setManualConfig({ ...manualConfig, appId: e.target.value })}
                  placeholder="1:711131800920:web:f04d3746c99ecd099b12d"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Measurement ID
                </label>
                <input
                  type="text"
                  value={manualConfig.measurementId || ''}
                  onChange={e => setManualConfig({ ...manualConfig, measurementId: e.target.value })}
                  placeholder="G-R1D44F3E4L"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Realtime Database URL
                </label>
                <input
                  type="text"
                  value={manualConfig.databaseURL || ''}
                  onChange={e => setManualConfig({ ...manualConfig, databaseURL: e.target.value })}
                  placeholder="https://rama777-37ef1-default-rtdb.firebaseio.com"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400"
              >
                Save & Initialize Firebase
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Real-time Event Stream */}
      {activeSubTab === 'logs' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <Layers className="h-4 w-4 text-amber-500" />
                Live Firebase Event Stream
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Log of real-time market timing broadcasts, game result declarations, user wallet updates, and bids for project <strong>{firebaseConfig.projectId}</strong>.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {syncEventsLog.length} Events Logged
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
            {syncEventsLog.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No events recorded yet. Connect to Firebase or publish a market result to see real-time updates.
              </div>
            ) : (
              syncEventsLog.map(evt => (
                <div key={evt.id} className="flex items-start gap-3 py-2.5 text-xs">
                  <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap">{evt.time}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      evt.type === 'deposit'
                        ? 'bg-blue-500/10 text-blue-500'
                        : evt.type === 'approval'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : evt.type === 'result_declare'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }`}
                  >
                    {evt.type}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 flex-1">{evt.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab: Master Database Reset & Production 0-Data Utility */}
      {activeSubTab === 'reset-utility' && (
        <div className="space-y-6">
          {/* Main Warning Banner */}
          <div className="rounded-xl border-2 border-rose-500/50 bg-gradient-to-br from-rose-500/10 via-slate-900/5 to-amber-500/10 p-6 shadow-sm dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 ring-4 ring-rose-500/10">
                  <Trash2 className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      Master Clear Tool
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Target Project: {firebaseConfig.projectId}
                    </span>
                  </div>
                  <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl">
                    Master Database Reset & Production Fresh (0 Data) Utility
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                    Use this utility to clear out all existing test accounts, mock bets, demo transactions, and deposit/withdrawal records in Cloud Firestore and Realtime Database. Once executed, the panel will start fresh with <strong>0 users, 0 bids, ₹0 deposits, ₹0 withdrawals, and 0 wallet balances</strong>, ready for live real-money operations.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Current Live Records to be Purged */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Current Database Inventory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total active documents across Firestore collections that will be wiped on reset:
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Firestore: {firebaseConfig.projectId}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Users</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{users.length}</p>
                <span className="text-[10px] text-slate-400">accounts</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Bids / Bets</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{bets.length}</p>
                <span className="text-[10px] text-slate-400">placed bets</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Deposits</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{deposits.length}</p>
                <span className="text-[10px] text-slate-400">records</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Withdrawals</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{withdraws.length}</p>
                <span className="text-[10px] text-slate-400">requests</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ledger</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{transactions.length}</p>
                <span className="text-[10px] text-slate-400">transactions</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Broadcasts</span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{notifications.length}</p>
                <span className="text-[10px] text-slate-400">notifications</span>
              </div>
            </div>
          </div>

          {/* Reset Options Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Option A: Production Fresh (0 Data) */}
            <div className="rounded-xl border-2 border-rose-500/40 bg-white p-5 shadow-sm dark:border-rose-500/30 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                    <Trash2 className="h-4 w-4 text-rose-500" />
                    Option 1: Production Fresh Launch (0 Data)
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    Recommended
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  Completely wipes all users, bets, deposits, withdrawals, ledger transactions, broadcast notifications, and live results from Firestore & RTDB.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Clears all user accounts & sets wallet balances to ₹0
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Resets Dashboard metrics (Users, Bid Amount, Deposit, Withdraw) to exact 0
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Preserves market schedules while resetting declared results to ***-*-*-***
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    App is immediately clean and ready for live production user signups
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setPurgeType('production');
                    setConfirmInput('');
                    setShowPurgeModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-500 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Test Data (Start Fresh at 0)
                </button>
              </div>
            </div>

            {/* Option B: Nuclear Complete Wipe */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Option 2: Nuclear Complete Database Wipe
                  </span>
                  <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">
                    Nuclear
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  Deletes everything including custom market listings from Firestore. Only use if re-architecting your entire platform configuration.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-1.5 text-rose-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Deletes all users, bids, deposits, and withdrawals
                  </li>
                  <li className="flex items-center gap-1.5 text-rose-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Deletes all market catalog documents from Firestore
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500">
                    <CheckCircle className="h-3.5 w-3.5" />
                    You can re-sync default markets at any time from the Markets tab
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setPurgeType('nuclear');
                    setConfirmInput('');
                    setShowPurgeModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/40 transition"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Nuclear Wipe (Including Markets)
                </button>
              </div>
            </div>
          </div>

          {/* Option C: Demo Data Restoration */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <RotateCcw className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Need Sample Data for UI Testing?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    You can re-populate sample test players and mock bids at any time by clicking "Restore Demo Data".
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={restoreDemoData}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restore Sample Demo Data
              </button>
            </div>
          </div>

          {/* Last Purge Summary Card */}
          {lastPurgeSummary && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-5 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    Last Database Reset Report
                  </h4>
                  <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-300">
                    Firestore & Realtime Database purged successfully. Below is the summary of wiped documents:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(lastPurgeSummary).map(([col, cnt]) => (
                      <span
                        key={col}
                        className="rounded bg-white/80 px-2 py-1 font-mono text-[11px] font-bold text-emerald-800 dark:bg-slate-900/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      >
                        {col}: <strong>{cnt}</strong> deleted
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Modal */}
          {showPurgeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-2xl border border-rose-500/40 bg-white p-6 shadow-2xl dark:border-rose-900/50 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
                      {purgeType === 'nuclear' ? 'Confirm Nuclear Database Wipe' : 'Confirm Production Fresh Reset'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Firebase Project: <strong className="font-mono text-rose-600 dark:text-rose-400">{firebaseConfig.projectId}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300 space-y-2">
                  <p className="font-bold">
                    ⚠️ WARNING: This action is permanent and cannot be undone!
                  </p>
                  <p>
                    All active players, wallet balances, placed bids, deposits, and withdrawal requests will be permanently purged from Firestore and RTDB.
                  </p>
                  <p className="text-[11px]">
                    After completion, your dashboard metrics will reflect <strong>0 Users, ₹0 Bid Amount, ₹0 Deposits, and ₹0 Wallet Balance</strong>.
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    To confirm, please type <strong className="font-mono text-rose-600 dark:text-rose-400">RESET</strong> below:
                  </label>
                  <input
                    type="text"
                    value={confirmInput}
                    onChange={e => setConfirmInput(e.target.value)}
                    placeholder="Type RESET"
                    disabled={isPurgingDatabase}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-bold tracking-widest uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={isPurgingDatabase}
                    onClick={() => {
                      setShowPurgeModal(false);
                      setConfirmInput('');
                    }}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={confirmInput.trim().toUpperCase() !== 'RESET' || isPurgingDatabase}
                    onClick={async () => {
                      const res = await clearDatabaseForProduction({
                        purgeUsers: true,
                        purgeBids: true,
                        purgeTransactions: true,
                        purgeDeposits: true,
                        purgeWithdrawals: true,
                        purgeNotifications: true,
                        purgeLiveResults: true,
                        resetMarketResults: true,
                        purgeMarketsEntirely: purgeType === 'nuclear'
                      });

                      setLastPurgeSummary(res.deletedCounts);
                      setShowPurgeModal(false);
                      setConfirmInput('');
                    }}
                    className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-500 transition disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isPurgingDatabase ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Purging Firestore & RTDB...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Permanently Purge & Reset to 0
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
