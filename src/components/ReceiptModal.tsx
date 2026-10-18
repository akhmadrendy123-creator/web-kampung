import React from 'react';
import { KasTransaction } from '../data/mockData';

interface ReceiptModalProps {
  transaction: KasTransaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090e1c]/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md p-6 rounded-xl bg-[#252939] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4 relative">
        <div className="flex items-center justify-between pb-1 border-b border-[#3b494b]/30">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="material-symbols-outlined">receipt</span>
            <h3 className="font-headline text-base font-bold text-[#dbfcff]">Bukti Transaksi Kas</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1f2e] flex items-center justify-center text-[#b9cacb] hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-4 rounded-lg bg-[#090e1c] flex flex-col gap-2.5 font-body text-xs border border-[#3b494b]/30">
          <div className="flex justify-between items-center">
            <span className="text-[#b9cacb]">No. Referensi:</span>
            <span className="font-bold text-[#00f0ff] font-display text-sm tracking-wider">
              {transaction.receiptNo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#b9cacb]">Tanggal Pembukuan:</span>
            <span className="text-[#dfe1f6] font-medium">{transaction.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#b9cacb]">Uraian:</span>
            <span className="text-[#dfe1f6] text-right font-medium max-w-[200px] truncate">
              {transaction.description}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#b9cacb]">Kategori Kas:</span>
            <span className="text-[#dbfcff] font-medium">{transaction.category}</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-[#3b494b]/30">
            <span className="text-[#b9cacb]">Nominal:</span>
            <span
              className={`font-headline text-base font-bold ${
                transaction.type === 'masuk' ? 'text-[#65f2b5]' : 'text-[#ffb4ab]'
              }`}
            >
              {transaction.type === 'masuk'
                ? `+Rp ${transaction.amount.toLocaleString('id-ID')}`
                : `-Rp ${transaction.amount.toLocaleString('id-ID')}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#b9cacb]">Verifikator:</span>
            <span className="text-[#dfe1f6] font-medium">{transaction.verifiedBy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b9cacb]">Status Arsip:</span>
            <span className="text-[#65f2b5] font-semibold flex items-center gap-1 font-display text-[11px]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Digital Ledger Verified
            </span>
          </div>
        </div>

        <div className="h-32 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 flex flex-col items-center justify-center text-[#b9cacb] gap-1 p-2 text-center">
          <span className="material-symbols-outlined text-4xl text-[#00f0ff]">qr_code_2</span>
          <span className="font-display text-[10px] text-[#4edea3]">
            Hash Kriptografis Buku Kas RT 11: 7a8f90b1...3c
          </span>
          <span className="font-display text-[9px] text-[#849495]">
            Tercatat permanen dalam ledger publik warga RT 11
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-[#303444] text-[#dfe1f6] hover:bg-[#353948] transition-colors font-headline text-xs font-bold"
        >
          Tutup Verifikasi
        </button>
      </div>
    </div>
  );
};
