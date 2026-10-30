/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { MarketsView } from './components/markets/MarketsView';
import { MarketChartsView } from './components/markets/MarketChartsView';
import { MarketRecordsView } from './components/markets/MarketRecordsView';
import { MarketResultsView } from './components/markets/MarketResultsView';
import { MarketPredictionView } from './components/markets/MarketPredictionView';
import { MarketWinHistoryView } from './components/markets/MarketWinHistoryView';
import { MarketDataView } from './components/markets/MarketDataView';
import { StarlineMarketsView } from './components/markets/StarlineMarketsView';
import { DesawarMarketsView } from './components/markets/DesawarMarketsView';
import { UsersView } from './components/users/UsersView';
import { WithdrawDetailsView } from './components/users/WithdrawDetailsView';
import { DepositHistoryView } from './components/finance/DepositHistoryView';
import { WithdrawHistoryView } from './components/finance/WithdrawHistoryView';
import { TransactionsView } from './components/finance/TransactionsView';
import { ProfitsView } from './components/finance/ProfitsView';
import { GameTypesView } from './components/game-types/GameTypesView';
import { SliderImagesView } from './components/content/SliderImagesView';
import { GiftsView } from './components/content/GiftsView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { GeneralSettingsView } from './components/settings/GeneralSettingsView';
import { PaymentGatewayView } from './components/settings/PaymentGatewayView';
import { FirebaseSyncView } from './components/settings/FirebaseSyncView';
import { SubAdminsView } from './components/settings/SubAdminsView';
import { ChangePasswordView } from './components/settings/ChangePasswordView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'firebase-sync':
        return <FirebaseSyncView />;
      case 'slider-images':
        return <SliderImagesView />;
      case 'profits':
        return <ProfitsView />;
      case 'users':
        return <UsersView />;
      case 'withdraw-details':
        return <WithdrawDetailsView />;
      case 'general-setting':
        return <GeneralSettingsView />;
      case 'payment-gateway':
        return <PaymentGatewayView />;
      case 'gifts':
        return <GiftsView />;
      case 'markets':
        return <MarketsView />;
      case 'market-charts':
        return <MarketChartsView />;
      case 'market-records':
        return <MarketRecordsView />;
      case 'market-results':
        return <MarketResultsView />;
      case 'market-prediction':
        return <MarketPredictionView />;
      case 'market-win-history':
        return <MarketWinHistoryView />;
      case 'market-data':
        return <MarketDataView />;
      case 'starline-markets':
        return <StarlineMarketsView />;
      case 'desawar-markets':
        return <DesawarMarketsView />;
      case 'game-types':
        return <GameTypesView />;
      case 'transactions':
        return <TransactionsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'sub-admins':
        return <SubAdminsView />;
      case 'withdraw-history':
        return <WithdrawHistoryView />;
      case 'deposit-history':
        return <DepositHistoryView />;
      case 'change-password':
        return <ChangePasswordView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100 font-sans">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        {/* Top Header */}
        <Header />

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-800 dark:text-white animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
