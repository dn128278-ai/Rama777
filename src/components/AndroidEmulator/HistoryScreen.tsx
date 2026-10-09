import React, { useState } from 'react';
import { History, ChevronRight, Filter, ArrowLeft, FolderX, FileText } from 'lucide-react';

interface HistoryScreenProps {
  darkMode: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState('All');

  const historyCategories = [
    { id: 'game_bid', title: 'Game Bid History', icon: History },
    { id: 'starline_bid', title: 'Starline Bid History', icon: History },
    { id: 'jackpot_bid', title: 'Jackpot Bid History', icon: History },
    { id: 'game_result', title: 'Game Result History', icon: FileText },
    { id: 'starline_result', title: 'Starline Result History', icon: FileText },
    { id: 'jackpot_result', title: 'Jackpot Result History', icon: FileText },
  ];

  if (selectedCategory) {
    const activeItem = historyCategories.find((c) => c.id === selectedCategory);
    return (
      <div
        className={`h-full flex flex-col ${
          darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
        }`}
      >
        {/* Detail Header with Orange Filter Button (Video 00:14) */}
        <div className="bg-white px-4 py-3 border-b border-zinc-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-sm text-zinc-800">{activeItem?.title}</h3>
          </div>

          <button
            onClick={() =>
              alert(`Filter applied for ${activeItem?.title}. Select date range.`)
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F16521] text-white rounded-full text-xs font-bold shadow-xs hover:bg-[#e05410]"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Empty State matching video 00:15 */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-orange-100/60 rounded-full flex items-center justify-center mb-4">
            <FolderX className="w-12 h-12 text-[#F16521]" />
          </div>
          <h4 className="font-black text-lg text-zinc-900">No Data Found</h4>
          <p className="text-zinc-500 text-xs mt-1 max-w-xs">
            There is no data to show you right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full overflow-y-auto p-4 space-y-3 pb-20 ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      <div className="space-y-3">
        {historyCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border shadow-xs transition-all active:scale-[0.99] text-left ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800/80'
                  : 'bg-white border-zinc-200/60 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F16521] to-[#E05410] flex items-center justify-center text-white shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-zinc-800">{cat.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
