import React, { useState } from 'react';
import { Officer } from '../data/mockData';

interface LayananSuratViewProps {
  officers: Officer[];
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  defaultLetterType?: string;
}

export const LayananSuratView: React.FC<LayananSuratViewProps> = ({
  officers,
  onShowToast,
  defaultLetterType = 'Surat Pengantar SKCK',
}) => {
  const [letterType, setLetterType] = useState(defaultLetterType);
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [kkNumber, setKkNumber] = useState('');
  const [birthPlaceDate, setBirthPlaceDate] = useState('');
  const [religion, setReligion] = useState('Islam');
  const [occupation, setOccupation] = useState('Karyawan Swasta');
  const [houseBlock, setHouseBlock] = useState('Blok A (Jl. Cendrawasih)');
  const [houseNumber, setHouseNumber] = useState('');
  const [letterPurpose, setLetterPurpose] = useState('');
  const [dataAccuracy, setDataAccuracy] = useState(false);

  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [generatedLetterNo, setGeneratedLetterNo] = useState('');

  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nik || !houseNumber || !letterPurpose) {
      onShowToast('Isian Belum Lengkap', 'Mohon lengkapi data pemohon dan keperluan surat.', 'error');
      return;
    }
    if (nik.length !== 16 || !/^\d+$/.test(nik)) {
      onShowToast('NIK Tidak Valid', 'NIK harus terdiri dari 16 digit angka sesuai e-KTP.', 'error');
      return;
    }

    const regNo = `470/${Math.floor(100 + Math.random() * 900)}/RT11-RW04/X/2025`;
    setGeneratedLetterNo(regNo);
    setShowPreview(true);
    onShowToast('Draf Surat Dibuat', `Draf resmi dengan No. Registrasi ${regNo} siap ditinjau.`, 'success');
  };

  const handleSendToWhatsApp = () => {
    const waText = encodeURIComponent(
      `*PERMOHONAN SURAT PENGANTAR RT 11*\n` +
      `-----------------------------------------\n` +
      `*No. Registrasi:* ${generatedLetterNo}\n` +
      `*Jenis Surat:* ${letterType}\n` +
      `*Nama Pemohon:* ${fullName}\n` +
      `*NIK:* ${nik}\n` +
      `*No. KK:* ${kkNumber || '-'}\n` +
      `*Tempat/Tgl Lahir:* ${birthPlaceDate || '-'}\n` +
      `*Pekerjaan:* ${occupation}\n` +
      `*Alamat:* ${houseBlock}, ${houseNumber}, RT 11 / RW 04\n` +
      `*Keperluan:* ${letterPurpose}\n` +
      `-----------------------------------------\n` +
      `_Diajukan via Portal Digital Warga Robo-Tarun RT 11_`
    );

    const targetWA = `https://wa.me/6281288771101?text=${waText}`;
    onShowToast('Menghubungkan ke WhatsApp', 'Membuka chat Ketua RT 11 untuk tanda tangan digital...', 'success');
    window.open(targetWA, '_blank');
  };

  const handlePrintSimulation = () => {
    window.print();
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 p-6 rounded-xl bg-[#171b2a]/70 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-display text-xs w-fit">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span>Layanan Administrasi Persuratan Mandiri</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff]">
          Layanan Surat Pengantar Online RT 11
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#b9cacb] max-w-3xl leading-relaxed">
          Ajukan surat pengantar resmi RT 11 dari rumah tanpa harus menunggu jam temu tatap muka. Format surat standar kelurahan dan kepolisian dikompilasi instan dengan kode QR validasi keaslian berkas.
        </p>
      </div>

      {/* 3 Step Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1b1f2e]/60 border border-[#3b494b]/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center font-headline font-bold text-base shrink-0">
            1
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Isi Data e-KTP</span>
            <span className="font-body text-xs text-[#b9cacb]">NIK, nama, alamat, & keperluan</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1f2e]/60 border border-[#3b494b]/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#c0c1ff]/20 text-[#c0c1ff] flex items-center justify-center font-headline font-bold text-base shrink-0">
            2
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Pratinjau Kop Resmi</span>
            <span className="font-body text-xs text-[#b9cacb]">Draf surat berkode QR unik</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1f2e]/60 border border-[#3b494b]/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] flex items-center justify-center font-headline font-bold text-base shrink-0">
            3
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Tanda Tangan & Selesai</span>
            <span className="font-body text-xs text-[#b9cacb]">Kirim ke WhatsApp Pengurus RT</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-6 p-6 rounded-xl bg-[#171b2a]/80 backdrop-blur-2xl border border-[#00f0ff]/20 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/30">
            <h2 className="font-headline text-base font-bold text-[#dbfcff] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff]">edit_document</span>
              <span>Data Permohonan Surat</span>
            </h2>
            <span className="font-display text-[10px] text-[#65f2b5] bg-[#65f2b5]/15 px-2 py-0.5 rounded">
              Waktu Proses: ~15 Menit
            </span>
          </div>

          <form onSubmit={handleGeneratePreview} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-type">
                Pilih Jenis Surat
              </label>
              <select
                id="ls-type"
                value={letterType}
                onChange={(e) => setLetterType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="Surat Pengantar SKCK">Surat Pengantar SKCK (Kepolisian)</option>
                <option value="Surat Keterangan Domisili Tinggal">Keterangan Domisili Tinggal</option>
                <option value="Surat Keterangan Usaha UMKM">Keterangan Usaha UMKM Lingkungan</option>
                <option value="Surat Pengantar Pembuatan KTP/KK">Pengantar Pembuatan / Perubahan KTP & KK</option>
                <option value="Surat Keterangan Tidak Mampu (SKTM)">Keterangan Kurang Mampu (SKTM)</option>
                <option value="Surat Izin Keramaian & Acara">Surat Izin Keramaian / Penggunaan Balai</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-name">
                  Nama Lengkap Pemohon
                </label>
                <input
                  id="ls-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sesuai e-KTP"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-nik">
                  NIK (16 Digit)
                </label>
                <input
                  id="ls-nik"
                  type="text"
                  maxLength={16}
                  required
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="3201..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-kk">
                  Nomor Kartu Keluarga (KK)
                </label>
                <input
                  id="ls-kk"
                  type="text"
                  maxLength={16}
                  value={kkNumber}
                  onChange={(e) => setKkNumber(e.target.value)}
                  placeholder="16 Digit No. KK (Opsional)"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-bday">
                  Tempat, Tanggal Lahir
                </label>
                <input
                  id="ls-bday"
                  type="text"
                  value={birthPlaceDate}
                  onChange={(e) => setBirthPlaceDate(e.target.value)}
                  placeholder="Contoh: Jakarta, 15-08-1992"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-religion">
                  Agama
                </label>
                <select
                  id="ls-religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Islam">Islam</option>
                  <option value="Kristen Protestan">Kristen Protestan</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-job">
                  Pekerjaan
                </label>
                <input
                  id="ls-job"
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Pekerjaan saat ini"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-block">
                  Blok Wilayah
                </label>
                <select
                  id="ls-block"
                  value={houseBlock}
                  onChange={(e) => setHouseBlock(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Blok A (Jl. Cendrawasih)">Blok A</option>
                  <option value="Blok B (Jl. Rajawali)">Blok B</option>
                  <option value="Blok C (Jl. Garuda)">Blok C</option>
                  <option value="Blok D (Jl. Merpati)">Blok D</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-house">
                  No. Rumah RT 11
                </label>
                <input
                  id="ls-house"
                  type="text"
                  required
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="Contoh: No. 12B RT 11 / RW 04"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-display text-xs text-[#dfe1f6] font-semibold" htmlFor="ls-purpose">
                Keperluan Pengajuan Surat
              </label>
              <textarea
                id="ls-purpose"
                rows={3}
                required
                value={letterPurpose}
                onChange={(e) => setLetterPurpose(e.target.value)}
                placeholder="Misalnya: Persyaratan pengurusan SKCK di Polsek Sukamaju untuk melamar pekerjaan BUMN..."
                className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff] resize-none"
              />
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded bg-[#252939]/40 border border-[#3b494b]/20">
              <input
                id="ls-accuracy"
                type="checkbox"
                required
                checked={dataAccuracy}
                onChange={(e) => setDataAccuracy(e.target.checked)}
                className="mt-0.5 accent-[#00f0ff] cursor-pointer"
              />
              <label htmlFor="ls-accuracy" className="font-body text-xs text-[#b9cacb] cursor-pointer">
                Saya menyatakan data di atas benar warga RT 11 dan siap bertanggung jawab secara hukum.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">preview</span>
              <span>Kompilasi Draf Surat Resmi</span>
            </button>
          </form>
        </div>

        {/* Right Preview Letter */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-6 rounded-xl bg-white text-slate-900 shadow-2xl flex flex-col gap-4 border border-slate-300 relative print:m-0 print:border-none print:shadow-none min-h-[520px]">
            {/* Kop Surat Resmi */}
            <div className="text-center pb-3 border-b-2 border-slate-900 flex flex-col items-center">
              <span className="font-headline text-xs font-bold tracking-widest uppercase text-slate-700">
                RUKUN TETANGGA 11 / RUKUN WARGA 04
              </span>
              <span className="font-headline text-sm font-extrabold uppercase text-slate-900">
                KELURAHAN SUKAMAJU • KECAMATAN DIRGANTARA
              </span>
              <span className="font-body text-[11px] text-slate-600">
                Sekretariat: Balai Warga RT 11, Jl. Taruna Dirgantara No. 11 • Email: sekretariat@rt11bersahaja.id
              </span>
            </div>

            {/* Judul & Nomor Registrasi */}
            <div className="text-center my-2">
              <h3 className="font-headline text-sm font-extrabold underline uppercase tracking-wide">
                {letterType.toUpperCase()}
              </h3>
              <p className="font-display text-xs text-slate-600 mt-0.5">
                Nomor: {showPreview ? generatedLetterNo : '470/.../RT11-RW04/X/2025'}
              </p>
            </div>

            {/* Isi Surat */}
            <div className="text-xs font-body text-slate-800 leading-relaxed flex flex-col gap-2">
              <p>
                Yang bertanda tangan di bawah ini Ketua Rukun Tetangga (RT) 11 RW 04 Kelurahan Sukamaju, dengan ini menerangkan bahwa:
              </p>

              <div className="grid grid-cols-3 gap-1 pl-4 py-1">
                <span className="text-slate-600">Nama Lengkap</span>
                <span className="col-span-2 font-bold">: {fullName || '...........................................'}</span>

                <span className="text-slate-600">NIK</span>
                <span className="col-span-2 font-bold">: {nik || '...........................................'}</span>

                <span className="text-slate-600">No. Kartu Keluarga</span>
                <span className="col-span-2">: {kkNumber || '-'}</span>

                <span className="text-slate-600">Tempat, Tgl Lahir</span>
                <span className="col-span-2">: {birthPlaceDate || '-'}</span>

                <span className="text-slate-600">Agama / Pekerjaan</span>
                <span className="col-span-2">: {religion} / {occupation}</span>

                <span className="text-slate-600">Alamat Domisili</span>
                <span className="col-span-2 font-medium">: {houseBlock}, {houseNumber || '................'}, RT 11 / RW 04</span>
              </div>

              <p>
                Bahwa orang tersebut di atas adalah benar-benar warga yang berdomisili di lingkungan RT 11 / RW 04 Kelurahan Sukamaju dan berkelakuan baik.
              </p>

              <p>
                Surat keterangan pengantar ini dibuat untuk keperluan:{' '}
                <span className="font-semibold underline">
                  {letterPurpose || '......................................................................................'}
                </span>
              </p>

              <p>
                Demikian surat pengantar ini diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya.
              </p>
            </div>

            {/* Tanda Tangan & QR Verification */}
            <div className="mt-auto pt-4 flex items-end justify-between text-xs font-body text-slate-800 border-t border-slate-200">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-slate-300 rounded p-1 flex items-center justify-center bg-slate-50">
                  <span className="material-symbols-outlined text-3xl text-cyan-600">qr_code_2</span>
                </div>
                <span className="font-display text-[9px] text-slate-500 mt-1">E-Validasi RT 11</span>
              </div>

              <div className="flex flex-col text-center min-w-[160px]">
                <span>Sukamaju, 17 Oktober 2025</span>
                <span className="font-medium mt-1">Ketua RT 11 RW 04</span>
                <div className="h-14 flex items-center justify-center text-cyan-700 italic font-bold">
                  [Tanda Tangan Digital]
                </div>
                <span className="font-bold underline">Bpk. H. Bambang Sutrisno</span>
              </div>
            </div>
          </div>

          {/* Action Bar for Preview */}
          {showPreview && (
            <div className="p-4 rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-display text-[#65f2b5]">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Draf Berhasil Dikompilasi</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintSimulation}
                  className="px-3.5 py-2 rounded-lg bg-[#252939] text-[#dfe1f6] hover:bg-[#303444] font-display text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Cetak / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,240,255,0.4)] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Kirim ke WA Pengurus</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
