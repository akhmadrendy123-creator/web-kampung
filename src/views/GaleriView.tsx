import React, { useState } from 'react';
import { GalleryItem } from '../data/mockData';

interface GaleriViewProps {
  galleryList: GalleryItem[];
  onAddGalleryItem?: (item: GalleryItem) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const GaleriView: React.FC<GaleriViewProps> = ({
  galleryList,
  onAddGalleryItem,
  onShowToast,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAlbum, setNewAlbum] = useState<'kerja-bakti' | 'senam' | 'kemerdekaan' | 'posyandu'>('kerja-bakti');
  const [newDesc, setNewDesc] = useState('');
  const [newParticipants, setNewParticipants] = useState('');

  const filteredGallery = galleryList.filter((item) => {
    if (selectedAlbum === 'all') return true;
    return item.album === selectedAlbum;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      onShowToast('Isian Belum Lengkap', 'Mohon beri judul dan deskripsi foto kegiatan.', 'error');
      return;
    }

    const albumLabels = {
      'kerja-bakti': 'Kerja Bakti',
      senam: 'Senam & Olahraga',
      kemerdekaan: 'Peringatan Hari Kemerdekaan',
      posyandu: 'Posyandu Bougenville',
    };

    const newItem: GalleryItem = {
      id: `gal-custom-${Date.now()}`,
      title: newTitle,
      album: newAlbum,
      albumLabel: albumLabels[newAlbum],
      date: 'Baru saja',
      participants: newParticipants || 'Warga RT 11',
      description: newDesc,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDIdm7uTXdhX5KRuAO0ahvio2PzC91hYZbmfSuQdcOiKXsmfWtn9s_izWxPmKRgpzvrINlRhnem9vrG_YMWaKLNGXNDh3H_ILfwMRgolAAFRTtEDNptxKR9iDT-g8pbuGdVEF7yLnEUHxv-0rUrabXP48CAlhhPmMoNu0F6ffXM9IDEQ2yq7o6o7nlIC80I0b3P91QRuzRDz2eNzc3dF-yDedRYR9SD4_qH2jDY1V0xKWbYVf0kIC7I',
      imageAlt: newTitle,
    };

    if (onAddGalleryItem) {
      onAddGalleryItem(newItem);
    }
    setUploadModalOpen(false);
    onShowToast('Foto Disimpan ke Galeri', 'Kontribusi foto kegiatan berhasil diunggah ke arsip publik!', 'success');

    setNewTitle('');
    setNewDesc('');
    setNewParticipants('');
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl bg-[#171b2a]/70 backdrop-blur-2xl border border-[#65f2b5]/20 shadow-xl">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] font-display text-xs w-fit">
            <span className="material-symbols-outlined text-sm">collections</span>
            <span>Album Komunal RT 11</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff]">
            Galeri Dokumentasi Kegiatan Warga
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
            Kumpulan momen gotong royong, senam bugar, kemeriahan HUT Kemerdekaan, dan kegiatan posyandu lingkungan RT 11 Kampung Bersahaja.
          </p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
          <span>Upload Foto Kegiatan</span>
        </button>
      </div>

      {/* Album Filters */}
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
            className={`px-4 py-2 rounded-full font-display text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedAlbum === alb.id
                ? 'bg-[#00f0ff] text-[#006970] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-[#252939]/80 text-[#b9cacb] hover:text-[#dfe1f6]'
            }`}
          >
            {alb.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMedia(item)}
            className="group rounded-xl bg-[#171b2a]/80 backdrop-blur-xl border border-[#3b494b]/30 p-3.5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#00f0ff]/40 hover:shadow-cyan-500/10 cursor-pointer"
          >
            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-[#0f1321]">
              <img
                alt={item.title}
                src={item.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0f1321]/80 backdrop-blur-md font-display text-[10px] text-[#00f0ff] font-semibold border border-[#3b494b]/30">
                {item.albumLabel}
              </span>
              {item.isVideo && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#00f0ff]/90 text-[#006970] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">play_arrow</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 pt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[#b9cacb] font-display text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#00f0ff]">calendar_month</span> {item.date}
                </span>
                <span className="text-[#65f2b5]">{item.participants}</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-[#dfe1f6] group-hover:text-[#dbfcff] transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-xs text-[#b9cacb] line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-[#090e1c]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs px-2.5 py-0.5 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-semibold uppercase">
                {activeMedia.albumLabel} • {activeMedia.date}
              </span>
              <button
                onClick={() => setActiveMedia(null)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#dbfcff]">
              {activeMedia.title}
            </h3>
            <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeMedia.image}
                alt={activeMedia.title}
                className="w-full h-full object-contain"
              />
              {activeMedia.isVideo && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#00f0ff] text-[#006970] flex items-center justify-center shadow-lg mb-2">
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </div>
                  <span className="font-headline text-sm text-white font-bold">
                    Pemutaran Video Dokumentasi RT 11
                  </span>
                  <span className="text-xs text-[#dbfcff]">Durasi: {activeMedia.videoDuration || '03:45'}</span>
                </div>
              )}
            </div>
            <p className="font-body text-xs sm:text-sm text-[#b9cacb] leading-relaxed">
              {activeMedia.description}
            </p>
            <div className="flex justify-end pt-2 border-t border-[#3b494b]/30">
              <button
                onClick={() => setActiveMedia(null)}
                className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#090e1c]/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-[#171b2a] border border-[#00f0ff]/30 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-[#dbfcff]">
                Upload Foto Kegiatan Warga
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6]">Judul Kegiatan</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Kerja Bakti Pengecatan Balai RT"
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-display text-xs text-[#dfe1f6]">Kategori Album</label>
                  <select
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="kerja-bakti">Kerja Bakti & Lingkungan</option>
                    <option value="senam">Senam & Olahraga</option>
                    <option value="kemerdekaan">Peringatan Hari Kemerdekaan</option>
                    <option value="posyandu">Posyandu Bougenville</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-display text-xs text-[#dfe1f6]">Jumlah Partisipan</label>
                  <input
                    type="text"
                    value={newParticipants}
                    onChange={(e) => setNewParticipants(e.target.value)}
                    placeholder="Contoh: 30 Warga"
                    className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs text-[#dfe1f6]">Keterangan Foto</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ceritakan momen kegiatan yang diabadikan..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090e1c] border border-[#3b494b]/40 text-[#dfe1f6] text-xs font-body focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#252939] text-[#b9cacb] font-display text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
                >
                  Simpan ke Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
