import React, { useState } from 'react';
import { Phone, Info, Play, MessageCircle } from 'lucide-react';
import { INITIAL_MARKETS } from '../../data/mockData';
import { MarketItem } from '../../types';

interface HomeScreenProps {
  onSelectMarket: (market: MarketItem) => void;
  darkMode: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectMarket,
  darkMode,
}) => {
  const [activeCategory, setActiveCategory] = useState<'starline' | 'jackpot' | null>(null);
  const [markets] = useState<MarketItem[]>(INITIAL_MARKETS);

  return (
    <div
      className={`h-full overflow-y-auto pb-20 ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      {/* Running Limit Ticker matching video 00:09 */}
      <div className="bg-[#FFEADB] text-[#C2410C] text-xs font-semibold py-2 px-3 text-center overflow-hidden border-b border-orange-200">
        <span className="inline-block animate-pulse">
          Current minimum deposit limit Rs. 300
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Quick Contact: Call Now & Whatsapp */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:6377972674"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white rounded-xl shadow-xs border border-zinc-200/80 hover:bg-orange-50 font-bold text-xs text-zinc-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#F16521]" />
            <span>Call Now</span>
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=916377972674&text=Hello%20Rama77%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white rounded-xl shadow-xs border border-zinc-200/80 hover:bg-green-50 font-bold text-xs text-zinc-700 transition-colors"
          >
            <span className="text-base text-green-600">💬</span>
            <span>Whatsapp</span>
          </a>
        </div>

        {/* Category Tabs: Bombay Starline & Bombay Jackpot */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveCategory(activeCategory === 'starline' ? null : 'starline')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              activeCategory === 'starline'
                ? 'bg-[#F16521] text-white shadow-orange-300'
                : 'bg-gradient-to-r from-[#F16521] to-[#E05410] text-white hover:opacity-95'
            }`}
          >
            Bombay Starline
          </button>

          <button
            onClick={() => setActiveCategory(activeCategory === 'jackpot' ? null : 'jackpot')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              activeCategory === 'jackpot'
                ? 'bg-[#F16521] text-white shadow-orange-300'
                : 'bg-gradient-to-r from-[#F16521] to-[#E05410] text-white hover:opacity-95'
            }`}
          >
            Bombay Jackpot
          </button>
        </div>

        {/* Active Category Notification */}
        {activeCategory && (
          <div className="bg-orange-100 text-orange-900 text-xs px-3 py-2 rounded-lg flex items-center justify-between">
            <span>Viewing {activeCategory === 'starline' ? 'Bombay Starline' : 'Bombay Jackpot'} results</span>
            <button
              onClick={() => setActiveCategory(null)}
              className="text-orange-950 font-bold hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Market Cards List matching video 00:09 - 00:11 */}
        <div className="space-y-3 pt-1">
          {markets.map((market) => {
            const isClosed = market.status === 'Closed for Today';
            return (
              <div
                key={market.id}
                className={`rounded-2xl p-4 shadow-sm border transition-shadow ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-800'
                    : 'bg-white border-zinc-200/60 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Market Title and Info Icon */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm tracking-wide text-[#F16521]">
                        {market.name}
                      </h4>
                      <button
                        onClick={() =>
                          alert(
                            `${market.name}\nOpen: ${market.openTime}\nClose: ${market.closeTime}\nStatus: ${market.status}`
                          )
                        }
                        className="text-orange-400 hover:text-orange-600 p-0.5"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Result Pana Numbers (268-60-145) */}
                    <p className="font-extrabold text-base text-zinc-900 tracking-wider mt-1">
                      {market.openPana}-{market.jodi}-{market.closePana}
                    </p>

                    {/* Timings */}
                    <div className="mt-2 text-[11px] text-zinc-500 space-y-0.5 font-medium">
                      <p>Open Bids: {market.openTime}</p>
                      <p>Close Bids: {market.closeTime}</p>
                    </div>
                  </div>

                  {/* Play Button & Status */}
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => onSelectMarket(market)}
                      className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition-transform active:scale-95 ${
                        isClosed
                          ? 'bg-zinc-300 text-zinc-600 hover:bg-zinc-400'
                          : 'bg-[#F16521] text-white hover:bg-[#E05410]'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </button>

                    <span
                      className={`text-[11px] font-bold mt-3 ${
                        isClosed ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {market.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
