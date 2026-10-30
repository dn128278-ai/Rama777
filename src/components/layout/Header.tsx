import React, { useState, useEffect } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Bell,
  RefreshCw,
  Clock,
  ShieldCheck,
  ChevronDown,
  User,
  Key,
  LogOut,
  X,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    isDark,
    toggleTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    notifications,
    resetAllData,
    setActiveTab
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 font-black text-white shadow-sm shadow-amber-500/30">
            77
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white">
              RAMA<span className="text-amber-500">77</span>
            </span>
            <span className="ml-2 hidden rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 sm:inline-block">
              Admin Panel
            </span>
          </div>
        </div>
      </div>

      {/* Center: Live Real-Time IST Clock & Status */}
      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Server Live
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono-numbers text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          {currentTime || '05:30:00 PM IST'}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Download Android Fix ZIP Button */}

        {/* Download Android Fix ZIP Button */}
        <a
          href="/item_funds_menu_fix.zip"
          download="item_funds_menu_fix.zip"
          title="Download item_funds_menu.xml & fragment_funds.xml Fixed ZIP for GitHub Actions"
          className="flex items-center gap-1.5 rounded-lg border border-amber-300/80 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 hover:text-amber-900 dark:border-amber-600/40 dark:bg-amber-950/40 dark:text-amber-300"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Android Fix ZIP</span>
        </a>

        {/* Reset Demo Data Button */}
        <button
          onClick={resetAllData}
          title="Reset sample data"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifDropdown(prev => !prev);
              setShowProfileDropdown(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Bell className="h-4 w-4" />
            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800 dark:ring-white/10 sm:w-96">
              <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  Recent Alerts ({notifications.length})
                </span>
                <button
                  onClick={() => setShowNotifDropdown(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className="rounded-lg bg-slate-50 p-2.5 text-xs transition hover:bg-slate-100 dark:bg-slate-750 dark:bg-slate-900/60 dark:hover:bg-slate-700"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-slate-400">{notif.sentAt}</span>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{notif.message}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowNotifDropdown(false);
                  setActiveTab('notifications');
                }}
                className="mt-2 block w-full rounded-lg bg-amber-500/10 py-1.5 text-center text-xs font-bold text-amber-600 transition hover:bg-amber-500/20 dark:text-amber-400"
              >
                View All Broadcasts →
              </button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(prev => !prev);
              setShowNotifDropdown(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 p-1.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 sm:px-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 font-bold text-white text-xs dark:bg-slate-700">
              AD
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Master Admin</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Super Access</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800 dark:ring-white/10">
              <div className="border-b border-slate-100 px-4 py-2 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Super Administrator</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">admin@rama77.in</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  setActiveTab('general-setting');
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                System Settings
              </button>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  setActiveTab('change-password');
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Key className="h-4 w-4 text-slate-400" />
                Change Password
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  alert('Session secured. Active Super Admin status maintained.');
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut className="h-4 w-4" />
                Lock Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
