import React, { useState } from 'react';
import { Fingerprint } from 'lucide-react';

interface MpinLoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  darkMode: boolean;
}

export const MpinLoginScreen: React.FC<MpinLoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  darkMode,
}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricScanning, setBiometricScanning] = useState(false);

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newPin = [...pin];
    newPin[index] = val ? val.slice(-1) : '';
    setPin(newPin);

    // Auto advance
    if (val && index < 3) {
      const nextInput = document.getElementById(`mpin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`mpin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 900);
  };

  const triggerBiometrics = () => {
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      onLoginSuccess();
    }, 1200);
  };

  const isFilled = pin.every((d) => d !== '');

  return (
    <div
      className={`h-full flex flex-col justify-between px-6 py-8 ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-[#EDEDED] text-zinc-900'
      }`}
    >
      {/* Top Branding matching Video 00:00 */}
      <div className="pt-6 text-center">
        <div className="inline-flex items-center justify-center gap-2">
          <div className="w-11 h-11 bg-[#F16521] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-md">
            R
          </div>
          <span className="text-[#F16521] text-3xl font-extrabold tracking-tight">
            RAMA77
          </span>
        </div>
        <h2 className="text-zinc-900 font-bold text-base mt-2">MPIN Login</h2>
      </div>

      {/* MPIN Input Section */}
      <div className="max-w-xs mx-auto w-full text-center">
        <p className="text-zinc-800 font-medium text-sm leading-relaxed px-4">
          Please enter your 4-digit MPIN to
          <br />
          login your account
        </p>

        {/* 4 Digit Boxes */}
        <div className="flex justify-center gap-3.5 my-6">
          {pin.map((digit, i) => (
            <input
              key={i}
              id={`mpin-${i}`}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-13 h-13 text-center text-2xl font-bold rounded-xl border focus:outline-none transition-all shadow-xs ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-700 text-white focus:border-[#F16521]'
                  : 'bg-white border-zinc-300 text-zinc-900 focus:border-[#F16521] focus:ring-2 focus:ring-orange-200'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => alert('OTP reset link sent to your registered mobile number 6377972674!')}
          className="text-[#F16521] font-bold text-xs tracking-wide hover:underline cursor-pointer"
        >
          Forgot MPIN?
        </button>

        {/* Login Button with Spinner */}
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          className="w-full mt-6 py-3.5 px-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#F16521] to-[#D84B06] hover:from-[#e05410] hover:to-[#c44307] transition-all shadow-md active:scale-[0.98] flex items-center justify-center cursor-pointer disabled:opacity-80"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Login'
          )}
        </button>

        {/* New Registration Link matching requirement */}
        <div className="mt-4 pt-2 border-t border-zinc-200/60">
          <span className="text-xs text-zinc-600">
            Don't have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="text-xs font-bold text-[#F16521] hover:underline cursor-pointer"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Biometric Fingerprint Trigger matching video */}
      <div className="pb-6 text-center">
        <button
          onClick={triggerBiometrics}
          className="group relative p-3 rounded-full hover:bg-orange-50 transition-all inline-flex items-center justify-center cursor-pointer"
          title="Login with Fingerprint"
        >
          {biometricScanning && (
            <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-30" />
          )}
          <Fingerprint
            className={`w-16 h-16 transition-colors ${
              biometricScanning
                ? 'text-[#F16521] scale-105'
                : 'text-zinc-600 group-hover:text-[#F16521]'
            }`}
          />
        </button>
        {biometricScanning && (
          <p className="text-xs font-semibold text-[#F16521] mt-1 animate-pulse">
            Scanning biometric fingerprint...
          </p>
        )}
      </div>
    </div>
  );
};
