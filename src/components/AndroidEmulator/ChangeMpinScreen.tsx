import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface ChangeMpinScreenProps {
  onBack: () => void;
  darkMode: boolean;
}

export const ChangeMpinScreen: React.FC<ChangeMpinScreenProps> = ({ onBack, darkMode }) => {
  const [oldMpin, setOldMpin] = useState(['', '', '', '']);
  const [newMpin, setNewMpin] = useState(['', '', '', '']);
  const [confirmMpin, setConfirmMpin] = useState(['', '', '', '']);

  const renderBoxes = (
    values: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>,
    prefix: string
  ) => {
    return (
      <div className="flex justify-center gap-3 my-2">
        {values.map((v, i) => (
          <input
            key={i}
            id={`${prefix}-${i}`}
            type="password"
            maxLength={1}
            inputMode="numeric"
            value={v}
            onChange={(e) => {
              const val = e.target.value.slice(-1);
              const next = [...values];
              next[i] = val;
              setValues(next);
              if (val && i < 3) {
                document.getElementById(`${prefix}-${i + 1}`)?.focus();
              }
            }}
            className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:border-[#F16521] focus:ring-1 focus:ring-orange-300 focus:outline-none shadow-xs"
          />
        ))}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('MPIN successfully updated!');
    onBack();
  };

  return (
    <div
      className={`h-full flex flex-col ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      <div className="bg-[#F16521] px-4 py-3 text-white flex items-center gap-3 shadow-xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="font-bold text-base">Change MPIN</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6 text-center">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">
              Enter Old MPIN
            </label>
            {renderBoxes(oldMpin, setOldMpin, 'old')}
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">
              Enter New MPIN
            </label>
            {renderBoxes(newMpin, setNewMpin, 'new')}
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">
              Confirm MPIN
            </label>
            {renderBoxes(confirmMpin, setConfirmMpin, 'confirm')}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-zinc-400 hover:bg-[#F16521] text-white font-bold rounded-xl shadow-md transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
