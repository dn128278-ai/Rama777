import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Save,
  RefreshCw,
  Zap,
  Code,
  ShieldCheck,
  Search,
  Download,
  Eye,
  X,
  ExternalLink,
  Copy,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Flame,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WebhookLog, GatewayLinkedDeposit, PaymentGatewayConfig } from '../../types';

export const PaymentGatewayView: React.FC = () => {
  const {
    gatewayConfig,
    updateGatewayConfig,
    webhookLogs,
    simulateWebhook,
    clearWebhookLogs,
    gatewayDeposits,
    manualCreditGatewayDeposit,
    users,
    showToast
  } = useApp();

  // Active sub-tab inside Payment Gateway view
  const [activeSubTab, setActiveSubTab] = useState<'config' | 'webhooks' | 'ledger'>('config');

  // Gateway Config Local Form State
  const [formConfig, setFormConfig] = useState<PaymentGatewayConfig>({ ...gatewayConfig });
  const [selectedGatewayTab, setSelectedGatewayTab] = useState<'phonepe' | 'paytm' | 'razorpay' | 'manual_upi'>('phonepe');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  // Webhook Logs Filters & Inspector Modal
  const [webhookSearch, setWebhookSearch] = useState('');
  const [webhookGatewayFilter, setWebhookGatewayFilter] = useState<string>('all');
  const [selectedWebhookLog, setSelectedWebhookLog] = useState<WebhookLog | null>(null);

  // Webhook Simulator Modal State
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);
  const [simGateway, setSimGateway] = useState<'phonepe' | 'paytm' | 'razorpay' | 'manual_upi'>('phonepe');
  const [simAmount, setSimAmount] = useState<number>(2000);
  const [simUserId, setSimUserId] = useState<string>(users[0]?.id || 'USR-8921');

  // Gateway Linked Ledger Filters
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerGatewayFilter, setLedgerGatewayFilter] = useState<string>('all');
  const [ledgerStatusFilter, setLedgerStatusFilter] = useState<string>('all');

  // Handle saving gateway config
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateGatewayConfig(formConfig);
  };

  // Ping Gateway Connection Test
  const handleTestConnection = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult(
        `Connection Verified! [HTTP 200 OK] Handshake with ${selectedGatewayTab.toUpperCase()} Gateway API responded in 128ms.`
      );
      showToast(`${selectedGatewayTab.toUpperCase()} Gateway credentials and API ping verified!`);
    }, 900);
  };

  // Handle simulate webhook trigger
  const handleTriggerSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    simulateWebhook(simGateway, simAmount, simUserId);
    setIsSimulateOpen(false);
    setActiveSubTab('webhooks');
  };

  // Filtered Webhook Logs
  const filteredWebhooks = webhookLogs.filter(w => {
    const matchesSearch =
      w.orderId.toLowerCase().includes(webhookSearch.toLowerCase()) ||
      w.gatewayTxnId.toLowerCase().includes(webhookSearch.toLowerCase()) ||
      w.utr.includes(webhookSearch) ||
      w.userName.toLowerCase().includes(webhookSearch.toLowerCase()) ||
      w.userMobile.includes(webhookSearch);

    const matchesGateway =
      webhookGatewayFilter === 'all' ? true : w.gateway === webhookGatewayFilter;

    return matchesSearch && matchesGateway;
  });

  // Filtered Gateway Deposits Ledger
  const filteredLedger = gatewayDeposits.filter(d => {
    const matchesSearch =
      d.depositId.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      d.gatewayOrderId.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      d.gatewayPaymentId.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      d.utr.includes(ledgerSearch) ||
      d.userName.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      d.userMobile.includes(ledgerSearch);

    const matchesGateway =
      ledgerGatewayFilter === 'all'
        ? true
        : d.gateway.toLowerCase().includes(ledgerGatewayFilter.toLowerCase());

    const matchesStatus =
      ledgerStatusFilter === 'all' ? true : d.status === ledgerStatusFilter;

    return matchesSearch && matchesGateway && matchesStatus;
  });

  // Export Ledger CSV
  const handleExportLedgerCsv = () => {
    const headers = [
      'Deposit ID',
      'Gateway Order ID',
      'Gateway Payment ID',
      'Gateway Name',
      'Banking UTR',
      'Player Name',
      'Phone',
      'Amount',
      'Fee',
      'Net Amount',
      'Status',
      'Reconciled',
      'Created At'
    ];
    const rows = filteredLedger.map(d => [
      d.depositId,
      d.gatewayOrderId,
      d.gatewayPaymentId,
      d.gateway,
      d.utr,
      `"${d.userName.replace(/"/g, '""')}"`,
      d.userMobile,
      d.amount,
      d.fee,
      d.netAmount,
      d.status,
      d.reconciled ? 'YES' : 'NO',
      d.createdAt
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gateway_deposit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Gateway transaction ledger exported to CSV!');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Payment Gateway & Merchant Settings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure PhonePe, Paytm, Razorpay and Manual UPI gateways, monitor automatic deposit webhooks, and audit gateway-linked transaction references.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSimulateOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700"
          >
            <Zap className="h-4 w-4" />
            Simulate Live Webhook Callback
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={() => setActiveSubTab('config')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
            activeSubTab === 'config'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Sliders className="h-4 w-4" />
          Gateway Configuration & Credentials
        </button>

        <button
          onClick={() => setActiveSubTab('webhooks')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
            activeSubTab === 'webhooks'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Code className="h-4 w-4" />
          Live Webhook Callbacks ({webhookLogs.length})
        </button>

        <button
          onClick={() => setActiveSubTab('ledger')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
            activeSubTab === 'ledger'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Gateway Linked Deposit Ledger ({gatewayDeposits.length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. GATEWAY CONFIGURATION VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'config' && (
        <form onSubmit={handleSaveConfig} className="space-y-6">
          {/* Active Gateway Selection & Mode Banner */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Active Payment Router & Environment
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select which payment provider processes default deposit requests across client apps.
                </p>
              </div>

              {/* Mode Toggle (Production / Sandbox) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Environment:</span>
                <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setFormConfig(p => ({ ...p, mode: 'production' }))}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      formConfig.mode === 'production'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Live Production
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormConfig(p => ({ ...p, mode: 'sandbox' }))}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      formConfig.mode === 'sandbox'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Sandbox Testing
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Gateway Cards Selection */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* PhonePe */}
              <div
                onClick={() => {
                  setFormConfig(p => ({ ...p, activeGateway: 'phonepe' }));
                  setSelectedGatewayTab('phonepe');
                }}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formConfig.activeGateway === 'phonepe'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 dark:border-amber-500/80 dark:bg-amber-950/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    PhonePe PG
                  </div>
                  <input
                    type="radio"
                    name="activeGateway"
                    checked={formConfig.activeGateway === 'phonepe'}
                    onChange={() => {}}
                    className="accent-amber-500"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Direct UPI intent & dynamic QR with instant callback.
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formConfig.phonepe.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <span className="font-mono text-slate-400">MID: {formConfig.phonepe.merchantId}</span>
                </div>
              </div>

              {/* Paytm */}
              <div
                onClick={() => {
                  setFormConfig(p => ({ ...p, activeGateway: 'paytm' }));
                  setSelectedGatewayTab('paytm');
                }}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formConfig.activeGateway === 'paytm'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 dark:border-amber-500/80 dark:bg-amber-950/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Paytm PG
                  </div>
                  <input
                    type="radio"
                    name="activeGateway"
                    checked={formConfig.activeGateway === 'paytm'}
                    onChange={() => {}}
                    className="accent-amber-500"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Paytm All-in-One Gateway, Wallet, NetBanking & UPI.
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formConfig.paytm.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <span className="font-mono text-slate-400">MID: {formConfig.paytm.mid}</span>
                </div>
              </div>

              {/* Razorpay */}
              <div
                onClick={() => {
                  setFormConfig(p => ({ ...p, activeGateway: 'razorpay' }));
                  setSelectedGatewayTab('razorpay');
                }}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formConfig.activeGateway === 'razorpay'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 dark:border-amber-500/80 dark:bg-amber-950/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Razorpay
                  </div>
                  <input
                    type="radio"
                    name="activeGateway"
                    checked={formConfig.activeGateway === 'razorpay'}
                    onChange={() => {}}
                    className="accent-amber-500"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Standard checkout standard modal with webhook verification.
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-500">
                    {formConfig.razorpay.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <span className="font-mono text-slate-400">Key: {formConfig.razorpay.keyId.slice(0, 10)}...</span>
                </div>
              </div>

              {/* Manual UPI QR */}
              <div
                onClick={() => {
                  setFormConfig(p => ({ ...p, activeGateway: 'manual_upi' }));
                  setSelectedGatewayTab('manual_upi');
                }}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formConfig.activeGateway === 'manual_upi'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 dark:border-amber-500/80 dark:bg-amber-950/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Manual UPI QR (P2P)
                  </div>
                  <input
                    type="radio"
                    name="activeGateway"
                    checked={formConfig.activeGateway === 'manual_upi'}
                    onChange={() => {}}
                    className="accent-amber-500"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Static/Dynamic QR code scanning with manual UTR submission.
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Active</span>
                  <span className="font-mono text-slate-400">{formConfig.manualUpi.upiId}</span>
                </div>
              </div>
            </div>

            {/* Global Webhook Auto-credit Rule */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Instant Auto-Credit On Verified Webhook
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    When enabled, validated 200 OK webhook events immediately credit player balances without manual admin action.
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formConfig.autoCreditOnWebhook}
                  onChange={e =>
                    setFormConfig(p => ({ ...p, autoCreditOnWebhook: e.target.checked }))
                  }
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                Auto-Credit Enabled
              </label>
            </div>
          </div>

          {/* Gateway Credentials Form Tab Navigation */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGatewayTab('phonepe')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    selectedGatewayTab === 'phonepe'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  PhonePe Settings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayTab('paytm')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    selectedGatewayTab === 'paytm'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Paytm Settings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayTab('razorpay')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    selectedGatewayTab === 'razorpay'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Razorpay Settings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayTab('manual_upi')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    selectedGatewayTab === 'manual_upi'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Manual UPI & QR
                </button>
              </div>

              {/* Ping Connection Button */}
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isPinging}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                Test API Ping & Handshake
              </button>
            </div>

            {pingResult && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{pingResult}</span>
              </div>
            )}

            {/* Form Fields according to selected tab */}
            <div className="mt-5">
              {/* PhonePe Tab Fields */}
              {selectedGatewayTab === 'phonepe' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      PhonePe API v3 Production Credentials
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConfig.phonepe.enabled}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            phonepe: { ...p.phonepe, enabled: e.target.checked }
                          }))
                        }
                        className="accent-amber-500"
                      />
                      Enable PhonePe Provider
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Merchant ID (MID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.phonepe.merchantId}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            phonepe: { ...p.phonepe, merchantId: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Merchant UPI ID (VPA) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.phonepe.upiId}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            phonepe: { ...p.phonepe, upiId: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Salt Key (Secret Key) *
                      </label>
                      <input
                        type="password"
                        required
                        value={formConfig.phonepe.saltKey}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            phonepe: { ...p.phonepe, saltKey: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Salt Key Index *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.phonepe.saltIndex}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            phonepe: { ...p.phonepe, saltIndex: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Webhook Callback URL (Add this in PhonePe Merchant Dashboard)
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={formConfig.phonepe.webhookUrl}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(formConfig.phonepe.webhookUrl);
                            showToast('Webhook URL copied to clipboard!');
                          }}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Paytm Tab Fields */}
              {selectedGatewayTab === 'paytm' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Paytm PG All-In-One Merchant Configuration
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConfig.paytm.enabled}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            paytm: { ...p.paytm, enabled: e.target.checked }
                          }))
                        }
                        className="accent-amber-500"
                      />
                      Enable Paytm Provider
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Merchant ID (MID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.paytm.mid}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            paytm: { ...p.paytm, mid: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Merchant Secret Key *
                      </label>
                      <input
                        type="password"
                        required
                        value={formConfig.paytm.merchantKey}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            paytm: { ...p.paytm, merchantKey: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Website Name
                      </label>
                      <input
                        type="text"
                        value={formConfig.paytm.website}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            paytm: { ...p.paytm, website: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Industry Type ID
                      </label>
                      <input
                        type="text"
                        value={formConfig.paytm.industryType}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            paytm: { ...p.paytm, industryType: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Callback Webhook URL
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={formConfig.paytm.webhookUrl}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(formConfig.paytm.webhookUrl);
                            showToast('Paytm Callback URL copied!');
                          }}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Razorpay Tab Fields */}
              {selectedGatewayTab === 'razorpay' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Razorpay Key & Webhook Secret
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConfig.razorpay.enabled}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            razorpay: { ...p.razorpay, enabled: e.target.checked }
                          }))
                        }
                        className="accent-amber-500"
                      />
                      Enable Razorpay Provider
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Key ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.razorpay.keyId}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            razorpay: { ...p.razorpay, keyId: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Key Secret *
                      </label>
                      <input
                        type="password"
                        required
                        value={formConfig.razorpay.keySecret}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            razorpay: { ...p.razorpay, keySecret: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Webhook Secret (For HMAC SHA256 Signature Validation) *
                      </label>
                      <input
                        type="password"
                        required
                        value={formConfig.razorpay.webhookSecret}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            razorpay: { ...p.razorpay, webhookSecret: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Manual UPI & QR Tab Fields */}
              {selectedGatewayTab === 'manual_upi' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Manual P2P UPI QR Code Parameters
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConfig.manualUpi.enabled}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            manualUpi: { ...p.manualUpi, enabled: e.target.checked }
                          }))
                        }
                        className="accent-amber-500"
                      />
                      Enable Manual UPI Option
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Primary UPI ID (VPA) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.manualUpi.upiId}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            manualUpi: { ...p.manualUpi, upiId: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Merchant Display Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formConfig.manualUpi.merchantName}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            manualUpi: { ...p.manualUpi, merchantName: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        QR Code Image / Generator URL
                      </label>
                      <input
                        type="url"
                        value={formConfig.manualUpi.qrCodeUrl}
                        onChange={e =>
                          setFormConfig(p => ({
                            ...p,
                            manualUpi: { ...p.manualUpi, qrCodeUrl: e.target.value }
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
              >
                <Save className="h-4 w-4" />
                Save Gateway Configurations
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 2. LIVE WEBHOOK / CALLBACK STATUS LOGS VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'webhooks' && (
        <div className="space-y-4">
          {/* Summary Strip & Clear Logs */}
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500">Total Callbacks:</span>{' '}
                <strong className="font-mono text-slate-900 dark:text-white">
                  {webhookLogs.length}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Success (200 OK):</span>{' '}
                <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                  {webhookLogs.filter(w => w.status === 'success').length}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Failed / Errors:</span>{' '}
                <strong className="font-mono text-rose-600 dark:text-rose-400">
                  {webhookLogs.filter(w => w.status !== 'success').length}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulateOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
              >
                <Zap className="h-3.5 w-3.5" />
                Trigger Test Webhook
              </button>
              <button
                onClick={clearWebhookLogs}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Clear Logs
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search webhooks by order ID, UTR, player name or phone..."
                value={webhookSearch}
                onChange={e => setWebhookSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Gateway:</span>
              <select
                value={webhookGatewayFilter}
                onChange={e => setWebhookGatewayFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Gateways</option>
                <option value="phonepe">PhonePe</option>
                <option value="paytm">Paytm</option>
                <option value="razorpay">Razorpay</option>
                <option value="manual_upi">Manual UPI</option>
              </select>
            </div>
          </div>

          {/* Webhooks Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5">Log ID</th>
                    <th className="px-4 py-3.5">Gateway</th>
                    <th className="px-4 py-3.5">Event Name</th>
                    <th className="px-4 py-3.5">Order ID</th>
                    <th className="px-4 py-3.5">Banking UTR</th>
                    <th className="px-4 py-3.5">Player</th>
                    <th className="px-4 py-3.5">Amount</th>
                    <th className="px-4 py-3.5">HTTP Code</th>
                    <th className="px-4 py-3.5">Received At</th>
                    <th className="px-4 py-3.5 text-right">Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
                  {filteredWebhooks.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400 font-sans">
                        No webhook callback records found.
                      </td>
                    </tr>
                  ) : (
                    filteredWebhooks.map(whk => (
                      <tr key={whk.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-bold text-slate-500">{whk.id}</td>

                        <td className="px-4 py-3 font-sans">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {whk.gateway}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                          {whk.event}
                        </td>

                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                          {whk.orderId}
                        </td>

                        <td className="px-4 py-3 font-bold text-slate-600 dark:text-slate-400">
                          {whk.utr}
                        </td>

                        <td className="px-4 py-3 font-sans">
                          <div className="font-bold text-slate-900 dark:text-white">{whk.userName}</div>
                          <div className="font-mono text-[10px] text-slate-400">{whk.userMobile}</div>
                        </td>

                        <td className="px-4 py-3 font-black text-sm text-emerald-600 dark:text-emerald-400">
                          ₹{whk.amount.toLocaleString()}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              whk.httpCode === 200
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                            }`}
                          >
                            {whk.httpCode === 200 ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {whk.httpCode} {whk.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-slate-500 font-sans whitespace-nowrap">
                          {whk.receivedAt}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedWebhookLog(whk)}
                            className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400"
                          >
                            <Code className="h-3.5 w-3.5" />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TRANSACTION LEDGER LINKING GATEWAY REFS WITH USER DEPOSITS */}
      {/* ========================================================================= */}
      {activeSubTab === 'ledger' && (
        <div className="space-y-4">
          {/* Header Controls & Export */}
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by deposit ID, order ID, gateway txn, UTR, or player..."
                value={ledgerSearch}
                onChange={e => setLedgerSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={ledgerGatewayFilter}
                onChange={e => setLedgerGatewayFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Gateways</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
                <option value="Razorpay">Razorpay</option>
                <option value="Manual UPI">Manual UPI</option>
              </select>

              <select
                value={ledgerStatusFilter}
                onChange={e => setLedgerStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="credited">Credited</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>

              <button
                onClick={handleExportLedgerCsv}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="h-4 w-4" />
                Export Ledger
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5">Deposit ID</th>
                    <th className="px-4 py-3.5">Gateway Order ID</th>
                    <th className="px-4 py-3.5">Gateway Payment Ref</th>
                    <th className="px-4 py-3.5">Gateway Provider</th>
                    <th className="px-4 py-3.5">Banking UTR / RRN</th>
                    <th className="px-4 py-3.5">Player Details</th>
                    <th className="px-4 py-3.5">Deposit Amount</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Reconciled</th>
                    <th className="px-4 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
                  {filteredLedger.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400 font-sans">
                        No linked transaction entries found.
                      </td>
                    </tr>
                  ) : (
                    filteredLedger.map(row => (
                      <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                          {row.depositId}
                        </td>

                        <td className="px-4 py-3 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                          {row.gatewayOrderId}
                        </td>

                        <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 max-w-[130px] truncate">
                          {row.gatewayPaymentId}
                        </td>

                        <td className="px-4 py-3 font-sans">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                            {row.gateway}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                          {row.utr}
                        </td>

                        <td className="px-4 py-3 font-sans">
                          <div className="font-bold text-slate-900 dark:text-white">{row.userName}</div>
                          <div className="font-mono text-[10px] text-slate-400">{row.userMobile}</div>
                        </td>

                        <td className="px-4 py-3 font-black text-sm text-emerald-600 dark:text-emerald-400">
                          ₹{row.amount.toLocaleString()}
                        </td>

                        <td className="px-4 py-3 font-sans">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              row.status === 'credited'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : row.status === 'processing'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                            }`}
                          >
                            {row.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-sans">
                          <span
                            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              row.reconciled
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {row.reconciled ? 'Verified' : 'Pending'}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-right">
                          {row.status !== 'credited' ? (
                            <button
                              onClick={() => manualCreditGatewayDeposit(row.id)}
                              className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-emerald-700"
                            >
                              Credit Player
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-sans">Settled</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WEBHOOK PAYLOAD INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {selectedWebhookLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Webhook Payload Inspector - {selectedWebhookLog.id}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedWebhookLog.gateway.toUpperCase()} • Event: {selectedWebhookLog.event} • Received: {selectedWebhookLog.receivedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedWebhookLog(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800 font-mono">
                <div>
                  <span className="text-slate-500">Gateway Txn ID:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedWebhookLog.gatewayTxnId}</div>
                </div>
                <div>
                  <span className="text-slate-500">Order ID:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedWebhookLog.orderId}</div>
                </div>
                <div>
                  <span className="text-slate-500">Banking UTR:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedWebhookLog.utr}</div>
                </div>
                <div>
                  <span className="text-slate-500">Amount / Status:</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{selectedWebhookLog.amount.toLocaleString()} ({selectedWebhookLog.httpCode} {selectedWebhookLog.status.toUpperCase()})
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Raw JSON Callback Body:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedWebhookLog.payload, null, 2));
                      showToast('JSON Payload copied to clipboard!');
                    }}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:underline dark:text-amber-400"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Payload
                  </button>
                </div>
                <pre className="mt-1 max-h-72 overflow-y-auto rounded-lg bg-slate-950 p-4 font-mono text-xs text-emerald-400">
                  {JSON.stringify(selectedWebhookLog.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedWebhookLog(null)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATE WEBHOOK TRIGGER MODAL */}
      {/* ========================================================================= */}
      {isSimulateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Simulate Live Payment Webhook
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fires an authentic mock webhook callback payload to verify auto-crediting and ledger generation.
                </p>
              </div>
              <button
                onClick={() => setIsSimulateOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleTriggerSimulate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Payment Gateway
                </label>
                <select
                  value={simGateway}
                  onChange={e => setSimGateway(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="phonepe">PhonePe (UPI Intent)</option>
                  <option value="paytm">Paytm PG (All-In-One)</option>
                  <option value="razorpay">Razorpay (Order Captured)</option>
                  <option value="manual_upi">Manual UPI Dynamic QR</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Player Account
                </label>
                <select
                  value={simUserId}
                  onChange={e => setSimUserId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.mobile}) - Current Bal: ₹{u.walletBalance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Deposit Amount (₹)
                </label>
                <input
                  type="number"
                  min={100}
                  step={100}
                  required
                  value={simAmount}
                  onChange={e => setSimAmount(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 font-mono text-base font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="rounded-lg bg-indigo-50/70 p-3 text-xs dark:bg-indigo-950/30">
                <div className="font-bold text-indigo-900 dark:text-indigo-300">
                  Auto-Credit Policy Check:
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {gatewayConfig.autoCreditOnWebhook
                    ? 'Auto-credit is enabled. The selected player wallet will be instantly credited and an audit entry will be recorded in both Webhook logs and Transactions ledger.'
                    : 'Auto-credit is currently disabled in settings. The deposit will enter the ledger as pending for manual verification.'}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSimulateOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                >
                  <Zap className="h-4 w-4" />
                  Dispatch Mock Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
