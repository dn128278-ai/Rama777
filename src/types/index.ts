export type ActiveTab =
  | 'dashboard'
  | 'slider-images'
  | 'profits'
  | 'users'
  | 'withdraw-details'
  | 'general-setting'
  | 'payment-gateway'
  | 'gifts'
  | 'markets'
  | 'market-charts'
  | 'market-records'
  | 'market-results'
  | 'market-prediction'
  | 'market-win-history'
  | 'market-data'
  | 'starline-markets'
  | 'desawar-markets'
  | 'game-types'
  | 'transactions'
  | 'notifications'
  | 'sub-admins'
  | 'withdraw-history'
  | 'deposit-history'
  | 'firebase-sync'
  | 'change-password';

export interface PaymentGatewayConfig {
  activeGateway: 'phonepe' | 'paytm' | 'razorpay' | 'manual_upi';
  mode: 'production' | 'sandbox';
  autoCreditOnWebhook: boolean;
  minDeposit: number;
  maxDeposit: number;
  webhookEndpoint: string;
  phonepe: {
    enabled: boolean;
    merchantId: string;
    saltKey: string;
    saltIndex: string;
    upiId: string;
    webhookUrl: string;
  };
  paytm: {
    enabled: boolean;
    mid: string;
    merchantKey: string;
    website: string;
    industryType: string;
    webhookUrl: string;
  };
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
    webhookSecret: string;
  };
  manualUpi: {
    enabled: boolean;
    upiId: string;
    merchantName: string;
    qrCodeUrl: string;
    requireScreenshot: boolean;
  };
}

export interface WebhookLog {
  id: string;
  gateway: 'phonepe' | 'paytm' | 'razorpay' | 'manual_upi';
  event: string;
  gatewayTxnId: string;
  orderId: string;
  userId: string;
  userName: string;
  userMobile: string;
  amount: number;
  utr: string;
  status: 'success' | 'failed' | 'pending' | 'signature_mismatch';
  httpCode: number;
  receivedAt: string;
  payload: Record<string, any>;
}

export interface GatewayLinkedDeposit {
  id: string;
  depositId: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gateway: 'PhonePe' | 'Paytm' | 'Razorpay' | 'Manual UPI QR';
  utr: string;
  userId: string;
  userName: string;
  userMobile: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'credited' | 'processing' | 'failed' | 'refunded';
  reconciled: boolean;
  createdAt: string;
  settledAt?: string;
}

export interface Market {
  id: string;
  name: string;
  apiKeyName: string;
  isOpenNow: boolean;
  isDisabled: boolean;
  saturdayOpen: boolean;
  sundayOpen: boolean;
  autoResult: boolean;
  previousDayCheck: boolean;
  openTime: string; // e.g. "10:15 AM"
  closeTime: string; // e.g. "11:15 AM"
  openResultTime: string; // e.g. "10:30 AM"
  closeResultTime: string; // e.g. "11:30 AM"
  openPana?: string; // e.g. "137"
  openDigit?: string; // e.g. "1"
  closeDigit?: string; // e.g. "8"
  closePana?: string; // e.g. "459"
  createdAt: string;
}

export interface SingleAnkBidStat {
  digit: number; // 0 to 9
  totalBids: number;
  totalAmount: number;
  liability: number;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  walletBalance: number;
  transferWalletBalance: number;
  status: 'active' | 'blocked';
  bettingDisabled: boolean;
  registeredAt: string;
  totalDeposited: number;
  totalWithdrawn: number;
  lastLogin: string;
  bankDetail?: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
    isVerified: boolean;
  };
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  amount: number;
  method: 'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Bank Transfer' | 'Kotak UPI';
  utrNumber: string;
  screenshotUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'auto-approved';
  requestedAt: string;
  processedAt?: string;
  rejectionReason?: string;
  isAutoApproved?: boolean;
  receiverVpa?: string; // '0793748A0296660.bqr@kotak'
  source?: 'mobile_app_auto' | 'manual';
  autoApprovedAt?: string;
}

export interface WithdrawRequest {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  amount: number;
  paymentMethod: 'UPI' | 'Bank Transfer';
  accountDetails: string;
  upiId?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  utrOrReference?: string;
  requestedAt: string;
  processedAt?: string;
  adminRemark?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  type: 'deposit' | 'withdraw' | 'bid_placed' | 'bid_won' | 'admin_credit' | 'admin_debit' | 'refund' | 'bonus' | 'auto_deposit';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  referenceId: string;
  createdAt: string;
  vpa?: string;
  isAutoApproved?: boolean;
}

export interface BetRecord {
  id: string;
  userId: string;
  userName: string;
  marketName: string;
  gameType: string;
  session: 'OPEN' | 'CLOSE';
  number: string;
  amount: number;
  winAmount: number;
  status: 'PENDING' | 'WON' | 'LOST';
  createdAt: string;
}

export interface StarlineMarket {
  id: string;
  name: string;
  timeSlot: string; // e.g. "10:00 AM"
  openPana: string;
  openDigit: string;
  isOpenNow: boolean;
  isDisabled: boolean;
  totalBids: number;
  totalAmount: number;
}

export interface DesawarMarket {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  resultJodi: string; // e.g. "74"
  isOpenNow: boolean;
  isDisabled: boolean;
  totalBids: number;
  totalAmount: number;
}

export interface GameType {
  id: string;
  name: string;
  code: string;
  multiplier: number; // e.g. 9.5 for Single Ank, 95 for Jodi
  minBid: number;
  maxBid: number;
  enabled: boolean;
  description: string;
}

export interface SliderImage {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Support' | 'Accountant' | 'Market Manager';
  permissions: {
    manageMarkets: boolean;
    declareResults: boolean;
    manageUsers: boolean;
    approveWithdrawals: boolean;
    manageDeposits: boolean;
    viewLedgers: boolean;
    systemSettings: boolean;
  };
  status: 'active' | 'suspended';
  lastActive: string;
}

export interface GeneralSetting {
  siteName: string;
  appTitle: string;
  contactWhatsApp: string;
  contactPhone: string;
  contactEmail: string;
  marqueeNotice: string;
  minDeposit: number;
  maxDeposit: number;
  minWithdraw: number;
  maxWithdraw: number;
  withdrawStartTime: string;
  withdrawEndTime: string;
  maintenanceMode: boolean;
  autoApproveDeposits: boolean;
  primaryUpiId: string;
  secondaryUpiId: string;
  upiHolderName: string;
  qrCodeUrl: string;
  bonusOnRegistration: number;
  bonusOnFirstDepositPercent: number;
}

export interface AppNotification {
  id: string;
  title: string;
  heading: string;
  message: string;
  body: string;
  type: 'broadcast' | string;
  read: boolean;
  target?: 'all' | 'active' | 'specific';
  sentAt?: string;
  createdAt?: any;
}

