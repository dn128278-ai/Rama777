import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Clock,
  BookOpen,
  Home,
  Wallet,
  Headphones,
  RotateCcw,
} from 'lucide-react';
import { ScreenType, BottomTab, MarketItem } from '../../types';
import { USER_PROFILE } from '../../data/mockData';
import { DrawerMenu } from './DrawerMenu';
import { MpinLoginScreen } from './MpinLoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { HomeScreen } from './HomeScreen';
import { HistoryScreen } from './HistoryScreen';
import { PassbookScreen } from './PassbookScreen';
import { FundsScreen } from './FundsScreen';
import { SupportScreen } from './SupportScreen';
import { ChartsScreen } from './ChartsScreen';
import { GameRatesScreen } from './GameRatesScreen';
import { ChangeMpinScreen } from './ChangeMpinScreen';
import { SettingsScreen } from './SettingsScreen';
import { ShareSheet } from './EmulatorModals';

interface PhoneFrameProps {
  currentScreen?: ScreenType;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = () => {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [bottomTab, setBottomTab] = useState<BottomTab>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeBidMarket, setActiveBidMarket] = useState<MarketItem | null>(null);

  // Switch tab
  const handleTabClick = (tab: BottomTab) => {
    setBottomTab(tab);
    setScreen(tab);
  };

  const handleNavigate = (newScreen: ScreenType) => {
    setScreen(newScreen);
    if (['history', 'passbook', 'home', 'funds', 'support'].includes(newScreen)) {
      setBottomTab(newScreen as BottomTab);
    }
  };

  const resetToLogin = () => {
    setScreen('login');
    setBottomTab('home');
  };

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[780px] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-zinc-800 flex flex-col select-none overflow-hidden">
      {/* Screen Container with Fullscreen View */}
      <div
        className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col ${
          darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
        }`}
      >
        {/* Global Toolbar (Visible when logged in and not on sub-activity screens) */}
        {screen !== 'login' &&
          screen !== 'register' &&
          !['charts', 'chart_detail', 'settings', 'game_rates', 'change_mpin'].includes(
            screen
          ) && (
            <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-zinc-200/80 shadow-xs z-20">
              {/* Drawer Toggle */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-700 cursor-pointer"
                title="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo in toolbar matching Video 00:08 */}
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleNavigate('home')}
              >
                <div className="w-6 h-6 bg-[#F16521] rounded-md flex items-center justify-center text-white font-black text-xs">
                  R
                </div>
                <span className="text-[#F16521] font-black text-base tracking-tight">
                  RAMA77
                </span>
              </div>

              {/* Wallet Chip & Bell Notification */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate('funds')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-orange-50 border border-zinc-200 text-xs font-bold text-zinc-800 cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5 text-zinc-500" />
                  <span>₹{USER_PROFILE.balance}</span>
                </button>

                <button
                  onClick={() => handleNavigate('settings')}
                  className="p-1 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-hidden relative">
          {screen === 'login' && (
            <MpinLoginScreen
              onLoginSuccess={() => handleNavigate('home')}
              onNavigateToRegister={() => handleNavigate('register')}
              darkMode={darkMode}
            />
          )}

          {screen === 'register' && (
            <RegisterScreen
              onBackToLogin={() => handleNavigate('login')}
              onRegisterSuccess={(phone) => {
                USER_PROFILE.phone = phone;
                handleNavigate('home');
              }}
              darkMode={darkMode}
            />
          )}

          {screen === 'home' && (
            <HomeScreen
              onSelectMarket={(market) => {
                setActiveBidMarket(market);
              }}
              darkMode={darkMode}
            />
          )}

          {screen === 'history' && <HistoryScreen darkMode={darkMode} />}

          {screen === 'passbook' && <PassbookScreen darkMode={darkMode} />}

          {screen === 'funds' && <FundsScreen darkMode={darkMode} />}

          {screen === 'support' && <SupportScreen darkMode={darkMode} />}

          {screen === 'charts' && (
            <ChartsScreen
              onBack={() => handleNavigate('home')}
              darkMode={darkMode}
            />
          )}

          {screen === 'game_rates' && (
            <GameRatesScreen
              onBack={() => handleNavigate('home')}
              darkMode={darkMode}
            />
          )}

          {screen === 'change_mpin' && (
            <ChangeMpinScreen
              onBack={() => handleNavigate('home')}
              darkMode={darkMode}
            />
          )}

          {screen === 'settings' && (
            <SettingsScreen
              onBack={() => handleNavigate('home')}
              darkMode={darkMode}
            />
          )}
        </div>

        {/* Bottom Navigation Bar (5 tabs matching Video: History, Passbook, Home, Funds, Support) */}
        {screen !== 'login' &&
          screen !== 'register' &&
          !['charts', 'chart_detail', 'settings', 'game_rates', 'change_mpin'].includes(
            screen
          ) && (
            <div className="h-16 bg-white border-t border-zinc-200/80 px-2 flex items-center justify-around z-30 shadow-lg">
              {/* History */}
              <button
                onClick={() => handleTabClick('history')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
                  bottomTab === 'history' ? 'text-[#F16521]' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Clock className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-0.5">History</span>
              </button>

              {/* Passbook */}
              <button
                onClick={() => handleTabClick('passbook')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
                  bottomTab === 'passbook' ? 'text-[#F16521]' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-0.5">Passbook</span>
              </button>

              {/* Home */}
              <button
                onClick={() => handleTabClick('home')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
                  bottomTab === 'home' ? 'text-[#F16521]' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Home className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-0.5">Home</span>
              </button>

              {/* Funds */}
              <button
                onClick={() => handleTabClick('funds')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
                  bottomTab === 'funds' ? 'text-[#F16521]' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Wallet className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-0.5">Funds</span>
              </button>

              {/* Support */}
              <button
                onClick={() => handleTabClick('support')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
                  bottomTab === 'support' ? 'text-[#F16521]' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Headphones className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-0.5">Support</span>
              </button>
            </div>
          )}

        {/* Android Bottom Home Gesture Pill Indicator */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-zinc-400 rounded-full z-40 pointer-events-none" />

        {/* Side Drawer Component */}
        <DrawerMenu
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onShareApp={() => setShowShareModal(true)}
        />

        {/* Share Sheet */}
        <ShareSheet
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
        />

        {/* Bid Placement Modal */}
        {activeBidMarket && (
          <div className="absolute inset-0 z-50 flex items-end bg-black/60">
            <div className="w-full bg-white rounded-t-3xl p-5 text-zinc-900 animate-in slide-in-from-bottom duration-200">
              <div className="w-12 h-1 bg-zinc-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base text-zinc-900">
                  {activeBidMarket.name} - Place Bid
                </h4>
                <button
                  onClick={() => setActiveBidMarket(null)}
                  className="text-xs text-zinc-400 font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs text-zinc-500 mb-3">
                Timing: Open {activeBidMarket.openTime} | Close {activeBidMarket.closeTime}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4 text-xs font-bold text-zinc-800">
                {['Single Digit', 'Jodi Digit', 'Single Pana', 'Double Pana', 'Triple Pana', 'Half Sangam'].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => {
                        alert(`Selected ${type} for ${activeBidMarket.name}`);
                        setActiveBidMarket(null);
                      }}
                      className="p-2.5 rounded-xl border border-zinc-200 hover:border-orange-500 hover:bg-orange-50 text-center"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* External Emulator Controls Float Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 whitespace-nowrap text-xs text-zinc-400">
        <button
          onClick={resetToLogin}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart App Session</span>
        </button>
      </div>
    </div>
  );
};
