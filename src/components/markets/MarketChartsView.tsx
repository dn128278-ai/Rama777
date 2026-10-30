import React, { useState } from 'react';
import { BarChart3, Calendar, Download, Eye, Table } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketChartsView: React.FC = () => {
  const { markets } = useApp();
  const [selectedMarket, setSelectedMarket] = useState(markets[0]?.name || 'KALYAN');
  const [chartType, setChartType] = useState<'panel' | 'jodi'>('panel');

  // Realistic historical panel/jodi chart records for last 5 weeks
  const mockChartWeeks = [
    {
      weekRange: '01/09/2026 to 07/09/2026',
      days: [
        { day: 'Mon', openPana: '137', jodi: '14', closePana: '455' },
        { day: 'Tue', openPana: '248', jodi: '47', closePana: '368' },
        { day: 'Wed', openPana: '129', jodi: '29', closePana: '469' },
        { day: 'Thu', openPana: '360', jodi: '91', closePana: '579' },
        { day: 'Fri', openPana: '147', jodi: '22', closePana: '480' },
        { day: 'Sat', openPana: '358', jodi: '68', closePana: '279' }
      ]
    },
    {
      weekRange: '08/09/2026 to 14/09/2026',
      days: [
        { day: 'Mon', openPana: '235', jodi: '03', closePana: '670' },
        { day: 'Tue', openPana: '159', jodi: '58', closePana: '189' },
        { day: 'Wed', openPana: '489', jodi: '15', closePana: '249' },
        { day: 'Thu', openPana: '118', jodi: '07', closePana: '368' },
        { day: 'Fri', openPana: '269', jodi: '74', closePana: '455' },
        { day: 'Sat', openPana: '349', jodi: '61', closePana: '290' }
      ]
    },
    {
      weekRange: '15/09/2026 to 21/09/2026',
      days: [
        { day: 'Mon', openPana: '169', jodi: '62', closePana: '480' },
        { day: 'Tue', openPana: '359', jodi: '73', closePana: '139' },
        { day: 'Wed', openPana: '258', jodi: '55', closePana: '500' },
        { day: 'Thu', openPana: '179', jodi: '70', closePana: '280' },
        { day: 'Fri', openPana: '389', jodi: '09', closePana: '450' },
        { day: 'Sat', openPana: '128', jodi: '18', closePana: '170' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Market Charts (Panel & Jodi)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official historical charts ledger for Kalyan, Milan, Rajdhani, and other bazaars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Exporting ${selectedMarket} ${chartType.toUpperCase()} chart data as PDF/CSV.`)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export Chart
          </button>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Market:
          </label>
          <select
            value={selectedMarket}
            onChange={e => setSelectedMarket(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {markets.map(m => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex rounded-lg border border-slate-200 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => setChartType('panel')}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              chartType === 'panel'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Panel Chart (Full Pana)
          </button>
          <button
            onClick={() => setChartType('jodi')}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              chartType === 'jodi'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Jodi Chart (2-Digit)
          </button>
        </div>
      </div>

      {/* Chart Visual Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {selectedMarket} {chartType.toUpperCase()} RECORD TABLE
          </h2>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Updated Daily
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-xs">
            <thead>
              <tr className="bg-slate-100 font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">Date Range</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">MON</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">TUE</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">WED</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">THU</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">FRI</th>
                <th className="border border-slate-200 p-2.5 dark:border-slate-700">SAT</th>
              </tr>
            </thead>
            <tbody>
              {mockChartWeeks.map((week, wIdx) => (
                <tr key={wIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="border border-slate-200 p-2 font-mono-numbers font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400 whitespace-nowrap">
                    {week.weekRange}
                  </td>
                  {week.days.map((dayItem, dIdx) => (
                    <td
                      key={dIdx}
                      className="border border-slate-200 p-2 font-mono-numbers dark:border-slate-700"
                    >
                      {chartType === 'panel' ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{dayItem.openPana}</span>
                          <span className="my-0.5 text-xs font-black text-amber-600 dark:text-amber-400">
                            {dayItem.jodi}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{dayItem.closePana}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          {dayItem.jodi}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
