import React, { useState } from 'react';
import { BookOpen, Calendar, Search, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketRecordsView: React.FC = () => {
  const { markets } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-10-08');
  const [searchTerm, setSearchTerm] = useState('');

  const mockPastRecords = [
    { id: 'REC-101', market: 'MILAN MORNING', date: '2026-10-08', openPana: '248', jodi: '47', closePana: '368', declaredAt: '11:25 AM' },
    { id: 'REC-102', market: 'KALYAN MORNING', date: '2026-10-08', openPana: '157', jodi: '39', closePana: '289', declaredAt: '12:15 PM' },
    { id: 'REC-103', market: 'SRIDEVI', date: '2026-10-08', openPana: '369', jodi: '81', closePana: '470', declaredAt: '12:45 PM' },
    { id: 'REC-104', market: 'TIME BAZAR', date: '2026-10-08', openPana: '123', jodi: '65', closePana: '500', declaredAt: '02:10 PM' },
    { id: 'REC-105', market: 'MADHUR DAY', date: '2026-10-07', openPana: '479', jodi: '02', closePana: '147', declaredAt: '02:40 PM' },
    { id: 'REC-106', market: 'MILAN DAY', date: '2026-10-07', openPana: '138', jodi: '24', closePana: '347', declaredAt: '05:10 PM' },
    { id: 'REC-107', market: 'KALYAN', date: '2026-10-07', openPana: '259', jodi: '67', closePana: '179', declaredAt: '06:25 PM' },
    { id: 'REC-108', market: 'RAJDHANI NIGHT', date: '2026-10-07', openPana: '348', jodi: '59', closePana: '469', declaredAt: '11:55 PM' },
    { id: 'REC-109', market: 'MAIN BAZAR', date: '2026-10-07', openPana: '267', jodi: '58', closePana: '369', declaredAt: '12:15 AM' }
  ];

  const filtered = mockPastRecords.filter(r =>
    r.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Historical Market Records
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Archived results log across all previous dates and bazaar sessions.
          </p>
        </div>
        <button
          onClick={() => alert('Exporting past records archive...')}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Download Archive
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search market name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Record ID</th>
                <th className="px-4 py-3.5">Market Name</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Open Pana</th>
                <th className="px-4 py-3.5">Jodi Result</th>
                <th className="px-4 py-3.5">Close Pana</th>
                <th className="px-4 py-3.5">Full Outcome</th>
                <th className="px-4 py-3.5">Declared At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-numbers">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-slate-500">{r.id}</td>
                  <td className="px-4 py-3 font-extrabold text-slate-900 dark:text-white font-sans">{r.market}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.date}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{r.openPana}</td>
                  <td className="px-4 py-3 font-extrabold text-amber-600 dark:text-amber-400">{r.jodi}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{r.closePana}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                    {r.openPana}-{r.jodi}-{r.closePana}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-sans">{r.declaredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
