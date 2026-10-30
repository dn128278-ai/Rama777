import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  getDocs,
  increment,
  serverTimestamp,
  Unsubscribe,
  DocumentData,
  writeBatch
} from 'firebase/firestore';
import {
  getDatabase,
  Database,
  ref as rtdbRef,
  onValue as rtdbOnValue,
  set as rtdbSet,
  update as rtdbUpdate,
  Unsubscribe as RtdbUnsubscribe
} from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';
import { Market, User, DepositRequest, WithdrawRequest, Transaction, BetRecord, AppNotification } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export interface FirebaseConnectionConfig {
  projectId: string;
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
  firestoreDatabaseId?: string;
}

export const DEFAULT_FIREBASE_CONFIG: FirebaseConnectionConfig = {
  apiKey: "AIzaSyCp9oyDecD1CuHKUQ6sMDqZVT8zsVZaHyg",
  authDomain: "rama777-37ef1.firebaseapp.com",
  projectId: "rama777-37ef1",
  storageBucket: "rama777-37ef1.firebasestorage.app",
  messagingSenderId: "711131800920",
  appId: "1:711131800920:web:f04d3746c99ecd099b12d",
  measurementId: "G-R1D44F3E4L",
  databaseURL: "https://rama777-37ef1-default-rtdb.firebaseio.com",
  firestoreDatabaseId: "(default)"
};

const STORAGE_KEY = 'rama77_firebase_config';

export function isFirebaseConfigured(config?: FirebaseConnectionConfig): boolean {
  const c = config || getStoredFirebaseConfig();
  return Boolean(c.projectId && c.apiKey && c.apiKey.trim().length > 0);
}

// Load stored config (defaults to the provided rama777-37ef1 live configuration)
export function getStoredFirebaseConfig(): FirebaseConnectionConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.projectId === 'dhanraj-games-f700d') {
        localStorage.removeItem(STORAGE_KEY);
      } else if (parsed.projectId) {
        return {
          ...DEFAULT_FIREBASE_CONFIG,
          ...parsed
        };
      }
    }
  } catch (e) {
    console.error('Failed to parse stored firebase config', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveFirebaseConfig(cfg: FirebaseConnectionConfig) {
  if (cfg.projectId === 'dhanraj-games-f700d') {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

// Helper to parse google-services.json from Android app
export function parseGoogleServicesJson(rawJson: string): Partial<FirebaseConnectionConfig> | null {
  try {
    const data = JSON.parse(rawJson);
    const projectInfo = data.project_info || {};
    const client = data.client && data.client[0] ? data.client[0] : null;
    const apiKey = client?.api_key && client.api_key[0]?.current_key ? client.api_key[0].current_key : '';
    const appId = client?.client_info?.mobilesdk_app_id || '';
    const projectId = projectInfo.project_id || '';
    const databaseURL = projectInfo.firebase_url || (projectId ? `https://${projectId}-default-rtdb.firebaseio.com` : '');
    const storageBucket = projectInfo.storage_bucket || (projectId ? `${projectId}.appspot.com` : '');

    return {
      projectId,
      apiKey,
      authDomain: projectId ? `${projectId}.firebaseapp.com` : '',
      databaseURL,
      storageBucket,
      messagingSenderId: projectInfo.project_number || '',
      appId: appId || (projectId ? `1:${projectInfo.project_number || 'project'}:android:client` : '')
    };
  } catch (e) {
    console.error('Invalid google-services.json string', e);
    return null;
  }
}

// Singletons
let appInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let rtdbInstance: Database | null = null;
let authInstance: Auth | null = null;

export function initFirebase(customConfig?: FirebaseConnectionConfig): {
  app: FirebaseApp | null;
  db: Firestore | null;
  rtdb: Database | null;
  auth: Auth | null;
} {
  const config = customConfig || getStoredFirebaseConfig();
  if (!isFirebaseConfigured(config)) {
    return {
      app: null,
      db: null,
      rtdb: null,
      auth: null
    };
  }

  if (getApps().length > 0) {
    appInstance = getApp();
  } else {
    appInstance = initializeApp({
      projectId: config.projectId,
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
    });
  }

  try {
    firestoreInstance = getFirestore(appInstance, config.firestoreDatabaseId || '(default)');
  } catch {
    firestoreInstance = getFirestore(appInstance);
  }

  try {
    rtdbInstance = config.databaseURL ? getDatabase(appInstance, config.databaseURL) : getDatabase(appInstance);
  } catch {
    rtdbInstance = getDatabase(appInstance);
  }

  authInstance = getAuth(appInstance);

  return {
    app: appInstance,
    db: firestoreInstance,
    rtdb: rtdbInstance,
    auth: authInstance
  };
}

export function getFirebaseServices(): {
  app: FirebaseApp | null;
  db: Firestore | null;
  rtdb: Database | null;
  auth: Auth | null;
} {
  if (!isFirebaseConfigured()) {
    return {
      app: null,
      db: null,
      rtdb: null,
      auth: null
    };
  }
  if (!appInstance || !firestoreInstance) {
    return initFirebase();
  }
  return {
    app: appInstance,
    db: firestoreInstance,
    rtdb: rtdbInstance,
    auth: authInstance
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const { auth } = getFirebaseServices();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Connection test
export async function testFirestoreConnection(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: false, message: 'Firebase disconnected (Local Mock State Mode)' };
  }
  try {
    const { db } = getFirebaseServices();
    if (!db) {
      return { success: false, message: 'Firestore not initialized' };
    }
    await getDocFromServer(doc(db, 'test', 'connection'));
    return { success: true, message: 'Connected to Firestore server successfully.' };
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      return { success: false, message: 'Client is offline. Please verify Firebase project config & API key.' };
    }
    // Permissions or non-existent doc errors still confirm live network connectivity to Firebase
    return {
      success: true,
      message: `Firebase server responded: ${error instanceof Error ? error.message.slice(0, 100) : 'Active'}`
    };
  }
}



// -------------------------------------------------------------
// Real-time Users & Wallet Balances Sync via onSnapshot
// -------------------------------------------------------------
export function subscribeToUsers(
  onUpdate: (users: User[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return () => {};
  }
  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, User>();
  const rtdbMap = new Map<string, User>();

  const emitCombined = () => {
    const merged = new Map<string, User>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  const parseDocToUser = (id: string, d: DocumentData): User => {
    const b = (d.bankDetail || d.bank_detail || {}) as Record<string, any>;
    return {
      id,
      name: d.name || d.userName || d.user_name || d.displayName || d.full_name || 'Player',
      mobile: d.mobile || d.phone || d.phoneNumber || d.userMobile || d.user_mobile || '9876543210',
      email: d.email || '',
      walletBalance: Number(d.walletBalance ?? d.wallet_balance ?? d.balance ?? d.wallet ?? 0),
      transferWalletBalance: Number(d.transferWalletBalance ?? d.transfer_wallet_balance ?? 0),
      status: (d.status === 'blocked' ? 'blocked' : 'active'),
      bettingDisabled: Boolean(d.bettingDisabled ?? d.betting_disabled),
      registeredAt: d.registeredAt || d.created_at || d.createdAt || new Date().toISOString().split('T')[0],
      totalDeposited: Number(d.totalDeposited ?? d.total_deposited ?? 0),
      totalWithdrawn: Number(d.totalWithdrawn ?? d.total_withdrawn ?? 0),
      lastLogin: d.lastLogin || d.last_login || 'Recent',
      bankDetail: {
        accountHolderName: b.accountHolderName || b.account_holder_name || d.accountHolderName || d.name || d.userName || '',
        bankName: b.bankName || b.bank_name || d.bankName || d.bank_name || '',
        accountNumber: b.accountNumber || b.account_number || d.accountNumber || d.account_number || '',
        ifsc: b.ifsc || b.ifsc_code || d.ifsc || d.ifscCode || '',
        upiId: b.upiId || b.upi_id || b.upi || d.upiId || d.upi_id || d.upi || '',
        isVerified: Boolean(b.isVerified ?? b.is_verified ?? d.isVerified ?? (b.accountNumber || d.accountNumber || b.upiId || d.upiId))
      }
    };
  };

  // 1. Listen to Firestore collection 'users'
  try {
    const colRef = collection(db, 'users');
    const unsubFs: Unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToUser(docSnap.id, docSnap.data() as DocumentData));
        });
        emitCombined();
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'users');
        if (onError) onError(error);
      }
    );
    unsubs.push(unsubFs);
  } catch (e) {
    console.warn('Could not attach Firestore users listener', e);
  }

  // 2. Listen to RTDB 'users'
  try {
    if (rtdb) {
      const rtdbUsersRef = rtdbRef(rtdb, 'users');
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbUsersRef,
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToUser(key, d));
            });
            emitCombined();
          }
        },
        error => {
          console.warn('RTDB users listener note:', error?.message);
        }
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    console.warn('Could not attach RTDB users listener', e);
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function updateUserInFirebase(userId: string, partial: Partial<User>): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  const payload: Record<string, any> = {
    ...partial,
    updatedAt: serverTimestamp()
  };
  Object.keys(payload).forEach(k => {
    if (payload[k] === undefined) delete payload[k];
  });

  try {
    await setDoc(doc(db, 'users', userId), payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `users/${userId}`);
  }

  try {
    if (rtdb) {
      await rtdbUpdate(rtdbRef(rtdb, `users/${userId}`), {
        ...partial,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB user update note:', e);
  }
}

export async function createUserInFirebase(user: User): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  const payload = {
    id: user.id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    walletBalance: user.walletBalance,
    transferWalletBalance: user.transferWalletBalance || 0,
    status: user.status,
    bettingDisabled: user.bettingDisabled,
    registeredAt: user.registeredAt,
    totalDeposited: user.totalDeposited,
    totalWithdrawn: user.totalWithdrawn,
    bankDetail: user.bankDetail,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'users', user.id), payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `users/${user.id}`);
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `users/${user.id}`), {
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB user create note:', e);
  }
}

// -------------------------------------------------------------
// Real-time Withdrawals Sync via onSnapshot ('withdrawals' & 'withdraw_requests')
// -------------------------------------------------------------
export function parseDocToWithdraw(id: string, d: DocumentData): WithdrawRequest {
  const b = (d.bankDetail || d.bank_detail || {}) as Record<string, any>;
  return {
    id: id || d.id,
    userId: d.userId || d.user_id || 'usr_unknown',
    userName: d.userName || d.user_name || d.name || 'Player',
    userMobile: d.userMobile || d.user_mobile || d.mobile || d.phone || '9876543210',
    amount: Number(d.amount ?? d.withdraw_amount ?? 0),
    paymentMethod: (d.paymentMethod || d.payment_method || d.method || (d.upiId || b.upiId ? 'UPI' : 'Bank Transfer')) === 'Bank Transfer' ? 'Bank Transfer' : 'UPI',
    accountDetails: d.accountDetails || d.account_details || d.upiId || d.upi || d.accountNumber || (d.bankAccountNumber ? `${d.bankName || 'Bank'}: ${d.bankAccountNumber}` : 'UPI / Bank'),
    upiId: d.upiId || d.upi_id || d.upi || b.upiId || b.upi_id || '',
    bankAccountNumber: d.bankAccountNumber || d.bank_account_number || d.accountNumber || d.account_number || b.accountNumber || '',
    ifscCode: d.ifscCode || d.ifsc_code || d.ifsc || b.ifsc || '',
    status: (d.status === 'approved' || d.status === 'rejected' ? d.status : 'pending') as 'pending' | 'approved' | 'rejected',
    utrOrReference: d.utrOrReference || d.utr || d.reference || d.refNo || '',
    requestedAt: d.requestedAt || d.createdAt || d.created_at || new Date().toISOString(),
    processedAt: d.processedAt || d.processed_at || '',
    adminRemark: d.adminRemark || d.admin_remark || d.remark || d.rejectionReason || ''
  };
}

export function subscribeToWithdrawals(
  onUpdate: (withdrawals: WithdrawRequest[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) return () => {};
  const { db, rtdb } = getFirebaseServices();
  if (!db) return () => {};

  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, WithdrawRequest>();
  const rtdbMap = new Map<string, WithdrawRequest>();

  const emitCombined = () => {
    const merged = new Map<string, WithdrawRequest>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  // 1. Listen to Firestore collection 'withdrawals'
  try {
    const unsub = onSnapshot(
      collection(db, 'withdrawals'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToWithdraw(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      err => {
        handleFirestoreError(err, OperationType.GET, 'withdrawals');
        if (onError) onError(err);
      }
    );
    unsubs.push(unsub);
  } catch (e) {
    console.warn('Could not attach Firestore withdrawals listener', e);
  }

  // 2. Also listen to collection 'withdraw_requests' (for compatibility with mobile app variants)
  try {
    const unsub2 = onSnapshot(
      collection(db, 'withdraw_requests'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToWithdraw(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      () => {}
    );
    unsubs.push(unsub2);
  } catch (e) {
    // Ignore
  }

  // 3. RTDB 'withdrawals'
  try {
    if (rtdb) {
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbRef(rtdb, 'withdrawals'),
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToWithdraw(key, d));
            });
            emitCombined();
          }
        },
        error => console.warn('RTDB withdrawals listener note:', error?.message)
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    console.warn('Could not attach RTDB withdrawals listener', e);
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function updateWithdrawalInFirebase(
  withdrawId: string,
  status: 'approved' | 'rejected',
  utrOrReference?: string,
  adminRemark?: string,
  userId?: string,
  amount?: number
): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  const now = new Date().toISOString();
  const payload = {
    status,
    utrOrReference: utrOrReference || '',
    adminRemark: adminRemark || '',
    processedAt: now,
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'withdrawals', withdrawId), payload, { merge: true });
    await setDoc(doc(db, 'withdraw_requests', withdrawId), payload, { merge: true }).catch(() => {});

    // If rejected, refund user wallet balance in Firestore
    if (status === 'rejected' && userId && amount) {
      await updateDoc(doc(db, 'users', userId), {
        walletBalance: increment(amount)
      }).catch(() => {});
    }
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `withdrawals/${withdrawId}`);
  }

  try {
    if (rtdb) {
      await rtdbUpdate(rtdbRef(rtdb, `withdrawals/${withdrawId}`), {
        ...payload,
        updatedAt: now
      });
    }
  } catch (e) {
    console.warn('RTDB withdrawal update note:', e);
  }
}

// -------------------------------------------------------------
// Real-time Deposits Sync via onSnapshot ('deposits', 'deposit_requests', 'auto_deposits')
// -------------------------------------------------------------
export function subscribeToDeposits(
  onUpdate: (deposits: DepositRequest[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) return () => {};
  const { db, rtdb } = getFirebaseServices();
  if (!db) return () => {};

  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, DepositRequest>();
  const rtdbMap = new Map<string, DepositRequest>();

  const emitCombined = () => {
    const merged = new Map<string, DepositRequest>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  // 1. Listen to Firestore collection 'deposits'
  try {
    const unsub = onSnapshot(
      collection(db, 'deposits'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToDeposit(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      err => {
        handleFirestoreError(err, OperationType.GET, 'deposits');
        if (onError) onError(err);
      }
    );
    unsubs.push(unsub);
  } catch (e) {
    console.warn('Could not attach Firestore deposits listener', e);
  }

  // 2. Listen to collection 'deposit_requests'
  try {
    const unsub2 = onSnapshot(
      collection(db, 'deposit_requests'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToDeposit(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      () => {}
    );
    unsubs.push(unsub2);
  } catch (e) {
    // Ignore
  }

  // 3. Listen to collection 'auto_deposits'
  try {
    const unsub3 = onSnapshot(
      collection(db, 'auto_deposits'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToDeposit(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      () => {}
    );
    unsubs.push(unsub3);
  } catch (e) {
    // Ignore
  }

  // 4. RTDB 'deposits'
  try {
    if (rtdb) {
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbRef(rtdb, 'deposits'),
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToDeposit(key, d));
            });
            emitCombined();
          }
        },
        error => console.warn('RTDB deposits listener note:', error?.message)
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    // Ignore
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function updateDepositInFirebase(
  depositId: string,
  status: 'approved' | 'rejected',
  rejectionReason?: string,
  userId?: string,
  amount?: number
): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  const now = new Date().toISOString();
  const payload = {
    status,
    rejectionReason: rejectionReason || '',
    processedAt: now,
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'deposits', depositId), payload, { merge: true });
    await setDoc(doc(db, 'deposit_requests', depositId), payload, { merge: true }).catch(() => {});

    // If approved, increment user balance in Firestore
    if (status === 'approved' && userId && amount) {
      await updateDoc(doc(db, 'users', userId), {
        walletBalance: increment(amount),
        totalDeposited: increment(amount)
      }).catch(() => {});
    }
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `deposits/${depositId}`);
  }

  try {
    if (rtdb) {
      await rtdbUpdate(rtdbRef(rtdb, `deposits/${depositId}`), {
        ...payload,
        updatedAt: now
      });
    }
  } catch (e) {
    console.warn('RTDB deposit update note:', e);
  }
}

// -------------------------------------------------------------
// Real-time Transactions Sync via onSnapshot ('transactions')
// -------------------------------------------------------------
export function parseDocToTransaction(id: string, d: DocumentData): Transaction {
  return {
    id: id || d.id,
    userId: d.userId || d.user_id || 'usr_auto',
    userName: d.userName || d.user_name || d.name || 'Player',
    userMobile: d.userMobile || d.user_mobile || d.mobile || d.phone || '9876543210',
    type: d.type || (Number(d.amount) > 0 ? 'deposit' : 'withdraw'),
    amount: Number(d.amount ?? 0),
    balanceBefore: Number(d.balanceBefore ?? d.balance_before ?? 0),
    balanceAfter: Number(d.balanceAfter ?? d.balance_after ?? 0),
    description: d.description || d.desc || 'Transaction Ledger Entry',
    referenceId: d.referenceId || d.reference_id || d.refId || id,
    createdAt: d.createdAt || d.created_at || new Date().toISOString(),
    vpa: d.vpa || '',
    isAutoApproved: Boolean(d.isAutoApproved)
  };
}

export function subscribeToTransactions(
  onUpdate: (transactions: Transaction[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) return () => {};
  const { db, rtdb } = getFirebaseServices();
  if (!db) return () => {};

  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, Transaction>();
  const rtdbMap = new Map<string, Transaction>();

  const emitCombined = () => {
    const merged = new Map<string, Transaction>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  try {
    const unsub = onSnapshot(
      collection(db, 'transactions'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToTransaction(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      err => {
        handleFirestoreError(err, OperationType.GET, 'transactions');
        if (onError) onError(err);
      }
    );
    unsubs.push(unsub);
  } catch (e) {
    console.warn('Could not attach Firestore transactions listener', e);
  }

  try {
    if (rtdb) {
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbRef(rtdb, 'transactions'),
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToTransaction(key, d));
            });
            emitCombined();
          }
        },
        error => console.warn('RTDB transactions listener note:', error?.message)
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    // Ignore
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function recordTransactionInFirebase(txn: Transaction): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  const payload = {
    ...txn,
    createdAt: txn.createdAt || new Date().toISOString(),
    serverTimestamp: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'transactions', txn.id), payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `transactions/${txn.id}`);
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `transactions/${txn.id}`), {
        ...txn,
        recordedAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB transaction write note:', e);
  }
}



// -------------------------------------------------------------
// Real-time Markets Sync via onSnapshot
// -------------------------------------------------------------
export function subscribeToMarkets(
  onUpdate: (markets: Market[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return () => {};
  }
  const pathForOnSnapshot = 'markets';
  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, Market>();
  const rtdbMap = new Map<string, Market>();

  const emitCombined = () => {
    const merged = new Map<string, Market>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    const result = Array.from(merged.values());
    onUpdate(result);
  };

  // 1. Real-time Firestore onSnapshot listener
  try {
    const colRef = collection(db, pathForOnSnapshot);
    const unsubFs: Unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        firestoreMap.clear();
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as DocumentData;
          const id = docSnap.id;
          const market: Market = {
            id,
            name: d.name || d.marketName || id.toUpperCase(),
            apiKeyName: d.apiKeyName || d.api_key_name || id.toLowerCase(),
            isOpenNow: d.isOpenNow !== undefined ? Boolean(d.isOpenNow) : true,
            isDisabled: d.isDisabled !== undefined ? Boolean(d.isDisabled) : false,
            saturdayOpen: d.saturdayOpen !== undefined ? Boolean(d.saturdayOpen) : true,
            sundayOpen: d.sundayOpen !== undefined ? Boolean(d.sundayOpen) : true,
            autoResult: d.autoResult !== undefined ? Boolean(d.autoResult) : true,
            previousDayCheck: d.previousDayCheck !== undefined ? Boolean(d.previousDayCheck) : false,
            openTime: d.openTime || d.open_time || '10:00 AM',
            closeTime: d.closeTime || d.close_time || '11:00 AM',
            openResultTime: d.openResultTime || d.open_result_time || '10:15 AM',
            closeResultTime: d.closeResultTime || d.close_result_time || '11:15 AM',
            openPana: d.openPana || d.open_pana || '***',
            openDigit: d.openDigit || d.open_digit || '*',
            closeDigit: d.closeDigit || d.close_digit || '*',
            closePana: d.closePana || d.close_pana || '***',
            createdAt: d.createdAt || d.created_at || new Date().toISOString()
          };
          firestoreMap.set(id, market);
        });
        emitCombined();
      },
      error => {
        handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
        if (onError) onError(error);
      }
    );
    unsubs.push(unsubFs);
  } catch (e) {
    console.warn('Could not attach Firestore markets onSnapshot listener', e);
  }

  // 2. Real-time RTDB listener (for hybrid sync)
  try {
    if (rtdb) {
      const rtdbMarketsRef = rtdbRef(rtdb, 'markets');
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbMarketsRef,
        snapshot => {
          rtdbMap.clear();
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              const market: Market = {
                id: key,
                name: d.name || d.marketName || key.toUpperCase(),
                apiKeyName: d.apiKeyName || d.api_key_name || key.toLowerCase(),
                isOpenNow: d.isOpenNow !== undefined ? Boolean(d.isOpenNow) : true,
                isDisabled: d.isDisabled !== undefined ? Boolean(d.isDisabled) : false,
                saturdayOpen: d.saturdayOpen !== undefined ? Boolean(d.saturdayOpen) : true,
                sundayOpen: d.sundayOpen !== undefined ? Boolean(d.sundayOpen) : true,
                autoResult: d.autoResult !== undefined ? Boolean(d.autoResult) : true,
                previousDayCheck: d.previousDayCheck !== undefined ? Boolean(d.previousDayCheck) : false,
                openTime: d.openTime || d.open_time || '10:00 AM',
                closeTime: d.closeTime || d.close_time || '11:00 AM',
                openResultTime: d.openResultTime || d.open_result_time || '10:15 AM',
                closeResultTime: d.closeResultTime || d.close_result_time || '11:15 AM',
                openPana: d.openPana || d.open_pana || '***',
                openDigit: d.openDigit || d.open_digit || '*',
                closeDigit: d.closeDigit || d.close_digit || '*',
                closePana: d.closePana || d.close_pana || '***',
                createdAt: d.createdAt || d.created_at || new Date().toISOString()
              };
              rtdbMap.set(key, market);
            });
            emitCombined();
          }
        },
        error => {
          console.warn('RTDB markets listener note:', error?.message);
        }
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    console.warn('Could not attach RTDB markets listener', e);
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

// -------------------------------------------------------------
// Direct Market Addition to Firestore collection 'markets'
// -------------------------------------------------------------
export async function addMarketToFirebase(market: Market): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: true, message: `Market "${market.name}" created in local state.` };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { success: true, message: `Market "${market.name}" created in local state.` };
  }
  const payload: Record<string, any> = {
    id: market.id,
    name: market.name,
    apiKeyName: market.apiKeyName,
    isOpenNow: market.isOpenNow ?? true,
    isDisabled: market.isDisabled ?? false,
    saturdayOpen: market.saturdayOpen ?? true,
    sundayOpen: market.sundayOpen ?? true,
    autoResult: market.autoResult ?? true,
    previousDayCheck: market.previousDayCheck ?? false,
    openTime: market.openTime || '10:00 AM',
    closeTime: market.closeTime || '11:00 AM',
    openResultTime: market.openResultTime || '10:15 AM',
    closeResultTime: market.closeResultTime || '11:15 AM',
    openPana: market.openPana || '***',
    openDigit: market.openDigit || '*',
    closeDigit: market.closeDigit || '*',
    closePana: market.closePana || '***',
    createdAt: market.createdAt || new Date().toISOString(),
    updatedAt: serverTimestamp()
  };

  try {
    const marketRef = doc(db, 'markets', market.id);
    await setDoc(marketRef, payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `markets/${market.id}`);
    throw e;
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `markets/${market.id}`), {
        ...payload,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB addMarket note:', e);
  }

  return { success: true, message: `Market "${market.name}" created in Firestore collection 'markets'.` };
}

// -------------------------------------------------------------
// Direct Market & Timing Edits to Firestore collection 'markets'
// -------------------------------------------------------------
export async function updateMarketInFirebase(marketId: string, partial: Partial<Market>): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: true, message: `Market #${marketId} updated in local state.` };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { success: true, message: `Market #${marketId} updated in local state.` };
  }
  const payload: Record<string, any> = {
    ...partial,
    updatedAt: serverTimestamp()
  };

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  try {
    const marketRef = doc(db, 'markets', marketId);
    await setDoc(marketRef, payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `markets/${marketId}`);
    throw e;
  }

  try {
    if (rtdb) {
      const rtdbPayload: Record<string, any> = { ...partial, updatedAt: new Date().toISOString() };
      Object.keys(rtdbPayload).forEach(key => {
        if (rtdbPayload[key] === undefined) delete rtdbPayload[key];
      });
      await rtdbUpdate(rtdbRef(rtdb, `markets/${marketId}`), rtdbPayload);
    }
  } catch (e) {
    console.warn('RTDB updateMarket note:', e);
  }

  return { success: true, message: `Market #${marketId} updated in Firestore collection 'markets'.` };
}

// -------------------------------------------------------------
// Delete Market from Firestore collection 'markets'
// -------------------------------------------------------------
export async function deleteMarketFromFirebase(marketId: string): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: true, message: `Market #${marketId} deleted from local state.` };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { success: true, message: `Market #${marketId} deleted from local state.` };
  }

  try {
    const marketRef = doc(db, 'markets', marketId);
    await deleteDoc(marketRef);
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `markets/${marketId}`);
    throw e;
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `markets/${marketId}`), null);
    }
  } catch (e) {
    console.warn('RTDB deleteMarket note:', e);
  }

  return { success: true, message: `Market #${marketId} deleted from Firestore collection 'markets'.` };
}

// -------------------------------------------------------------
// Market Time Sync (Legacy alias pointing directly to updateMarketInFirebase)
// -------------------------------------------------------------
export async function syncMarketTimingsToFirebase(marketId: string, data: Partial<Market>): Promise<{ success: boolean; message: string }> {
  return updateMarketInFirebase(marketId, data);
}

// -------------------------------------------------------------
// Daily Result Publishing Sync (Open/Close Panna & Ank)
// -------------------------------------------------------------
export async function publishResultToFirebase(
  marketId: string,
  result: {
    openPana?: string;
    openDigit?: string;
    closeDigit?: string;
    closePana?: string;
    marketName?: string;
  }
): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: true, message: `Result declared locally.` };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { success: true, message: `Result declared locally.` };
  }
  const dateKey = new Date().toISOString().split('T')[0];
  const payload = {
    openPana: result.openPana || '***',
    openDigit: result.openDigit || '*',
    closeDigit: result.closeDigit || '*',
    closePana: result.closePana || '***',
    formattedResult: `${result.openPana || '***'}-${result.openDigit || '*'}${result.closeDigit || '*'}-${result.closePana || '***'}`,
    marketName: result.marketName || marketId,
    declaredAt: new Date().toISOString(),
    resultDate: dateKey
  };

  try {
    // 1. Update markets/{marketId} doc
    const marketRef = doc(db, 'markets', marketId);
    await setDoc(marketRef, payload, { merge: true });

    // 2. Also save to historical results collection: results/{marketId}_{dateKey}
    const resultHistRef = doc(db, 'market_results', `${marketId}_${dateKey}`);
    await setDoc(resultHistRef, {
      marketId,
      ...payload
    }, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `markets/${marketId}`);
  }

  try {
    if (rtdb) {
      // User mobile apps usually listen to RTDB live_results or markets node for instant UI animations
      await rtdbUpdate(rtdbRef(rtdb, `markets/${marketId}`), payload);
      await rtdbSet(rtdbRef(rtdb, `live_results/${marketId}`), payload);
    }
  } catch (e) {
    console.warn('RTDB result publish note:', e);
  }

  return { success: true, message: `Result ${payload.formattedResult} published live to Firebase!` };
}

// -------------------------------------------------------------
// Bulk Seed Markets to Firebase (Optional One-Click Setup)
// -------------------------------------------------------------
export async function seedAllMarketsToFirebase(markets: Market[]): Promise<{ count: number }> {
  if (!isFirebaseConfigured()) {
    return { count: markets.length };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { count: markets.length };
  }
  let count = 0;

  try {
    const batch = writeBatch(db);
    markets.forEach(m => {
      const ref = doc(db, 'markets', m.id);
      batch.set(ref, {
        id: m.id,
        name: m.name,
        apiKeyName: m.apiKeyName,
        openTime: m.openTime,
        closeTime: m.closeTime,
        openResultTime: m.openResultTime,
        closeResultTime: m.closeResultTime,
        isOpenNow: m.isOpenNow,
        isDisabled: m.isDisabled,
        openPana: m.openPana || '***',
        openDigit: m.openDigit || '*',
        closeDigit: m.closeDigit || '*',
        closePana: m.closePana || '***',
        updatedAt: new Date().toISOString()
      }, { merge: true });
      count++;
    });
    await batch.commit();
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, 'markets/batch');
  }

  try {
    if (rtdb) {
      const updates: Record<string, any> = {};
      markets.forEach(m => {
        updates[`markets/${m.id}`] = {
          id: m.id,
          name: m.name,
          openTime: m.openTime,
          closeTime: m.closeTime,
          openResultTime: m.openResultTime,
          closeResultTime: m.closeResultTime,
          isOpenNow: m.isOpenNow,
          openPana: m.openPana || '***',
          openDigit: m.openDigit || '*',
          closeDigit: m.closeDigit || '*',
          closePana: m.closePana || '***'
        };
      });
      await rtdbUpdate(rtdbRef(rtdb), updates);
    }
  } catch (e) {
    console.warn('RTDB batch seed note:', e);
  }

  return { count };
}

// -------------------------------------------------------------
// Kotak UPI Automated Wallet Top-up Live Sync Engine
// Official Kotak Receiver VPA: 0793748A0296660.bqr@kotak
// -------------------------------------------------------------
export const KOTAK_AUTO_DEPOSIT_VPA = '0793748A0296660.bqr@kotak';

export function parseDocToDeposit(id: string, d: DocumentData): DepositRequest {
  const isAuto =
    d.isAutoApproved !== false &&
    (d.receiverVpa === KOTAK_AUTO_DEPOSIT_VPA ||
      d.status === 'auto-approved' ||
      d.method === 'Kotak UPI' ||
      d.source === 'mobile_app_auto');

  return {
    id,
    userId: d.userId || d.user_id || 'usr_auto',
    userName: d.userName || d.user_name || 'Rahul Verma',
    userMobile: d.userMobile || d.user_mobile || d.phone || '9876543210',
    amount: Number(d.amount) || 0,
    method: 'Kotak UPI',
    utrNumber: d.utr || d.utrNumber || d.utr_number || `KTK${Date.now()}`,
    screenshotUrl: d.screenshotUrl || d.screenshot_url,
    status: isAuto ? 'auto-approved' : (d.status || 'auto-approved'),
    isAutoApproved: isAuto,
    receiverVpa: d.receiverVpa || KOTAK_AUTO_DEPOSIT_VPA,
    source: 'mobile_app_auto',
    requestedAt: d.requestedAt || d.createdAt || d.created_at || new Date().toISOString(),
    processedAt: d.autoApprovedAt || d.processedAt || new Date().toISOString(),
    autoApprovedAt: d.autoApprovedAt || new Date().toISOString()
  };
}

export function subscribeToAutoDeposits(
  onAutoDeposit: (deposit: DepositRequest) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return () => {};
  }

  const unsubs: Array<() => void> = [];
  const processedDocIds = new Set<string>();

  // 1. Listen to Firestore collection 'auto_deposits'
  try {
    const colRef = collection(db, 'auto_deposits');
    const unsubFs: Unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            const data = change.doc.data();
            const dep = parseDocToDeposit(change.doc.id, data);
            processedDocIds.add(dep.id);
            onAutoDeposit(dep);
          }
        });
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'auto_deposits');
        if (onError) onError(error);
      }
    );
    unsubs.push(unsubFs);
  } catch (e) {
    console.warn('Could not attach Firestore auto_deposits listener', e);
  }

  // 2. Also listen to RTDB 'auto_deposits'
  try {
    if (rtdb) {
      const rtdbAutoRef = rtdbRef(rtdb, 'auto_deposits');
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbAutoRef,
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              if (!processedDocIds.has(key)) {
                processedDocIds.add(key);
                const dep = parseDocToDeposit(key, d);
                onAutoDeposit(dep);
              }
            });
          }
        },
        error => {
          console.warn('RTDB auto_deposits listener note:', error?.message);
        }
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    console.warn('Could not attach RTDB auto_deposits listener', e);
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function recordAutoApprovedDepositInFirebase(deposit: DepositRequest): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  try {
    const depRef = doc(db, 'auto_deposits', deposit.id);
    await setDoc(depRef, {
      id: deposit.id,
      userId: deposit.userId,
      userName: deposit.userName,
      userMobile: deposit.userMobile,
      amount: deposit.amount,
      method: deposit.method,
      utr: deposit.utrNumber,
      status: 'auto-approved',
      isAutoApproved: true,
      receiverVpa: KOTAK_AUTO_DEPOSIT_VPA,
      source: 'mobile_app_auto',
      autoApprovedAt: deposit.autoApprovedAt || new Date().toISOString(),
      createdAt: deposit.requestedAt || new Date().toISOString()
    }, { merge: true });

    // Atomically increment the user's wallet balance in Firestore
    if (deposit.userId) {
      const userRef = doc(db, 'users', deposit.userId);
      await updateDoc(userRef, {
        walletBalance: increment(deposit.amount),
        totalDeposited: increment(deposit.amount),
        lastAutoDepositAt: new Date().toISOString()
      }).catch(async () => {
        // If user document didn't exist yet, create it with initial balance
        await setDoc(userRef, {
          id: deposit.userId,
          name: deposit.userName,
          mobile: deposit.userMobile,
          walletBalance: deposit.amount,
          totalDeposited: deposit.amount,
          status: 'active',
          registeredAt: new Date().toISOString().split('T')[0]
        }, { merge: true });
      });
    }
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `auto_deposits/${deposit.id}`);
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `auto_deposits/${deposit.id}`), {
        id: deposit.id,
        userId: deposit.userId,
        userName: deposit.userName,
        userMobile: deposit.userMobile,
        amount: deposit.amount,
        status: 'auto-approved',
        receiverVpa: KOTAK_AUTO_DEPOSIT_VPA,
        createdAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB auto_deposits record note:', e);
  }
}

// -------------------------------------------------------------
// Real-time Bids / Bets Sync from User App via onSnapshot
// -------------------------------------------------------------
export function parseDocToBid(id: string, d: DocumentData): BetRecord {
  return {
    id: id || d.id,
    userId: d.userId || d.user_id || 'usr_auto',
    userName: d.userName || d.user_name || 'Player',
    marketName: d.marketName || d.market_name || 'KALYAN',
    gameType: d.gameType || d.game_type || 'Single Ank',
    session: (d.session === 'CLOSE' ? 'CLOSE' : 'OPEN') as 'OPEN' | 'CLOSE',
    number: String(d.number || d.bidNumber || d.digit || '0'),
    amount: Number(d.amount || d.bidAmount || 0),
    winAmount: Number(d.winAmount || d.win_amount || 0),
    status: (d.status === 'WON' || d.status === 'LOST' ? d.status : 'PENDING') as 'PENDING' | 'WON' | 'LOST',
    createdAt: d.createdAt || d.created_at || new Date().toISOString()
  };
}

export function subscribeToBids(
  onUpdate: (bids: BetRecord[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return () => {};
  }

  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, BetRecord>();
  const rtdbMap = new Map<string, BetRecord>();

  const emitCombined = () => {
    const merged = new Map<string, BetRecord>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  // 1. Listen to Firestore collection 'bids'
  try {
    const colRef = collection(db, 'bids');
    const unsubFs: Unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToBid(docSnap.id, docSnap.data() as DocumentData));
        });
        emitCombined();
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'bids');
        if (onError) onError(error);
      }
    );
    unsubs.push(unsubFs);
  } catch (e) {
    console.warn('Could not attach Firestore bids listener', e);
  }

  // 2. Listen to RTDB 'bids'
  try {
    if (rtdb) {
      const rtdbBidsRef = rtdbRef(rtdb, 'bids');
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbBidsRef,
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToBid(key, d));
            });
            emitCombined();
          }
        },
        error => {
          console.warn('RTDB bids listener note:', error?.message);
        }
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    console.warn('Could not attach RTDB bids listener', e);
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function placeBidInFirebase(bid: BetRecord): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  try {
    const bidRef = doc(db, 'bids', bid.id);
    await setDoc(bidRef, {
      id: bid.id,
      userId: bid.userId,
      userName: bid.userName,
      marketName: bid.marketName,
      gameType: bid.gameType,
      session: bid.session,
      number: bid.number,
      amount: bid.amount,
      winAmount: bid.winAmount,
      status: bid.status,
      createdAt: bid.createdAt
    }, { merge: true });

    // Deduct user balance in Firestore
    if (bid.userId) {
      const userRef = doc(db, 'users', bid.userId);
      await updateDoc(userRef, {
        walletBalance: increment(-bid.amount)
      }).catch(() => {});
    }
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `bids/${bid.id}`);
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `bids/${bid.id}`), {
        id: bid.id,
        userId: bid.userId,
        userName: bid.userName,
        marketName: bid.marketName,
        gameType: bid.gameType,
        session: bid.session,
        number: bid.number,
        amount: bid.amount,
        status: bid.status,
        createdAt: bid.createdAt
      });
    }
  } catch (e) {
    console.warn('RTDB bid record note:', e);
  }
}

// -------------------------------------------------------------
// Real-time Push Notifications & Broadcast Dispatch to Firestore 'notifications'
// -------------------------------------------------------------
export function parseDocToNotification(id: string, d: DocumentData): AppNotification {
  const headline = d.heading || d.title || 'Broadcast Notification';
  const messageBody = d.body || d.message || '';
  
  let formattedSentAt = d.sentAt;
  if (!formattedSentAt && d.createdAt) {
    if (typeof d.createdAt.toDate === 'function') {
      formattedSentAt = d.createdAt.toDate().toLocaleString('en-GB');
    } else if (typeof d.createdAt === 'string') {
      formattedSentAt = d.createdAt;
    }
  }
  if (!formattedSentAt) {
    formattedSentAt = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return {
    id: id || d.id,
    title: headline,
    heading: headline,
    message: messageBody,
    body: messageBody,
    type: 'broadcast',
    read: Boolean(d.read),
    target: d.target || 'all',
    sentAt: formattedSentAt,
    createdAt: d.createdAt
  };
}

export async function sendNotificationToFirebase(
  notification: AppNotification
): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return { success: true, message: `Notification "${notification.title}" saved in local state.` };
  }
  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return { success: true, message: `Notification "${notification.title}" saved in local state.` };
  }

  const headline = notification.heading || notification.title || 'Broadcast Announcement';
  const messageBody = notification.body || notification.message || '';

  const payload: Record<string, any> = {
    id: notification.id,
    title: headline,
    heading: headline,
    message: messageBody,
    body: messageBody,
    type: 'broadcast',
    read: false,
    target: notification.target || 'all',
    sentAt: notification.sentAt || new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: serverTimestamp()
  };

  try {
    const notifRef = doc(db, 'notifications', notification.id);
    await setDoc(notifRef, payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `notifications/${notification.id}`);
    throw e;
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `notifications/${notification.id}`), {
        ...payload,
        createdAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('RTDB notification dispatch note:', e);
  }

  return {
    success: true,
    message: `Broadcast "${headline}" published live to Firestore collection 'notifications'!`
  };
}

export function subscribeToNotifications(
  onUpdate: (notifications: AppNotification[]) => void,
  onError?: (err: any) => void
): () => void {
  if (!isFirebaseConfigured()) return () => {};
  const { db, rtdb } = getFirebaseServices();
  if (!db) return () => {};

  const unsubs: Array<() => void> = [];
  const firestoreMap = new Map<string, AppNotification>();
  const rtdbMap = new Map<string, AppNotification>();

  const emitCombined = () => {
    const merged = new Map<string, AppNotification>();
    rtdbMap.forEach((v, k) => merged.set(k, v));
    firestoreMap.forEach((v, k) => merged.set(k, v));
    onUpdate(Array.from(merged.values()));
  };

  // 1. Listen to Firestore collection 'notifications'
  try {
    const unsub = onSnapshot(
      collection(db, 'notifications'),
      snapshot => {
        snapshot.forEach(docSnap => {
          firestoreMap.set(docSnap.id, parseDocToNotification(docSnap.id, docSnap.data()));
        });
        emitCombined();
      },
      err => {
        handleFirestoreError(err, OperationType.GET, 'notifications');
        if (onError) onError(err);
      }
    );
    unsubs.push(unsub);
  } catch (e) {
    console.warn('Could not attach Firestore notifications listener', e);
  }

  // 2. Also listen to RTDB 'notifications'
  try {
    if (rtdb) {
      const unsubRtdb: RtdbUnsubscribe = rtdbOnValue(
        rtdbRef(rtdb, 'notifications'),
        snapshot => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            Object.keys(val).forEach(key => {
              const d = val[key];
              if (!d || typeof d !== 'object') return;
              rtdbMap.set(key, parseDocToNotification(key, d));
            });
            emitCombined();
          }
        },
        error => console.warn('RTDB notifications listener note:', error?.message)
      );
      unsubs.push(unsubRtdb);
    }
  } catch (e) {
    // Ignore
  }

  return () => {
    unsubs.forEach(fn => fn());
  };
}

export async function deleteNotificationFromFirebase(id: string): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { db, rtdb } = getFirebaseServices();
  if (!db) return;

  try {
    await deleteDoc(doc(db, 'notifications', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `notifications/${id}`);
  }

  try {
    if (rtdb) {
      await rtdbSet(rtdbRef(rtdb, `notifications/${id}`), null);
    }
  } catch (e) {
    console.warn('RTDB notification delete note:', e);
  }
}

export interface DatabasePurgeOptions {
  purgeUsers?: boolean;
  purgeBids?: boolean;
  purgeTransactions?: boolean;
  purgeDeposits?: boolean;
  purgeWithdrawals?: boolean;
  purgeNotifications?: boolean;
  purgeLiveResults?: boolean;
  resetMarketResults?: boolean;
  purgeMarketsEntirely?: boolean;
}

export interface DatabasePurgeResult {
  success: boolean;
  deletedCounts: Record<string, number>;
  message: string;
}

/**
 * Helper to delete all documents from a given Firestore collection in batches
 */
async function deleteCollectionDocs(db: Firestore, colName: string): Promise<number> {
  let count = 0;
  try {
    const colRef = collection(db, colName);
    const snap = await getDocs(colRef);
    if (snap.empty) return 0;

    const docs = snap.docs;
    // Commit deletes in batches of up to 400 documents
    for (let i = 0; i < docs.length; i += 400) {
      const batch = writeBatch(db);
      const chunk = docs.slice(i, i + 400);
      chunk.forEach(d => {
        batch.delete(d.ref);
      });
      await batch.commit();
      count += chunk.length;
    }
  } catch (err) {
    console.warn(`Error deleting documents from collection '${colName}':`, err);
  }
  return count;
}

/**
 * Resets declared results for all markets in Firestore to initial blank state (***-*-*-***)
 */
async function resetAllMarketResultsInFirestore(db: Firestore): Promise<number> {
  let count = 0;
  try {
    const colRef = collection(db, 'markets');
    const snap = await getDocs(colRef);
    if (snap.empty) return 0;

    const docs = snap.docs;
    for (let i = 0; i < docs.length; i += 400) {
      const batch = writeBatch(db);
      const chunk = docs.slice(i, i + 400);
      chunk.forEach(d => {
        batch.update(d.ref, {
          openPana: '***',
          openDigit: '*',
          closeDigit: '*',
          closePana: '***',
          result: '***-*-*-***',
          updatedAt: serverTimestamp()
        });
      });
      await batch.commit();
      count += chunk.length;
    }
  } catch (err) {
    console.warn('Error resetting market results in Firestore:', err);
  }
  return count;
}

/**
 * Master Purge / Clear Utility:
 * Clears selected collections in Firestore and Realtime Database nodes
 * for project rama777-37ef1 so the platform starts completely fresh with 0 data.
 */
export async function clearFirestoreCollections(
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
): Promise<DatabasePurgeResult> {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      deletedCounts: {},
      message: 'Firebase is not configured. Local data will still be cleared.'
    };
  }

  const { db, rtdb } = getFirebaseServices();
  if (!db) {
    return {
      success: false,
      deletedCounts: {},
      message: 'Firestore service not available.'
    };
  }

  const deletedCounts: Record<string, number> = {};

  try {
    // 1. Purge Users collection
    if (options.purgeUsers) {
      deletedCounts.users = await deleteCollectionDocs(db, 'users');
    }

    // 2. Purge Bids & Bids History collection
    if (options.purgeBids) {
      deletedCounts.bids = await deleteCollectionDocs(db, 'bids');
      deletedCounts.bids_history = await deleteCollectionDocs(db, 'bids_history');
    }

    // 3. Purge Transactions / Ledger
    if (options.purgeTransactions) {
      deletedCounts.transactions = await deleteCollectionDocs(db, 'transactions');
    }

    // 4. Purge Deposits & Auto-Deposits
    if (options.purgeDeposits) {
      deletedCounts.deposits = await deleteCollectionDocs(db, 'deposits');
      deletedCounts.deposit_requests = await deleteCollectionDocs(db, 'deposit_requests');
      deletedCounts.auto_deposits = await deleteCollectionDocs(db, 'auto_deposits');
    }

    // 5. Purge Withdrawals
    if (options.purgeWithdrawals) {
      deletedCounts.withdrawals = await deleteCollectionDocs(db, 'withdrawals');
      deletedCounts.withdraw_requests = await deleteCollectionDocs(db, 'withdraw_requests');
    }

    // 6. Purge Notifications / Broadcasts
    if (options.purgeNotifications) {
      deletedCounts.notifications = await deleteCollectionDocs(db, 'notifications');
    }

    // 7. Purge Game Results
    if (options.purgeLiveResults) {
      deletedCounts.market_results = await deleteCollectionDocs(db, 'market_results');
      deletedCounts.results = await deleteCollectionDocs(db, 'results');
      deletedCounts.live_results = await deleteCollectionDocs(db, 'live_results');
    }

    // 8. Handle Markets (either purge entirely or reset their results to ***-*-*-***)
    if (options.purgeMarketsEntirely) {
      deletedCounts.markets = await deleteCollectionDocs(db, 'markets');
    } else if (options.resetMarketResults) {
      deletedCounts.market_results_reset = await resetAllMarketResultsInFirestore(db);
    }

    // 9. Clean up Realtime Database counterparts
    if (rtdb) {
      const rtdbNodes: string[] = [];
      if (options.purgeUsers) rtdbNodes.push('users');
      if (options.purgeBids) rtdbNodes.push('bids', 'live_bids');
      if (options.purgeTransactions) rtdbNodes.push('transactions');
      if (options.purgeDeposits) rtdbNodes.push('deposits', 'auto_deposits', 'deposit_requests');
      if (options.purgeWithdrawals) rtdbNodes.push('withdrawals', 'withdraw_requests');
      if (options.purgeNotifications) rtdbNodes.push('notifications');
      if (options.purgeLiveResults) rtdbNodes.push('live_results', 'market_results');
      if (options.purgeMarketsEntirely) rtdbNodes.push('markets');

      await Promise.all(
        rtdbNodes.map(async node => {
          try {
            await rtdbSet(rtdbRef(rtdb, node), null);
          } catch (e) {
            console.warn(`RTDB purge error on node ${node}:`, e);
          }
        })
      );
    }

    const totalPurged = Object.values(deletedCounts).reduce((a, b) => a + b, 0);

    return {
      success: true,
      deletedCounts,
      message: `Successfully purged ${totalPurged} document(s) from Firebase Firestore & Realtime Database.`
    };
  } catch (error) {
    console.error('Master database purge failed:', error);
    return {
      success: false,
      deletedCounts,
      message: error instanceof Error ? error.message : 'Unknown database purge error'
    };
  }
}


