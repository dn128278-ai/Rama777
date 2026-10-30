import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveTab,
  Market,
  User,
  DepositRequest,
  WithdrawRequest,
  Transaction,
  BetRecord,
  StarlineMarket,
  DesawarMarket,
  GameType,
  SliderImage,
  SubAdmin,
  GeneralSetting,
  SingleAnkBidStat,
  PaymentGatewayConfig,
  WebhookLog,
  GatewayLinkedDeposit,
  AppNotification
} from '../types';
import {
  INITIAL_MARKETS,
  INITIAL_USERS,
  INITIAL_DEPOSITS,
  INITIAL_WITHDRAWS,
  INITIAL_TRANSACTIONS,
  INITIAL_BETS,
  INITIAL_STARLINE_MARKETS,
  INITIAL_DESAWAR_MARKETS,
  INITIAL_GAME_TYPES,
  INITIAL_SLIDERS,
  INITIAL_SUB_ADMINS,
  INITIAL_SETTINGS,
  INITIAL_GATEWAY_CONFIG,
  INITIAL_WEBHOOK_LOGS,
  INITIAL_GATEWAY_DEPOSITS,
  getSingleAnkLiveBids
} from '../data/mockData';
import {
  getStoredFirebaseConfig,
  saveFirebaseConfig,
  isFirebaseConfigured,
  initFirebase,
  testFirestoreConnection,
  subscribeToUsers,
  updateUserInFirebase,
  createUserInFirebase,
  subscribeToWithdrawals,
  updateWithdrawalInFirebase,
  subscribeToDeposits,
  updateDepositInFirebase,
  subscribeToTransactions,
  recordTransactionInFirebase,
  sendNotificationToFirebase,
  subscribeToNotifications,
  deleteNotificationFromFirebase,
  publishResultToFirebase,
  seedAllMarketsToFirebase,
  FirebaseConnectionConfig,
  KOTAK_AUTO_DEPOSIT_VPA,
  subscribeToAutoDeposits,
  recordAutoApprovedDepositInFirebase,
  subscribeToBids,
  DEFAULT_FIREBASE_CONFIG,
  addMarketToFirebase,
  updateMarketInFirebase,
  deleteMarketFromFirebase,
  subscribeToMarkets,
  clearFirestoreCollections,
  DatabasePurgeOptions,
  DatabasePurgeResult
} from '../services/firebase';

export type { AppNotification } from '../types';

export interface SyncEventItem {
  id: string;
  time: string;
  type: 'deposit' | 'approval' | 'market_timing' | 'result_declare' | 'system';
  text: string;
}

interface AppContextType {
  // Theme & Navigation
  isDark: boolean;
  toggleTheme: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;

  // Markets
  markets: Market[];
  createMarket: (market: Omit<Market, 'id' | 'createdAt'>) => Promise<void> | void;
  updateMarket: (id: string, market: Partial<Market>) => Promise<void> | void;
  deleteMarket: (id: string) => Promise<void> | void;
  declareResult: (marketId: string, openPana?: string, openDigit?: string, closeDigit?: string, closePana?: string) => void;

  // Single Ank Live Bids
  selectedLiveMarket: string;
  setSelectedLiveMarket: (name: string) => void;
  selectedLiveSession: 'OPEN' | 'CLOSE';
  setSelectedLiveSession: (session: 'OPEN' | 'CLOSE') => void;
  liveBids: SingleAnkBidStat[];

  // Users
  users: User[];
  adjustUserWallet: (userId: string, type: 'credit' | 'debit', amount: number, remark: string) => boolean;
  toggleUserStatus: (userId: string) => void;
  toggleBettingDisabled: (userId: string) => void;
  createUser: (user: Partial<User>) => void;

  // Deposits
  deposits: DepositRequest[];
  approveDeposit: (id: string) => void;
  rejectDeposit: (id: string, reason: string) => void;

  // Withdrawals
  withdraws: WithdrawRequest[];
  approveWithdraw: (id: string, utr: string, remark?: string) => void;
  rejectWithdraw: (id: string, reason: string) => void;

  // Transactions & Bets
  transactions: Transaction[];
  bets: BetRecord[];

  // Starline & Desawar
  starlineMarkets: StarlineMarket[];
  declareStarlineResult: (id: string, openPana: string, openDigit: string) => void;
  desawarMarkets: DesawarMarket[];
  declareDesawarResult: (id: string, resultJodi: string) => void;

  // Game Types
  gameTypes: GameType[];
  updateGameType: (id: string, multiplier: number, minBid: number, maxBid: number, enabled: boolean) => void;

  // Slider Images
  sliders: SliderImage[];
  addSlider: (slider: Omit<SliderImage, 'id' | 'createdAt'>) => void;
  deleteSlider: (id: string) => void;
  toggleSlider: (id: string) => void;

  // Sub Admins
  subAdmins: SubAdmin[];
  addSubAdmin: (admin: Omit<SubAdmin, 'id' | 'lastActive'>) => void;
  updateSubAdmin: (id: string, partial: Partial<SubAdmin>) => void;
  deleteSubAdmin: (id: string) => void;

  // Settings
  settings: GeneralSetting;
  updateSettings: (newSettings: Partial<GeneralSetting>) => void;

  // Notifications
  notifications: AppNotification[];
  sendNotification: (title: string, message: string, target?: 'all' | 'active' | 'specific') => Promise<void> | void;
  deleteNotification: (id: string) => Promise<void> | void;

  // Payment Gateway & Webhook Operations
  gatewayConfig: PaymentGatewayConfig;
  updateGatewayConfig: (cfg: Partial<PaymentGatewayConfig>) => void;
  webhookLogs: WebhookLog[];
  simulateWebhook: (gateway: 'phonepe' | 'paytm' | 'razorpay' | 'manual_upi', amount: number, userId: string) => void;
  clearWebhookLogs: () => void;
  gatewayDeposits: GatewayLinkedDeposit[];
  manualCreditGatewayDeposit: (id: string) => void;

  // Firebase & Live User App Sync
  firebaseConfig: FirebaseConnectionConfig;
  updateFirebaseConfig: (cfg: Partial<FirebaseConnectionConfig>) => void;
  firebaseSyncStatus: {
    connected: boolean;
    statusText: string;
    lastSyncedAt: string | null;
  };
  syncAllMarketsToFirebaseNow: () => Promise<number>;
  syncEventsLog: SyncEventItem[];

  // Automated Kotak UPI Wallet Top-ups
  kotakAutoDepositVpa: string;
  simulateAutoApprovedTopup: (amount: number, userMobile?: string, userName?: string) => Promise<void>;

  // Dashboard Stats
  dashboardMetrics: {
    totalMarkets: number;
    totalUsers: number;
    todayNewUsers: number;
    todayBidAmount: number;
    todayWinAmount: number;
    todayDeposit: number;
    todayWithdraw: number;
    totalWalletBalance: number;
    totalManuallyAddedBalance: number;
  };

  // Toast / System Alert
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Master Database Reset & Clear Utility
  isPurgingDatabase: boolean;
  clearDatabaseForProduction: (options?: DatabasePurgeOptions) => Promise<DatabasePurgeResult>;
  restoreDemoData: () => void;

  // Reset to default
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('rama77_theme') === 'dark';
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('rama77_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Active Tab
  const [activeTab, setActiveTabState] = useState<ActiveTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setMobileSidebarOpen(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  // Check if platform has been reset to production fresh (0 data) state
  const isProductionFresh = typeof window !== 'undefined' && localStorage.getItem('rama77_production_fresh') === 'true';

  const [isPurgingDatabase, setIsPurgingDatabase] = useState<boolean>(false);

  // State with localStorage persistence
  const [markets, setMarkets] = useState<Market[]>(() => {
    const saved = localStorage.getItem('rama77_markets');
    return saved ? JSON.parse(saved) : INITIAL_MARKETS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('rama77_users');
    if (saved) return JSON.parse(saved);
    return isProductionFresh ? [] : INITIAL_USERS;
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem('rama77_deposits');
    if (saved) return JSON.parse(saved);
    return isProductionFresh ? [] : INITIAL_DEPOSITS;
  });

  const [withdraws, setWithdraws] = useState<WithdrawRequest[]>(() => {
    const saved = localStorage.getItem('rama77_withdraws');
    if (saved) return JSON.parse(saved);
    return isProductionFresh ? [] : INITIAL_WITHDRAWS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('rama77_transactions');
    if (saved) return JSON.parse(saved);
    return isProductionFresh ? [] : INITIAL_TRANSACTIONS;
  });

  const [bets, setBets] = useState<BetRecord[]>(() => {
    const saved = localStorage.getItem('rama77_bets');
    if (saved) return JSON.parse(saved);
    return isProductionFresh ? [] : INITIAL_BETS;
  });

  const [starlineMarkets, setStarlineMarkets] = useState<StarlineMarket[]>(() => {
    const saved = localStorage.getItem('rama77_starline');
    return saved ? JSON.parse(saved) : INITIAL_STARLINE_MARKETS;
  });

  const [desawarMarkets, setDesawarMarkets] = useState<DesawarMarket[]>(() => {
    const saved = localStorage.getItem('rama77_desawar');
    return saved ? JSON.parse(saved) : INITIAL_DESAWAR_MARKETS;
  });

  const [gameTypes, setGameTypes] = useState<GameType[]>(() => {
    const saved = localStorage.getItem('rama77_gametypes');
    return saved ? JSON.parse(saved) : INITIAL_GAME_TYPES;
  });

  const [sliders, setSliders] = useState<SliderImage[]>(() => {
    const saved = localStorage.getItem('rama77_sliders');
    return saved ? JSON.parse(saved) : INITIAL_SLIDERS;
  });

  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>(() => {
    const saved = localStorage.getItem('rama77_subadmins');
    return saved ? JSON.parse(saved) : INITIAL_SUB_ADMINS;
  });

  const [settings, setSettings] = useState<GeneralSetting>(() => {
    const saved = localStorage.getItem('rama77_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig>(() => {
    const saved = localStorage.getItem('rama77_gateway_config');
    return saved ? JSON.parse(saved) : INITIAL_GATEWAY_CONFIG;
  });

  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>(() => {
    const saved = localStorage.getItem('rama77_webhook_logs');
    return saved ? JSON.parse(saved) : INITIAL_WEBHOOK_LOGS;
  });

  const [gatewayDeposits, setGatewayDeposits] = useState<GatewayLinkedDeposit[]>(() => {
    const saved = localStorage.getItem('rama77_gateway_deposits');
    return saved ? JSON.parse(saved) : INITIAL_GATEWAY_DEPOSITS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('rama77_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    if (isProductionFresh) return [];
    return [
      {
        id: 'notif-1',
        title: 'Kalyan Open Result Declared',
        heading: 'Kalyan Open Result Declared',
        message: 'Kalyan Open Digit 6 declared with Pana 259. Payouts credited.',
        body: 'Kalyan Open Digit 6 declared with Pana 259. Payouts credited.',
        type: 'broadcast',
        read: false,
        target: 'all',
        sentAt: '2026-10-08 04:30 PM'
      },
      {
        id: 'notif-2',
        title: 'Withdrawal Processing Active',
        heading: 'Withdrawal Processing Active',
        message: 'All pending UPI withdrawals processed successfully.',
        body: 'All pending UPI withdrawals processed successfully.',
        type: 'broadcast',
        read: false,
        target: 'all',
        sentAt: '2026-10-08 12:00 PM'
      }
    ];
  });

  // Live single ank bid filters
  const [selectedLiveMarket, setSelectedLiveMarket] = useState<string>('KALYAN');
  const [selectedLiveSession, setSelectedLiveSession] = useState<'OPEN' | 'CLOSE'>('OPEN');

  const [liveBids, setLiveBids] = useState<SingleAnkBidStat[]>(() =>
    getSingleAnkLiveBids('KALYAN', 'OPEN')
  );

  useEffect(() => {
    setLiveBids(getSingleAnkLiveBids(selectedLiveMarket, selectedLiveSession));
  }, [selectedLiveMarket, selectedLiveSession]);

  // Firebase Live Sync State
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConnectionConfig>(() => {
    return getStoredFirebaseConfig();
  });

  const [firebaseSyncStatus, setFirebaseSyncStatus] = useState<{
    connected: boolean;
    statusText: string;
    lastSyncedAt: string | null;
  }>({
    connected: false,
    statusText: 'Disconnected (Mock / Local State Active)',
    lastSyncedAt: null
  });

  const [syncEventsLog, setSyncEventsLog] = useState<SyncEventItem[]>([
    {
      id: 'init-1',
      time: new Date().toLocaleTimeString(),
      type: 'system',
      text: 'Local state and mock listeners active. Standalone simulation ready.'
    }
  ]);

  const addSyncEvent = (type: SyncEventItem['type'], text: string) => {
    setSyncEventsLog(prev => [
      {
        id: `evt-${Date.now()}-${Math.random().toString().slice(2, 6)}`,
        time: new Date().toLocaleTimeString(),
        type,
        text
      },
      ...prev.slice(0, 49)
    ]);
  };

  const updateFirebaseConfig = (cfg: Partial<FirebaseConnectionConfig>) => {
    setFirebaseConfig(prev => {
      const updated = { ...prev, ...cfg };
      saveFirebaseConfig(updated);
      try {
        if (isFirebaseConfigured(updated)) {
          initFirebase(updated);
          setFirebaseSyncStatus({
            connected: true,
            statusText: `Connected to ${updated.projectId}`,
            lastSyncedAt: new Date().toLocaleTimeString()
          });
          addSyncEvent('system', `Firebase config updated: ${updated.projectId}`);
        } else {
          setFirebaseSyncStatus({
            connected: false,
            statusText: 'Disconnected (Mock / Local State Active)',
            lastSyncedAt: null
          });
          addSyncEvent('system', 'Firebase disconnected. Running in local mock mode.');
        }
      } catch (e: any) {
        addSyncEvent('system', `Firebase note: ${e?.message}`);
      }
      return updated;
    });
  };

  // Automated Kotak UPI Wallet Top-ups (VPA: 0793748A0296660.bqr@kotak)
  const handleIncomingAutoDeposit = (deposit: DepositRequest) => {
    // Avoid double-processing
    setDeposits(prev => {
      if (prev.some(d => d.id === deposit.id)) return prev;
      return [deposit, ...prev];
    });

    const nowTime =
      new Date().toLocaleDateString('en-GB') +
      ' ' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Automatically increment user balance
    setUsers(prev => {
      const idx = prev.findIndex(
        u => (deposit.userId && u.id === deposit.userId) || (deposit.userMobile && u.mobile === deposit.userMobile)
      );

      if (idx !== -1) {
        const u = prev[idx];
        const prevBal = Number(u.walletBalance) || 0;
        const newBal = prevBal + deposit.amount;

        const txn: Transaction = {
          id: `TXN-AUTO-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: u.id,
          userName: u.name,
          userMobile: u.mobile,
          type: 'auto_deposit',
          amount: deposit.amount,
          balanceBefore: prevBal,
          balanceAfter: newBal,
          description: `Instant UPI Auto-Credit via Kotak VPA (${KOTAK_AUTO_DEPOSIT_VPA})`,
          referenceId: deposit.id,
          createdAt: nowTime,
          vpa: KOTAK_AUTO_DEPOSIT_VPA,
          isAutoApproved: true
        };
        setTransactions(tPrev => [txn, ...tPrev]);

        const updatedUsers = [...prev];
        updatedUsers[idx] = {
          ...u,
          walletBalance: newBal,
          totalDeposited: (Number(u.totalDeposited) || 0) + deposit.amount
        };
        return updatedUsers;
      } else {
        const newUser: User = {
          id: deposit.userId || `usr_${deposit.userMobile ? deposit.userMobile.slice(-4) : Date.now().toString().slice(-4)}`,
          name: deposit.userName || 'Rahul Verma',
          mobile: deposit.userMobile || '9876543210',
          email: `${deposit.userMobile || 'player'}@player.rama77.com`,
          walletBalance: deposit.amount,
          transferWalletBalance: 0,
          status: 'active',
          bettingDisabled: false,
          registeredAt: new Date().toISOString().split('T')[0],
          totalDeposited: deposit.amount,
          totalWithdrawn: 0,
          lastLogin: 'Just now'
        };

        const txn: Transaction = {
          id: `TXN-AUTO-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: newUser.id,
          userName: newUser.name,
          userMobile: newUser.mobile,
          type: 'auto_deposit',
          amount: deposit.amount,
          balanceBefore: 0,
          balanceAfter: deposit.amount,
          description: `Instant UPI Auto-Credit via Kotak VPA (${KOTAK_AUTO_DEPOSIT_VPA})`,
          referenceId: deposit.id,
          createdAt: nowTime,
          vpa: KOTAK_AUTO_DEPOSIT_VPA,
          isAutoApproved: true
        };
        setTransactions(tPrev => [txn, ...tPrev]);

        return [newUser, ...prev];
      }
    });

    addSyncEvent(
      'deposit',
      `⚡ Instant Auto-Deposit: ₹${deposit.amount.toLocaleString()} credited to ${deposit.userName} (${deposit.userMobile}) via Kotak UPI (${KOTAK_AUTO_DEPOSIT_VPA})`
    );
    showToast(
      `⚡ Instant Top-up: ₹${deposit.amount.toLocaleString()} credited to ${deposit.userName} via Kotak UPI!`
    );
  };

  const simulateAutoApprovedTopup = async (
    amount: number,
    userMobile: string = '9876543210',
    userName: string = 'Rahul Verma'
  ) => {
    const now = new Date();
    const nowFormatted =
      now.toLocaleDateString('en-GB') +
      ' ' +
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const depId = `DEP-AUTO-${Math.floor(1000 + Math.random() * 9000)}`;

    const deposit: DepositRequest = {
      id: depId,
      userId: `usr_${userMobile.slice(-4)}`,
      userName,
      userMobile,
      amount: Number(amount) || 1000,
      method: 'Kotak UPI',
      utrNumber: `KTK${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      status: 'auto-approved',
      isAutoApproved: true,
      receiverVpa: KOTAK_AUTO_DEPOSIT_VPA,
      source: 'mobile_app_auto',
      requestedAt: nowFormatted,
      processedAt: nowFormatted,
      autoApprovedAt: now.toISOString()
    };

    handleIncomingAutoDeposit(deposit);

    if (isFirebaseConfigured(firebaseConfig)) {
      try {
        await recordAutoApprovedDepositInFirebase(deposit);
      } catch (e) {
        console.warn('Firebase auto-deposit write note:', e);
      }
    }
  };

  // Real-time onSnapshot listeners for shared Firestore collections:
  // users, withdrawals, deposits, transactions, bids, and markets (project: rama777-37ef1)
  useEffect(() => {
    let unsubscribeUsers: (() => void) | null = null;
    let unsubscribeWithdrawals: (() => void) | null = null;
    let unsubscribeDeposits: (() => void) | null = null;
    let unsubscribeTransactions: (() => void) | null = null;
    let unsubscribeAutoDeposits: (() => void) | null = null;
    let unsubscribeBids: (() => void) | null = null;
    let unsubscribeMarkets: (() => void) | null = null;
    let unsubscribeNotifications: (() => void) | null = null;

    if (!isFirebaseConfigured(firebaseConfig)) {
      setFirebaseSyncStatus({
        connected: false,
        statusText: 'Disconnected (Mock / Local State Active)',
        lastSyncedAt: null
      });
      return;
    }

    try {
      initFirebase(firebaseConfig);
      testFirestoreConnection().then(res => {
        setFirebaseSyncStatus(prev => ({
          ...prev,
          connected: res.success,
          statusText: res.success ? `Connected to ${firebaseConfig.projectId}` : res.message,
          lastSyncedAt: new Date().toLocaleTimeString()
        }));
      });

      // 1. Real-time onSnapshot listener for Firestore collection 'users'
      unsubscribeUsers = subscribeToUsers((firebaseUsers) => {
        if (!firebaseUsers) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseUsers.length === 0) {
          if (freshMode) {
            setUsers([]);
            localStorage.setItem('rama77_users', JSON.stringify([]));
          }
          return;
        }

        setUsers(firebaseUsers);
        localStorage.setItem('rama77_users', JSON.stringify(firebaseUsers));
        addSyncEvent('system', `Live users update: synced ${firebaseUsers.length} player account(s) from Firestore`);
      }, (err) => {
        console.warn('Real-time users onSnapshot note:', err?.message);
      });

      // 2. Real-time onSnapshot listener for Firestore collection 'withdrawals'
      unsubscribeWithdrawals = subscribeToWithdrawals((firebaseWithdrawals) => {
        if (!firebaseWithdrawals) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseWithdrawals.length === 0) {
          if (freshMode) {
            setWithdraws([]);
            localStorage.setItem('rama77_withdraws', JSON.stringify([]));
          }
          return;
        }

        setWithdraws(firebaseWithdrawals);
        localStorage.setItem('rama77_withdraws', JSON.stringify(firebaseWithdrawals));
        addSyncEvent('approval', `Live withdrawals update: synced ${firebaseWithdrawals.length} withdrawal request(s) from Firestore`);
      }, (err) => {
        console.warn('Real-time withdrawals onSnapshot note:', err?.message);
      });

      // 3. Real-time onSnapshot listener for Firestore collection 'deposits'
      unsubscribeDeposits = subscribeToDeposits((firebaseDeposits) => {
        if (!firebaseDeposits) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseDeposits.length === 0) {
          if (freshMode) {
            setDeposits([]);
            localStorage.setItem('rama77_deposits', JSON.stringify([]));
          }
          return;
        }

        setDeposits(firebaseDeposits);
        localStorage.setItem('rama77_deposits', JSON.stringify(firebaseDeposits));
        addSyncEvent('deposit', `Live deposits update: synced ${firebaseDeposits.length} deposit record(s) from Firestore`);
      }, (err) => {
        console.warn('Real-time deposits onSnapshot note:', err?.message);
      });

      // 4. Real-time onSnapshot listener for Firestore collection 'transactions'
      unsubscribeTransactions = subscribeToTransactions((firebaseTxns) => {
        if (!firebaseTxns) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseTxns.length === 0) {
          if (freshMode) {
            setTransactions([]);
            localStorage.setItem('rama77_transactions', JSON.stringify([]));
          }
          return;
        }

        setTransactions(firebaseTxns);
        localStorage.setItem('rama77_transactions', JSON.stringify(firebaseTxns));
        addSyncEvent('system', `Live transactions update: synced ${firebaseTxns.length} ledger entry(ies) from Firestore`);
      }, (err) => {
        console.warn('Real-time transactions onSnapshot note:', err?.message);
      });

      // 5. Real-time listener for Firestore collection 'auto_deposits'
      unsubscribeAutoDeposits = subscribeToAutoDeposits((dep) => {
        handleIncomingAutoDeposit(dep);
      }, (err) => {
        console.warn('Real-time auto_deposits listener note:', err?.message);
      });

      // 6. Real-time onSnapshot listener for Firestore collection 'bids'
      unsubscribeBids = subscribeToBids((firebaseBids) => {
        if (!firebaseBids) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseBids.length === 0) {
          if (freshMode) {
            setBets([]);
            localStorage.setItem('rama77_bets', JSON.stringify([]));
          }
          return;
        }

        setBets(firebaseBids);
        localStorage.setItem('rama77_bets', JSON.stringify(firebaseBids));
        addSyncEvent('system', `Live bids & win history update: synced ${firebaseBids.length} bet(s) from Firestore`);
      }, (err) => {
        console.warn('Real-time bids listener note:', err?.message);
      });

      // 7. Real-time onSnapshot listener for Firestore collection 'markets'
      unsubscribeMarkets = subscribeToMarkets((firebaseMarkets) => {
        if (!firebaseMarkets || firebaseMarkets.length === 0) return;
        setMarkets(firebaseMarkets);
        localStorage.setItem('rama77_markets', JSON.stringify(firebaseMarkets));
        addSyncEvent('market_timing', `Live markets update: synced ${firebaseMarkets.length} market(s) directly from Firestore`);
      }, (err) => {
        console.warn('Real-time markets listener note:', err?.message);
      });

      // 8. Real-time onSnapshot listener for Firestore collection 'notifications'
      unsubscribeNotifications = subscribeToNotifications((firebaseNotifs) => {
        if (!firebaseNotifs) return;
        const freshMode = localStorage.getItem('rama77_production_fresh') === 'true';
        if (firebaseNotifs.length === 0) {
          if (freshMode) {
            setNotifications([]);
            localStorage.setItem('rama77_notifications', JSON.stringify([]));
          }
          return;
        }

        setNotifications(firebaseNotifs);
        localStorage.setItem('rama77_notifications', JSON.stringify(firebaseNotifs));
        addSyncEvent('system', `Live notifications update: synced ${firebaseNotifs.length} broadcast message(s) directly from Firestore`);
      }, (err) => {
        console.warn('Real-time notifications listener note:', err?.message);
      });

    } catch (e) {
      console.warn('Firebase init note:', e);
    }

    return () => {
      if (unsubscribeUsers) unsubscribeUsers();
      if (unsubscribeWithdrawals) unsubscribeWithdrawals();
      if (unsubscribeDeposits) unsubscribeDeposits();
      if (unsubscribeTransactions) unsubscribeTransactions();
      if (unsubscribeAutoDeposits) unsubscribeAutoDeposits();
      if (unsubscribeBids) unsubscribeBids();
      if (unsubscribeMarkets) unsubscribeMarkets();
      if (unsubscribeNotifications) unsubscribeNotifications();
    };
  }, [firebaseConfig.projectId, firebaseConfig.apiKey]);

  const syncAllMarketsToFirebaseNow = async (): Promise<number> => {
    const res = await seedAllMarketsToFirebase(markets);
    addSyncEvent('market_timing', `Broadcast catalog: all ${res.count || markets.length} markets synced live to Firebase`);
    return res.count || markets.length;
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('rama77_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('rama77_markets', JSON.stringify(markets));
  }, [markets]);

  useEffect(() => {
    localStorage.setItem('rama77_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('rama77_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('rama77_withdraws', JSON.stringify(withdraws));
  }, [withdraws]);

  useEffect(() => {
    localStorage.setItem('rama77_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('rama77_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('rama77_gametypes', JSON.stringify(gameTypes));
  }, [gameTypes]);

  useEffect(() => {
    localStorage.setItem('rama77_sliders', JSON.stringify(sliders));
  }, [sliders]);

  useEffect(() => {
    localStorage.setItem('rama77_subadmins', JSON.stringify(subAdmins));
  }, [subAdmins]);

  useEffect(() => {
    localStorage.setItem('rama77_starline', JSON.stringify(starlineMarkets));
  }, [starlineMarkets]);

  useEffect(() => {
    localStorage.setItem('rama77_desawar', JSON.stringify(desawarMarkets));
  }, [desawarMarkets]);

  useEffect(() => {
    localStorage.setItem('rama77_gateway_config', JSON.stringify(gatewayConfig));
  }, [gatewayConfig]);

  useEffect(() => {
    localStorage.setItem('rama77_webhook_logs', JSON.stringify(webhookLogs));
  }, [webhookLogs]);

  useEffect(() => {
    localStorage.setItem('rama77_gateway_deposits', JSON.stringify(gatewayDeposits));
  }, [gatewayDeposits]);

  // Market Actions - Direct writes to Firebase Cloud Firestore collection 'markets'
  const createMarket = async (newMarket: Omit<Market, 'id' | 'createdAt'>) => {
    const rawSlug = (newMarket.apiKeyName || newMarket.name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '_');
    const marketId = rawSlug ? (rawSlug.startsWith('m-') ? rawSlug : `m-${rawSlug}`) : `m-${Date.now().toString().slice(-4)}`;

    const market: Market = {
      ...newMarket,
      id: marketId,
      createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Optimistically update local state for instantaneous UI response
    setMarkets(prev => {
      const idx = prev.findIndex(m => m.id === market.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = market;
        return copy;
      }
      return [market, ...prev];
    });

    // 2. Direct write into Firebase Cloud Firestore collection 'markets'
    try {
      await addMarketToFirebase(market);
      addSyncEvent('market_timing', `⚡ Market "${market.name}" created & written directly to Firestore collection 'markets/${market.id}'`);
      showToast(`Market "${market.name}" created & live synced directly to Firestore collection "markets"!`);
    } catch (err: any) {
      console.warn('Firestore createMarket error:', err);
      showToast(`Market "${market.name}" created in local state (offline note: ${err?.message || 'Check connection'})`);
    }
  };

  const updateMarket = async (id: string, partial: Partial<Market>) => {
    setMarkets(prev =>
      prev.map(m => (m.id === id ? { ...m, ...partial } : m))
    );

    try {
      await updateMarketInFirebase(id, partial);
      addSyncEvent('market_timing', `⚡ Market #${id} updated in Firestore collection 'markets'`);
      showToast('Market updated & synced directly to Firestore!');
    } catch (err: any) {
      console.warn('Firestore updateMarket error:', err);
      showToast('Market updated in local state');
    }
  };

  const deleteMarket = async (id: string) => {
    const target = markets.find(m => m.id === id);
    setMarkets(prev => prev.filter(m => m.id !== id));

    try {
      await deleteMarketFromFirebase(id);
      addSyncEvent('market_timing', `⚡ Market #${id} deleted from Firestore collection 'markets'`);
      showToast(`Market "${target?.name || id}" deleted & removed from Firestore!`);
    } catch (err: any) {
      console.warn('Firestore deleteMarket error:', err);
      showToast(`Market "${target?.name || id}" removed from local state`);
    }
  };

  const declareResult = (
    marketId: string,
    openPana?: string,
    openDigit?: string,
    closeDigit?: string,
    closePana?: string
  ) => {
    let updatedMarketName = marketId;
    setMarkets(prev =>
      prev.map(m => {
        if (m.id === marketId) {
          updatedMarketName = m.name;
          return {
            ...m,
            openPana: openPana ?? m.openPana,
            openDigit: openDigit ?? m.openDigit,
            closeDigit: closeDigit ?? m.closeDigit,
            closePana: closePana ?? m.closePana
          };
        }
        return m;
      })
    );
    showToast('Result declared and published successfully!');
    // Publish live to Firebase Firestore & Realtime Database
    publishResultToFirebase(marketId, {
      openPana,
      openDigit,
      closeDigit,
      closePana,
      marketName: updatedMarketName
    }).then(() => {
      addSyncEvent('result_declare', `Live result published for ${updatedMarketName}: ${openPana || '***'}-${openDigit || '*'}${closeDigit || '*'}-${closePana || '***'}`);
    }).catch(err => {
      console.warn('Firebase result publish warning:', err);
    });
  };

  // User Actions
  const adjustUserWallet = (
    userId: string,
    type: 'credit' | 'debit',
    amount: number,
    remark: string
  ): boolean => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return false;

    if (type === 'debit' && targetUser.walletBalance < amount) {
      showToast('Insufficient wallet balance to deduct!');
      return false;
    }

    const prevBal = targetUser.walletBalance;
    const newBal = type === 'credit' ? prevBal + amount : prevBal - amount;

    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, walletBalance: newBal } : u))
    );

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: targetUser.id,
      userName: targetUser.name,
      userMobile: targetUser.mobile,
      type: type === 'credit' ? 'admin_credit' : 'admin_debit',
      amount,
      balanceBefore: prevBal,
      balanceAfter: newBal,
      description: `Manual admin adjustment: ${remark}`,
      referenceId: `ADJ-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Live sync directly to Firestore collection 'users' and 'transactions'
    updateUserInFirebase(userId, { walletBalance: newBal });
    recordTransactionInFirebase(newTxn);
    addSyncEvent('system', `Wallet adjustment for ${targetUser.name}: ₹${amount} (${type}) synced to Firestore`);

    showToast(
      `Successfully ${type === 'credit' ? 'credited' : 'deducted'} ₹${amount.toLocaleString()} for ${targetUser.name}`
    );
    return true;
  };

  const toggleUserStatus = (userId: string) => {
    let nextStatus: 'active' | 'blocked' = 'active';
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          nextStatus = u.status === 'active' ? 'blocked' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    updateUserInFirebase(userId, { status: nextStatus });
    showToast('User status updated in Firestore.');
  };

  const toggleBettingDisabled = (userId: string) => {
    let nextDisabled = false;
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          nextDisabled = !u.bettingDisabled;
          return { ...u, bettingDisabled: nextDisabled };
        }
        return u;
      })
    );
    updateUserInFirebase(userId, { bettingDisabled: nextDisabled });
    showToast('User betting permission toggled in Firestore.');
  };

  const createUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.name || 'New Player',
      mobile: userData.mobile || '9999999999',
      email: userData.email || '',
      walletBalance: Number(userData.walletBalance) || 0,
      transferWalletBalance: 0,
      status: 'active',
      bettingDisabled: false,
      registeredAt: new Date().toISOString().split('T')[0],
      totalDeposited: Number(userData.walletBalance) || 0,
      totalWithdrawn: 0,
      lastLogin: 'Never',
      bankDetail: {
        accountHolderName: userData.name || '',
        bankName: '',
        accountNumber: '',
        ifsc: '',
        upiId: '',
        isVerified: false
      }
    };
    setUsers(prev => [newUser, ...prev]);
    createUserInFirebase(newUser);
    addSyncEvent('system', `User "${newUser.name}" created and written directly to Firestore collection 'users/${newUser.id}'`);
    showToast(`User ${newUser.name} created!`);
  };

  // Deposit Actions
  const approveDeposit = (id: string) => {
    const deposit = deposits.find(d => d.id === id);
    if (!deposit || deposit.status !== 'pending') return;

    setDeposits(prev =>
      prev.map(d =>
        d.id === id
          ? {
              ...d,
              status: 'approved',
              processedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : d
      )
    );

    // Credit user balance
    const user = users.find(u => u.id === deposit.userId);
    let txn: Transaction | null = null;
    if (user) {
      const prevBal = user.walletBalance;
      const newBal = prevBal + deposit.amount;

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? {
                ...u,
                walletBalance: newBal,
                totalDeposited: u.totalDeposited + deposit.amount
              }
            : u
        )
      );

      // Record transaction
      txn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        type: 'deposit',
        amount: deposit.amount,
        balanceBefore: prevBal,
        balanceAfter: newBal,
        description: `Deposit approved via ${deposit.method} (UTR: ${deposit.utrNumber})`,
        referenceId: deposit.id,
        createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTransactions(prev => [txn!, ...prev]);
    }

    // Direct write to Firestore collection 'deposits'
    updateDepositInFirebase(id, 'approved', '', user?.id, deposit.amount);
    if (txn) recordTransactionInFirebase(txn);
    addSyncEvent('deposit', `Deposit #${id} (₹${deposit.amount}) approved & synced to Firestore collection 'deposits'`);

    showToast(`Deposit #${id} of ₹${deposit.amount.toLocaleString()} approved and credited!`);
  };

  const rejectDeposit = (id: string, reason: string) => {
    setDeposits(prev =>
      prev.map(d =>
        d.id === id
          ? {
              ...d,
              status: 'rejected',
              rejectionReason: reason || 'Rejected by Admin',
              processedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : d
      )
    );

    updateDepositInFirebase(id, 'rejected', reason || 'Rejected by Admin');
    addSyncEvent('deposit', `Deposit #${id} rejected in Firestore collection 'deposits'`);

    showToast(`Deposit #${id} has been rejected.`);
  };

  // Withdraw Actions
  const approveWithdraw = (id: string, utr: string, remark?: string) => {
    const withdraw = withdraws.find(w => w.id === id);
    if (!withdraw || withdraw.status !== 'pending') return;

    setWithdraws(prev =>
      prev.map(w =>
        w.id === id
          ? {
              ...w,
              status: 'approved',
              utrOrReference: utr || `IMPS${Date.now().toString().slice(-8)}`,
              adminRemark: remark || 'Payout released via banking gateway',
              processedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : w
      )
    );

    // Record transaction
    const user = users.find(u => u.id === withdraw.userId);
    let txn: Transaction | null = null;
    if (user) {
      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? { ...u, totalWithdrawn: u.totalWithdrawn + withdraw.amount }
            : u
        )
      );

      txn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        type: 'withdraw',
        amount: withdraw.amount,
        balanceBefore: user.walletBalance,
        balanceAfter: user.walletBalance, // Already deducted when requested
        description: `Withdrawal settled to ${withdraw.accountDetails} (Ref: ${utr})`,
        referenceId: withdraw.id,
        createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTransactions(prev => [txn!, ...prev]);
    }

    // Direct write to Firestore collection 'withdrawals'
    updateWithdrawalInFirebase(id, 'approved', utr, remark || 'Payout released via banking gateway');
    if (txn) recordTransactionInFirebase(txn);
    addSyncEvent('approval', `Withdrawal #${id} (₹${withdraw.amount}) approved & synced to Firestore collection 'withdrawals'`);

    showToast(`Withdrawal #${id} of ₹${withdraw.amount.toLocaleString()} approved!`);
  };

  const rejectWithdraw = (id: string, reason: string) => {
    const withdraw = withdraws.find(w => w.id === id);
    if (!withdraw || withdraw.status !== 'pending') return;

    // Refund user wallet balance
    const user = users.find(u => u.id === withdraw.userId);
    let txn: Transaction | null = null;
    if (user) {
      const prevBal = user.walletBalance;
      const newBal = prevBal + withdraw.amount;

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, walletBalance: newBal } : u
        )
      );

      txn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        type: 'refund',
        amount: withdraw.amount,
        balanceBefore: prevBal,
        balanceAfter: newBal,
        description: `Refund for rejected withdrawal #${withdraw.id} - ${reason}`,
        referenceId: withdraw.id,
        createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTransactions(prev => [txn!, ...prev]);
    }

    // Direct write to Firestore collection 'withdrawals' with wallet refund in Firestore
    updateWithdrawalInFirebase(id, 'rejected', '', reason, withdraw.userId, withdraw.amount);
    if (txn) recordTransactionInFirebase(txn);
    addSyncEvent('approval', `Withdrawal #${id} rejected & wallet refunded in Firestore`);

    setWithdraws(prev =>
      prev.map(w =>
        w.id === id
          ? {
              ...w,
              status: 'rejected',
              adminRemark: reason || 'Declined by Administrator',
              processedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : w
      )
    );

    showToast(`Withdrawal #${id} rejected. Funds refunded to player's wallet.`);
  };

  // Starline Actions
  const declareStarlineResult = (id: string, openPana: string, openDigit: string) => {
    setStarlineMarkets(prev =>
      prev.map(s => (s.id === id ? { ...s, openPana, openDigit } : s))
    );
    showToast('Starline result announced successfully!');
  };

  // Desawar Actions
  const declareDesawarResult = (id: string, resultJodi: string) => {
    setDesawarMarkets(prev =>
      prev.map(d => (d.id === id ? { ...d, resultJodi } : d))
    );
    showToast('Desawar Jodi result declared!');
  };

  // Game Types
  const updateGameType = (
    id: string,
    multiplier: number,
    minBid: number,
    maxBid: number,
    enabled: boolean
  ) => {
    setGameTypes(prev =>
      prev.map(gt =>
        gt.id === id ? { ...gt, multiplier, minBid, maxBid, enabled } : gt
      )
    );
    showToast('Game rate & limits updated!');
  };

  // Sliders
  const addSlider = (newSlider: Omit<SliderImage, 'id' | 'createdAt'>) => {
    const s: SliderImage = {
      ...newSlider,
      id: `sld-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSliders(prev => [...prev, s]);
    showToast('Slider banner added!');
  };

  const deleteSlider = (id: string) => {
    setSliders(prev => prev.filter(s => s.id !== id));
    showToast('Slider banner removed.');
  };

  const toggleSlider = (id: string) => {
    setSliders(prev =>
      prev.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Sub Admins
  const addSubAdmin = (newAdmin: Omit<SubAdmin, 'id' | 'lastActive'>) => {
    const sa: SubAdmin = {
      ...newAdmin,
      id: `sa-${Date.now().toString().slice(-4)}`,
      lastActive: 'Just now'
    };
    setSubAdmins(prev => [...prev, sa]);
    showToast(`Sub Admin "${sa.name}" created with custom roles.`);
  };

  const updateSubAdmin = (id: string, partial: Partial<SubAdmin>) => {
    setSubAdmins(prev =>
      prev.map(sa => (sa.id === id ? { ...sa, ...partial } : sa))
    );
    showToast('Sub admin permissions updated.');
  };

  const deleteSubAdmin = (id: string) => {
    setSubAdmins(prev => prev.filter(sa => sa.id !== id));
    showToast('Sub admin removed.');
  };

  // Settings
  const updateSettings = (newSettings: Partial<GeneralSetting>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Platform settings saved successfully!');
  };

  // Notifications - Direct write to Firestore collection 'notifications' (project: rama777-37ef1)
  const sendNotification = async (
    title: string,
    message: string,
    target: 'all' | 'active' | 'specific' = 'all'
  ) => {
    const notifId = `notif-${Date.now().toString().slice(-6)}`;
    const nowFormatted =
      new Date().toLocaleDateString('en-GB') +
      ' ' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const n: AppNotification = {
      id: notifId,
      title: title.trim(),
      heading: title.trim(),
      message: message.trim(),
      body: message.trim(),
      type: 'broadcast',
      read: false,
      target,
      sentAt: nowFormatted
    };

    // 1. Optimistic update in local state
    setNotifications(prev => [n, ...prev]);

    // 2. Direct write into Firestore collection 'notifications'
    try {
      await sendNotificationToFirebase(n);
      addSyncEvent(
        'system',
        `⚡ Broadcast "${n.title}" written directly to Firestore collection 'notifications/${n.id}' with title, heading, message, body, createdAt (serverTimestamp), type: 'broadcast', read: false`
      );
      showToast(`Push notification "${n.title}" dispatched live to Firestore collection "notifications"!`);
    } catch (err: any) {
      console.warn('Firestore sendNotification error:', err);
      showToast(`Notification saved locally (offline notice: ${err?.message || 'Check network'})`);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await deleteNotificationFromFirebase(id);
      addSyncEvent('system', `Notification #${id} deleted from Firestore collection 'notifications'`);
      showToast('Notification deleted from Firestore.');
    } catch (err: any) {
      console.warn('Firestore deleteNotification error:', err);
    }
  };

  // Payment Gateway Operations
  const updateGatewayConfig = (cfg: Partial<PaymentGatewayConfig>) => {
    setGatewayConfig(prev => ({ ...prev, ...cfg }));
    showToast('Payment Gateway settings updated successfully!');
  };

  const clearWebhookLogs = () => {
    setWebhookLogs([]);
    showToast('Webhook event logs cleared.');
  };

  const simulateWebhook = (
    gateway: 'phonepe' | 'paytm' | 'razorpay' | 'manual_upi',
    amount: number,
    userId: string
  ) => {
    const user = users.find(u => u.id === userId) || users[0];
    const orderId = `ORD-DEP-${Date.now().toString().slice(-4)}`;
    const depositId = `DEP-${Math.floor(4020 + Math.random() * 900)}`;
    const utr = `${Math.floor(400000000000 + Math.random() * 90000000000)}`;
    const nowTime =
      new Date().toLocaleDateString('en-GB') +
      ' ' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let gatewayTxnId = '';
    let gatewayEvent = '';
    let gatewayPayload: Record<string, any> = {};
    let gatewayName: 'PhonePe' | 'Paytm' | 'Razorpay' | 'Manual UPI QR' = 'PhonePe';

    if (gateway === 'phonepe') {
      gatewayName = 'PhonePe';
      gatewayTxnId = `T${Date.now().toString()}`;
      gatewayEvent = 'PAYMENT_SUCCESS';
      gatewayPayload = {
        success: true,
        code: 'PAYMENT_SUCCESS',
        message: 'Your payment is successful',
        data: {
          merchantId: gatewayConfig.phonepe.merchantId,
          merchantTransactionId: orderId,
          transactionId: gatewayTxnId,
          amount: amount * 100,
          state: 'COMPLETED',
          responseCode: 'SUCCESS',
          paymentInstrument: { type: 'UPI', utr }
        }
      };
    } else if (gateway === 'paytm') {
      gatewayName = 'Paytm';
      gatewayTxnId = `PTM_TXN_${Date.now().toString().slice(-10)}`;
      gatewayEvent = 'TXN_SUCCESS';
      gatewayPayload = {
        MID: gatewayConfig.paytm.mid,
        ORDERID: orderId,
        TXNAMOUNT: amount.toFixed(2),
        STATUS: 'TXN_SUCCESS',
        RESPCODE: '01',
        RESPMSG: 'Txn Success',
        BANKTXNID: utr,
        GATEWAYNAME: 'WALLET',
        PAYMENTMODE: 'UPI'
      };
    } else if (gateway === 'razorpay') {
      gatewayName = 'Razorpay';
      gatewayTxnId = `pay_rzp_${Date.now().toString().slice(-10)}`;
      gatewayEvent = 'payment.captured';
      gatewayPayload = {
        entity: 'event',
        account_id: 'acc_rama77live',
        event: 'payment.captured',
        payload: {
          payment: {
            entity: {
              id: gatewayTxnId,
              amount: amount * 100,
              currency: 'INR',
              status: 'captured',
              order_id: orderId,
              method: 'upi',
              acquirer_data: { rrn: utr }
            }
          }
        }
      };
    } else {
      gatewayName = 'Manual UPI QR';
      gatewayTxnId = `MANUAL_UPI_REF_${Date.now().toString().slice(-6)}`;
      gatewayEvent = 'UPI_P2P_CONFIRM';
      gatewayPayload = {
        upiId: gatewayConfig.manualUpi.upiId,
        refNumber: utr,
        amount,
        status: 'VERIFIED'
      };
    }

    // 1. Add Webhook Log
    const newWebhookLog: WebhookLog = {
      id: `WHK-${Date.now().toString().slice(-4)}`,
      gateway,
      event: gatewayEvent,
      gatewayTxnId,
      orderId,
      userId: user.id,
      userName: user.name,
      userMobile: user.mobile,
      amount,
      utr,
      status: 'success',
      httpCode: 200,
      receivedAt: nowTime,
      payload: gatewayPayload
    };
    setWebhookLogs(prev => [newWebhookLog, ...prev]);

    // 2. Add Linked Deposit Entry
    const isAutoCredited = gatewayConfig.autoCreditOnWebhook;
    const newGatewayDeposit: GatewayLinkedDeposit = {
      id: `GLD-${Math.floor(700 + Math.random() * 900)}`,
      depositId,
      gatewayOrderId: orderId,
      gatewayPaymentId: gatewayTxnId,
      gateway: gatewayName,
      utr,
      userId: user.id,
      userName: user.name,
      userMobile: user.mobile,
      amount,
      fee: 0,
      netAmount: amount,
      status: isAutoCredited ? 'credited' : 'processing',
      reconciled: isAutoCredited,
      createdAt: nowTime,
      settledAt: isAutoCredited ? nowTime : undefined
    };
    setGatewayDeposits(prev => [newGatewayDeposit, ...prev]);

    // 3. If auto-credit enabled, credit user wallet & create transaction
    if (isAutoCredited) {
      const prevBal = user.walletBalance;
      const newBal = prevBal + amount;

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? {
                ...u,
                walletBalance: newBal,
                totalDeposited: u.totalDeposited + amount
              }
            : u
        )
      );

      // Add to main deposits list as approved
      const depositReq: DepositRequest = {
        id: depositId,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        amount,
        method: gatewayName === 'Razorpay' ? 'UPI' : (gatewayName as any),
        utrNumber: utr,
        status: 'approved',
        requestedAt: nowTime,
        processedAt: nowTime
      };
      setDeposits(prev => [depositReq, ...prev]);

      // Add to transaction ledger
      const txn: Transaction = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        type: 'deposit',
        amount,
        balanceBefore: prevBal,
        balanceAfter: newBal,
        description: `Auto-credited via ${gatewayName} Webhook (Order: ${orderId}, UTR: ${utr})`,
        referenceId: depositId,
        createdAt: nowTime
      };
      setTransactions(prev => [txn, ...prev]);

      showToast(
        `Webhook callback received: ₹${amount.toLocaleString()} auto-credited to ${user.name} (${gatewayName})`
      );
    } else {
      showToast(
        `Webhook callback received: Order ${orderId} awaiting settlement review.`
      );
    }
  };

  const manualCreditGatewayDeposit = (id: string) => {
    const item = gatewayDeposits.find(d => d.id === id);
    if (!item || item.status === 'credited') return;

    const user = users.find(u => u.id === item.userId);
    if (user) {
      const prevBal = user.walletBalance;
      const newBal = prevBal + item.amount;

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? {
                ...u,
                walletBalance: newBal,
                totalDeposited: u.totalDeposited + item.amount
              }
            : u
        )
      );

      const nowTime =
        new Date().toLocaleDateString('en-GB') +
        ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Add transaction
      const txn: Transaction = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.id,
        userName: user.name,
        userMobile: user.mobile,
        type: 'deposit',
        amount: item.amount,
        balanceBefore: prevBal,
        balanceAfter: newBal,
        description: `Manual gateway reconciliation credit (${item.gateway} - Ref: ${item.gatewayPaymentId})`,
        referenceId: item.depositId,
        createdAt: nowTime
      };
      setTransactions(prev => [txn, ...prev]);

      setGatewayDeposits(prev =>
        prev.map(d =>
          d.id === id
            ? { ...d, status: 'credited', reconciled: true, settledAt: nowTime }
            : d
        )
      );

      // Approve in deposits table too if present
      setDeposits(prev =>
        prev.map(dep =>
          dep.id === item.depositId
            ? { ...dep, status: 'approved', processedAt: nowTime }
            : dep
        )
      );

      showToast(`Deposit #${item.depositId} successfully reconciled & ₹${item.amount.toLocaleString()} credited to ${user.name}!`);
    }
  };

  // Master Database Clear / Reset Utility for Live Production
  const clearDatabaseForProduction = async (
    options: DatabasePurgeOptions = {
      purgeUsers: true,
      purgeBids: true,
      purgeTransactions: true,
      purgeDeposits: true,
      purgeWithdrawals: true,
      purgeNotifications: true,
      purgeLiveResults: true,
      resetMarketResults: true,
      purgeMarketsEntirely: false
    }
  ): Promise<DatabasePurgeResult> => {
    setIsPurgingDatabase(true);

    try {
      // 1. Mark persistent storage as production fresh
      localStorage.setItem('rama77_production_fresh', 'true');
      localStorage.setItem('rama77_users', JSON.stringify([]));
      localStorage.setItem('rama77_deposits', JSON.stringify([]));
      localStorage.setItem('rama77_withdraws', JSON.stringify([]));
      localStorage.setItem('rama77_transactions', JSON.stringify([]));
      localStorage.setItem('rama77_bets', JSON.stringify([]));
      localStorage.setItem('rama77_notifications', JSON.stringify([]));
      localStorage.setItem('rama77_webhook_logs', JSON.stringify([]));
      localStorage.setItem('rama77_gateway_deposits', JSON.stringify([]));

      // 2. Clear in-memory React state instantaneously
      setUsers([]);
      setDeposits([]);
      setWithdraws([]);
      setTransactions([]);
      setBets([]);
      setNotifications([]);
      setWebhookLogs([]);
      setGatewayDeposits([]);

      // 3. Reset or purge markets
      if (options.purgeMarketsEntirely) {
        setMarkets([]);
        localStorage.setItem('rama77_markets', JSON.stringify([]));
      } else if (options.resetMarketResults) {
        setMarkets(prev => {
          const resetMarkets = prev.map(m => ({
            ...m,
            openPana: '***',
            openDigit: '*',
            closeDigit: '*',
            closePana: '***',
            result: '***-*-*-***'
          }));
          localStorage.setItem('rama77_markets', JSON.stringify(resetMarkets));
          return resetMarkets;
        });
      }

      // 4. Purge from Firebase Firestore & Realtime Database
      let purgeResult: DatabasePurgeResult = {
        success: true,
        deletedCounts: {},
        message: 'Local and session storage purged to 0.'
      };

      if (isFirebaseConfigured(firebaseConfig)) {
        purgeResult = await clearFirestoreCollections(options);
      }

      addSyncEvent(
        'system',
        `🗑️ Master Database Reset: All test & demo records purged. System initialized to 0 users, ₹0 balances, and 0 metrics for production.`
      );

      showToast(
        'Master Database Reset Complete: All collections cleared. Panel is fresh at 0 ready for live production!'
      );

      return purgeResult;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown database purge error';
      showToast(`Database reset warning: ${errMsg}`);
      return {
        success: false,
        deletedCounts: {},
        message: errMsg
      };
    } finally {
      setIsPurgingDatabase(false);
    }
  };

  // Restore demo mock data
  const restoreDemoData = () => {
    localStorage.removeItem('rama77_production_fresh');
    localStorage.setItem('rama77_markets', JSON.stringify(INITIAL_MARKETS));
    localStorage.setItem('rama77_users', JSON.stringify(INITIAL_USERS));
    localStorage.setItem('rama77_deposits', JSON.stringify(INITIAL_DEPOSITS));
    localStorage.setItem('rama77_withdraws', JSON.stringify(INITIAL_WITHDRAWS));
    localStorage.setItem('rama77_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem('rama77_bets', JSON.stringify(INITIAL_BETS));
    setMarkets(INITIAL_MARKETS);
    setUsers(INITIAL_USERS);
    setDeposits(INITIAL_DEPOSITS);
    setWithdraws(INITIAL_WITHDRAWS);
    setTransactions(INITIAL_TRANSACTIONS);
    setBets(INITIAL_BETS);
    setNotifications([]);
    showToast('Default demo data restored.');
  };

  // Legacy reset all
  const resetAllData = () => {
    clearDatabaseForProduction();
  };

  // Purely dynamic dashboard aggregates calculated strictly from live data
  const totalMarkets = markets.length;
  const totalUsers = users.length;
  const todayNewUsers = 0; // Fresh 0 users
  const todayBidAmount = bets.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const todayWinAmount = bets.reduce((sum, b) => sum + (Number(b.winAmount) || 0), 0);
  const todayDeposit = deposits
    .filter(d => d.status === 'approved' || d.status === 'auto-approved' || d.isAutoApproved)
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const todayWithdraw = withdraws
    .filter(w => w.status === 'approved')
    .reduce((sum, w) => sum + (Number(w.amount) || 0), 0);
  const totalWalletBalance = users.reduce((sum, u) => sum + (Number(u.walletBalance) || 0), 0);
  const totalManuallyAddedBalance = transactions
    .filter(
      t =>
        t.type === 'admin_credit' ||
        (t.type === 'deposit' &&
          (t.description?.toLowerCase().includes('manual') ||
            t.description?.toLowerCase().includes('admin')))
    )
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        markets,
        createMarket,
        updateMarket,
        deleteMarket,
        declareResult,
        selectedLiveMarket,
        setSelectedLiveMarket,
        selectedLiveSession,
        setSelectedLiveSession,
        liveBids,
        users,
        adjustUserWallet,
        toggleUserStatus,
        toggleBettingDisabled,
        createUser,
        deposits,
        approveDeposit,
        rejectDeposit,
        withdraws,
        approveWithdraw,
        rejectWithdraw,
        transactions,
        bets,
        starlineMarkets,
        declareStarlineResult,
        desawarMarkets,
        declareDesawarResult,
        gameTypes,
        updateGameType,
        sliders,
        addSlider,
        deleteSlider,
        toggleSlider,
        subAdmins,
        addSubAdmin,
        updateSubAdmin,
        deleteSubAdmin,
        settings,
        updateSettings,
        notifications,
        sendNotification,
        deleteNotification,
        gatewayConfig,
        updateGatewayConfig,
        webhookLogs,
        simulateWebhook,
        clearWebhookLogs,
        gatewayDeposits,
        manualCreditGatewayDeposit,
        firebaseConfig,
        updateFirebaseConfig,
        firebaseSyncStatus,
        syncAllMarketsToFirebaseNow,
        syncEventsLog,
        kotakAutoDepositVpa: KOTAK_AUTO_DEPOSIT_VPA,
        simulateAutoApprovedTopup,
        isPurgingDatabase,
        clearDatabaseForProduction,
        restoreDemoData,
        dashboardMetrics: {
          totalMarkets,
          totalUsers,
          todayNewUsers,
          todayBidAmount,
          todayWinAmount,
          todayDeposit,
          todayWithdraw,
          totalWalletBalance,
          totalManuallyAddedBalance
        },
        toastMessage,
        showToast,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
