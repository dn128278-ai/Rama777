import React, { useState } from 'react';
import { PASSBOOK_DATA } from '../../data/mockData';
import { TransactionRecord } from '../../types';

interface PassbookScreenProps {
  darkMode: boolean;
}

export const PassbookScreen: React.FC<PassbookScreenProps> = ({ darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions] = useState<TransactionRecord[]>(PASSBOOK_DATA);

  return (
    <div
      className={`h-full flex flex-col ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      {/* Table Header Row (Orange Bar matching video 00:26) */}
      <div className="bg-[#F16521] text-white text-xs font-bold px-4 py-3 flex items-center justify-between shadow-xs">
        <span className="w-1/2">Description</span>
        <span className="w-1/3 text-center">Transaction Amount</span>
        <span className="w-1/6 text-right">Balance</span>
      </div>

      {/* Transaction Records List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 pb-20">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`p-3.5 rounded-xl border shadow-xs transition-colors ${
              darkMode
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-white border-zinc-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              {/* Description */}
              <div className="flex-1">
                <h5 className="font-bold text-xs text-zinc-900 leading-tight">
                  {tx.type} | ₹{tx.amount} | {tx.orderId}
                </h5>
                <p className="text-[11px] text-zinc-500 mt-1">
                  {tx.type} | {tx.amount} | {tx.orderId}
                </p>
              </div>

              {/* Transaction Amount Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-md text-xs font-bold">
                  +₹{tx.amount}
                </span>

                {/* Balance */}
                <span className="font-extrabold text-xs text-zinc-800 w-8 text-right">
                  ₹{tx.previousBalance}
                </span>
              </div>
            </div>

            {/* Date and Prev Balance Footer */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-medium">
              <span>{tx.date} {tx.time}</span>
              <span>Previous Balance: ₹{tx.previousBalance}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer matching video 00:26 */}
      <div className="bg-white border-t border-zinc-200 px-4 py-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-4 py-1.5 rounded-lg bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          Previous
        </button>

        <span className="w-8 h-8 rounded-lg bg-[#F16521] text-white font-bold text-xs flex items-center justify-center shadow-xs">
          {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-1.5 rounded-lg bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
