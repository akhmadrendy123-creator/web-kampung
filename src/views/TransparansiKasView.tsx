import React, { useState } from 'react';
import { KasTransaction, Officer } from '../data/mockData';

interface TransparansiKasViewProps {
  transactions: KasTransaction[];
  officers: Officer[];
  onOpenReceiptModal: (tx: KasTransaction) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  onOpenSuratModal?: (type?: string) => void;
}

export const TransparansiKasView: React.FC<TransparansiKasViewProps> = ({
  transactions,
  officers,
  onOpenReceiptModal,
  onShowToast,
  onOpenSuratModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form Permohonan Surat state
  const [letterType, setLetterType] = useState('Surat Pengantar SKCK');
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [houseBlock, setHouseBlock] = useState('Blok A');
  const [houseNumber, setHouseNumber] = useState('');
  const [letterPurpose, setLetterPurpose] = useState('');
  const [dataAccuracy, setDataAccuracy] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.receiptNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'masuk' && tx.type === 'masuk') ||
      (categoryFilter === 'keluar' && tx.type === 'keluar');
    return matchesSearch && matchesCategory;
  });

  const handleLetterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterType || !fullName || !nik || !houseNumber || !letterPurpose) {
      onShowToast('Form Belum Lengkap', 'Mohon lengkapi seluruh isian formulir.', 'error');
      return;
    }
    if (nik.length !== 16 || !/^\d+$/.test(nik)) {
      onShowToast('NIK Tidak Valid', 'NIK harus terdiri dari 16 digit angka sesuai e-KTP.', 'error');
      return;
    }

    const waText = encodeURIComponent(
      `*PERMOHONAN SURAT PENGANTAR RT 11*\n` +
      `-----------------------------------------\n` +
      `*Jenis Surat:* ${letterType}\n` +
      `*Nama Pemohon:* ${fullName}\n` +
      `*NIK:* ${nik}\n` +
      `*Alamat:* ${houseBlock}, ${houseNumber}, RT 11 / RW 04\n` +
      `*Keperluan:* ${letterPurpose}\n` +
      `-----------------------------------------\n` +
      `_Diajukan via Portal Digital Warga Robo-Tarun RT 11_`
    );

    const targetWA = `https://wa.me/6281288991100?text=${waText}`;

    onShowToast(
      'Data Diproses',
      'Format surat telah dibuat. Membuka WhatsApp Pengurus RT...',
      'success'
    );

    setTimeout(() => {
      window.open(targetWA, '_blank');
      setFullName('');
      setNik('');
      setHouseNumber('');
      setLetterPurpose('');
      setDataAccuracy(false);
    }, 1200);
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Top Mission Command Header */}
      <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00f0ff] text-[#006970] font-display text-[10px] tracking-wider uppercase font-semibold">
              Ledger & Protocol Node
            </span>
            <span className="text-[#4edea3] font-display text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65f2b5] animate-ping"></span>
              Sync Real-Time
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff] tracking-tight">
            Transparansi Kas & Layanan Administrasi RT 11
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
            Keterbukaan anggaran dana rukun tetangga dan alur surat pengantar online tanpa birokrasi berbelit.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#formulir-surat"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">post_add</span>
            <span>Ajukan Surat Sekarang</span>
          </a>
        </div>
      </header>

      {/* SECTION 1: FINANCIAL TRANSPARENCY DASHBOARD */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-display text-xs uppercase tracking-widest text-[#00dbe9]">
              Telemetry Finansial
            </span>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#dfe1f6]">
              Dashboard Transparansi Kas Keuangan
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[#b9cacb] font-display text-xs bg-[#252939]/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#3b494b]/30">
            <span className="material-symbols-outlined text-[#00f0ff] text-base">calendar_month</span>
            <span>Periode Berjalan: Oktober 2025</span>
          </div>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="relative overflow-hidden p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-xs text-[#b9cacb] uppercase tracking-wider">Total Saldo Kas</span>
              <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#dbfcff] tracking-tight">Rp 14.850.000</div>
              <div className="mt-1 flex items-center gap-1 font-display text-xs text-[#d8ffe7]">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+18.4% dari bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="relative overflow-hidden p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#65f2b5]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-xs text-[#b9cacb] uppercase tracking-wider">Total Kas Masuk</span>
              <div className="w-8 h-8 rounded-lg bg-[#65f2b5]/20 flex items-center justify-center text-[#6ffbbe]">
                <span className="material-symbols-outlined text-xl">arrow_downward</span>
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#d8ffe7] tracking-tight">Rp 6.200.000</div>
              <div className="mt-1 font-display text-xs text-[#b9cacb]">
                <span>96 Transaksi Masuk Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="relative overflow-hidden p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#3131c0]/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-xs text-[#b9cacb] uppercase tracking-wider">Pengeluaran Operasional</span>
              <div className="w-8 h-8 rounded-lg bg-[#3131c0]/30 flex items-center justify-center text-[#e1e0ff]">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#c0c1ff] tracking-tight">Rp 2.450.000</div>
              <div className="mt-1 font-display text-xs text-[#b9cacb]">
                <span>Efisiensi anggaran 82%</span>
              </div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="relative overflow-hidden p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#d8ffe7]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-xs text-[#b9cacb] uppercase tracking-wider">Partisipasi Iuran Warga</span>
              <div className="w-8 h-8 rounded-lg bg-[#65f2b5]/20 flex items-center justify-center text-[#d8ffe7]">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold text-[#dbfcff] tracking-tight">94%</span>
                <span className="font-display text-xs text-[#b9cacb]">KK Lunas</span>
              </div>
              <div className="mt-1 font-display text-xs text-[#d8ffe7]">
                <span>62 dari 66 Kepala Keluarga</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Allocation & Visual Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Alokasi & Distribusi Anggaran Berjalan
                </h3>
                <p className="font-body text-xs text-[#b9cacb]">
                  Proporsi pemanfaatan kas lingkungan untuk stabilitas dan kenyamanan rukun warga.
                </p>
              </div>
              <span className="material-symbols-outlined text-[#00dbe9] text-2xl hidden sm:block">pie_chart</span>
            </div>

            {/* Multi-segmented Progress Bar */}
            <div className="w-full h-4 rounded-full bg-[#303444] overflow-hidden flex shadow-inner mb-4">
              <div className="bg-[#00f0ff] h-full transition-all duration-500" style={{ width: '35%' }} title="PJU & CCTV: 35%"></div>
              <div className="bg-[#65f2b5] h-full transition-all duration-500" style={{ width: '30%' }} title="Kebersihan: 30%"></div>
              <div className="bg-[#c0c1ff] h-full transition-all duration-500" style={{ width: '20%' }} title="Sosial & Duka: 20%"></div>
              <div className="bg-[#3131c0] h-full transition-all duration-500" style={{ width: '15%' }} title="Cadangan: 15%"></div>
            </div>

            {/* Breakdown Legend Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-[#252939]/50 border border-[#3b494b]/20 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]"></span>
                  <span className="font-display text-[10px] text-[#b9cacb]">PJU & CCTV</span>
                </div>
                <span className="font-headline text-sm font-bold text-[#dfe1f6]">35%</span>
                <span className="font-display text-[11px] text-[#00f0ff]">Rp 5.197.500</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#252939]/50 border border-[#3b494b]/20 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65f2b5]"></span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Kebersihan Sampah</span>
                </div>
                <span className="font-headline text-sm font-bold text-[#dfe1f6]">30%</span>
                <span className="font-display text-[11px] text-[#65f2b5]">Rp 4.455.000</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#252939]/50 border border-[#3b494b]/20 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c0c1ff]"></span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Sosial & Duka</span>
                </div>
                <span className="font-headline text-sm font-bold text-[#dfe1f6]">20%</span>
                <span className="font-display text-[11px] text-[#c0c1ff]">Rp 2.970.000</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#252939]/50 border border-[#3b494b]/20 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3131c0]"></span>
                  <span className="font-display text-[10px] text-[#b9cacb]">Cadangan Kas</span>
                </div>
                <span className="font-headline text-sm font-bold text-[#dfe1f6]">15%</span>
                <span className="font-display text-[11px] text-[#b0b2ff]">Rp 2.227.500</span>
              </div>
            </div>
          </div>

          {/* Robo-Tarun Financial Status Bubble */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-xl bg-[#1b1f2e]/70 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#dbfcff]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#00f0ff] flex items-center justify-center text-[#006970]">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
              </div>
              <div>
                <h4 className="font-headline text-sm font-bold text-[#dbfcff]">Robo-Tarun Auditor</h4>
                <span className="font-display text-[10px] text-[#4edea3]">Verifikasi Otomatis Siklus 24H</span>
              </div>
            </div>
            <p className="font-body text-xs text-[#b9cacb] leading-relaxed mb-4">
              "Kondisi likuiditas kas RT 11 per minggu ini sangat sehat. Dana darurat sosial terpenuhi dan tagihan rutin armada kebersihan kelurahan telah direservasi."
            </p>
            <div className="flex flex-col gap-1 font-display text-xs text-[#b9cacb] pt-2 border-t border-[#3b494b]/30">
              <div className="flex justify-between py-1">
                <span>Akuntabilitas Audit</span>
                <span className="text-[#65f2b5] font-semibold">100% Cocok Kuitansi</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Pemeriksa Kas</span>
                <span className="text-[#dfe1f6]">Bendahara RT & Tim Taruna</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Table Component */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#1b1f2e]/70 backdrop-blur-2xl border border-[#3b494b]/30 shadow-xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff]">
                Rincian Arus Kas Terbuka
              </h3>
              <p className="font-body text-xs text-[#b9cacb]">
                Log transaksi transparan dan bukti bayar yang dapat diakses oleh seluruh warga.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onShowToast(
                    'Mengunduh Laporan...',
                    'Dokumen Rekap_Kas_RT11_Okt2025.pdf sedang dikompilasi.',
                    'success'
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#303444] text-[#00f0ff] hover:bg-[#353948] transition-all font-display text-xs font-semibold shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Unduh Rekap Laporan Keuangan (PDF)</span>
              </button>
            </div>
          </div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                search
              </span>
              <input
                type="text"
                placeholder="Cari transaksi atau nomor kuitansi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-[#00f0ff] text-[#006970]'
                    : 'bg-[#252939] text-[#b9cacb]'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setCategoryFilter('masuk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all ${
                  categoryFilter === 'masuk'
                    ? 'bg-[#65f2b5] text-[#003824]'
                    : 'bg-[#252939] text-[#b9cacb]'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setCategoryFilter('keluar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all ${
                  categoryFilter === 'keluar'
                    ? 'bg-[#ffb4ab] text-[#690005]'
                    : 'bg-[#252939] text-[#b9cacb]'
                }`}
              >
                Keluar
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body text-xs text-[#dfe1f6]">
              <thead>
                <tr className="bg-[#252939]/60 text-[#b9cacb] font-display text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-lg">Tanggal</th>
                  <th className="py-3 px-4">Deskripsi Transaksi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Nominal</th>
                  <th className="py-3 px-4">Tipe</th>
                  <th className="py-3 px-4 rounded-r-lg text-center">Bukti / Kuitansi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3b494b]/20">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#252939]/40 transition-colors">
                    <td className="py-3.5 px-4 font-display text-xs text-[#b9cacb] whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#dfe1f6]">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#303444] font-display text-[10px] text-[#dbfcff]">
                        {tx.category}
                      </span>
                    </td>
                    <td
                      className={`py-3.5 px-4 font-headline text-xs font-bold whitespace-nowrap ${
                        tx.type === 'masuk' ? 'text-[#65f2b5]' : 'text-[#ffb4ab]'
                      }`}
                    >
                      {tx.type === 'masuk' ? `+Rp ${tx.amount.toLocaleString('id-ID')}` : `-Rp ${tx.amount.toLocaleString('id-ID')}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-display text-[10px] font-semibold ${
                          tx.type === 'masuk'
                            ? 'bg-[#65f2b5]/20 text-[#65f2b5]'
                            : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                        }`}
                      >
                        {tx.type === 'masuk' ? 'Masuk' : 'Keluar'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onOpenReceiptModal(tx)}
                        className="inline-flex items-center gap-1 text-[#00f0ff] hover:underline font-display text-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                        <span>{tx.receiptNo}</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[#849495] font-body text-xs">
                      Tidak ada transaksi kas yang sesuai dengan kata kunci pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 2: SURAT PENGANTAR RT WORKFLOW & FORM */}
      <section className="flex flex-col gap-6 pt-4" id="formulir-surat">
        <div className="flex flex-col gap-1">
          <span className="font-display text-xs uppercase tracking-widest text-[#00dbe9]">
            Birokrasi Ringkas & Cepat
          </span>
          <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#dfe1f6]">
            Alur & Formulir Pengajuan Surat Pengantar RT
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#b9cacb]">
            Layanan mandiri tanpa perlu repot mengetuk pintu rumah pengurus berkali-kali. Format surat otomatis dikompilasi oleh sistem.
          </p>
        </div>

        {/* 3-Step Flow Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center font-headline text-base font-bold">
              1
            </div>
            <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">1. Isi Formulir Online</h3>
            <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
              Masukkan data diri valid sesuai identitas e-KTP dan pilih peruntukan kebutuhan surat pengantar Anda.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] flex items-center justify-center font-headline text-base font-bold">
              2
            </div>
            <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">2. Generasi Berkas Otomatis</h3>
            <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
              Sistem menyusun draf resmi berkop RT 11 dengan nomor registrasi unik dan kode verifikasi digital QR.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] flex items-center justify-center font-headline text-base font-bold">
              3
            </div>
            <h3 className="font-headline text-sm font-bold text-[#dfe1f6]">3. Tanda Tangan & Stempel</h3>
            <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
              Draf otomatis terkirim langsung ke WhatsApp Pengurus RT bertugas untuk penandatanganan dan legalitas.
            </p>
          </div>
        </div>

        {/* Form & Officers Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-xl bg-[#1b1f2e]/80 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-2xl">edit_document</span>
                <h3 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
                  Formulir Permohonan Cepat
                </h3>
              </div>
              <span className="font-display text-[11px] text-[#b9cacb] bg-[#252939] px-2.5 py-1 rounded">
                Respon Rata-rata: &lt; 15 Menit
              </span>
            </div>

            <form onSubmit={handleLetterFormSubmit} className="flex flex-col gap-4">
              {/* Jenis Surat */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-type">
                  Jenis Surat Pengantar
                </label>
                <div className="relative">
                  <select
                    id="surat-type"
                    value={letterType}
                    onChange={(e) => setLetterType(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] font-body text-xs focus:outline-none focus:border-[#00f0ff] appearance-none"
                  >
                    <option value="Surat Pengantar SKCK">Surat Pengantar SKCK (Kepolisian)</option>
                    <option value="Surat Keterangan Domisili Tinggal">Keterangan Domisili Tinggal</option>
                    <option value="Surat Keterangan Usaha UMKM">Keterangan Usaha UMKM Lingkungan</option>
                    <option value="Surat Pengantar Pembuatan KTP/KK">Pengantar Pembuatan / Perubahan KTP & KK</option>
                    <option value="Surat Keterangan Tidak Mampu (SKTM)">Keterangan Kurang Mampu (SKTM)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#849495] pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Nama & NIK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-name">
                    Nama Lengkap Pemohon
                  </label>
                  <input
                    id="surat-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Raden Satria Pratama"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-nik">
                    Nomor Induk Kependudukan (NIK)
                  </label>
                  <input
                    id="surat-nik"
                    type="text"
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="16 Digit NIK sesuai e-KTP"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              {/* Blok & No. Rumah */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-block">
                    Blok Rumah
                  </label>
                  <select
                    id="surat-block"
                    value={houseBlock}
                    onChange={(e) => setHouseBlock(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="Blok A">Blok A (Jl. Cendrawasih)</option>
                    <option value="Blok B">Blok B (Jl. Rajawali)</option>
                    <option value="Blok C">Blok C (Jl. Garuda)</option>
                    <option value="Blok D">Blok D (Jl. Merpati)</option>
                  </select>
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-house-no">
                    No. Rumah & Keterangan Domisili
                  </label>
                  <input
                    id="surat-house-no"
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="Contoh: No. 12B RT 11 / RW 04"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              {/* Keperluan */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6] uppercase tracking-wider" htmlFor="surat-purpose">
                  Keperluan Pembuatan Surat
                </label>
                <textarea
                  id="surat-purpose"
                  rows={3}
                  value={letterPurpose}
                  onChange={(e) => setLetterPurpose(e.target.value)}
                  placeholder="Tuliskan alasan pengajuan secara jelas, misalnya: Persyaratan lamaran kerja di BUMN atau pengajuan izin usaha mikro kuliner..."
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[#090e1c]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>

              {/* Checkbox verification */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#252939]/40 border border-[#3b494b]/20">
                <input
                  id="data-accuracy"
                  type="checkbox"
                  checked={dataAccuracy}
                  onChange={(e) => setDataAccuracy(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded text-[#00f0ff] accent-[#00f0ff] cursor-pointer"
                />
                <label htmlFor="data-accuracy" className="font-body text-xs text-[#b9cacb] cursor-pointer">
                  Saya menyatakan bahwa data yang diisikan adalah benar warga domisili RT 11 dan siap bertanggung jawab secara hukum atas data yang diberikan.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:shadow-[0_0_36px_rgba(0,240,255,0.65)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">send</span>
                <span>Ajukan Surat & Kirim Format ke WhatsApp Pengurus RT</span>
              </button>
            </form>
          </div>

          {/* Right Officers & Requirements */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-[#1b1f2e]/70 backdrop-blur-2xl border border-[#3b494b]/30 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-sm font-bold text-[#dbfcff]">Pengurus Bertugas</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] font-display text-[10px] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65f2b5] animate-pulse"></span>
                  Siaga
                </span>
              </div>
              <p className="font-body text-xs text-[#b9cacb]">
                Daftar penanggung jawab pelayanan administrasi lingkungan hari ini:
              </p>

              <div className="flex flex-col gap-2.5">
                {officers.slice(0, 3).map((off) => (
                  <div
                    key={off.id}
                    className="p-3 rounded-lg bg-[#252939]/60 border border-[#3b494b]/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-xs font-bold ${off.badgeColor}`}>
                          {off.initials}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#65f2b5] ring-2 ring-[#0f1321]"></span>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-headline text-xs font-bold text-[#dfe1f6]">{off.name}</div>
                        <div className="font-display text-[10px] text-[#00dbe9]">{off.role}</div>
                      </div>
                    </div>
                    <a
                      href={off.waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] hover:bg-[#65f2b5] hover:text-[#003824] transition-all flex items-center justify-center"
                      title="Hubungi via WhatsApp"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Requirements Notice */}
            <div className="p-5 rounded-xl bg-[#1b1f2e]/60 backdrop-blur-xl border border-[#3b494b]/30 shadow-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <span className="material-symbols-outlined text-lg">info</span>
                <h4 className="font-headline text-xs font-bold uppercase tracking-wide">
                  Persyaratan Dokumen Asli
                </h4>
              </div>
              <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
                Saat mengambil lembar bertandatangan basah (jika diperlukan untuk instansi Kepolisian/Kelurahan), harap membawa fotokopi KTP & KK untuk arsip fisik sekretariat.
              </p>
              <div className="p-2.5 rounded bg-[#090e1c]/70 text-[#65f2b5] font-display text-[11px] flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Tersedia opsi Surat Ber-Barcode QR Validasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
