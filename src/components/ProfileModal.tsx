import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090e1c]/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md p-6 rounded-xl bg-[#252939] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4 relative">
        <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff]">account_circle</span>
            <h3 className="font-headline text-base font-bold text-[#dbfcff]">
              Kartu Identitas Digital Warga
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1f2e] flex items-center justify-center text-[#b9cacb] hover:text-white"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4 rounded-xl bg-[#1b1f2e] border border-[#3b494b]/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#00f0ff]/20 border-2 border-[#00f0ff] flex items-center justify-center text-[#00f0ff] font-headline text-lg font-bold">
            RS
          </div>
          <div className="flex flex-col">
            <h4 className="font-headline text-base font-bold text-[#dfe1f6]">
              Raden Satria Pratama
            </h4>
            <span className="font-display text-xs text-[#00dbe9]">
              Warga Blok A No. 12B (RT 11 / RW 04)
            </span>
            <span className="font-display text-[11px] text-[#65f2b5] mt-1 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-sm">verified</span>
              KK Terdaftar Sensus 2024
            </span>
          </div>
        </div>

        {/* Citizen Status Items */}
        <div className="flex flex-col gap-2 font-display text-xs">
          <div className="p-3 rounded-lg bg-[#1b1f2e]/70 border border-[#3b494b]/20 flex items-center justify-between">
            <span className="text-[#b9cacb]">Status Iuran Kas RT:</span>
            <span className="text-[#65f2b5] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#65f2b5] animate-pulse"></span>
              Lunas (Okt 2025)
            </span>
          </div>
          <div className="p-3 rounded-lg bg-[#1b1f2e]/70 border border-[#3b494b]/20 flex items-center justify-between">
            <span className="text-[#b9cacb]">Jadwal Ronda Malam:</span>
            <span className="text-[#c0c1ff] font-bold">Regu Alpha (Senin Depan)</span>
          </div>
          <div className="p-3 rounded-lg bg-[#1b1f2e]/70 border border-[#3b494b]/20 flex items-center justify-between">
            <span className="text-[#b9cacb]">Hak Akses Portal:</span>
            <span className="text-[#dbfcff] font-bold">Warga Tetap (Full Node Access)</span>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onNavigateTab('layanan-surat');
            }}
            className="py-2.5 px-3 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold text-center hover:opacity-90 transition-opacity"
          >
            Buat Surat Pengantar
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateTab('transparansi-kas');
            }}
            className="py-2.5 px-3 rounded-lg bg-[#303444] text-[#dfe1f6] font-headline text-xs font-bold text-center hover:bg-[#353948] transition-colors"
          >
            Cek Kas Lingkungan
          </button>
        </div>
      </div>
    </div>
  );
};
