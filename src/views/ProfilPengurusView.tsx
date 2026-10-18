import React from 'react';
import { Officer } from '../data/mockData';

interface ProfilPengurusViewProps {
  officers: Officer[];
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfilPengurusView: React.FC<ProfilPengurusViewProps> = ({
  officers,
  onShowToast,
  onNavigateTab,
}) => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 p-6 rounded-xl bg-[#171b2a]/70 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-display text-xs w-fit">
          <span className="material-symbols-outlined text-sm">groups</span>
          <span>Amanah Kepengurusan RT 11 / RW 04 Periode 2024 - 2027</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff]">
          Struktur Pengurus & Tim Pelayanan Warga RT 11
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#b9cacb] max-w-3xl leading-relaxed">
          Mewujudkan tata kelola rukun tetangga yang guyub, transparan, cepat tanggap, dan adaptif terhadap kemajuan teknologi digital demi kesejahteraan warga bersama.
        </p>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="p-6 rounded-xl bg-[#171b2a]/75 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between gap-4 hover:border-[#00f0ff]/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-headline text-lg font-bold shadow-lg ${officer.badgeColor}`}
                >
                  {officer.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#65f2b5] ring-2 ring-[#0f1321]"></span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                    {officer.name}
                  </h3>
                  <span className="font-display text-[10px] px-2 py-0.5 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] font-semibold">
                    Siaga Aktif
                  </span>
                </div>
                <span className="font-display text-xs text-[#00dbe9] font-semibold">
                  {officer.role}
                </span>
                <p className="font-body text-xs text-[#b9cacb] mt-2 leading-relaxed">
                  {officer.bio}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#3b494b]/30 flex items-center justify-between">
              <span className="font-display text-xs text-[#b9cacb] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">phone_in_talk</span>
                <span>{officer.phone}</span>
              </span>
              <a
                href={officer.waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>Hubungi WA</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Balai Warga & Operational Hours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-[#1b1f2e]/70 border border-[#3b494b]/30 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">store</span>
          </div>
          <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">Balai Warga Sentral</h3>
          <p className="font-body text-xs text-[#b9cacb]">
            Jl. Taruna Dirgantara No. 11, RT 11 / RW 04, Kelurahan Sukamaju. Dilengkapi WiFi sentral, ruang rapat, dan perlengkapan inventaris warga.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1b1f2e]/70 border border-[#3b494b]/30 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#65f2b5]/20 text-[#65f2b5] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">schedule</span>
          </div>
          <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">Jam Operasional Balai</h3>
          <p className="font-body text-xs text-[#b9cacb]">
            Pelayanan tatap muka setiap hari pukul 08.00 - 21.00 WIB. Pengurusan surat darurat via daring tetap siaga 24 jam melalui portal ini.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1b1f2e]/70 border border-[#3b494b]/30 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#c0c1ff]/20 text-[#c0c1ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">handshake</span>
          </div>
          <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">Musyawarah Warga</h3>
          <p className="font-body text-xs text-[#b9cacb]">
            Pertemuan rutin triwulan diadakan setiap Sabtu malam minggu pertama di Balai RT untuk evaluasi laporan kas dan program kerja pemuda.
          </p>
        </div>
      </div>
    </div>
  );
};
