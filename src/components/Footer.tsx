import React, { useState } from 'react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openInfoModal = (type: 'privasi' | 'status' | 'bantuan') => {
    if (type === 'privasi') {
      setModalContent({
        title: 'Kebijakan Privasi Portal Warga RT 11',
        content:
          'Data NIK, nama lengkap, dan nomor kontak yang diisikan oleh warga hanya digunakan khusus untuk verifikasi administratif pengantar resmi RT 11 dan koordinasi penanganan aduan lingkungan. Data tidak akan dibagikan ke pihak komersial mana pun.',
      });
    } else if (type === 'status') {
      setModalContent({
        title: 'Status Sistem Node RT 11',
        content:
          '• Node AI Robo-Tarun: Operasional (Latency 18ms)\n• Sensor Banjir Saluran Utama: 0.2m (Normal / Hijau)\n• Kamera Siskamling Balai & Gerbang: 4/4 Aktif (1080p)\n• Backup Ledger Kas Kripto: Sinkron per 10 menit.',
      });
    } else {
      setModalContent({
        title: 'Bantuan Warga & Panduan Portal',
        content:
          'Butuh bantuan penggunaan portal, pengajuan surat mendesak, atau kendala teknis? Anda dapat langsung menghubungi Sekretariat RT 11 melalui WhatsApp 0812-8877-1101 atau mengunjungi Balai RT setiap hari pukul 08.00 - 21.00 WIB.',
      });
    }
  };

  return (
    <footer className="w-full bg-[#090e1c]/90 backdrop-blur-2xl border-t border-[#00f0ff]/20 shadow-[0_1px_8px_rgba(0,0,0,0.4)] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-headline text-lg font-bold text-[#dbfcff] tracking-tight">
                RT 11 KAMPUNG BERSAHAJA
              </span>
            </div>
            <p className="font-body text-sm text-[#b9cacb] mb-4 leading-relaxed">
              Pusat komando digital warga berbasis kecerdasan komunal dan transparansi publik yang dikawal oleh asisten virtual Robo-Tarun.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#65f2b5] shadow-[0_0_8px_#65f2b5]"></span>
              <span className="font-display text-xs text-[#dfe1f6]">Sistem Operasional Berjalan Normal</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-[#dbfcff] mb-4 uppercase tracking-wider">
              Sekretariat RT
            </h3>
            <div className="flex flex-col gap-2 font-body text-sm text-[#b9cacb]">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#00dbe9] text-lg">location_on</span>
                <span>Balai Warga RT 11 / RW 04, Jl. Taruna Dirgantara No. 11</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00dbe9] text-lg">mail</span>
                <span>sekretariat@rt11bersahaja.id</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00dbe9] text-lg">schedule</span>
                <span>Jam Kerja: 08.00 - 21.00 WIB</span>
              </p>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-[#d8ffe7] mb-4 uppercase tracking-wider">
              Karang Taruna RT 11
            </h3>
            <p className="font-body text-sm text-[#b9cacb] mb-3">
              Penggerak kreativitas, inovasi siber warga, dan kegiatan pemuda.
            </p>
            <div className="flex flex-col gap-1.5 font-body text-sm">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#c0c1ff] hover:text-[#dfe1f6] transition-colors flex items-center gap-1.5"
              >
                <span>@karangtaruna.rt11</span>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="text-[#c0c1ff] hover:text-[#dfe1f6] transition-colors flex items-center gap-1.5"
              >
                <span>t.me/WargaKompak11</span>
              </a>
              <span className="text-[#c0c1ff] hover:text-[#dfe1f6] transition-colors cursor-pointer">
                podcast.rt11bersahaja.id
              </span>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-[#ffb4ab] mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-xl animate-bounce">emergency</span>
              <span>Pusat Darurat 24 Jam</span>
            </h3>
            <div className="flex flex-col gap-2 font-display text-xs">
              <a
                href="tel:02188911100"
                className="p-2.5 rounded-lg bg-[#252939]/60 hover:bg-[#252939] backdrop-blur-md flex items-center justify-between transition-colors"
              >
                <span className="text-[#b9cacb]">Pos Satkamling RT 11</span>
                <span className="text-[#ffb4ab] font-bold">(021) 8891-1100</span>
              </a>
              <a
                href="tel:119"
                className="p-2.5 rounded-lg bg-[#252939]/60 hover:bg-[#252939] backdrop-blur-md flex items-center justify-between transition-colors"
              >
                <span className="text-[#b9cacb]">Ambulans Siaga Desa</span>
                <span className="text-[#ffb4ab] font-bold">119 / 0812-1111-22</span>
              </a>
              <a
                href="tel:113"
                className="p-2.5 rounded-lg bg-[#252939]/60 hover:bg-[#252939] backdrop-blur-md flex items-center justify-between transition-colors"
              >
                <span className="text-[#b9cacb]">Damkar Wilayah</span>
                <span className="text-[#ffb4ab] font-bold">113</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#3b494b]/40 flex flex-col md:flex-row items-center justify-between gap-4 font-display text-xs text-[#b9cacb]">
          <p>© 2025 Portal Warga RT 11 Robo-Tarun. Terhubung untuk Guyub Rukun & Berkemajuan.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => openInfoModal('privasi')}
              className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors"
            >
              Kebijakan Privasi
            </button>
            <button
              onClick={() => openInfoModal('status')}
              className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors"
            >
              Status Sistem
            </button>
            <button
              onClick={() => openInfoModal('bantuan')}
              className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors"
            >
              Bantuan Warga
            </button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#252939] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-base font-bold text-[#dbfcff]">
                {modalContent.title}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="w-7 h-7 rounded-full bg-[#1b1f2e] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="text-sm font-body text-[#dfe1f6] whitespace-pre-line leading-relaxed">
              {modalContent.content}
            </div>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
