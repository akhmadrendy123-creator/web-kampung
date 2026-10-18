import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSuratModal?: () => void;
  onOpenProfileModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSuratModal,
  onOpenProfileModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil-pengurus', label: 'Profil Pengurus' },
    { id: 'berita-agenda', label: 'Berita & Agenda' },
    { id: 'transparansi-kas', label: 'Transparansi Kas' },
    { id: 'layanan-surat', label: 'Layanan Surat' },
    { id: 'umkm-warga', label: 'UMKM Warga' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'form-aduan', label: 'Form Aduan' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1321]/75 backdrop-blur-xl border-b border-[#00f0ff]/20 shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('beranda')}
        >
          <img
            alt="Logo Portal Warga RT 11"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Xi6JOedtvrktp_HIpeiTUdx9ZpR-HT53xziwfl_5HBidZqW8GUnZOXjHcZvvn02GF1xEDWtoOas3vcRVi7frqc1oBWULKmAXWY-E0Xxj-SGkCChNpyrKMjKQ4VeL9TAJRuWsBfv9FCTNjmJCVDaKpPIZQPFzL1Ujkx9JyUN3nYsxrcnS4sHLN30WlYI_YvJ5mtkbmt_nx5uYq_cBeDpLAGTTTs9amZLFuc4VDFidX_29I7Usp01ErrQE4"
          />
          <div className="flex flex-col">
            <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-[#dbfcff] leading-none">
              PORTAL RT 11
            </span>
            <span className="font-display text-[10px] tracking-widest uppercase text-[#4edea3]">
              Robo-Tarun Node
            </span>
          </div>
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#252939]/80 border border-[#65f2b5]/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#65f2b5] animate-pulse"></span>
            <span className="font-display text-[10px] text-[#65f2b5] uppercase tracking-wider font-semibold">
              Online 24/7
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-display text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#00f0ff] text-[#006970] shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'text-[#b9cacb] hover:text-[#dfe1f6] hover:bg-[#252939]/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Quick CTA & Profile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onOpenSuratModal) onOpenSuratModal();
              else handleNavClick('layanan-surat');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold shadow-[0_0_16px_rgba(0,240,255,0.35)] hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">description</span>
            <span>Buat Surat</span>
          </button>

          <button
            onClick={onOpenProfileModal}
            className="w-8 h-8 rounded-full bg-[#dbfcff] text-[#00363a] flex items-center justify-center ring-2 ring-[#00f0ff]/40 hover:ring-[#00f0ff] transition-all cursor-pointer"
            title="Profil & Status Warga"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#dfe1f6] hover:bg-[#252939] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f1321]/95 backdrop-blur-2xl border-b border-[#00f0ff]/20 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left font-display text-sm font-semibold px-3 py-2.5 rounded-lg transition-all ${
                activeTab === link.id
                  ? 'bg-[#00f0ff] text-[#006970]'
                  : 'text-[#b9cacb] hover:text-[#dfe1f6] hover:bg-[#252939]/70'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#3b494b]/40 flex gap-2">
            <button
              onClick={() => {
                if (onOpenSuratModal) onOpenSuratModal();
                else handleNavClick('layanan-surat');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00f0ff] text-[#006970] font-headline text-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">description</span>
              <span>Buat Surat Pengantar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
