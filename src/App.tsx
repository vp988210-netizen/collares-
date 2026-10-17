import React from 'react';
import { PawsProvider, usePaws } from './context/PawsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { UploadPhotoModal } from './components/UploadPhotoModal';
import { DesignStudioView } from './views/DesignStudioView';
import { CatalogView } from './views/CatalogView';
import { MedicalQrView } from './views/MedicalQrView';
import { ReviewsGalleryView } from './views/ReviewsGalleryView';

const PawsToast: React.FC = () => {
  const { toast } = usePaws();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#211a17] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#8d4b47]/30 text-xs sm:text-sm font-semibold max-w-md">
        <span className="material-symbols-outlined text-[#ffdad7] text-[20px] flex-shrink-0">
          pets
        </span>
        <span className="leading-snug">{toast}</span>
      </div>
    </div>
  );
};

const MainTabContent: React.FC = () => {
  const { activeTab } = usePaws();

  return (
    <main className="w-full flex-1 pt-20">
      {activeTab === 'estudio-de-diseno' && <DesignStudioView />}
      {activeTab === 'catalogo-de-collares' && <CatalogView />}
      {activeTab === 'ficha-medica-qr' && <MedicalQrView />}
      {activeTab === 'resenas-y-galeria-peluda' && <ReviewsGalleryView />}
    </main>
  );
};

export default function App() {
  return (
    <PawsProvider>
      <div className="min-h-screen flex flex-col bg-[#fff8f6] text-[#211a17] selection:bg-[#ffdad7] selection:text-[#390a0a]">
        <Header />
        <MainTabContent />
        <Footer />

        {/* Global Modals & Notifications */}
        <CartModal />
        <UploadPhotoModal />
        <PawsToast />
      </div>
    </PawsProvider>
  );
}
