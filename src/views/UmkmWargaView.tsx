import React, { useState } from 'react';
import { UmkmItem, GalleryItem } from '../data/mockData';

interface UmkmWargaViewProps {
  umkmList: UmkmItem[];
  galleryList: GalleryItem[];
  onAddUmkm: (newUmkm: UmkmItem) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  onOpenSuratModal?: (type?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const UmkmWargaView: React.FC<UmkmWargaViewProps> = ({
  umkmList,
  galleryList,
  onAddUmkm,
  onShowToast,
  onNavigateTab,
}) => {
  const [selectedUmkmCategory, setSelectedUmkmCategory] = useState<string>('all');
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Register Modal State
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newBizCat, setNewBizCat] = useState<'kuliner' | 'jasa' | 'kerajinan' | 'harian'>('kuliner');
  const [newBizPhone, setNewBizPhone] = useState('');
  const [newBizAddress, setNewBizAddress] = useState('');
  const [newBizDesc, setNewBizDesc] = useState('');

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);

  // Filtered UMKM
  const filteredUmkm = umkmList.filter((item) => {
    const matchesCat = selectedUmkmCategory === 'all' || item.category === selectedUmkmCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered Gallery
  const filteredGallery = galleryList.filter((item) => {
    if (selectedAlbum === 'all') return true;
    return item.album === selectedAlbum;
  });

  const videoItems = filteredGallery.filter((item) => item.isVideo);
  const photoItems = filteredGallery.filter((item) => !item.isVideo);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName || !newBizPhone || !newBizAddress || !newBizDesc) {
      onShowToast('Data Belum Lengkap', 'Mohon lengkapi seluruh kolom formulir.', 'error');
      return;
    }

    const catLabels = {
      kuliner: 'Kuliner & Snack',
      jasa: 'Jasa & Bengkel',
      kerajinan: 'Kerajinan Tangan',
      harian: 'Kebutuhan Harian',
    };

    const newEntry: UmkmItem = {
      id: `umkm-${Date.now()}`,
      name: newBizName,
      category: newBizCat,
      categoryLabel: catLabels[newBizCat],
      description: newBizDesc,
      address: newBizAddress,
      locationNotes: 'Warga RT 11 Terverifikasi',
      priceNote: 'Harga Ramah Tetangga',
      badge: 'Warga Terverifikasi',
      image:
        newBizCat === 'kuliner'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWQp9ywe_IsbDHN8EGwJRc_kRpDUm_vElFAIaqeZVbXzYzUchcHz0A1WJb2zGkIvR6NBfy3CO9d1eukRlOFNwa7T6wdeP_rY1kSTo9-V6R98xWZamcHq_ccmdJP2hdWUx-bEbYq9IFPAj5bM_G22KmkYURXGIWi92Cwo4_cqgqMFAT0gvncOZneBIexc47aTtYi1I1e8AshgcxKZ_dpzFrbaBRTslq_ov-SCkcLlZuNyzY0sapsLN'
          : newBizCat === 'jasa'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvljfN7y86MyRikQ9sP9L60q0jPpYw1AM4tMEhU0GIN87TKCDhIoDLy0boDQEKwKI-P_A_TPOuwzUffOPfIV3axrpdOyCy0r1en0l8KSZhHWnQnKYI5h--98Qc7WXMDkjUqi1Xgu1Q4-ywDi9fMfF52yfnd38wSGSAaF6FkGnBsEUmbhZKkrjh6F0qzB3vdq3BYFqFaiXsdMxQbGf8QzDjZ91SNzcUt71HicKAXiK7sLZlg6vDXaD5'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOIErrSlHPmEHtRv-Jc74_XehUPQwQ_dRz-ATDI_KWsAgI7ySePfVNiLftqhz8MwSpWC9fnAbzCIwcy1HglF3trj3ID0lSe4gWAa3GFeg-VhXrU_6JhhXDlE8U9_FDwulDX3tMbj3hbhIR-qML1EfzEnyC4s3by_-xj0LH4_3GSmyOzGxiCw2eDqfep6cXfRsyVb6O9x7vOROSqOY0S2wz2jxf1ldSGu8AXh0iNGsUhBxOE2Xwvw4D',
      imageAlt: newBizName,
      phone: newBizPhone.replace(/\D/g, ''),
      waText: `Halo ${newBizName}, saya warga RT 11 ingin membeli/memesan produk Anda`,
    };

    onAddUmkm(newEntry);
    setRegisterModalOpen(false);
    onShowToast(
      'Pendaftaran Berhasil',
      `Usaha "${newBizName}" berhasil ditambahkan ke etalase UMKM RT 11!`,
      'success'
    );
    // Reset form
    setNewBizName('');
    setNewBizPhone('');
    setNewBizAddress('');
    setNewBizDesc('');
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-xl bg-[#171b2a]/75 backdrop-blur-2xl border border-[#00f0ff]/20 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#252939]/90 border border-[#65f2b5]/30 w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#65f2b5] animate-pulse"></span>
            <span className="font-display text-[10px] uppercase tracking-widest text-[#65f2b5] font-semibold">
              Ekonomi Kerakyatan & Guyub Rukun
            </span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff] tracking-tight">
            Katalog Produk UMKM Warga & Dokumentasi Kegiatan RT 11
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
            Pemberdayaan potensi mandiri, penguatan rantai pasok antar-tetangga, serta etalase memori kebersamaan komunal warga RT 11 Kampung Bersahaja yang terintegrasi secara digital.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">storefront</span>
            <span>Daftarkan Usaha Anda</span>
          </button>
        </div>
      </div>

      {/* Telemetry Stats Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#b9cacb] font-display text-xs uppercase tracking-wider mb-1">
            <span>Total UMKM Aktif</span>
            <span className="material-symbols-outlined text-[#00f0ff] text-xl">store</span>
          </div>
          <span className="font-headline text-2xl sm:text-3xl font-bold text-[#dbfcff]">
            {umkmList.length}
          </span>
          <span className="font-display text-[11px] text-[#65f2b5] flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-xs">trending_up</span> 100% Terverifikasi Warga
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#b9cacb] font-display text-xs uppercase tracking-wider mb-1">
            <span>Perputaran Kas Lokal</span>
            <span className="material-symbols-outlined text-[#d8ffe7] text-xl">account_balance_wallet</span>
          </div>
          <span className="font-headline text-2xl sm:text-3xl font-bold text-[#d8ffe7]">Rp 34,2 Jt</span>
          <span className="font-display text-[11px] text-[#b9cacb] mt-1">Estimasi transaksi bulanan</span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#b9cacb] font-display text-xs uppercase tracking-wider mb-1">
            <span>Partisipasi Gotong Royong</span>
            <span className="material-symbols-outlined text-[#c0c1ff] text-xl">groups</span>
          </div>
          <span className="font-headline text-2xl sm:text-3xl font-bold text-[#c0c1ff]">94.8%</span>
          <span className="font-display text-[11px] text-[#c0c1ff] mt-1">Tingkat kehadiran warga</span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-[#171b2a]/70 backdrop-blur-xl border border-[#3b494b]/30 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#b9cacb] font-display text-xs uppercase tracking-wider mb-1">
            <span>Dokumentasi Tersimpan</span>
            <span className="material-symbols-outlined text-[#00dbe9] text-xl">photo_library</span>
          </div>
          <span className="font-headline text-2xl sm:text-3xl font-bold text-[#00dbe9]">142</span>
          <span className="font-display text-[11px] text-[#b9cacb] mt-1">Foto & rekaman kegiatan</span>
        </div>
      </div>

      {/* Section 1: Katalog UMKM Binaan */}
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#00f0ff] font-display text-xs uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
              <span>Klaster Niaga RT 11</span>
            </div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#dfe1f6]">
              Katalog UMKM Binaan Warga RT 11
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb]">
              Dukung ekonomi tetangga dekat: belanja amanah, ongkir gratis antar-gang, dan kualitas terjamin.
            </p>
          </div>

          {/* Filter Kategori Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'Semua Usaha' },
              { id: 'kuliner', label: 'Kuliner & Snack' },
              { id: 'jasa', label: 'Jasa & Bengkel' },
              { id: 'kerajinan', label: 'Kerajinan Tangan' },
              { id: 'harian', label: 'Kebutuhan Harian' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedUmkmCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-display text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedUmkmCategory === cat.id
                    ? 'bg-[#00f0ff] text-[#006970] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-[#252939]/80 text-[#b9cacb] hover:text-[#dfe1f6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input for UMKM */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849495] text-base">
            search
          </span>
          <input
            type="text"
            placeholder="Cari produk, warung, atau nama pemilik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#171b2a]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
          />
        </div>

        {/* Grid Kartu UMKM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUmkm.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl bg-[#171b2a]/80 backdrop-blur-xl border border-[#3b494b]/30 p-4 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,240,255,0.15)] hover:border-[#00f0ff]/40 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#1b1f2e]">
                  <img
                    alt={item.name}
                    src={item.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-[#0f1321]/80 backdrop-blur-md border border-[#65f2b5]/30">
                    <span className="material-symbols-outlined text-[#65f2b5] text-xs">verified</span>
                    <span className="font-display text-[10px] text-[#65f2b5] font-semibold">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0f1321]/85 backdrop-blur-md font-display text-[10px] text-[#dfe1f6]">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-headline text-base font-bold text-[#dbfcff] group-hover:text-[#00f0ff] transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-body text-xs text-[#b9cacb] line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-display text-xs text-[#b9cacb]">
                  <span className="material-symbols-outlined text-[#00f0ff] text-base">pin_drop</span>
                  <span>{item.address} ({item.locationNotes})</span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#3b494b]/30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-[10px] text-[#b9cacb]">Keterangan</span>
                  <span className="font-display text-xs text-[#d8ffe7] font-semibold">
                    {item.priceNote}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${item.phone}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Beli via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
          {filteredUmkm.length === 0 && (
            <div className="col-span-full py-12 text-center text-[#849495] font-body text-sm bg-[#171b2a]/50 rounded-xl border border-[#3b494b]/30">
              Tidak ada UMKM yang cocok dengan filter atau kata kunci. Silakan coba filter lainnya.
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Galeri Dokumentasi Kegiatan Kampung */}
      <div className="flex flex-col gap-6 pt-8 border-t border-[#3b494b]/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#d8ffe7] font-display text-xs uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65f2b5]"></span>
              <span>Arsip Guyub Rukun</span>
            </div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#dfe1f6]">
              Galeri Dokumentasi Kegiatan Kampung RT 11
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb]">
              Rekam jejak sinergi, kebersihan lingkungan, serta kegembiraan anak dan sesepuh di lingkungan kita.
            </p>
          </div>

          {/* Album Nav Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'Semua Dokumentasi' },
              { id: 'kerja-bakti', label: 'Kerja Bakti & Lingkungan' },
              { id: 'senam', label: 'Senam & Olahraga Minggu' },
              { id: 'kemerdekaan', label: 'Peringatan Hari Kemerdekaan' },
              { id: 'posyandu', label: 'Posyandu Bougenville' },
            ].map((alb) => (
              <button
                key={alb.id}
                onClick={() => setSelectedAlbum(alb.id)}
                className={`px-3 py-1.5 rounded-full font-display text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedAlbum === alb.id
                    ? 'bg-[#252939] text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'bg-[#252939]/60 text-[#b9cacb] hover:text-[#dfe1f6]'
                }`}
              >
                {alb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlight Video Banner Mosaic */}
        {videoItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {videoItems.map((vid, idx) => {
              const colSpan = idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5';
              return (
                <div
                  key={vid.id}
                  className={`${colSpan} rounded-xl bg-[#171b2a]/90 backdrop-blur-xl border border-[#3b494b]/30 p-4 shadow-xl flex flex-col justify-between group overflow-hidden`}
                >
                  <div
                    onClick={() => setActiveVideo(vid)}
                    className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden bg-[#0f1321] cursor-pointer"
                  >
                    <img
                      alt={vid.title}
                      src={vid.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0f1321]/40 backdrop-blur-[1px] flex items-center justify-center">
                      <button
                        className="w-16 h-16 rounded-full bg-[#00f0ff]/90 text-[#006970] flex items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform cursor-pointer"
                        title="Putar Video Highlight"
                      >
                        <span className="material-symbols-outlined text-3xl">play_arrow</span>
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0f1321]/80 backdrop-blur-md flex items-center gap-1.5 border border-[#3b494b]/30">
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
                      <span className="font-display text-[10px] text-[#dfe1f6] font-semibold uppercase">
                        Video Highlight
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-0.5 rounded bg-[#0f1321]/90 font-display text-[11px] text-[#dfe1f6]">
                      {vid.videoDuration || 'HD'}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-[#b9cacb] font-display text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#00f0ff]">calendar_month</span> {vid.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#65f2b5]">groups</span> {vid.participants}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#252939] font-display text-[10px] text-[#00f0ff]">
                        {vid.albumLabel}
                      </span>
                    </div>
                    <h3 className="font-headline text-base font-bold text-[#dfe1f6] group-hover:text-[#dbfcff] transition-colors">
                      {vid.title}
                    </h3>
                    <p className="font-body text-xs text-[#b9cacb] leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Photo Cards Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoItems.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveVideo(photo)}
              className="group rounded-xl bg-[#171b2a]/75 backdrop-blur-xl border border-[#3b494b]/30 p-3 shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#00f0ff]/40 hover:shadow-xl cursor-pointer"
            >
              <div className="relative w-full h-52 rounded-lg overflow-hidden bg-[#0f1321]">
                <img
                  alt={photo.title}
                  src={photo.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0f1321]/80 backdrop-blur-md font-display text-[10px] text-[#00f0ff] font-semibold border border-[#3b494b]/30">
                  {photo.albumLabel}
                </div>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[#b9cacb] font-display text-[10px]">
                  <span>{photo.date}</span>
                  <span className="text-[#65f2b5]">{photo.participants}</span>
                </div>
                <h4 className="font-headline text-xs font-bold text-[#dfe1f6] group-hover:text-[#dbfcff] transition-colors">
                  {photo.title}
                </h4>
                <p className="font-body text-xs text-[#b9cacb] line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Robo-Tarun Interactive Assistant Dock */}
        <div className="rounded-xl bg-[#1b1f2e]/85 backdrop-blur-2xl border border-[#00f0ff]/30 p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-20 h-20 shrink-0 rounded-full bg-[#252939] border border-[#00f0ff]/40 flex items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.3)]">
            <span className="material-symbols-outlined text-4xl text-[#00f0ff] animate-pulse">
              smart_toy
            </span>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#65f2b5] ring-2 ring-[#0f1321]"></span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-1 font-display text-xs text-[#00f0ff] uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-sm">memory</span>
              <span>Robo-Tarun Node Advisory</span>
            </div>
            <h3 className="font-headline text-base font-bold text-[#dbfcff]">
              Punya Usaha Rumahan atau Dokumentasi Momen Warga?
            </h3>
            <p className="font-body text-xs text-[#b9cacb] max-w-2xl leading-relaxed">
              Kolektif data UMKM diperbarui setiap minggu secara otomatis. Setiap transaksi antar-warga membantu kemandirian RT 11. Hubungi admin sekretariat jika ingin menambahkan foto kenangan kegiatan ke galeri publik.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-[#252939] text-[#00f0ff] hover:bg-[#303444] border border-[#00f0ff]/30 font-display text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              Daftar Usaha Baru
            </button>
            <a
              href="https://wa.me/6281288771101?text=Halo%20Sekretariat%20RT%2011,%20saya%20ingin%20kirim%20foto%20dokumentasi%20kegiatan"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold hover:shadow-[0_0_16px_rgba(0,240,255,0.4)] transition-all"
            >
              Kirim Foto (WA)
            </a>
          </div>
        </div>
      </div>

      {/* Modal Pendaftaran UMKM (Glassmorphism Tier 3) */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#090e1c]/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-xl bg-[#171b2a]/95 backdrop-blur-2xl border border-[#00f0ff]/30 p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_24px_rgba(0,240,255,0.2)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-2xl">app_registration</span>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff]">
                  Daftar UMKM Warga RT 11
                </h3>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <p className="font-body text-xs text-[#b9cacb]">
              Lengkapi data usaha rumahan Anda untuk divalidasi oleh Tim Pengurus RT 11 dan ditampilkan pada etalase portal warga.
            </p>
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-medium">Nama Usaha / Merk Dagang</label>
                <input
                  type="text"
                  required
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  placeholder="Contoh: Dapur Kue Bu Endang"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#252939]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-display text-xs text-[#dfe1f6] font-medium">Kategori Produk</label>
                  <select
                    value={newBizCat}
                    onChange={(e) => setNewBizCat(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#252939]/80 border border-[#3b494b]/40 text-[#dfe1f6] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="kuliner">Kuliner & Snack</option>
                    <option value="jasa">Jasa & Bengkel</option>
                    <option value="kerajinan">Kerajinan Tangan</option>
                    <option value="harian">Kebutuhan Harian / Sembako</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-display text-xs text-[#dfe1f6] font-medium">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    value={newBizPhone}
                    onChange={(e) => setNewBizPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#252939]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-medium">Alamat Rumah / Lokasi di RT 11</label>
                <input
                  type="text"
                  required
                  value={newBizAddress}
                  onChange={(e) => setNewBizAddress(e.target.value)}
                  placeholder="Contoh: Blok C No. 14 / Gang 2"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#252939]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6] font-medium">Deskripsi Singkat Produk & Layanan</label>
                <textarea
                  rows={3}
                  required
                  value={newBizDesc}
                  onChange={(e) => setNewBizDesc(e.target.value)}
                  placeholder="Tuliskan varian menu, jam operasional, atau ketentuan antar ke tetangga..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#252939]/80 border border-[#3b494b]/40 text-[#dfe1f6] placeholder:text-[#849495] font-body text-xs focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#252939] text-[#b9cacb] hover:text-[#dfe1f6] font-display text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:shadow-[0_0_24px_rgba(0,240,255,0.7)] transition-all cursor-pointer"
                >
                  Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-[#090e1c]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs px-2.5 py-0.5 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-semibold uppercase">
                  {activeVideo.albumLabel}
                </span>
                <span className="text-xs text-[#b9cacb]">{activeVideo.date}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#dbfcff]">
              {activeVideo.title}
            </h3>
            <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeVideo.image}
                alt={activeVideo.title}
                className="w-full h-full object-contain"
              />
              {activeVideo.isVideo && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#00f0ff] text-[#006970] flex items-center justify-center shadow-lg mb-2">
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </div>
                  <span className="font-headline text-sm text-white font-bold">
                    Pemutaran Video Dokumentasi RT 11
                  </span>
                  <span className="text-xs text-[#dbfcff]">Durasi: {activeVideo.videoDuration || '03:45'}</span>
                </div>
              )}
            </div>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
              {activeVideo.description}
            </p>
            <div className="flex justify-end pt-2 border-t border-[#3b494b]/30">
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
