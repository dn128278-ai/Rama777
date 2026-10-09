import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  darkMode: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, darkMode }) => {
  const [settings, setSettings] = useState({
    rama77Results: true,
    starlineResults: true,
    jackpotResults: true,
    winningNotifications: true,
    generalNotifications: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items: { key: keyof typeof settings; label: string }[] = [
    { key: 'rama77Results', label: 'RAMA77 Result Notifications' },
    { key: 'starlineResults', label: 'Starline Result Notifications' },
    { key: 'jackpotResults', label: 'Jackpot Result Notifications' },
    { key: 'winningNotifications', label: 'Winning Notifications' },
    { key: 'generalNotifications', label: 'General Notifications' },
  ];

  return (
    <div
      className={`h-full flex flex-col ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      <div className="bg-[#F16521] px-4 py-3 text-white flex items-center gap-3 shadow-xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="font-bold text-base">Settings</h3>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs divide-y divide-zinc-100 overflow-hidden">
          {items.map((item) => {
            const isChecked = settings[item.key];
            return (
              <div
                key={item.key}
                className="p-4 flex items-center justify-between hover:bg-orange-50/30 transition-colors"
              >
                <span className="font-bold text-xs text-zinc-800">
                  {item.label}
                </span>

                {/* Orange Toggle Switch matching Video 01:37 */}
                <button
                  onClick={() => toggle(item.key)}
                  className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    isChecked ? 'bg-[#F16521]' : 'bg-zinc-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                      isChecked ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
