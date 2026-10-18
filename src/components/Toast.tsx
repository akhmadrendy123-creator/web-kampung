import React from 'react';

export interface ToastData {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type !== 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#252939]/95 backdrop-blur-xl border border-[#00f0ff]/30 shadow-2xl flex items-center gap-3 text-[#dfe1f6] max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
          isSuccess
            ? 'bg-[#00f0ff] text-[#006970]'
            : 'bg-[#93000a] text-[#ffdad6]'
        }`}
      >
        <span className="material-symbols-outlined text-lg">
          {isSuccess ? 'check' : 'error'}
        </span>
      </div>
      <div className="flex flex-col min-w-0 pr-2">
        <span className="font-headline text-xs font-bold text-[#dbfcff]">
          {toast.title}
        </span>
        <span className="font-body text-xs text-[#b9cacb] line-clamp-2">
          {toast.message}
        </span>
      </div>
      <button
        onClick={onClose}
        className="text-[#849495] hover:text-[#dfe1f6] p-1"
        aria-label="Tutup"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};
