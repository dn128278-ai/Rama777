import {
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
  GatewayLinkedDeposit
} from '../types';

export const INITIAL_MARKETS: Market[] = [
  {
    id: 'm-1',
    name: 'MILAN MORNING',
    apiKeyName: 'milan_morning',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '10:15 AM',
    closeTime: '11:15 AM',
    openResultTime: '10:25 AM',
    closeResultTime: '11:25 AM',
    openPana: '248',
    openDigit: '4',
    closeDigit: '7',
    closePana: '368',
    createdAt: '2026-01-10 09:30 AM'
  },
  {
    id: 'm-2',
    name: 'KALYAN MORNING',
    apiKeyName: 'kalyan_morning',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: false,
    previousDayCheck: false,
    openTime: '11:00 AM',
    closeTime: '12:02 PM',
    openResultTime: '11:10 AM',
    closeResultTime: '12:15 PM',
    openPana: '157',
    openDigit: '3',
    closeDigit: '9',
    closePana: '289',
    createdAt: '2026-01-12 10:00 AM'
  },
  {
    id: 'm-3',
    name: 'SRIDEVI',
    apiKeyName: 'sridevi_day',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '11:35 AM',
    closeTime: '12:35 PM',
    openResultTime: '11:45 AM',
    closeResultTime: '12:45 PM',
    openPana: '369',
    openDigit: '8',
    closeDigit: '1',
    closePana: '470',
    createdAt: '2026-01-15 11:00 AM'
  },
  {
    id: 'm-4',
    name: 'TIME BAZAR',
    apiKeyName: 'time_bazar',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: false,
    autoResult: true,
    previousDayCheck: false,
    openTime: '01:00 PM',
    closeTime: '02:00 PM',
    openResultTime: '01:10 PM',
    closeResultTime: '02:10 PM',
    openPana: '123',
    openDigit: '6',
    closeDigit: '5',
    closePana: '500',
    createdAt: '2026-01-08 08:30 AM'
  },
  {
    id: 'm-5',
    name: 'MADHUR DAY',
    apiKeyName: 'madhur_day',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: false,
    previousDayCheck: false,
    openTime: '01:30 PM',
    closeTime: '02:30 PM',
    openResultTime: '01:40 PM',
    closeResultTime: '02:40 PM',
    openPana: '479',
    openDigit: '0',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-16 12:00 PM'
  },
  {
    id: 'm-6',
    name: 'MILAN DAY',
    apiKeyName: 'milan_day',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '03:00 PM',
    closeTime: '05:00 PM',
    openResultTime: '03:10 PM',
    closeResultTime: '05:10 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-18 01:00 PM'
  },
  {
    id: 'm-7',
    name: 'RAJDHANI DAY',
    apiKeyName: 'rajdhani_day',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: false,
    autoResult: false,
    previousDayCheck: false,
    openTime: '03:15 PM',
    closeTime: '05:15 PM',
    openResultTime: '03:25 PM',
    closeResultTime: '05:25 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-14 02:30 PM'
  },
  {
    id: 'm-8',
    name: 'SUPREME DAY',
    apiKeyName: 'supreme_day',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '03:35 PM',
    closeTime: '05:35 PM',
    openResultTime: '03:45 PM',
    closeResultTime: '05:45 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-20 11:15 AM'
  },
  {
    id: 'm-9',
    name: 'KALYAN',
    apiKeyName: 'kalyan',
    isOpenNow: true,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '04:15 PM',
    closeTime: '06:15 PM',
    openResultTime: '04:25 PM',
    closeResultTime: '06:25 PM',
    openPana: '259',
    openDigit: '6',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-05 10:00 AM'
  },
  {
    id: 'm-10',
    name: 'SRIDEVI NIGHT',
    apiKeyName: 'sridevi_night',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '07:00 PM',
    closeTime: '08:00 PM',
    openResultTime: '07:10 PM',
    closeResultTime: '08:10 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-21 04:00 PM'
  },
  {
    id: 'm-11',
    name: 'MADHUR NIGHT',
    apiKeyName: 'madhur_night',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: false,
    previousDayCheck: false,
    openTime: '08:30 PM',
    closeTime: '10:30 PM',
    openResultTime: '08:40 PM',
    closeResultTime: '10:40 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-22 05:00 PM'
  },
  {
    id: 'm-12',
    name: 'MILAN NIGHT',
    apiKeyName: 'milan_night',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '09:00 PM',
    closeTime: '11:00 PM',
    openResultTime: '09:10 PM',
    closeResultTime: '11:10 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-19 06:15 PM'
  },
  {
    id: 'm-13',
    name: 'KALYAN NIGHT',
    apiKeyName: 'kalyan_night',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: true,
    autoResult: true,
    previousDayCheck: false,
    openTime: '09:25 PM',
    closeTime: '11:30 PM',
    openResultTime: '09:35 PM',
    closeResultTime: '11:40 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-11 07:00 PM'
  },
  {
    id: 'm-14',
    name: 'RAJDHANI NIGHT',
    apiKeyName: 'rajdhani_night',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: false,
    autoResult: false,
    previousDayCheck: false,
    openTime: '09:35 PM',
    closeTime: '11:45 PM',
    openResultTime: '09:45 PM',
    closeResultTime: '11:55 PM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-15 07:30 PM'
  },
  {
    id: 'm-15',
    name: 'MAIN BAZAR',
    apiKeyName: 'main_bazar',
    isOpenNow: false,
    isDisabled: false,
    saturdayOpen: true,
    sundayOpen: false,
    autoResult: true,
    previousDayCheck: false,
    openTime: '09:40 PM',
    closeTime: '12:05 AM',
    openResultTime: '09:50 PM',
    closeResultTime: '12:15 AM',
    openPana: '',
    openDigit: '',
    closeDigit: '',
    closePana: '',
    createdAt: '2026-01-10 08:00 PM'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-8921',
    name: 'Rahul Sharma',
    mobile: '9876543210',
    email: 'rahul.s@gmail.com',
    walletBalance: 24500,
    transferWalletBalance: 1500,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-02-14',
    totalDeposited: 65000,
    totalWithdrawn: 42000,
    lastLogin: '2026-10-08 12:45 PM',
    bankDetail: {
      accountHolderName: 'Rahul Sharma',
      bankName: 'State Bank of India',
      accountNumber: '30982245812',
      ifsc: 'SBIN0001423',
      upiId: 'rahul987@okaxis',
      isVerified: true
    }
  },
  {
    id: 'USR-8922',
    name: 'Amit Verma',
    mobile: '9823114567',
    email: 'amit.verma99@yahoo.com',
    walletBalance: 8200,
    transferWalletBalance: 0,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-03-01',
    totalDeposited: 28000,
    totalWithdrawn: 19800,
    lastLogin: '2026-10-08 01:10 PM',
    bankDetail: {
      accountHolderName: 'Amit Verma',
      bankName: 'HDFC Bank',
      accountNumber: '50100234918234',
      ifsc: 'HDFC0000240',
      upiId: 'amitverma@icici',
      isVerified: true
    }
  },
  {
    id: 'USR-8923',
    name: 'Vikram Singh',
    mobile: '9711200481',
    email: 'vikram.singh@outlook.com',
    walletBalance: 51200,
    transferWalletBalance: 5000,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-01-20',
    totalDeposited: 140000,
    totalWithdrawn: 89000,
    lastLogin: '2026-10-08 11:30 AM',
    bankDetail: {
      accountHolderName: 'Vikram Singh',
      bankName: 'Punjab National Bank',
      accountNumber: '19820011002391',
      ifsc: 'PUNB0198200',
      upiId: 'vikram.singh@paytm',
      isVerified: true
    }
  },
  {
    id: 'USR-8924',
    name: 'Suresh Kumar Patel',
    mobile: '9425019823',
    email: 'suresh.patel@gmail.com',
    walletBalance: 1250,
    transferWalletBalance: 0,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-04-18',
    totalDeposited: 12000,
    totalWithdrawn: 10750,
    lastLogin: '2026-10-07 09:15 PM',
    bankDetail: {
      accountHolderName: 'Suresh Kumar Patel',
      bankName: 'Bank of Baroda',
      accountNumber: '08120100098234',
      ifsc: 'BARB0INDORE',
      upiId: 'sureshpatel@ybl',
      isVerified: true
    }
  },
  {
    id: 'USR-8925',
    name: 'Deepak Yadav',
    mobile: '8877665544',
    email: 'deepak.yadav9@gmail.com',
    walletBalance: 0,
    transferWalletBalance: 0,
    status: 'blocked',
    bettingDisabled: true,
    registeredAt: '2026-05-10',
    totalDeposited: 5000,
    totalWithdrawn: 5000,
    lastLogin: '2026-09-12 04:00 PM',
    bankDetail: {
      accountHolderName: 'Deepak Yadav',
      bankName: 'Canara Bank',
      accountNumber: '2981101004812',
      ifsc: 'CNRB0002981',
      upiId: 'deepak99@oksbi',
      isVerified: false
    }
  },
  {
    id: 'USR-8926',
    name: 'Manish Choudhary',
    mobile: '9123456780',
    email: 'manish.ch@rediffmail.com',
    walletBalance: 18700,
    transferWalletBalance: 200,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-06-01',
    totalDeposited: 45000,
    totalWithdrawn: 26500,
    lastLogin: '2026-10-08 02:22 PM',
    bankDetail: {
      accountHolderName: 'Manish Choudhary',
      bankName: 'Kotak Mahindra Bank',
      accountNumber: '981240192',
      ifsc: 'KKBK0000192',
      upiId: 'manishch@kotak',
      isVerified: true
    }
  },
  {
    id: 'USR-8927',
    name: 'Pooja Kashyap',
    mobile: '9988771122',
    email: 'pooja.k@gmail.com',
    walletBalance: 9600,
    transferWalletBalance: 1000,
    status: 'active',
    bettingDisabled: false,
    registeredAt: '2026-07-15',
    totalDeposited: 30000,
    totalWithdrawn: 21400,
    lastLogin: '2026-10-08 10:05 AM',
    bankDetail: {
      accountHolderName: 'Pooja Kashyap',
      bankName: 'Axis Bank',
      accountNumber: '91802004819234',
      ifsc: 'UTIB0000412',
      upiId: 'poojak@axisbank',
      isVerified: true
    }
  }
];

export const INITIAL_DEPOSITS: DepositRequest[] = [
  {
    id: 'DEP-AUTO-501',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    amount: 3000,
    method: 'Kotak UPI',
    utrNumber: '429188204918',
    status: 'auto-approved',
    isAutoApproved: true,
    receiverVpa: '0793748A0296660.bqr@kotak',
    source: 'mobile_app_auto',
    requestedAt: '2026-10-08 02:15 PM',
    processedAt: '2026-10-08 02:15 PM',
    autoApprovedAt: '2026-10-08 02:15 PM'
  },
  {
    id: 'DEP-4019',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    amount: 5000,
    method: 'UPI',
    utrNumber: '428919028341',
    screenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    requestedAt: '2026-10-08 01:45 PM'
  },
  {
    id: 'DEP-4018',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    userMobile: '9711200481',
    amount: 15000,
    method: 'PhonePe',
    utrNumber: '428909182390',
    status: 'pending',
    requestedAt: '2026-10-08 01:20 PM'
  },
  {
    id: 'DEP-4017',
    userId: 'USR-8922',
    userName: 'Amit Verma',
    userMobile: '9823114567',
    amount: 2500,
    method: 'GPay',
    utrNumber: '428901823910',
    status: 'approved',
    requestedAt: '2026-10-08 11:30 AM',
    processedAt: '2026-10-08 11:35 AM'
  },
  {
    id: 'DEP-4016',
    userId: 'USR-8926',
    userName: 'Manish Choudhary',
    userMobile: '9123456780',
    amount: 10000,
    method: 'Paytm',
    utrNumber: '428891028341',
    status: 'approved',
    requestedAt: '2026-10-08 10:15 AM',
    processedAt: '2026-10-08 10:18 AM'
  },
  {
    id: 'DEP-4015',
    userId: 'USR-8924',
    userName: 'Suresh Kumar Patel',
    userMobile: '9425019823',
    amount: 1000,
    method: 'UPI',
    utrNumber: '428877123498',
    status: 'rejected',
    requestedAt: '2026-10-08 09:00 AM',
    processedAt: '2026-10-08 09:10 AM',
    rejectionReason: 'Invalid UTR reference number not matching banking record.'
  }
];

export const INITIAL_WITHDRAWS: WithdrawRequest[] = [
  {
    id: 'WDR-9021',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    userMobile: '9711200481',
    amount: 25000,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'PNB A/C: 19820011002391, IFSC: PUNB0198200',
    bankAccountNumber: '19820011002391',
    ifscCode: 'PUNB0198200',
    status: 'pending',
    requestedAt: '2026-10-08 01:50 PM'
  },
  {
    id: 'WDR-9020',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    amount: 8000,
    paymentMethod: 'UPI',
    accountDetails: 'UPI: rahul987@okaxis',
    upiId: 'rahul987@okaxis',
    status: 'pending',
    requestedAt: '2026-10-08 01:15 PM'
  },
  {
    id: 'WDR-9019',
    userId: 'USR-8922',
    userName: 'Amit Verma',
    userMobile: '9823114567',
    amount: 5000,
    paymentMethod: 'UPI',
    accountDetails: 'UPI: amitverma@icici',
    upiId: 'amitverma@icici',
    status: 'approved',
    utrOrReference: 'IMPS4289001923',
    requestedAt: '2026-10-08 10:45 AM',
    processedAt: '2026-10-08 11:00 AM',
    adminRemark: 'Settled via IMPS payout gateway.'
  },
  {
    id: 'WDR-9018',
    userId: 'USR-8927',
    userName: 'Pooja Kashyap',
    userMobile: '9988771122',
    amount: 12000,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'Axis A/C: 91802004819234, IFSC: UTIB0000412',
    bankAccountNumber: '91802004819234',
    ifscCode: 'UTIB0000412',
    status: 'approved',
    utrOrReference: 'NEFT4288910293',
    requestedAt: '2026-10-08 09:20 AM',
    processedAt: '2026-10-08 09:40 AM',
    adminRemark: 'Successful NEFT dispatch.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-AUTO-9900',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    type: 'auto_deposit',
    amount: 3000,
    balanceBefore: 21500,
    balanceAfter: 24500,
    description: 'Automated UPI Top-up (VPA: 0793748A0296660.bqr@kotak) - Auto-Approved',
    referenceId: 'DEP-AUTO-501',
    createdAt: '2026-10-08 02:15 PM',
    vpa: '0793748A0296660.bqr@kotak',
    isAutoApproved: true
  },
  {
    id: 'TXN-9901',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    type: 'deposit',
    amount: 5000,
    balanceBefore: 19500,
    balanceAfter: 24500,
    description: 'UPI Deposit verified via UTR 428901823910',
    referenceId: 'DEP-4017',
    createdAt: '2026-10-08 11:35 AM'
  },
  {
    id: 'TXN-9902',
    userId: 'USR-8922',
    userName: 'Amit Verma',
    userMobile: '9823114567',
    type: 'withdraw',
    amount: 5000,
    balanceBefore: 13200,
    balanceAfter: 8200,
    description: 'UPI Withdrawal approved to amitverma@icici',
    referenceId: 'WDR-9019',
    createdAt: '2026-10-08 11:00 AM'
  },
  {
    id: 'TXN-9903',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    userMobile: '9711200481',
    type: 'bid_won',
    amount: 28500,
    balanceBefore: 22700,
    balanceAfter: 51200,
    description: 'Won Kalyan Morning Single Ank (Digit 3)',
    referenceId: 'BET-8120',
    createdAt: '2026-10-08 11:15 AM'
  },
  {
    id: 'TXN-9904',
    userId: 'USR-8924',
    userName: 'Suresh Kumar Patel',
    userMobile: '9425019823',
    type: 'bid_placed',
    amount: 500,
    balanceBefore: 1750,
    balanceAfter: 1250,
    description: 'Placed bid on Kalyan Single Ank [Digit 6]',
    referenceId: 'BET-8239',
    createdAt: '2026-10-08 01:25 PM'
  },
  {
    id: 'TXN-9905',
    userId: 'USR-8926',
    userName: 'Manish Choudhary',
    userMobile: '9123456780',
    type: 'admin_credit',
    amount: 2000,
    balanceBefore: 16700,
    balanceAfter: 18700,
    description: 'Manual wallet credit by Admin (Bonus promotion)',
    referenceId: 'MANUAL-001',
    createdAt: '2026-10-08 10:30 AM'
  }
];

export const INITIAL_BETS: BetRecord[] = [
  {
    id: 'BET-8240',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    marketName: 'KALYAN',
    gameType: 'Single Ank',
    session: 'OPEN',
    number: '4',
    amount: 1500,
    winAmount: 14250,
    status: 'PENDING',
    createdAt: '2026-10-08 01:30 PM'
  },
  {
    id: 'BET-8239',
    userId: 'USR-8924',
    userName: 'Suresh Kumar Patel',
    marketName: 'KALYAN',
    gameType: 'Single Ank',
    session: 'OPEN',
    number: '6',
    amount: 500,
    winAmount: 4750,
    status: 'PENDING',
    createdAt: '2026-10-08 01:25 PM'
  },
  {
    id: 'BET-8238',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    marketName: 'KALYAN',
    gameType: 'Jodi',
    session: 'OPEN',
    number: '47',
    amount: 2000,
    winAmount: 190000,
    status: 'PENDING',
    createdAt: '2026-10-08 01:10 PM'
  },
  {
    id: 'BET-8237',
    userId: 'USR-8922',
    userName: 'Amit Verma',
    marketName: 'MILAN MORNING',
    gameType: 'Single Ank',
    session: 'OPEN',
    number: '4',
    amount: 1000,
    winAmount: 9500,
    status: 'WON',
    createdAt: '2026-10-08 10:10 AM'
  },
  {
    id: 'BET-8236',
    userId: 'USR-8927',
    userName: 'Pooja Kashyap',
    marketName: 'MILAN MORNING',
    gameType: 'Single Ank',
    session: 'OPEN',
    number: '9',
    amount: 800,
    winAmount: 0,
    status: 'LOST',
    createdAt: '2026-10-08 10:05 AM'
  }
];

export const INITIAL_STARLINE_MARKETS: StarlineMarket[] = [
  { id: 'stl-1', name: 'STARLINE 10:00 AM', timeSlot: '10:00 AM', openPana: '137', openDigit: '1', isOpenNow: false, isDisabled: false, totalBids: 180, totalAmount: 42000 },
  { id: 'stl-2', name: 'STARLINE 11:00 AM', timeSlot: '11:00 AM', openPana: '249', openDigit: '5', isOpenNow: false, isDisabled: false, totalBids: 240, totalAmount: 58500 },
  { id: 'stl-3', name: 'STARLINE 12:00 PM', timeSlot: '12:00 PM', openPana: '348', openDigit: '5', isOpenNow: false, isDisabled: false, totalBids: 310, totalAmount: 82000 },
  { id: 'stl-4', name: 'STARLINE 01:00 PM', timeSlot: '01:00 PM', openPana: '458', openDigit: '7', isOpenNow: false, isDisabled: false, totalBids: 290, totalAmount: 76000 },
  { id: 'stl-5', name: 'STARLINE 02:00 PM', timeSlot: '02:00 PM', openPana: '', openDigit: '', isOpenNow: true, isDisabled: false, totalBids: 184, totalAmount: 48900 },
  { id: 'stl-6', name: 'STARLINE 03:00 PM', timeSlot: '03:00 PM', openPana: '', openDigit: '', isOpenNow: true, isDisabled: false, totalBids: 92, totalAmount: 24500 },
  { id: 'stl-7', name: 'STARLINE 04:00 PM', timeSlot: '04:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 45, totalAmount: 11000 },
  { id: 'stl-8', name: 'STARLINE 05:00 PM', timeSlot: '05:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 0, totalAmount: 0 },
  { id: 'stl-9', name: 'STARLINE 06:00 PM', timeSlot: '06:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 0, totalAmount: 0 },
  { id: 'stl-10', name: 'STARLINE 07:00 PM', timeSlot: '07:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 0, totalAmount: 0 },
  { id: 'stl-11', name: 'STARLINE 08:00 PM', timeSlot: '08:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 0, totalAmount: 0 },
  { id: 'stl-12', name: 'STARLINE 09:00 PM', timeSlot: '09:00 PM', openPana: '', openDigit: '', isOpenNow: false, isDisabled: false, totalBids: 0, totalAmount: 0 }
];

export const INITIAL_DESAWAR_MARKETS: DesawarMarket[] = [
  { id: 'dsw-1', name: 'FARIDABAD', openTime: '06:00 PM', closeTime: '06:15 PM', resultJodi: '', isOpenNow: true, isDisabled: false, totalBids: 420, totalAmount: 135000 },
  { id: 'dsw-2', name: 'GAZIYABAD', openTime: '08:30 PM', closeTime: '08:45 PM', resultJodi: '', isOpenNow: true, isDisabled: false, totalBids: 310, totalAmount: 98000 },
  { id: 'dsw-3', name: 'GALI', openTime: '11:00 PM', closeTime: '11:20 PM', resultJodi: '', isOpenNow: true, isDisabled: false, totalBids: 512, totalAmount: 182000 },
  { id: 'dsw-4', name: 'DISAWAR', openTime: '05:00 AM', closeTime: '05:15 AM', resultJodi: '84', isOpenNow: false, isDisabled: false, totalBids: 680, totalAmount: 245000 }
];

export const INITIAL_GAME_TYPES: GameType[] = [
  { id: 'gt-1', name: 'Single Ank', code: 'single_ank', multiplier: 9.5, minBid: 10, maxBid: 100000, enabled: true, description: 'Single digit bid from 0 to 9' },
  { id: 'gt-2', name: 'Jodi Digit', code: 'jodi', multiplier: 95.0, minBid: 10, maxBid: 50000, enabled: true, description: 'Two digit pair combination from 00 to 99' },
  { id: 'gt-3', name: 'Single Pana', code: 'single_pana', multiplier: 140.0, minBid: 10, maxBid: 25000, enabled: true, description: 'Three unique ascending digits' },
  { id: 'gt-4', name: 'Double Pana', code: 'double_pana', multiplier: 280.0, minBid: 10, maxBid: 15000, enabled: true, description: 'Two repeating digits in three-digit combo' },
  { id: 'gt-5', name: 'Triple Pana', code: 'triple_pana', multiplier: 700.0, minBid: 10, maxBid: 10000, enabled: true, description: 'Three matching identical digits' },
  { id: 'gt-6', name: 'Half Sangam', code: 'half_sangam', multiplier: 1000.0, minBid: 10, maxBid: 5000, enabled: true, description: 'One Open Pana and Close Ank or Open Ank and Close Pana' },
  { id: 'gt-7', name: 'Full Sangam', code: 'full_sangam', multiplier: 10000.0, minBid: 10, maxBid: 2000, enabled: true, description: 'Exact combination of Open Pana and Close Pana' }
];

export const INITIAL_SLIDERS: SliderImage[] = [
  {
    id: 'sld-1',
    title: 'Welcome Bonus 10% on Every Deposit',
    imageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80',
    targetUrl: '/promotions/welcome',
    displayOrder: 1,
    isActive: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'sld-2',
    title: 'Instant 24x7 Automatic Withdrawals via UPI & IMPS',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    targetUrl: '/withdraw',
    displayOrder: 2,
    isActive: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'sld-3',
    title: 'Highest Gaming Rates - Jodi 1:95 | Single Ank 1:9.5',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    targetUrl: '/rates',
    displayOrder: 3,
    isActive: true,
    createdAt: '2026-01-20'
  }
];

export const INITIAL_SUB_ADMINS: SubAdmin[] = [
  {
    id: 'sa-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.admin@rama77.in',
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
    status: 'active',
    lastActive: '10 mins ago'
  },
  {
    id: 'sa-2',
    name: 'Sunil Malhotra',
    email: 'sunil.finance@rama77.in',
    role: 'Accountant',
    permissions: {
      manageMarkets: false,
      declareResults: false,
      manageUsers: true,
      approveWithdrawals: true,
      manageDeposits: true,
      viewLedgers: true,
      systemSettings: false
    },
    status: 'active',
    lastActive: 'Just now'
  },
  {
    id: 'sa-3',
    name: 'Kavita Joshi',
    email: 'kavita.support@rama77.in',
    role: 'Support',
    permissions: {
      manageMarkets: false,
      declareResults: false,
      manageUsers: true,
      approveWithdrawals: false,
      manageDeposits: true,
      viewLedgers: false,
      systemSettings: false
    },
    status: 'active',
    lastActive: '1 hour ago'
  }
];

export const INITIAL_SETTINGS: GeneralSetting = {
  siteName: 'Rama77',
  appTitle: 'Rama77 Admin Panel',
  contactWhatsApp: '+91 98765 43210',
  contactPhone: '+91 98765 43210',
  contactEmail: 'support@rama77.in',
  marqueeNotice: 'Welcome to Rama77 - India\'s Most Trusted Gaming Platform. 24x7 Fast Deposit & Withdrawal. Play responsibly!',
  minDeposit: 300,
  maxDeposit: 100000,
  minWithdraw: 500,
  maxWithdraw: 50000,
  withdrawStartTime: '10:00 AM',
  withdrawEndTime: '08:00 PM',
  maintenanceMode: false,
  autoApproveDeposits: false,
  primaryUpiId: 'rama77pay@icici',
  secondaryUpiId: 'fastpay77@ybl',
  upiHolderName: 'RAMA77 GAMING ENTERPRISES',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=rama77pay@icici&pn=RAMA77&cu=INR',
  bonusOnRegistration: 50,
  bonusOnFirstDepositPercent: 10
};

export const INITIAL_GATEWAY_CONFIG: PaymentGatewayConfig = {
  activeGateway: 'phonepe',
  mode: 'production',
  autoCreditOnWebhook: true,
  minDeposit: 300,
  maxDeposit: 100000,
  webhookEndpoint: 'https://api.rama77.in/v1/webhook/payment-callback',
  phonepe: {
    enabled: true,
    merchantId: 'M220918239012',
    saltKey: 'e49b8172-8812-4f10-9123-bc990182390a',
    saltIndex: '1',
    upiId: 'rama77pay@ybl',
    webhookUrl: 'https://api.rama77.in/v1/webhook/phonepe'
  },
  paytm: {
    enabled: true,
    mid: 'RAMA77_MID_98234',
    merchantKey: 'a98b76c54d3210ef87654321',
    website: 'DEFAULT',
    industryType: 'Retail',
    webhookUrl: 'https://api.rama77.in/v1/webhook/paytm'
  },
  razorpay: {
    enabled: false,
    keyId: 'rzp_live_9a8b7c6d5e4f3a',
    keySecret: 'sec_live_998877665544332211',
    webhookSecret: 'whsec_rzp_90182390128390'
  },
  manualUpi: {
    enabled: true,
    upiId: 'rama77pay@icici',
    merchantName: 'RAMA77 GAMING ENTERPRISES',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=rama77pay@icici&pn=RAMA77&cu=INR',
    requireScreenshot: true
  }
};

export const INITIAL_WEBHOOK_LOGS: WebhookLog[] = [
  {
    id: 'WHK-8901',
    gateway: 'phonepe',
    event: 'PAYMENT_SUCCESS',
    gatewayTxnId: 'T2610081345129876543210',
    orderId: 'ORD-DEP-4019',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    amount: 5000,
    utr: '428919028341',
    status: 'success',
    httpCode: 200,
    receivedAt: '2026-10-08 01:45 PM',
    payload: {
      success: true,
      code: 'PAYMENT_SUCCESS',
      message: 'Your payment is successful',
      data: {
        merchantId: 'M220918239012',
        merchantTransactionId: 'ORD-DEP-4019',
        transactionId: 'T2610081345129876543210',
        amount: 500000,
        state: 'COMPLETED',
        responseCode: 'SUCCESS',
        paymentInstrument: {
          type: 'UPI',
          utr: '428919028341'
        }
      }
    }
  },
  {
    id: 'WHK-8902',
    gateway: 'paytm',
    event: 'TXN_SUCCESS',
    gatewayTxnId: 'PTM_TXN_981293849182',
    orderId: 'ORD-DEP-4016',
    userId: 'USR-8926',
    userName: 'Manish Choudhary',
    userMobile: '9123456780',
    amount: 10000,
    utr: '428891028341',
    status: 'success',
    httpCode: 200,
    receivedAt: '2026-10-08 10:15 AM',
    payload: {
      MID: 'RAMA77_MID_98234',
      ORDERID: 'ORD-DEP-4016',
      TXNAMOUNT: '10000.00',
      STATUS: 'TXN_SUCCESS',
      RESPCODE: '01',
      RESPMSG: 'Txn Success',
      BANKTXNID: '428891028341',
      GATEWAYNAME: 'WALLET',
      PAYMENTMODE: 'UPI'
    }
  },
  {
    id: 'WHK-8903',
    gateway: 'razorpay',
    event: 'payment.captured',
    gatewayTxnId: 'pay_rzp_9918230912',
    orderId: 'order_rzp_881923',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    userMobile: '9711200481',
    amount: 15000,
    utr: '428909182390',
    status: 'success',
    httpCode: 200,
    receivedAt: '2026-10-08 01:20 PM',
    payload: {
      entity: 'event',
      account_id: 'acc_77live',
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_rzp_9918230912',
            amount: 1500000,
            currency: 'INR',
            status: 'captured',
            order_id: 'order_rzp_881923',
            method: 'upi',
            acquirer_data: { rrn: '428909182390' }
          }
        }
      }
    }
  },
  {
    id: 'WHK-8904',
    gateway: 'phonepe',
    event: 'PAYMENT_PENDING',
    gatewayTxnId: 'T26100809120098124912',
    orderId: 'ORD-DEP-4015',
    userId: 'USR-8924',
    userName: 'Suresh Kumar Patel',
    userMobile: '9425019823',
    amount: 1000,
    utr: '428877123498',
    status: 'failed',
    httpCode: 400,
    receivedAt: '2026-10-08 09:00 AM',
    payload: {
      success: false,
      code: 'PAYMENT_ERROR',
      message: 'Transaction failed at bank UPI switch timeout',
      data: {
        responseCode: 'TIMED_OUT',
        state: 'FAILED'
      }
    }
  }
];

export const INITIAL_GATEWAY_DEPOSITS: GatewayLinkedDeposit[] = [
  {
    id: 'GLD-701',
    depositId: 'DEP-4019',
    gatewayOrderId: 'ORD-DEP-4019',
    gatewayPaymentId: 'T2610081345129876543210',
    gateway: 'PhonePe',
    utr: '428919028341',
    userId: 'USR-8921',
    userName: 'Rahul Sharma',
    userMobile: '9876543210',
    amount: 5000,
    fee: 0,
    netAmount: 5000,
    status: 'credited',
    reconciled: true,
    createdAt: '2026-10-08 01:45 PM',
    settledAt: '2026-10-08 01:45 PM'
  },
  {
    id: 'GLD-702',
    depositId: 'DEP-4018',
    gatewayOrderId: 'order_rzp_881923',
    gatewayPaymentId: 'pay_rzp_9918230912',
    gateway: 'Razorpay',
    utr: '428909182390',
    userId: 'USR-8923',
    userName: 'Vikram Singh',
    userMobile: '9711200481',
    amount: 15000,
    fee: 0,
    netAmount: 15000,
    status: 'credited',
    reconciled: true,
    createdAt: '2026-10-08 01:20 PM',
    settledAt: '2026-10-08 01:21 PM'
  },
  {
    id: 'GLD-703',
    depositId: 'DEP-4017',
    gatewayOrderId: 'ORD-DEP-4017',
    gatewayPaymentId: 'MANUAL_UPI_REF_428901',
    gateway: 'Manual UPI QR',
    utr: '428901823910',
    userId: 'USR-8922',
    userName: 'Amit Verma',
    userMobile: '9823114567',
    amount: 2500,
    fee: 0,
    netAmount: 2500,
    status: 'credited',
    reconciled: true,
    createdAt: '2026-10-08 11:30 AM',
    settledAt: '2026-10-08 11:35 AM'
  },
  {
    id: 'GLD-704',
    depositId: 'DEP-4016',
    gatewayOrderId: 'ORD-DEP-4016',
    gatewayPaymentId: 'PTM_TXN_981293849182',
    gateway: 'Paytm',
    utr: '428891028341',
    userId: 'USR-8926',
    userName: 'Manish Choudhary',
    userMobile: '9123456780',
    amount: 10000,
    fee: 0,
    netAmount: 10000,
    status: 'credited',
    reconciled: true,
    createdAt: '2026-10-08 10:15 AM',
    settledAt: '2026-10-08 10:18 AM'
  },
  {
    id: 'GLD-705',
    depositId: 'DEP-4015',
    gatewayOrderId: 'ORD-DEP-4015',
    gatewayPaymentId: 'T26100809120098124912',
    gateway: 'PhonePe',
    utr: '428877123498',
    userId: 'USR-8924',
    userName: 'Suresh Kumar Patel',
    userMobile: '9425019823',
    amount: 1000,
    fee: 0,
    netAmount: 1000,
    status: 'failed',
    reconciled: false,
    createdAt: '2026-10-08 09:00 AM'
  }
];

// Generates realistic mock bids for Single Ank digits 0 to 9 based on selected market and session
export function getSingleAnkLiveBids(marketName: string, session: 'OPEN' | 'CLOSE'): SingleAnkBidStat[] {
  // Deterministic seed based on market name length
  const seedMultiplier = (marketName.length % 5) + 1;
  const isClose = session === 'CLOSE';

  const baseBids = [
    { digit: 0, count: 48 * seedMultiplier, amount: 18400 * seedMultiplier },
    { digit: 1, count: 62 * seedMultiplier, amount: 24500 * seedMultiplier },
    { digit: 2, count: 35 * seedMultiplier, amount: 14200 * seedMultiplier },
    { digit: 3, count: 94 * seedMultiplier, amount: 48900 * seedMultiplier }, // heavy
    { digit: 4, count: 128 * seedMultiplier, amount: 62400 * seedMultiplier }, // heaviest
    { digit: 5, count: 54 * seedMultiplier, amount: 21300 * seedMultiplier },
    { digit: 6, count: 88 * seedMultiplier, amount: 37800 * seedMultiplier },
    { digit: 7, count: 71 * seedMultiplier, amount: 31200 * seedMultiplier },
    { digit: 8, count: 42 * seedMultiplier, amount: 16900 * seedMultiplier },
    { digit: 9, count: 66 * seedMultiplier, amount: 27500 * seedMultiplier }
  ];

  return baseBids.map(b => {
    const factor = isClose ? 0.75 : 1.0;
    const finalAmount = Math.round(b.amount * factor);
    return {
      digit: b.digit,
      totalBids: Math.round(b.count * factor),
      totalAmount: finalAmount,
      liability: Math.round(finalAmount * 9.5)
    };
  });
}
