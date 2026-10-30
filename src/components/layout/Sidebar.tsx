import React, { useState } from 'react';
import {
  LayoutDashboard,
  Image,
  TrendingUp,
  Users,
  CreditCard,
  Settings,
  Gift,
  Building2,
  BarChart3,
  BookOpen,
  Trophy,
  Sparkles,
  Award,
  Database,
  Zap,
  Flame,
  Dices,
  ArrowLeftRight,
  BellRing,
  ShieldCheck,
  ArrowDownCircle,
  ArrowUpCircle,
  KeyRound,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    deposits,
    withdraws
  } = useApp();

  // Collapsible dropdown states for submenus
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    users: true,
    appData: true,
    markets: true
  });

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pendingDepositsCount = deposits.filter(d => d.status === 'pending').length;
  const pendingWithdrawsCount = withdraws.filter(w => w.status === 'pending').length;

  const isCurrentTab = (tab: ActiveTab) => activeTab === tab;

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  // Reusable Nav Content to avoid duplication
  const renderNavItems = (isCompact: boolean) => (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      {/* 1. Dashboard */}
      <button
        onClick={() => handleTabClick('dashboard')}
        title="Dashboard"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('dashboard')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <LayoutDashboard className="h-4 w-4 shrink-0" />
        {!isCompact && <span>Dashboard</span>}
      </button>

      {/* 2. Slider Images */}
      <button
        onClick={() => handleTabClick('slider-images')}
        title="Slider Images"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('slider-images')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <Image className="h-4 w-4 shrink-0" />
        {!isCompact && <span>Slider Images</span>}
      </button>

      {/* 3. Profits */}
      <button
        onClick={() => handleTabClick('profits')}
        title="Profits"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('profits')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <TrendingUp className="h-4 w-4 shrink-0 text-emerald-500" />
        {!isCompact && <span>Profits</span>}
      </button>

      {/* 4. Users (Submenu: Users, Withdraw Details) */}
      {!isCompact ? (
        <div>
          <button
            onClick={() => toggleSubmenu('users')}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 shrink-0 text-sky-500" />
              <span>Users</span>
            </div>
            {openSubmenus.users ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
          {openSubmenus.users && (
            <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-2 dark:border-slate-800">
              <button
                onClick={() => handleTabClick('users')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('users')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Users List</span>
              </button>
              <button
                onClick={() => handleTabClick('withdraw-details')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('withdraw-details')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>Withdraw Details</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => handleTabClick('users')}
          title="Users"
          className={`flex w-full items-center justify-center rounded-lg p-2.5 text-xs font-semibold transition ${
            isCurrentTab('users') || isCurrentTab('withdraw-details')
              ? 'bg-amber-500 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
        </button>
      )}

      {/* 5. App Data (Submenu: General Setting) */}
      {!isCompact ? (
        <div>
          <button
            onClick={() => toggleSubmenu('appData')}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 shrink-0 text-indigo-500" />
              <span>App Data</span>
            </div>
            {openSubmenus.appData ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
          {openSubmenus.appData && (
            <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-2 dark:border-slate-800">
              <button
                onClick={() => handleTabClick('general-setting')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('general-setting')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                <span>General Setting</span>
              </button>
              <button
                onClick={() => handleTabClick('payment-gateway')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('payment-gateway')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5 text-amber-500" />
                <span>Payment Gateway</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => handleTabClick('general-setting')}
          title="App Data"
          className={`flex w-full items-center justify-center rounded-lg p-2.5 text-xs font-semibold transition ${
            isCurrentTab('general-setting') || isCurrentTab('payment-gateway')
              ? 'bg-amber-500 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="h-4 w-4" />
        </button>
      )}

      {/* 6. Gifts */}
      <button
        onClick={() => handleTabClick('gifts')}
        title="Gifts"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('gifts')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <Gift className="h-4 w-4 shrink-0 text-pink-500" />
        {!isCompact && <span>Gifts</span>}
      </button>

      {/* 7. Markets (Submenu: Markets, Charts, Records, Results, Prediction, Win History, Data) */}
      {!isCompact ? (
        <div>
          <button
            onClick={() => toggleSubmenu('markets')}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 shrink-0 text-amber-500" />
              <span>Markets</span>
            </div>
            {openSubmenus.markets ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
          {openSubmenus.markets && (
            <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-2 dark:border-slate-800">
              <button
                onClick={() => handleTabClick('markets')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('markets')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Markets List</span>
              </button>
              <button
                onClick={() => handleTabClick('market-charts')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-charts')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Charts</span>
              </button>
              <button
                onClick={() => handleTabClick('market-records')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-records')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Records</span>
              </button>
              <button
                onClick={() => handleTabClick('market-results')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-results')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Trophy className="h-3.5 w-3.5" />
                <span>Results</span>
              </button>
              <button
                onClick={() => handleTabClick('market-prediction')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-prediction')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Prediction</span>
              </button>
              <button
                onClick={() => handleTabClick('market-win-history')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-win-history')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>Win History</span>
              </button>
              <button
                onClick={() => handleTabClick('market-data')}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                  isCurrentTab('market-data')
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                <span>Data</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => handleTabClick('markets')}
          title="Markets"
          className={`flex w-full items-center justify-center rounded-lg p-2.5 text-xs font-semibold transition ${
            activeTab.startsWith('market')
              ? 'bg-amber-500 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" />
        </button>
      )}

      {/* 8. Start Line Markets */}
      <button
        onClick={() => handleTabClick('starline-markets')}
        title="Start Line Markets"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('starline-markets')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <Zap className="h-4 w-4 shrink-0 text-yellow-500" />
        {!isCompact && <span>Start Line Markets</span>}
      </button>

      {/* 9. Desawar Markets */}
      <button
        onClick={() => handleTabClick('desawar-markets')}
        title="Desawar Markets"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('desawar-markets')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <Flame className="h-4 w-4 shrink-0 text-red-500" />
        {!isCompact && <span>Desawar Markets</span>}
      </button>

      {/* 10. Game Types */}
      <button
        onClick={() => handleTabClick('game-types')}
        title="Game Types"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('game-types')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <Dices className="h-4 w-4 shrink-0 text-purple-500" />
        {!isCompact && <span>Game Types</span>}
      </button>

      {/* 11. Transactions */}
      <button
        onClick={() => handleTabClick('transactions')}
        title="Transactions"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('transactions')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <ArrowLeftRight className="h-4 w-4 shrink-0 text-blue-500" />
        {!isCompact && <span>Transactions</span>}
      </button>

      {/* 12. Notifications */}
      <button
        onClick={() => handleTabClick('notifications')}
        title="Notifications"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('notifications')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <BellRing className="h-4 w-4 shrink-0 text-teal-500" />
        {!isCompact && <span>Notifications</span>}
      </button>

      {/* 13. Sub Admins */}
      <button
        onClick={() => handleTabClick('sub-admins')}
        title="Sub Admins"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('sub-admins')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
        {!isCompact && <span>Sub Admins</span>}
      </button>

      {/* 14. Withdraw History */}
      <button
        onClick={() => handleTabClick('withdraw-history')}
        title="Withdraw History"
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('withdraw-history')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <ArrowDownCircle className="h-4 w-4 shrink-0 text-rose-500" />
          {!isCompact && <span>Withdraw History</span>}
        </div>
        {!isCompact && pendingWithdrawsCount > 0 && (
          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
            {pendingWithdrawsCount}
          </span>
        )}
      </button>

      {/* 15. Deposit History */}
      <button
        onClick={() => handleTabClick('deposit-history')}
        title="Deposit History"
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('deposit-history')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <ArrowUpCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          {!isCompact && <span>Deposit History</span>}
        </div>
        {!isCompact && pendingDepositsCount > 0 && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {pendingDepositsCount}
          </span>
        )}
      </button>

      {/* 16. Change Password */}
      <button
        onClick={() => handleTabClick('change-password')}
        title="Change Password"
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
          isCurrentTab('change-password')
            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`}
      >
        <KeyRound className="h-4 w-4 shrink-0 text-amber-500" />
        {!isCompact && <span>Change Password</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* ---------------- 1. DESKTOP PERMANENT SIDEBAR (>= 1024px lg breakpoint) ---------------- */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 sticky top-0 h-screen border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand & Desktop Collapse Button Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800 shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 font-black text-white shadow-md shadow-amber-500/20">
                77
              </div>
              <div>
                <div className="text-sm font-black leading-tight text-slate-900 dark:text-white">
                  RAMA<span className="text-amber-500">77</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Admin Panel
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 font-black text-white">
              77
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Scrollable Navigation List */}
        {renderNavItems(sidebarCollapsed)}

        {/* Desktop Footer */}
        {!sidebarCollapsed && (
          <div className="border-t border-slate-200 p-3 text-center dark:border-slate-800 shrink-0">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Rama77 v4.8 Enterprise
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              Secure WebSocket Connected
            </div>
          </div>
        )}
      </aside>

      {/* ---------------- 2. MOBILE / TABLET OFF-CANVAS DRAWER (< 1024px) ---------------- */}
      {/* Dimmed Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Title and Close Button */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 font-black text-white shadow-md shadow-amber-500/20">
              77
            </div>
            <div>
              <div className="text-sm font-black leading-tight text-slate-900 dark:text-white">
                RAMA<span className="text-amber-500">77</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Admin Panel
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Full Navigation List */}
        {renderNavItems(false)}

        {/* Drawer Footer */}
        <div className="border-t border-slate-200 p-3 text-center dark:border-slate-800 shrink-0">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Rama77 v4.8 Enterprise
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500">
            Secure WebSocket Connected
          </div>
        </div>
      </aside>
    </>
  );
};
