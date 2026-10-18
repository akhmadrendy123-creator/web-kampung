import React, { useState } from 'react';
import { NewsAgenda } from '../data/mockData';

interface BeritaAgendaViewProps {
  newsList: NewsAgenda[];
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const BeritaAgendaView: React.FC<BeritaAgendaViewProps> = ({
  newsList,
  onShowToast,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsAgenda | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredNews = newsList.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 p-6 rounded-xl bg-[#171b2a]/70 backdrop-blur-2xl border border-[#c0c1ff]/20 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c0c1ff]/20 text-[#c0c1ff] font-display text-xs w-fit">
          <span className="material-symbols-outlined text-sm">newspaper</span>
          <span>Warta Informasi & Kalender Kegiatan Paguyuban</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#dbfcff]">
          Berita & Agenda Komunal RT 11
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#b9cacb] max-w-3xl leading-relaxed">
          Pusat publikasi pengumuman rukun tetangga, liputan kegiatan gotong royong, agenda posyandu, serta kalender jadwal ronda malam lingkungan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Semua Berita' },
          { id: 'lingkungan', label: 'Aksi Lingkungan' },
          { id: 'kesehatan', label: 'Kesehatan & Posyandu' },
          { id: 'digital', label: 'Inovasi Digital' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full font-display text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === tab.id
                ? 'bg-[#00f0ff] text-[#006970] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-[#252939]/80 text-[#b9cacb] hover:text-[#dfe1f6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className="rounded-xl bg-[#171b2a]/80 backdrop-blur-xl border border-[#3b494b]/30 overflow-hidden flex flex-col justify-between shadow-lg hover:-translate-y-1 hover:border-[#00f0ff]/40 transition-all cursor-pointer group"
          >
            <div className="relative w-full h-48 overflow-hidden bg-[#0f1321]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full font-display text-[10px] font-semibold uppercase ${item.categoryBadge}`}
              >
                {item.category}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline text-sm font-bold text-[#dfe1f6] group-hover:text-[#dbfcff] line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-[#b9cacb] line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3b494b]/30 flex items-center justify-between font-display text-xs text-[#4edea3]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span>{item.date}</span>
                </span>
                <span className="text-[#00f0ff] font-semibold group-hover:underline">Baca Rinci →</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Jadwal Ronda Malam Regu Lengkap */}
      <div className="p-6 rounded-xl bg-[#171b2a]/80 border border-[#ffb4ab]/20 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#93000a]/30 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
              <span className="material-symbols-outlined text-2xl">shield_moon</span>
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold text-[#dbfcff]">
                Jadwal Ronda Siskamling Pekan Ini
              </h2>
              <p className="font-display text-xs text-[#b9cacb]">
                Patroli gerbang portal & lorong pemukiman demi ketenangan istirahat warga.
              </p>
            </div>
          </div>
          <span className="font-display text-[11px] text-[#65f2b5] bg-[#65f2b5]/15 px-3 py-1 rounded-full font-semibold">
            Status: Patroli Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 flex flex-col gap-1.5">
            <span className="font-display text-[10px] text-[#00f0ff] uppercase font-bold">Senin - Regu Alpha</span>
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Bpk. Tono, Hendra, Satrio</span>
            <span className="font-body text-[11px] text-[#b9cacb]">Rute: Lorong 1, 2, & Gapura Timur</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 flex flex-col gap-1.5">
            <span className="font-display text-[10px] text-[#65f2b5] uppercase font-bold">Selasa - Regu Beta</span>
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Bpk. Slamet, Dedi, Rian</span>
            <span className="font-body text-[11px] text-[#b9cacb]">Rute: Lorong 3, 4, & Taman RT</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 flex flex-col gap-1.5">
            <span className="font-display text-[10px] text-[#c0c1ff] uppercase font-bold">Rabu - Regu Gamma</span>
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Bpk. Joko, Agus, Farhan</span>
            <span className="font-body text-[11px] text-[#b9cacb]">Rute: Pos Satkamling & Portal Barat</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1b1f2e] border border-[#3b494b]/30 flex flex-col gap-1.5">
            <span className="font-display text-[10px] text-[#e1e0ff] uppercase font-bold">Kamis - Regu Delta</span>
            <span className="font-headline text-xs font-bold text-[#dfe1f6]">Bpk. Herman, Wahyu, Dani</span>
            <span className="font-body text-[11px] text-[#b9cacb]">Rute: Jalur Belakang & CCTV Central</span>
          </div>
        </div>
      </div>

      {/* Modal Detail Artikel */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-[#1b1f2e] border border-[#00f0ff]/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/30">
              <span className={`px-2.5 py-0.5 rounded-full font-display text-[10px] font-semibold uppercase ${selectedArticle.categoryBadge}`}>
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-[#252939] text-[#b9cacb] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <h2 className="font-headline text-lg sm:text-xl font-bold text-[#dbfcff]">
              {selectedArticle.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-display text-[#b9cacb]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#00f0ff]">event</span> {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#65f2b5]">schedule</span> {selectedArticle.time}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#c0c1ff]">location_on</span> {selectedArticle.location}
              </span>
            </div>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="text-sm font-body text-[#dfe1f6] leading-relaxed whitespace-pre-line">
              {selectedArticle.fullContent}
            </div>
            <div className="pt-2 border-t border-[#3b494b]/30 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
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
