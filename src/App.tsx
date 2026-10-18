import { useState } from 'react';
import { RoboTarunMascot } from './components/RoboTarunMascot';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast, ToastData } from './components/Toast';
import { ReceiptModal } from './components/ReceiptModal';
import { ProfileModal } from './components/ProfileModal';

import { BerandaView } from './views/BerandaView';
import { TransparansiKasView } from './views/TransparansiKasView';
import { LayananSuratView } from './views/LayananSuratView';
import { UmkmWargaView } from './views/UmkmWargaView';
import { GaleriView } from './views/GaleriView';
import { FormAduanView } from './views/FormAduanView';
import { ProfilPengurusView } from './views/ProfilPengurusView';
import { BeritaAgendaView } from './views/BeritaAgendaView';

import {
  KasTransaction,
  UmkmItem,
  GalleryItem,
  ComplaintTicket,
  initialKasTransactions,
  initialUmkmList,
  initialGalleryList,
  initialTickets,
  officersList,
  initialNews,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [kasTransactions] = useState<KasTransaction[]>(initialKasTransactions);
  const [umkmList, setUmkmList] = useState<UmkmItem[]>(initialUmkmList);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGalleryList);
  const [tickets, setTickets] = useState<ComplaintTicket[]>(initialTickets);
  const [officers] = useState(officersList);
  const [newsList] = useState(initialNews);

  // Modals & Feedback
  const [activeReceipt, setActiveReceipt] = useState<KasTransaction | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [targetLetterType, setTargetLetterType] = useState<string>('Surat Pengantar SKCK');

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleOpenSurat = (type?: string) => {
    if (type) setTargetLetterType(type);
    setActiveTab('layanan-surat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddUmkm = (newUmkm: UmkmItem) => {
    setUmkmList((prev) => [newUmkm, ...prev]);
  };

  const handleAddGalleryItem = (newItem: GalleryItem) => {
    setGalleryList((prev) => [newItem, ...prev]);
  };

  const handleAddTicket = (newTicket: ComplaintTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0f1321] text-[#dfe1f6] relative flex flex-col font-body selection:bg-[#00f0ff] selection:text-[#006970]">
      {/* 3D Interactive Mascot Canvas in the Background */}
      <RoboTarunMascot className="fixed inset-0 w-full h-full pointer-events-auto z-0" />

      {/* Ambient Lighting Gradients */}
      <div className="fixed top-24 left-1/4 w-96 h-96 rounded-full bg-[#00f0ff]/10 blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed bottom-32 right-10 w-[450px] h-[450px] rounded-full bg-[#3131c0]/15 blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 left-10 w-80 h-80 rounded-full bg-[#65f2b5]/10 blur-[100px] pointer-events-none z-0"></div>

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSuratModal={handleOpenSurat}
        onOpenProfileModal={() => setProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-transparent min-h-screen relative z-10 flex-1">
        {activeTab === 'beranda' && (
          <BerandaView
            onNavigateTab={setActiveTab}
            onOpenSuratModal={handleOpenSurat}
            onOpenReceiptModal={setActiveReceipt}
            onShowToast={showToast}
            kasTransactions={kasTransactions}
            umkmList={umkmList}
            officers={officers}
            newsList={newsList}
          />
        )}

        {activeTab === 'transparansi-kas' && (
          <TransparansiKasView
            transactions={kasTransactions}
            officers={officers}
            onOpenReceiptModal={setActiveReceipt}
            onShowToast={showToast}
            onOpenSuratModal={handleOpenSurat}
          />
        )}

        {activeTab === 'layanan-surat' && (
          <LayananSuratView
            officers={officers}
            onShowToast={showToast}
            defaultLetterType={targetLetterType}
          />
        )}

        {activeTab === 'umkm-warga' && (
          <UmkmWargaView
            umkmList={umkmList}
            galleryList={galleryList}
            onAddUmkm={handleAddUmkm}
            onShowToast={showToast}
            onOpenSuratModal={handleOpenSurat}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'galeri' && (
          <GaleriView
            galleryList={galleryList}
            onAddGalleryItem={handleAddGalleryItem}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'form-aduan' && (
          <FormAduanView
            tickets={tickets}
            onAddTicket={handleAddTicket}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'profil-pengurus' && (
          <ProfilPengurusView
            officers={officers}
            onShowToast={showToast}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'berita-agenda' && (
          <BeritaAgendaView
            newsList={newsList}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigateTab={setActiveTab} />

      {/* Modals & Overlays */}
      <ReceiptModal
        transaction={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onNavigateTab={setActiveTab}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
