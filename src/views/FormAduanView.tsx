import React, { useState } from 'react';
import { ComplaintTicket } from '../data/mockData';

interface FormAduanViewProps {
  tickets: ComplaintTicket[];
  onAddTicket: (ticket: ComplaintTicket) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const FormAduanView: React.FC<FormAduanViewProps> = ({
  tickets,
  onAddTicket,
  onShowToast,
}) => {
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [houseBlock, setHouseBlock] = useState('Blok A (Gang 1 - 2)');
  const [houseNumber, setHouseNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fasilitas Umum & Lampu PJU');
  const [urgency, setUrgency] = useState<'Biasa' | 'Cukup Mendesak' | 'Darurat'>('Biasa');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [complaintDetail, setComplaintDetail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedTicketNo, setSubmittedTicketNo] = useState<string | null>(null);

  const categories = [
    { label: 'Fasilitas / Lampu PJU', icon: 'lightbulb', val: 'Fasilitas Umum & Lampu PJU', iconColor: 'text-[#00f0ff]' },
    { label: 'Kebersihan & Sampah', icon: 'delete_sweep', val: 'Kebersihan & Sampah Liar', iconColor: 'text-[#65f2b5]' },
    { label: 'Keamanan & Ronda', icon: 'shield', val: 'Keamanan & Ketertiban', iconColor: 'text-[#c0c1ff]' },
    { label: 'Saluran Air / Got', icon: 'water_damage', val: 'Saluran Air & Drainase', iconColor: 'text-[#00dbe9]' },
    { label: 'Saran / Inovasi Komunal', icon: 'tips_and_updates', val: 'Saran/Inovasi Program', iconColor: 'text-[#d8ffe7]' },
  ];

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !reporterPhone || !houseNumber || !incidentLocation || !complaintDetail) {
      onShowToast('Form Belum Lengkap', 'Mohon lengkapi seluruh isian formulir aduan.', 'error');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newTicketNo = `#RT11-${randomNum}`;

    const newTicket: ComplaintTicket = {
      id: `ticket-${Date.now()}`,
      ticketNo: newTicketNo,
      reporterName: isAnonymous ? 'Warga RT 11 (Anonim)' : reporterName,
      isAnonymous,
      phone: reporterPhone,
      block: houseBlock,
      houseNo: houseNumber,
      category: selectedCategory,
      urgency,
      specificLocation: incidentLocation,
      detail: complaintDetail,
      status: 'tinjauan',
      timeAgo: 'Baru saja',
      followUpNote: 'Tiket berhasil masuk antrean verifikasi pengurus RT 11. Segera ditinjau oleh tim tanggap.',
    };

    onAddTicket(newTicket);
    setSubmittedTicketNo(newTicketNo);

    onShowToast(
      'Tiket Berhasil Didaftarkan',
      `ID Tiket ${newTicketNo} telah dibuat. Notifikasi terkirim ke WhatsApp Pengurus RT.`,
      'success'
    );

    // Reset fields
    setReporterName('');
    setReporterPhone('');
    setHouseNumber('');
    setIncidentLocation('');
    setComplaintDetail('');
    setIsAnonymous(false);
  };

  // Metrics calculation
  const totalTickets = tickets.length;
  const completedCount = tickets.filter((t) => t.status === 'selesai').length;
  const inProgressCount = tickets.filter((t) => t.status === 'dikerjakan').length;
  const pendingCount = tickets.filter((t) => t.status === 'tinjauan').length;
  const resolutionRate =
    totalTickets > 0 ? Math.round((completedCount / totalTickets) * 100) : 100;

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* SECTION 1: HEADER SECTION */}
      <header className="flex flex-col items-center text-center max-w-4xl mx-auto p-6 rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl">
        {/* Badge Pill with Neon Glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#252939]/80 backdrop-blur-md shadow-[0_0_16px_rgba(0,240,255,0.15)] border border-[#00f0ff]/30 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
          <span className="font-display text-xs uppercase tracking-widest text-[#7df4ff] font-semibold">
            Layanan Pengaduan & Aspirasi Lingkungan
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff] tracking-tight mb-2">
          Suara Warga RT 11: Aduan Fasilitas & Aspirasi Lingkungan
        </h1>

        {/* Subtitle Description */}
        <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed max-w-2xl">
          Sampaikan kendala fasilitas rusak, kebersihan lingkungan, atau ide inovasi untuk kampung kita. Pengurus RT siap menindaklanjuti secara cepat dan transparan.
        </p>

        {/* System Protocol Ribbon */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-display text-xs text-[#b9cacb]/80">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#65f2b5] text-sm">bolt</span>
            <span>Respon Cepat &lt; 24 Jam</span>
          </div>
          <span className="text-[#3b494b]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00dbe9] text-sm">encrypted</span>
            <span>Enkripsi Tiket Terverifikasi</span>
          </div>
          <span className="text-[#3b494b]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#c0c1ff] text-sm">smart_toy</span>
            <span>Dipantau Robo-Tarun Bot</span>
          </div>
        </div>
      </header>

      {/* SECTION 2: SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORMULIR PENGADUAN WARGA (Col 1-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-5 sm:p-7 relative overflow-hidden">
            {/* Card Decorative Top Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#65f2b5] to-transparent opacity-80"></div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-2xl">rate_review</span>
                  <h2 className="font-headline text-lg sm:text-xl font-bold text-[#dfe1f6] tracking-tight">
                    Formulir Tiket Aspirasi
                  </h2>
                </div>
                <p className="font-body text-xs text-[#b9cacb] mt-0.5">
                  Isi formulir berikut untuk ditindaklanjuti Tim Reaksi Cepat RT 11.
                </p>
              </div>
              <span className="hidden sm:inline-block font-display text-[10px] px-2.5 py-1 rounded bg-[#252939] text-[#00f0ff] uppercase tracking-wider font-semibold">
                Node: 11-CIVIC
              </span>
            </div>

            <form onSubmit={handleComplaintSubmit} className="flex flex-col gap-4">
              {/* Grid: Nama & Kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="reporter-name">
                    <span>Nama Lengkap Pelapor</span>
                    <span className="text-[#ffb4ab] font-body text-xs">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                      badge
                    </span>
                    <input
                      id="reporter-name"
                      type="text"
                      required
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full bg-[#090e1c]/80 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="reporter-phone">
                    <span>Nomor WhatsApp / Telepon</span>
                    <span className="text-[#ffb4ab] font-body text-xs">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                      phone_iphone
                    </span>
                    <input
                      id="reporter-phone"
                      type="tel"
                      required
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      placeholder="0812-XXXX-XXXX"
                      className="w-full bg-[#090e1c]/80 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Grid: Blok & Nomor Rumah */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="house-block-input">
                    <span>Blok Wilayah RT 11</span>
                    <span className="text-[#ffb4ab] font-body text-xs">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                      location_city
                    </span>
                    <select
                      id="house-block-input"
                      value={houseBlock}
                      onChange={(e) => setHouseBlock(e.target.value)}
                      required
                      className="w-full bg-[#090e1c]/80 text-[#dfe1f6] font-body text-xs pl-9 pr-8 py-2.5 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Blok A (Gang 1 - 2)">Blok A (Gang 1 - 2)</option>
                      <option value="Blok B (Gang 3 - 4)">Blok B (Gang 3 - 4)</option>
                      <option value="Blok C (Taman & Balai)">Blok C (Taman & Balai)</option>
                      <option value="Blok D (Perbatasan RW 04)">Blok D (Perbatasan RW 04)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-[#849495] text-base">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="house-number-input">
                    <span>Nomor Rumah</span>
                    <span className="text-[#ffb4ab] font-body text-xs">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                      home
                    </span>
                    <input
                      id="house-number-input"
                      type="text"
                      required
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      placeholder="Contoh: No. 14B"
                      className="w-full bg-[#090e1c]/80 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Kategori Aduan (Interactive Pill Selection) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between">
                  <span>Kategori Aduan & Aspirasi</span>
                  <span className="text-[#6ffbbe] font-display text-[10px]">Pilih 1 Sesuai Kendala</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((cat, idx) => {
                    const isSelected = selectedCategory === cat.val;
                    const isSpan = idx === 4 ? 'sm:col-span-2 md:col-span-2' : '';
                    return (
                      <button
                        key={cat.val}
                        type="button"
                        onClick={() => setSelectedCategory(cat.val)}
                        className={`text-left p-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#00f0ff]/20 border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)] text-[#dbfcff]'
                            : 'bg-[#252939]/60 hover:bg-[#252939] border-[#3b494b]/30 text-[#dfe1f6]'
                        } ${isSpan}`}
                      >
                        <span className={`material-symbols-outlined ${cat.iconColor} text-lg`}>
                          {cat.icon}
                        </span>
                        <span className="font-display text-xs leading-tight font-medium">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tingkat Urgensi Radios */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6]">Tingkat Urgensi Masalah</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'Biasa', desc: '1-3 Hari', icon: 'info', color: 'text-[#65f2b5]', border: 'peer-checked:border-[#00f0ff]' },
                    { val: 'Cukup Mendesak', desc: '< 24 Jam', icon: 'priority_high', color: 'text-[#c0c1ff]', border: 'peer-checked:border-[#c0c1ff]' },
                    { val: 'Darurat', desc: 'Segera', icon: 'warning', color: 'text-[#ffb4ab]', border: 'peer-checked:border-[#ffb4ab]' },
                  ].map((lvl) => (
                    <label
                      key={lvl.val}
                      className="cursor-pointer relative flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#252939]/40 hover:bg-[#252939] transition-all text-center border border-[#3b494b]/30"
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={lvl.val}
                        checked={urgency === lvl.val}
                        onChange={() => setUrgency(lvl.val as any)}
                        className="peer sr-only"
                      />
                      <div className={`w-full h-full absolute inset-0 rounded-lg pointer-events-none transition-all ${
                        urgency === lvl.val ? 'border-2 border-[#00f0ff] bg-[#3131c0]/20' : ''
                      }`} />
                      <span className={`material-symbols-outlined ${lvl.color} text-lg mb-0.5`}>
                        {lvl.icon}
                      </span>
                      <span className="font-display text-xs text-[#dfe1f6] font-semibold">{lvl.val}</span>
                      <span className="font-display text-[10px] text-[#b9cacb] mt-0.5">{lvl.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Lokasi Spesifik */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="incident-loc-input">
                  <span>Lokasi Spesifik Kejadian</span>
                  <span className="text-[#ffb4ab] font-body text-xs">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
                    pin_drop
                  </span>
                  <input
                    id="incident-loc-input"
                    type="text"
                    required
                    value={incidentLocation}
                    onChange={(e) => setIncidentLocation(e.target.value)}
                    placeholder="Contoh: Depan Pos Ronda Gang 2 / Tiang Listrik No. 04"
                    className="w-full bg-[#090e1c]/80 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>
              </div>

              {/* Uraian Masalah */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-xs text-[#dfe1f6] flex items-center justify-between" htmlFor="complaint-desc-input">
                  <span>Uraian Rinci Masalah / Ide Aspirasi</span>
                  <span className="text-[#849495] font-display text-[10px]">Maks. 500 Karakter</span>
                </label>
                <textarea
                  id="complaint-desc-input"
                  rows={4}
                  required
                  value={complaintDetail}
                  onChange={(e) => setComplaintDetail(e.target.value)}
                  placeholder="Deskripsikan kondisi lapangan secara jelas, kendala yang dihadapi warga sekitar, atau saran penyelesaian yang diinginkan..."
                  className="w-full bg-[#090e1c]/80 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs p-3 rounded-lg border border-[#3b494b]/40 focus:outline-none focus:border-[#00f0ff] transition-all resize-none"
                />
              </div>

              {/* Checkbox Anonim */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#252939]/60 border border-[#3b494b]/30">
                <input
                  id="anon-checkbox"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#00f0ff] accent-[#00f0ff] cursor-pointer"
                />
                <div className="flex flex-col">
                  <label htmlFor="anon-checkbox" className="font-display text-xs text-[#dfe1f6] font-semibold cursor-pointer">
                    Kirim sebagai Anonim (Identitas hanya diketahui Ketua RT)
                  </label>
                  <span className="font-body text-xs text-[#b9cacb]">
                    Data nama dan nomor tidak akan dipublikasikan di papan transparansi umum.
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-1 py-3 px-6 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_32px_rgba(0,240,255,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">send</span>
                <span>Kirimkan Aduan Sekarang</span>
              </button>
            </form>

            {/* Success Alert Banner */}
            {submittedTicketNo && (
              <div className="mt-4 p-4 rounded-lg bg-[#65f2b5]/20 border border-[#65f2b5]/40 text-[#d8ffe7] flex items-center gap-3 shadow-[0_0_15px_rgba(101,242,181,0.2)] animate-in fade-in">
                <span className="material-symbols-outlined text-2xl text-[#65f2b5]">check_circle</span>
                <div className="flex flex-col">
                  <span className="font-headline text-xs font-bold">Tiket Berhasil Dikirimkan!</span>
                  <span className="font-body text-xs text-[#dfe1f6]">
                    ID Tiket: {submittedTicketNo}. Tim pengurus segera memverifikasi dan mengirim progres ke WhatsApp Anda.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Robo-Tarun Quick Tip Module */}
          <div className="rounded-xl bg-[#252939]/60 backdrop-blur-xl border border-[#3b494b]/30 p-4 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex-shrink-0 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <span className="material-symbols-outlined text-[#00f0ff] text-2xl">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xs text-[#00f0ff] font-bold uppercase tracking-wider">
                Robo-Tarun Node Insight
              </span>
              <p className="font-body text-xs text-[#b9cacb]">
                Semua tiket yang masuk langsung disinkronkan ke rekapitulasi rapat koordinasi mingguan pengurus RT 11.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STATUS TIKET & TRANSPARANSI REAL-TIME (Col 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Telemetry Counter Dock */}
          <div className="rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#3b494b]/30 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#65f2b5] text-xl">analytics</span>
                <h2 className="font-headline text-base font-bold text-[#dfe1f6]">
                  Transparansi Penanganan
                </h2>
              </div>
              <span className="font-display text-[10px] px-2 py-0.5 rounded-full bg-[#65f2b5]/15 text-[#65f2b5] font-semibold">
                Bulan Berjalan
              </span>
            </div>

            {/* Summary Metric Cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 text-center">
                <span className="font-headline text-xl sm:text-2xl text-[#65f2b5] font-bold">
                  {completedCount}
                </span>
                <span className="font-display text-[10px] text-[#6ffbbe] font-semibold mt-0.5">
                  Aduan Selesai
                </span>
                <span className="text-[#65f2b5] text-[10px] mt-0.5">✅ Tuntas</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 text-center">
                <span className="font-headline text-xl sm:text-2xl text-[#00f0ff] font-bold">
                  {inProgressCount}
                </span>
                <span className="font-display text-[10px] text-[#7df4ff] font-semibold mt-0.5">
                  Dikerjakan
                </span>
                <span className="text-[#00dbe9] text-[10px] mt-0.5">⏳ Progres</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 text-center">
                <span className="font-headline text-xl sm:text-2xl text-[#c0c1ff] font-bold">
                  {pendingCount}
                </span>
                <span className="font-display text-[10px] text-[#e1e0ff] font-semibold mt-0.5">
                  Tinjauan
                </span>
                <span className="text-[#c0c1ff] text-[10px] mt-0.5">🔍 Evaluasi</span>
              </div>
            </div>

            {/* Resolution Bar */}
            <div className="p-3 rounded-lg bg-[#252939]/40 border border-[#3b494b]/20 flex flex-col gap-2">
              <div className="flex justify-between items-center font-display text-[11px]">
                <span className="text-[#b9cacb]">Tingkat Resolusi Masalah Warga</span>
                <span className="text-[#65f2b5] font-bold">{resolutionRate}% Selesai Cepat</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#090e1c] overflow-hidden flex">
                <div
                  className="h-full bg-[#65f2b5]"
                  style={{ width: `${resolutionRate}%` }}
                ></div>
                <div
                  className="h-full bg-[#00f0ff]"
                  style={{ width: `${Math.round((inProgressCount / (totalTickets || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Riwayat Penanganan Terbuka (Live Stream) */}
          <div className="rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#3b494b]/30 p-5 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-xl">history_edu</span>
                <h3 className="font-headline text-base font-bold text-[#dfe1f6]">
                  Tiket Riwayat Terbuka
                </h3>
              </div>
              <span className="font-display text-[10px] text-[#b9cacb] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65f2b5] animate-ping"></span> Live Sync
              </span>
            </div>

            {/* Card List */}
            <div className="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-lg bg-[#1b1f2e]/80 border border-[#3b494b]/30 hover:border-[#00f0ff]/40 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-display font-bold bg-[#00f0ff]/20 text-[#00f0ff]">
                        {t.ticketNo}
                      </span>
                      <span className="text-[#849495] font-display text-[10px]">• {t.timeAgo}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full font-display text-[10px] font-semibold flex items-center gap-1 ${
                        t.status === 'selesai'
                          ? 'bg-[#65f2b5]/15 text-[#65f2b5]'
                          : t.status === 'dikerjakan'
                          ? 'bg-[#00f0ff]/15 text-[#00f0ff]'
                          : 'bg-[#c0c1ff]/20 text-[#c0c1ff]'
                      }`}
                    >
                      {t.status === 'selesai' ? (
                        <>
                          <span className="material-symbols-outlined text-xs">check_circle</span> Selesai
                        </>
                      ) : t.status === 'dikerjakan' ? (
                        <>
                          <span className="material-symbols-outlined text-xs animate-spin">sync</span> Dikerjakan
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-xs">pending</span> Tinjauan
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-headline text-xs font-bold text-[#dbfcff]">
                    {t.detail}
                  </p>

                  {t.followUpNote && (
                    <div className="p-2 rounded bg-[#252939]/70 border border-[#3b494b]/20 text-xs font-body text-[#b9cacb]">
                      <span className="text-[#65f2b5] font-semibold">Tindak Lanjut: </span>
                      {t.followUpNote}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[#849495] font-display text-[10px]">
                    <span className="material-symbols-outlined text-sm text-[#00f0ff]">location_on</span>
                    <span>{t.specificLocation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kontak Pengurus Siaga 24 Jam */}
          <div className="rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#ffb4ab]/20 p-5 shadow-lg flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-xl">contact_emergency</span>
              <h3 className="font-headline text-base font-bold text-[#dfe1f6]">
                Kontak Pengurus Siaga
              </h3>
            </div>
            <p className="font-body text-xs text-[#b9cacb]">
              Untuk insiden genting yang membutuhkan respons langsung tanpa antrean formulir daring:
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="tel:02188911100"
                className="flex items-center justify-between p-3 rounded-lg bg-[#252939]/80 hover:bg-[#252939] border border-[#3b494b]/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#93000a]/40 flex items-center justify-center text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-lg">local_police</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-xs font-bold text-[#dfe1f6] group-hover:text-[#00f0ff] transition-colors">
                      Pos Satkamling RT 11
                    </span>
                    <span className="font-display text-[10px] text-[#b9cacb]">Regu Ronda Malam & Patroli</span>
                  </div>
                </div>
                <span className="font-headline text-xs font-bold text-[#ffb4ab]">(021) 8891-1100</span>
              </a>

              <a
                href="https://wa.me/6281288771101?text=Halo%20Pak%20RT%2011,%20saya%20memerlukan%20bantuan%20mendesak"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#252939]/80 hover:bg-[#252939] border border-[#3b494b]/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#65f2b5]/20 flex items-center justify-center text-[#65f2b5]">
                    <span className="material-symbols-outlined text-lg">support_agent</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-xs font-bold text-[#dfe1f6] group-hover:text-[#00f0ff] transition-colors">
                      WhatsApp Ketua RT 11
                    </span>
                    <span className="font-display text-[10px] text-[#b9cacb]">Bpk. H. Bambang (Koordinator)</span>
                  </div>
                </div>
                <span className="font-headline text-xs font-bold text-[#65f2b5] flex items-center gap-1">
                  0812-8877-1101
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CITIZEN VISUAL PHOTO COLLAGE (Environmental Documentation) */}
      <div className="pt-6 border-t border-[#3b494b]/40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-display text-xs text-[#65f2b5] uppercase tracking-widest font-semibold">
              Dokumentasi Lapangan Terpadu
            </span>
            <h2 className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff] tracking-tight">
              Kondisi Fasilitas Kampung RT 11
            </h2>
          </div>
          <span className="font-body text-xs text-[#b9cacb] hidden md:inline-block">
            Dikelola oleh Tim Perawatan Fasum Warga
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group rounded-xl overflow-hidden bg-[#171b2a] border border-[#3b494b]/30 shadow-lg relative flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Penerangan Jalan Terintegrasi"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsTGvhr05XMWS1OW21wBwFWEZHqwMImn-s-C7_TyLaURWywqkbZcaqKmPwcYk4yT_MB9QyJECFjFfdz2RWWMPOHljpf8vFAWyj4FGmTiMYH8_bVqzRhoXaCH2gI3QjpuNgOaVuLHTn9144gN7eeLOl5_3_mMQQo9KGAWZ13Tn19_iGorzLANh2Mex-_zN-jHFBy05nF_6Ks3JSp6OfyIxiB5FVA5BBgm9Kls3jeh_K5tv6beyppQKi"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#090e1c]/80 backdrop-blur-md text-[#00f0ff] font-display text-[10px] font-semibold border border-[#3b494b]/30">
                PJU & JALAN
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h4 className="font-headline text-sm font-bold text-[#dfe1f6] mb-1">
                Penerangan Jalan Terintegrasi
              </h4>
              <p className="font-body text-xs text-[#b9cacb]">
                Pemeliharaan berkala lampu penerangan jalan utama untuk menjamin kenyamanan warga pulang malam.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-xl overflow-hidden bg-[#171b2a] border border-[#3b494b]/30 shadow-lg relative flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Normalisasi Saluran Got Lingkungan"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuTY6pPjMWziirom6w_5uIIlkSb-vwhfIpKSK1CE9-weyDhg-_iZkvS4KOqb3ki5xifEW0czJ2c8ExaDsD-4yMiK4-gYtN9nB1wi21sWcSBUA9T7I6YCYx9L2AYzW9XVCw_NVpTEjXvYcaD_HREJ1TP1MBLiK6fC7tXnQ2oYOgzSroZg-YDsdCMtLsJOpTmTrB7Wo1juz_ClsHcbdea9O15fzjRnwNMhXCfb7XGbYw50M5FCVRYcKq"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#090e1c]/80 backdrop-blur-md text-[#65f2b5] font-display text-[10px] font-semibold border border-[#3b494b]/30">
                DRAINASE & AIR
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h4 className="font-headline text-sm font-bold text-[#dfe1f6] mb-1">
                Normalisasi Saluran Got Lingkungan
              </h4>
              <p className="font-body text-xs text-[#b9cacb]">
                Pembersihan sedimen lumpur berkala guna mencegah genangan dan menjaga sanitasi pemukiman sehat.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-xl overflow-hidden bg-[#171b2a] border border-[#3b494b]/30 shadow-lg relative flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Pos Ronda Sentral RT 11"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKxXUqcmIiIh0CRO0mxUqKdLv_xR_ueZYFo-Ub8GlWruTwLivgfUdJRNNqMbsUXeRStqLlXbtSXVSKCBSZMx8e42PiALsU_wLt_itCNml7Qo3lQG1zhXRP7StoiJoLvctDBVmBzhCf1WWgxiK87k0l1i3zkutuJbcPj-W5Tdp51nrgBadJE082ityDPWjKJITu97sJPD3Xfc1kfyyA4hOx9pbzKOjY9Mg820LwfGRIs6qainQ8b10f"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#090e1c]/80 backdrop-blur-md text-[#c0c1ff] font-display text-[10px] font-semibold border border-[#3b494b]/30">
                KEAMANAN POS
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h4 className="font-headline text-sm font-bold text-[#dfe1f6] mb-1">
                Pos Ronda Sentral RT 11
              </h4>
              <p className="font-body text-xs text-[#b9cacb]">
                Pusat pemantauan siskamling dan titik kumpul darurat warga yang siap siaga 24 jam setiap harinya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
