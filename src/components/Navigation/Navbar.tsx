import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    favorites,
    setIsCartOpen,
    setIsFavoritesOpen,
    setIsSearchOpen,
    setIsDesignSystemOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favorites.length;

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'collection', label: 'Colección' },
    { id: 'personalize', label: 'Personaliza' },
    { id: 'inspiration', label: 'Inspiración' },
    { id: 'about', label: 'Nosotros' },
  ] as const;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EAE2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="group flex flex-col items-start text-left focus:outline-none"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-widest text-[#2D2421] transition-colors group-hover:text-[#C68B8B]">
                NOVA
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#6E5D57] -mt-1 font-sans">
                Atelier Joyas
              </span>
            </button>

            {/* Design System badge trigger */}
            <button
              type="button"
              onClick={() => setIsDesignSystemOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F6ECEC] text-[#C68B8B] hover:bg-[#F2DFDF] text-[11px] font-medium transition-colors border border-[#E8C8C8]/60"
              title="Ver Design System (Google Stitch reference)"
            >
              <Sparkles className="w-3 h-3 text-[#C68B8B]" />
              <span>Design System</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setCurrentView(link.id)}
                  className={`text-sm tracking-wide transition-all whitespace-nowrap relative py-1 ${
                    isActive
                      ? 'text-[#2D2421] font-semibold'
                      : 'text-[#6E5D57] hover:text-[#2D2421] font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C68B8B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar joyas"
              className="p-2 text-[#6E5D57] hover:text-[#2D2421] hover:bg-[#F4EFEB] rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              aria-label="Ver favoritos"
              className="relative p-2 text-[#6E5D57] hover:text-[#2D2421] hover:bg-[#F4EFEB] rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C68B8B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Bolsa de compra"
              className="relative p-2 text-[#6E5D57] hover:text-[#2D2421] hover:bg-[#F4EFEB] rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-[#2D2421] text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Highlighted CTA Button */}
            <button
              type="button"
              onClick={() => setCurrentView('personalize')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#2D2421] text-white hover:bg-[#433530] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              Personalizar ahora
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="md:hidden p-2 text-[#2D2421] hover:bg-[#F4EFEB] rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden pt-20">
          <div className="bg-[#FDFBF7] border-b border-[#EAE2D9] px-6 py-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-base font-medium transition-colors ${
                  currentView === link.id ? 'text-[#C68B8B] font-bold' : 'text-[#2D2421]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setIsDesignSystemOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 text-sm text-[#C68B8B]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ver Design System NOVA</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentView('personalize');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#C68B8B] text-white text-center font-semibold text-sm shadow-sm"
            >
              Personalizar ahora
            </button>
          </div>
        </div>
      )}
    </>
  );
};
