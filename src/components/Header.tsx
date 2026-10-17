import React, { useState } from 'react';
import { usePaws, TabKey } from '../context/PawsContext';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, setIsCartOpen, showToast } = usePaws();
  const [searchVal, setSearchVal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { key: TabKey; label: string }[] = [
    { key: 'estudio-de-diseno', label: 'Estudio de Diseño' },
    { key: 'catalogo-de-collares', label: 'Catálogo de Collares' },
    { key: 'ficha-medica-qr', label: 'Ficha Médica QR' },
    { key: 'resenas-y-galeria-peluda', label: 'Reseñas & Galería Peluda' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      showToast(`Buscando collares para: "${searchVal}"...`);
      setActiveTab('catalogo-de-collares');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#d8c1bf]/30 shadow-[0_2px_12px_rgba(141,75,71,0.04)]">
      <div className="h-20 w-full px-5 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('estudio-de-diseno')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <img
              alt="Paws &amp; Craft Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFNht2d7TXV1S5I3KifYFv5xK1kaI8JgUbye9jw1H6_dPHuLBH3Ja2EzPnuE8cpmdMCSCve3ffCCeDIDQjhOI69Zh7rXUm-boNPJYqAPhWQL8EX1WZub56lkFKimcWrgeS1FZOUFUKfHgREDhpms7XCRX6oB98decwQ-rVNSQ52c2vhJgVvWqd3TwZBjY7ciJm45mxF1D_diobJgeWJvUlxhbSWmBoWv0EEyNgSrN"
            />
            <span className="text-xl tracking-tight text-[#211a17] font-bold">
              Paws &amp; Craft
            </span>
          </button>

          {/* Nav Pills on Desktop */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#fff1eb]/80 p-1.5 rounded-full border border-[#d8c1bf]/30">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#8d4b47] shadow-xs'
                      : 'text-[#534342] hover:bg-white/70 hover:text-[#211a17]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <a
              href="/api/docs"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8d4b47] hover:bg-white/80 transition-all flex items-center gap-1 border border-[#d98a84]/40"
              title="Abrir documentación Swagger / OpenAPI"
            >
              <span className="material-symbols-outlined text-[16px]">api</span>
              <span>API Docs</span>
            </a>
          </nav>
        </div>

        {/* Right Search, Cart & User */}
        <div className="flex items-center gap-4 flex-1 max-w-md justify-end lg:justify-between">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs relative"
          >
            <span className="material-symbols-outlined absolute left-3.5 text-[#436276] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Buscar por raza, talla o estilo..."
              className="w-full pl-10 pr-4 py-2 bg-white text-[#211a17] rounded-full border border-[#d8c1bf]/50 focus:border-[#d98a84] focus:ring-2 focus:ring-[#ffdad7]/60 focus:outline-none text-sm shadow-[0_1px_4px_rgba(141,75,71,0.04)] placeholder:text-[#867371]/70"
            />
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Bolsa de compra"
              className="relative p-2.5 rounded-full bg-[#fff1eb] text-[#8d4b47] hover:bg-[#ffdad7] transition-all flex items-center justify-center border border-[#d8c1bf]/30"
            >
              <span className="material-symbols-outlined text-[22px]">local_mall</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d98a84] text-[#5c2522] text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Pill */}
            <div
              onClick={() => {
                setActiveTab('ficha-medica-qr');
                showToast('Abriendo ficha médica de Toby');
              }}
              className="flex items-center gap-2 pl-1 bg-[#fff1eb]/70 py-1 px-2.5 rounded-full border border-[#d8c1bf]/30 cursor-pointer hover:bg-[#fff1eb] transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[#211a17] font-bold leading-tight">Lucía &amp; Toby</p>
                <p className="text-[11px] text-[#436276] font-medium leading-tight">
                  Galgo Whippet · M
                </p>
              </div>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffdad7]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbOS130q55VpVgfkZKMA_yMSkcDDDfesNLK_Zy9XVy87SBkzK2YlkXtnTyMLBnNq3QSsvadZgj5ji6IVKwIxDnzuyDEa29KMKluVpABKeztAfw9zG3JINvvmMqR6DEBvJmXAtgVj0MCTDBMHXdzxqbyjaRsMqi-1495NnjH75X9zlzFebFwsMh8qe8WKwA9n8lUMoHQiY7Yr1Wb-_wYVTE4IVQFYkhiDzQgTKFtpr"
              />
            </div>

            {/* Mobile Nav Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-[#211a17] hover:bg-[#fff1eb]"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f6] border-b border-[#d8c1bf]/40 px-6 py-4 flex flex-col gap-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActiveTab(item.key);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === item.key
                  ? 'bg-[#d98a84] text-white'
                  : 'text-[#211a17] hover:bg-[#fff1eb]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
