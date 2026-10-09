import React, { useState } from 'react';
import {
  Smartphone,
  Code2,
  FileText,
  Download,
  Columns,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PhoneFrame } from './components/AndroidEmulator/PhoneFrame';
import { CodeExplorer } from './components/CodeExplorer/CodeExplorer';
import { AnalysisReport } from './components/AnalysisDoc/AnalysisReport';
import { downloadAndroidStudioZip } from './utils/projectZipGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'split' | 'emulator' | 'code' | 'analysis'>('split');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      await downloadAndroidStudioZip();
    } catch (e) {
      console.error(e);
      alert('Failed to generate ZIP archive.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F16521] to-[#E05410] flex items-center justify-center text-white font-black text-xl shadow-md">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                RAMA77
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-950 text-orange-400 border border-orange-500/30">
                Android Studio Suite v2.0
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Full UI/UX Analysis, Interactive Mobile Emulator &amp; Android Studio XML/Kotlin Generator
            </p>
          </div>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950/80 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'split'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split View</span>
          </button>

          <button
            onClick={() => setActiveTab('emulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'emulator'
                ? 'bg-[#F16521] text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Emulator</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#F16521] text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code (XML/Kotlin)</span>
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-[#F16521] text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Analysis</span>
          </button>
        </div>

        {/* 1-Click Android Studio ZIP Download */}
        <button
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F16521] to-[#D84B06] hover:from-[#e05410] hover:to-[#c44307] text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Downloading...' : 'Download Project ZIP'}</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-3 sm:p-6 max-w-[1680px] w-full mx-auto">
        {activeTab === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 5 Cols: Live Interactive Android Emulator */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
              <div className="w-full mb-3 flex items-center justify-between px-2 text-xs text-zinc-400">
                <span className="font-bold flex items-center gap-1.5 text-orange-400">
                  <Smartphone className="w-4 h-4" />
                  Live Android Emulator
                </span>
                <span>Touch/Click to Navigate</span>
              </div>
              <PhoneFrame />
            </div>

            {/* Right 7 Cols: Code Explorer & Analysis */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <div className="h-[780px]">
                <CodeExplorer />
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
                <AnalysisReport />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emulator' && (
          <div className="max-w-md mx-auto py-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white">Interactive RAMA77 Android Prototype</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Video recording ke mutabiq tamam screens: Login, Home, History, Passbook, Funds, Support, Charts
              </p>
            </div>
            <PhoneFrame />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-[840px] max-w-6xl mx-auto">
            <CodeExplorer />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="max-w-4xl mx-auto">
            <AnalysisReport />
          </div>
        )}
      </main>

      {/* Bottom Sticky Helper Banner */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-3 px-6 text-center text-xs text-zinc-500 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span>Target Platform: Android Studio (Ladybug / Hedgehog / Iguana)</span>
          <span className="mx-2">·</span>
          <span>Kotlin 1.9+</span>
          <span className="mx-2">·</span>
          <span>Material Design 3</span>
        </div>
        <button
          onClick={handleDownloadZip}
          className="text-orange-400 font-semibold hover:underline cursor-pointer"
        >
          Download Android Studio Project (.ZIP) ➔
        </button>
      </footer>
    </div>
  );
}
