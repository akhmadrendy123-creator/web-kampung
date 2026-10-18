import React, { useState } from 'react';
import { KasTransaction, UmkmItem, Officer, NewsAgenda } from '../data/mockData';

interface BerandaViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenSuratModal: (type?: string) => void;
  onOpenReceiptModal: (tx: KasTransaction) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  kasTransactions: KasTransaction[];
  umkmList: UmkmItem[];
  officers: Officer[];
  newsList: NewsAgenda[];
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigateTab,
  onOpenSuratModal,
  onOpenReceiptModal,
  onShowToast,
  kasTransactions,
  umkmList,
  officers,
  newsList,
}) => {
  // Quick complaint form state
  const [quickName, setQuickName] = useState('');
  const [quickCategory, setQuickCategory] = useState('lampu');
  const [quickDetail, setQuickDetail] = useState('');
  const [quickSuccess, setQuickSuccess] = useState(false);

  // Jadwal ronda swap modal
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapName, setSwapName] = useState('');
  const [swapReason, setSwapReason] = useState('');

  // Selected news item for full read modal
  const [selectedNews, setSelectedNews] = useState<NewsAgenda | null>(null);

  const handleQuickAduanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickDetail) {
      onShowToast('Isian Belum Lengkap', 'Harap isi nama dan deskripsi keluhan.', 'error');
      return;
    }
    setQuickSuccess(true);
    onShowToast(
      'Aduan Cepat Terkirim',
      `Terima kasih ${quickName}, aduan telah diteruskan ke Posko Pengurus RT 11.`,
      'success'
    );
    setTimeout(() => {
      setQuickName('');
      setQuickDetail('');
      setQuickSuccess(false);
    }, 4000);
  };

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!swapName) return;
    setSwapModalOpen(false);
    onShowToast(
      'Permohonan Tukar Jaga Dikirim',
      `Permohonan tukar ronda dari ${swapName} telah dikirim ke Koordinator Siskamling Bpk. Hendra.`,
      'success'
    );
    setSwapName('');
    setSwapReason('');
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* 1. Hero Welcome Section */}
      <section className="relative w-full rounded-2xl bg-[#171b2a]/45 backdrop-blur-md border border-[#00f0ff]/20 p-5 sm:p-8 shadow-2xl overflow-hidden flex flex-col gap-6">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#65f2b5]/10 blur-[90px] pointer-events-none"></div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#252939]/70 backdrop-blur-md border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span className="font-display text-xs text-[#dbfcff] tracking-wide uppercase font-semibold">
              🌟 Portal Resmi Warga RT 11 / RW 04 • Kelurahan Sukamaju
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#65f2b5]/15 backdrop-blur-md border border-[#65f2b5]/40 text-[#4edea3] shadow-[0_0_12px_rgba(101,242,181,0.2)]">
            <span className="material-symbols-outlined text-base text-[#65f2b5]">smart_toy</span>
            <span className="font-display text-xs tracking-wide">
              💡 Gerakkan mouse: Maskot 3D Robo-Tarun di latar menatap kursor Anda!
            </span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="flex flex-col gap-3 max-w-4xl">
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#dbfcff] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,240,255,0.25)]">
            Selamat Datang di Portal Digital Warga Kampung RT 11
          </h1>
          <p className="font-body text-sm sm:text-base text-[#b9cacb] max-w-2xl leading-relaxed">
            Pusat komando informasi, transparansi anggaran kas terbuka, kemudahan birokrasi warga, dan pemberdayaan ekonomi siber lokal yang dipandu asisten cerdas Robo-Tarun.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => onOpenSuratModal()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:shadow-[0_0_36px_rgba(0,240,255,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">send</span>
            <span>Surat Pengantar Kilat (WA)</span>
          </button>

          <button
            onClick={() => onNavigateTab('form-aduan')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#252939]/70 text-[#dfe1f6] hover:text-[#00f0ff] font-headline text-xs sm:text-sm font-semibold backdrop-blur-md border border-[#00f0ff]/20 hover:border-[#00f0ff]/60 hover:bg-[#303444]/80 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-[#00f0ff]">campaign</span>
            <span>Formulir Aduan Lingkungan</span>
          </button>

          <button
            onClick={() => onNavigateTab('transparansi-kas')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#252939]/50 text-[#65f2b5] hover:text-[#d8ffe7] font-headline text-xs sm:text-sm font-semibold backdrop-blur-md border border-[#65f2b5]/30 hover:border-[#65f2b5]/60 hover:bg-[#303444]/80 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            <span>Cek Saldo Kas RT</span>
          </button>
        </div>

        {/* 4 Stat Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="p-3 sm:p-4 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-md border border-[#3b494b]/30 flex flex-col gap-1 shadow-lg hover:border-[#00f0ff]/50 transition-all">
            <div className="flex items-center justify-between text-[#b9cacb]">
              <span className="font-display text-xs">Warga Terdaftar</span>
              <span className="material-symbols-outlined text-[#00f0ff] text-lg">groups</span>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#dbfcff] tracking-tight">
              128 KK
            </span>
            <span className="font-display text-[10px] sm:text-xs text-[#4edea3]">
              Sensus digital terverifikasi
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-md border border-[#3b494b]/30 flex flex-col gap-1 shadow-lg hover:border-[#65f2b5]/50 transition-all">
            <div className="flex items-center justify-between text-[#b9cacb]">
              <span className="font-display text-xs">Kas Aktif Terbuka</span>
              <span className="material-symbols-outlined text-[#65f2b5] text-lg">verified</span>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#d8ffe7] tracking-tight">
              Rp 14.850.000
            </span>
            <span className="font-display text-[10px] sm:text-xs text-[#65f2b5] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> Real-time audit
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-md border border-[#3b494b]/30 flex flex-col gap-1 shadow-lg hover:border-[#c0c1ff]/50 transition-all">
            <div className="flex items-center justify-between text-[#b9cacb]">
              <span className="font-display text-xs">Ekonomi Digital</span>
              <span className="material-symbols-outlined text-[#c0c1ff] text-lg">storefront</span>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#e1e0ff] tracking-tight">
              24 UMKM
            </span>
            <span className="font-display text-[10px] sm:text-xs text-[#b9cacb]">
              Etalase binaan warga
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-md border border-[#3b494b]/30 flex flex-col gap-1 shadow-lg hover:border-[#6ffbbe]/50 transition-all">
            <div className="flex items-center justify-between text-[#b9cacb]">
              <span className="font-display text-xs">Status Keamanan</span>
              <span className="material-symbols-outlined text-[#4edea3] text-lg">local_police</span>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#6ffbbe] tracking-tight">
              100% Kondusif
            </span>
            <span className="font-display text-[10px] sm:text-xs text-[#65f2b5]">
              Pos Kamling siaga penuh
            </span>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FITUR 1: Transparansi Dana Kas RT 11 (Col 7) */}
        <section className="lg:col-span-7 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#65f2b5]/20 p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#65f2b5]/20 border border-[#65f2b5]/30 flex items-center justify-center text-[#d8ffe7]">
                <span className="material-symbols-outlined text-lg">payments</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Transparansi Dana Kas RT 11
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">
                  Laporan Pembukuan Kas Terbuka & Real-Time
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#65f2b5]/20 border border-[#65f2b5]/30 text-[#65f2b5] font-display text-[11px] uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65f2b5] animate-pulse"></span> Terverifikasi
            </span>
          </div>

          {/* Ledger 3 Key Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#1b1f2e]/70 border border-[#3b494b]/30 flex flex-col">
              <span className="font-display text-[10px] text-[#b9cacb] uppercase">Pemasukan Bulan Ini</span>
              <span className="font-headline text-lg sm:text-xl font-bold text-[#d8ffe7] mt-0.5">
                +Rp 6.200.000
              </span>
              <span className="font-display text-[10px] text-[#4edea3]">Iuran warga & donasi</span>
            </div>
            <div className="p-3 rounded-lg bg-[#1b1f2e]/70 border border-[#3b494b]/30 flex flex-col">
              <span className="font-display text-[10px] text-[#b9cacb] uppercase">Pengeluaran Operasional</span>
              <span className="font-headline text-lg sm:text-xl font-bold text-[#ffb4ab] mt-0.5">
                -Rp 2.450.000
              </span>
              <span className="font-display text-[10px] text-[#ffb4ab]/80">Lampu jalan & kebersihan</span>
            </div>
            <div className="p-3 rounded-lg bg-[#252939]/80 border border-[#00f0ff]/30 flex flex-col">
              <span className="font-display text-[10px] text-[#00f0ff] uppercase">Saldo Akhir Saat Ini</span>
              <span className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff] mt-0.5">
                Rp 14.850.000
              </span>
              <span className="font-display text-[10px] text-[#00dbe9]">Status: Likuid & Aman</span>
            </div>
          </div>

          {/* Progress Breakdown Bar */}
          <div className="p-4 rounded-lg bg-[#1b1f2e]/50 border border-[#3b494b]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[#b9cacb] font-display text-[11px]">
              <span>Alokasi: Kas Lingkungan (68%) • Ronda (22%) • Cadangan (10%)</span>
              <span className="text-[#00f0ff] font-semibold">Kas Terbuka v2.4</span>
            </div>
            <div className="w-full bg-[#303444] rounded-full h-2.5 overflow-hidden flex">
              <div className="bg-[#00f0ff] h-full" style={{ width: '68%' }} title="Kas Lingkungan 68%"></div>
              <div className="bg-[#c0c1ff] h-full" style={{ width: '22%' }} title="Ronda 22%"></div>
              <div className="bg-[#65f2b5] h-full" style={{ width: '10%' }} title="Cadangan 10%"></div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="font-body text-xs text-[#b9cacb]">
                Laporan diunggah otomatis oleh Bendahara RT setiap tanggal 25.
              </p>
              <button
                onClick={() => {
                  onShowToast(
                    'Mengunduh Rekap Kas',
                    'Kompilasi Dokumen Buku_Kas_RT11_Oktober_2025.pdf telah disiapkan.',
                    'success'
                  );
                }}
                className="font-display text-xs text-[#00f0ff] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Unduh PDF Rinci</span>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
          </div>
        </section>

        {/* FITUR 2: Layanan Surat Pengantar (Col 5) */}
        <section className="lg:col-span-5 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#00f0ff]/20 p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-lg">assignment</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Layanan Surat Pengantar
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">Generir Otomatis Format Resmi RT 11</p>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb] mt-1 leading-relaxed">
              Dapatkan surat keterangan tanpa antre ke balai warga. Isi formulir digital, Robo-Tarun meneruskan langsung ke tanda tangan digital Pak RT.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onOpenSuratModal('Surat Keterangan Domisili Tinggal')}
              className="p-3 rounded-lg bg-[#1b1f2e]/60 hover:bg-[#252939] border border-[#3b494b]/30 hover:border-[#00f0ff]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00f0ff] group-hover:scale-110 transition-transform">
                  home_pin
                </span>
                <div className="flex flex-col">
                  <span className="font-headline text-xs sm:text-sm font-semibold text-[#dfe1f6]">
                    Surat Domisili & Tinggal
                  </span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Syarat KTP & KK RT 11</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b9cacb] group-hover:text-[#00f0ff] transition-colors">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => onOpenSuratModal('Surat Pengantar SKCK')}
              className="p-3 rounded-lg bg-[#1b1f2e]/60 hover:bg-[#252939] border border-[#3b494b]/30 hover:border-[#65f2b5]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#65f2b5] group-hover:scale-110 transition-transform">
                  shield
                </span>
                <div className="flex flex-col">
                  <span className="font-headline text-xs sm:text-sm font-semibold text-[#dfe1f6]">
                    Surat Rekomendasi SKCK Polsek
                  </span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Untuk lamaran kerja & sekolah</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b9cacb] group-hover:text-[#65f2b5] transition-colors">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => onOpenSuratModal('Surat Keterangan Usaha UMKM')}
              className="p-3 rounded-lg bg-[#1b1f2e]/60 hover:bg-[#252939] border border-[#3b494b]/30 hover:border-[#c0c1ff]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#c0c1ff] group-hover:scale-110 transition-transform">
                  store
                </span>
                <div className="flex flex-col">
                  <span className="font-headline text-xs sm:text-sm font-semibold text-[#dfe1f6]">
                    Surat Izin Usaha Mikro (IUMK)
                  </span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Dukungan izin usaha rumahan</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b9cacb] group-hover:text-[#c0c1ff] transition-colors">
                chevron_right
              </span>
            </button>
          </div>

          <div className="p-2 rounded bg-[#252939]/50 border border-[#3b494b]/20 text-center">
            <span className="font-display text-[11px] text-[#b9cacb]">
              ⚡ Rata-rata waktu proses verifikasi: 15 Menit
            </span>
          </div>
        </section>

        {/* FITUR 3: Berita & Agenda Komunal Terkini (Col 8) */}
        <section className="lg:col-span-8 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#c0c1ff]/20 p-5 sm:p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3131c0]/30 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff]">
                <span className="material-symbols-outlined text-lg">feed</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Berita & Agenda Komunal Terkini
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">Warta Rukun Warga & Kalender Paguyuban</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('berita-agenda')}
              className="font-display text-xs text-[#00f0ff] hover:underline cursor-pointer"
            >
              Lihat Semua Warta
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Berita 1 */}
            <article
              onClick={() => setSelectedNews(newsList[0])}
              className="rounded-lg bg-[#1b1f2e]/60 border border-[#3b494b]/30 overflow-hidden flex flex-col shadow-md hover:-translate-y-1 hover:border-[#00f0ff]/40 transition-all cursor-pointer group"
            >
              <div
                className="w-full h-36 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${newsList[0].image}')` }}
              />
              <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] text-[#00f0ff] uppercase tracking-wider font-semibold">
                    {newsList[0].category}
                  </span>
                  <h3 className="font-headline text-xs font-bold text-[#dfe1f6] line-clamp-2 group-hover:text-[#dbfcff]">
                    {newsList[0].title}
                  </h3>
                  <p className="font-body text-xs text-[#b9cacb] line-clamp-2">
                    {newsList[0].summary}
                  </p>
                </div>
                <span className="font-display text-[10px] text-[#4edea3] flex items-center gap-1 pt-1 border-t border-[#3b494b]/30">
                  <span className="material-symbols-outlined text-xs">event</span> {newsList[0].date}
                </span>
              </div>
            </article>

            {/* Berita 2 */}
            <article
              onClick={() => setSelectedNews(newsList[1])}
              className="rounded-lg bg-[#1b1f2e]/60 border border-[#3b494b]/30 overflow-hidden flex flex-col shadow-md hover:-translate-y-1 hover:border-[#65f2b5]/40 transition-all cursor-pointer group"
            >
              <div
                className="w-full h-36 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${newsList[1].image}')` }}
              />
              <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] text-[#65f2b5] uppercase tracking-wider font-semibold">
                    {newsList[1].category}
                  </span>
                  <h3 className="font-headline text-xs font-bold text-[#dfe1f6] line-clamp-2 group-hover:text-[#dbfcff]">
                    {newsList[1].title}
                  </h3>
                  <p className="font-body text-xs text-[#b9cacb] line-clamp-2">
                    {newsList[1].summary}
                  </p>
                </div>
                <span className="font-display text-[10px] text-[#4edea3] flex items-center gap-1 pt-1 border-t border-[#3b494b]/30">
                  <span className="material-symbols-outlined text-xs">event</span> {newsList[1].date}
                </span>
              </div>
            </article>

            {/* Berita 3: Ronda Malam */}
            <article className="rounded-lg bg-gradient-to-b from-[#1b1f2e]/80 to-[#252939]/90 border border-[#ffb4ab]/30 overflow-hidden flex flex-col justify-between p-4 shadow-md hover:border-[#ffb4ab]/60 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] text-[#ffb4ab] uppercase tracking-wider font-semibold">
                    Siskamling Cyber
                  </span>
                  <span className="material-symbols-outlined text-[#ffb4ab] text-sm animate-pulse">
                    shield_moon
                  </span>
                </div>
                <h3 className="font-headline text-sm font-bold text-[#dbfcff]">
                  Jadwal Ronda Malam Regu Alpha
                </h3>
                <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
                  Patroli pengawasan CCTV lorong 1–4 dan gerbang portal timur oleh tim warga malam ini.
                </p>
                <div className="p-2 rounded bg-[#090e1c]/70 border border-[#3b494b]/40 flex flex-col gap-1 font-display text-[11px]">
                  <span className="text-[#dfe1f6] font-semibold">Petugas: Bpk. Tono, Hendra, Satrio</span>
                  <span className="text-[#65f2b5]">Status: Siaga 23:00 - 04:30 WIB</span>
                </div>
              </div>
              <button
                onClick={() => setSwapModalOpen(true)}
                className="mt-3 w-full py-2 rounded bg-[#303444] border border-[#3b494b]/40 text-[#dfe1f6] font-display text-xs font-semibold hover:bg-[#00f0ff] hover:text-[#006970] hover:border-transparent transition-all cursor-pointer"
              >
                Tukar Jadwal Jaga
              </button>
            </article>
          </div>
        </section>

        {/* FITUR 4: Galeri Komunal (Col 4) */}
        <section className="lg:col-span-4 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#65f2b5]/20 p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#65f2b5]/20 border border-[#65f2b5]/30 flex items-center justify-center text-[#d8ffe7]">
                <span className="material-symbols-outlined text-lg">photo_library</span>
              </div>
              <div>
                <h2 className="font-headline text-base font-bold text-[#dbfcff]">Galeri Komunal</h2>
                <p className="font-display text-xs text-[#b9cacb]">Rekam Jejak Kebersamaan Warga</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('galeri')}
              className="font-display text-xs text-[#00f0ff] hover:underline cursor-pointer"
            >
              Buka Galeri
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              onClick={() => onNavigateTab('galeri')}
              className="h-28 bg-cover bg-center rounded-lg shadow-sm border border-[#3b494b]/30 cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUx2eyS6jimBqIIBdMDx8ZCkC_D7JxD912EtgZD_MxoeSxOF7PD8Ao9QjJl-8bkN5kcre2pN4aYuAdtxIc4TIkRD6n5QI7dcJRXBIirNeaFExwz3Nu7xMDS3exQOQWuQRaDtTexNbhUKhvw1w-2siRqBjDO5Hu0Pq6Hx4rcKythHW1ux43pCBjHsisETchrXZJil6EF1MAgF4uLH1g7RmkxRUubz4R5aNiS32SZP6_FAgWz5QZlsqf')",
              }}
              title="Perlombaan 17 Agustus"
            />
            <div
              onClick={() => onNavigateTab('galeri')}
              className="h-28 bg-cover bg-center rounded-lg shadow-sm border border-[#3b494b]/30 cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIdm7uTXdhX5KRuAO0ahvio2PzC91hYZbmfSuQdcOiKXsmfWtn9s_izWxPmKRgpzvrINlRhnem9vrG_YMWaKLNGXNDh3H_ILfwMRgolAAFRTtEDNptxKR9iDT-g8pbuGdVEF7yLnEUHxv-0rUrabXP48CAlhhPmMoNu0F6ffXM9IDEQ2yq7o6o7nlIC80I0b3P91QRuzRDz2eNzc3dF-yDedRYR9SD4_qH2jDY1V0xKWbYVf0kIC7I')",
              }}
              title="Makan Liwetan Komunal"
            />
            <div
              onClick={() => onNavigateTab('galeri')}
              className="h-28 bg-cover bg-center rounded-lg shadow-sm border border-[#3b494b]/30 cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5IThJglH_W2eW30hsavxUe5XVR7LKSp_fxfpCIKURIAv-x15oFw4A-sdE8qmnA7yfCM-5SlZAuUwVH4HeEsOJPStwkOuxlHPriG907FbOhJ5HK1G95JLFcpBZSUSS6F0TGao6-iSdQNGiN9RT6Q9hXV4Bw06wxVphDvepqJ-OyofVh_I_-r7LnsFgBZVsf0eiOSYVWjfGSQ3c3Sn_68JHvfVpJ8o8LgeMjZbESU3Bor6Kf6PWAQ6d')",
              }}
              title="Pelatihan Digital Warga"
            />
            <div
              onClick={() => onNavigateTab('galeri')}
              className="h-28 rounded-lg bg-[#252939]/70 backdrop-blur-md border border-[#3b494b]/30 flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-[#303444] hover:border-[#00f0ff]/40 transition-all"
            >
              <span className="material-symbols-outlined text-[#00f0ff] text-2xl">collections</span>
              <span className="font-headline text-xs font-bold text-[#dfe1f6] mt-1">+142 Foto</span>
              <span className="font-display text-[10px] text-[#b9cacb]">Album Warga</span>
            </div>
          </div>

          <div className="p-2 rounded bg-[#1b1f2e]/60 border border-[#3b494b]/30 backdrop-blur-sm flex items-center justify-between text-xs font-display">
            <span className="text-[#b9cacb]">Kontribusi dokumentasi foto?</span>
            <button
              onClick={() => onNavigateTab('galeri')}
              className="text-[#00f0ff] underline font-semibold cursor-pointer"
            >
              Upload Disini
            </button>
          </div>
        </section>

        {/* FITUR 5: Showroom UMKM Unggulan Warga (Col 12) */}
        <section className="lg:col-span-12 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#00f0ff]/20 p-5 sm:p-6 shadow-xl flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Showroom UMKM Unggulan Warga RT 11
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">
                  Beli dari Tetangga, Hidupkan Ekonomi Swasembada Kompak
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#1b1f2e] border border-[#3b494b]/30 text-[#4edea3] font-display text-xs">
                Bebas Biaya Komisi
              </span>
              <button
                onClick={() => onNavigateTab('umkm-warga')}
                className="font-display text-xs text-[#00f0ff] hover:underline font-semibold cursor-pointer"
              >
                Jelajahi 24 Warung →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umkmList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-md border border-[#3b494b]/30 flex flex-col justify-between gap-3 shadow-md hover:border-[#00f0ff]/40 hover:shadow-cyan-500/10 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#252939] border border-[#3b494b]/40 flex items-center justify-center text-[#00f0ff] shrink-0">
                    <span className="material-symbols-outlined text-2xl">
                      {item.category === 'kuliner'
                        ? 'restaurant'
                        : item.category === 'jasa'
                        ? 'handyman'
                        : 'store'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-headline text-sm font-bold text-[#dfe1f6] truncate">
                        {item.name}
                      </h3>
                      <span className="font-display text-[10px] px-2 py-0.5 rounded-full bg-[#65f2b5]/20 border border-[#65f2b5]/30 text-[#65f2b5] shrink-0">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#b9cacb] line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#3b494b]/30">
                  <span className="font-display text-xs text-[#b9cacb] truncate max-w-[180px]">
                    📍 {item.address}
                  </span>
                  <a
                    href={`https://wa.me/${item.phone}?text=${encodeURIComponent(item.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all shrink-0"
                  >
                    Pesan WA
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FITUR 6: Profil & Struktur Pengurus RT 11 (Col 7) */}
        <section className="lg:col-span-7 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#00f0ff]/20 p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-lg">badge</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Profil & Struktur Pengurus RT 11
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">
                  Amanah Pelayanan Warga Periode 2024 - 2027
                </p>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb] mt-1">
              Seluruh pengurus berkomitmen memberikan pelayanan transparan, egaliter, dan siap dihubungi untuk segala kepentingan administratif warga.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className="p-3 rounded-lg bg-[#1b1f2e]/60 border border-[#3b494b]/30 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-headline text-xs font-bold shrink-0 ${officer.badgeColor}`}>
                  {officer.initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-xs sm:text-sm font-bold text-[#dfe1f6] truncate">
                    {officer.name}
                  </span>
                  <span className="font-display text-[11px] text-[#00dbe9]">{officer.role}</span>
                  <a
                    href={officer.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-[10px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors"
                  >
                    Hub: {officer.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-[#1b1f2e]/40 border border-[#3b494b]/20 flex items-center justify-between text-[#b9cacb] font-display text-xs">
            <span>Pusat Layanan Balai RT 11 buka setiap hari: 08.00 - 21.00 WIB</span>
            <span className="text-[#65f2b5] font-semibold">Status: Buka Sekarang</span>
          </div>
        </section>

        {/* FITUR 7: Form Aduan Cepat Warga (Col 5) */}
        <section
          id="form-aduan-section"
          className="lg:col-span-5 rounded-xl bg-[#171b2a]/55 backdrop-blur-xl border border-[#ffb4ab]/20 p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#93000a]/40 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
                <span className="material-symbols-outlined text-lg">report_problem</span>
              </div>
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Form Aduan Cepat Warga
                </h2>
                <p className="font-display text-xs text-[#b9cacb]">
                  Lapor Lampu Mati, Saluran Tersumbat, dll.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleQuickAduanSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-display text-xs text-[#b9cacb]" htmlFor="quick-nama">
                Nama Warga / No. Rumah
              </label>
              <input
                id="quick-nama"
                type="text"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder="Contoh: Pak Herman (No. 18)"
                required
                className="w-full px-3 py-2 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-display text-xs text-[#b9cacb]" htmlFor="quick-kategori">
                Kategori Aduan
              </label>
              <select
                id="quick-kategori"
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="lampu">Penerangan Jalan Mati</option>
                <option value="kebersihan">Sampah / Saluran Air Tersumbat</option>
                <option value="keamanan">Gangguan Keamanan & Ketertiban</option>
                <option value="sosial">Saran & Masukan Lainnya</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-display text-xs text-[#b9cacb]" htmlFor="quick-keluhan">
                Deskripsi Keluhan
              </label>
              <textarea
                id="quick-keluhan"
                rows={2}
                value={quickDetail}
                onChange={(e) => setQuickDetail(e.target.value)}
                placeholder="Tuliskan detail lokasi dan kendala yang dihadapi..."
                required
                className="w-full px-3 py-2 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] text-xs font-body focus:outline-none focus:border-[#00f0ff] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold shadow-[0_0_16px_rgba(0,240,255,0.3)] hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">send_and_archive</span>
              <span>Kirim Aduan ke Pengurus</span>
            </button>
          </form>

          {quickSuccess && (
            <div className="p-2.5 rounded-lg bg-[#65f2b5]/20 border border-[#65f2b5]/40 text-[#d8ffe7] font-display text-xs text-center animate-in fade-in">
              ✅ Laporan berhasil dikirim ke pengurus RT 11. Tim akan menindaklanjuti dalam kurun 1x24 jam.
            </div>
          )}
        </section>
      </div>

      {/* 3. Telemetry Status Bar */}
      <section className="rounded-xl bg-[#171b2a]/40 backdrop-blur-md border border-[#3b494b]/30 p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#65f2b5] shadow-[0_0_10px_#65f2b5] animate-pulse"></span>
          <span className="font-headline text-sm font-semibold text-[#dfe1f6]">
            Jaringan Siskamling Digital RT 11: Aktif & Sinkron
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-display text-xs text-[#b9cacb]">
          <span>Koneksi CCTV Balai: 4/4 Online</span>
          <span>•</span>
          <span>Sensor Banjir Saluran: Normal (0.2m)</span>
          <span>•</span>
          <span className="text-[#00f0ff] font-semibold">Node AI Robo-Tarun Online</span>
        </div>
      </section>

      {/* Modal Swap Ronda */}
      {swapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <span className="material-symbols-outlined">shield_moon</span>
                <h3 className="font-headline text-base font-bold text-[#dbfcff]">
                  Tukar Jadwal Ronda Siskamling
                </h3>
              </div>
              <button
                onClick={() => setSwapModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <p className="font-body text-xs text-[#b9cacb]">
              Pengajuan tukar jaga akan diteruskan langsung ke grup WhatsApp tim ronda dan koordinator keamanan.
            </p>
            <form onSubmit={handleSwapSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#b9cacb]">Nama Lengkap Anda</label>
                <input
                  type="text"
                  required
                  value={swapName}
                  onChange={(e) => setSwapName(e.target.value)}
                  placeholder="Contoh: Hendro Prasetyo (Blok B No. 12)"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/50 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#b9cacb]">Alasan Berhalangan / Usulan Pengganti</label>
                <textarea
                  rows={3}
                  required
                  value={swapReason}
                  onChange={(e) => setSwapReason(e.target.value)}
                  placeholder="Contoh: Dinas luar kota, bersedia menggantikan jadwal hari Jumat berikutnya..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/50 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSwapModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#252939] text-[#b9cacb] font-display text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
                >
                  Kirim Permohonan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal News Detail Reader */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/30">
              <span className={`px-2.5 py-0.5 rounded-full font-display text-[10px] font-semibold uppercase ${selectedNews.categoryBadge}`}>
                {selectedNews.category}
              </span>
              <button
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <h2 className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff]">
              {selectedNews.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-display text-[#b9cacb]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#00f0ff]">event</span> {selectedNews.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#65f2b5]">schedule</span> {selectedNews.time}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#c0c1ff]">location_on</span> {selectedNews.location}
              </span>
            </div>
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-56 object-cover rounded-lg"
            />
            <div className="text-sm font-body text-[#dfe1f6] leading-relaxed whitespace-pre-line">
              {selectedNews.fullContent}
            </div>
            <div className="pt-2 border-t border-[#3b494b]/30 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
              >
                Tutup Warta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
