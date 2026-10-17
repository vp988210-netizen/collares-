import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { PAWS_REVIEWS } from '../data/pawsReviews';
import { ReviewItem } from '../types/paws';

export const ReviewsGalleryView: React.FC = () => {
  const { setIsUploadModalOpen, setActiveTab, updateCollarConfig, showToast } = usePaws();
  const [filterSpecies, setFilterSpecies] = useState<string>('all');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    setLikesMap((prev) => {
      const current = prev[id] || 0;
      const next = current + 1;
      showToast('¡Gracias por darle amor a esta foto de la manada! ❤️');
      return { ...prev, [id]: next };
    });
  };

  const handleCopyModel = (review: ReviewItem) => {
    let leatherColor: any = 'cognac';
    if (review.modelKey.includes('petalo')) leatherColor = 'rose';
    else if (review.modelKey.includes('bruma')) leatherColor = 'sky';
    else if (review.modelKey.includes('felino')) leatherColor = 'mint';

    updateCollarConfig({
      petName: review.petName.toUpperCase(),
      leather: leatherColor,
      species: review.species === 'gatos' ? 'cat' : 'dog',
    });
    showToast(`Configurando collar al estilo de ${review.petName}...`);
    setActiveTab('estudio-de-diseno');
  };

  const filteredReviews = PAWS_REVIEWS.filter((item) => {
    if (filterSpecies === 'all') return true;
    return item.species === filterSpecies;
  });

  return (
    <div className="w-full pt-6 pb-24">
      <div className="w-full px-5 md:px-8 lg:px-12 py-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 bg-[#ffdad7] text-[#713531] text-xs rounded-full font-bold flex items-center gap-1 border border-[#ffb3ad]/60">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span> Galería de la Manada
              </span>
              <span className="px-3.5 py-1 bg-[#b7ebd9] text-[#366759] text-xs rounded-full font-bold flex items-center gap-1 border border-[#b9eddc]">
                <span className="material-symbols-outlined text-[14px]">verified</span> 100% Compradores Verificados
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl text-[#211a17] tracking-tight font-bold">
              Reseñas &amp; Galería Peluda
            </h1>
            <p className="text-sm text-[#534342] max-w-2xl mt-1">
              Descubre cómo lucen nuestros collares de taller en diferentes razas y tamaños. Cada pieza cuenta una historia de complicidad y paseos compartidos.
            </p>
          </div>

          {/* Upload Photo Button */}
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="px-6 py-3 rounded-full bg-[#d98a84] text-white text-xs sm:text-sm font-bold hover:bg-[#b86963] transition-colors shadow-xs flex items-center gap-2 flex-shrink-0 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            <span>Subir Foto &amp; Recibir 15%</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-[#d8c1bf]/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad7] text-[#8d4b47] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">star</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#211a17] block leading-none">4.96 / 5</span>
              <span className="text-[11px] text-[#867371]">+1.800 valoraciones</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#d8c1bf]/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b7ebd9] text-[#366759] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">pets</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#211a17] block leading-none">+2.400</span>
              <span className="text-[11px] text-[#867371]">Mascotas protegidas</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#d8c1bf]/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c6e7fe] text-[#18394c] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#211a17] block leading-none">5 Años</span>
              <span className="text-[11px] text-[#867371]">Garantía en cuero</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#d8c1bf]/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff1eb] text-[#8d4b47] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">eco</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#211a17] block leading-none">0% Cromo</span>
              <span className="text-[11px] text-[#867371]">Curtición vegetal pura</span>
            </div>
          </div>
        </div>

        {/* Breed Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs font-semibold scrollbar-none">
          <span className="text-[#867371] flex-shrink-0 mr-1">Filtrar por:</span>
          {[
            { id: 'all', label: 'Todas las fotos' },
            { id: 'golden', label: 'Golden Retrievers' },
            { id: 'gatos', label: 'Gatos Felinos' },
            { id: 'collie', label: 'Border Collies' },
            { id: 'teckel', label: 'Teckels' },
            { id: 'bulldog', label: 'Bulldog Francés' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterSpecies(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                filterSpecies === tab.id
                  ? 'bg-[#d98a84] text-white border-[#d98a84] shadow-xs font-bold'
                  : 'bg-white text-[#534342] border-[#d8c1bf]/40 hover:bg-[#fff1eb]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => {
            const extraLikes = likesMap[review.id] || 0;
            const totalLikes = review.likes + extraLikes;

            return (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-5 border border-[#d8c1bf]/40 shadow-[0_2px_12px_rgba(141,75,71,0.03)] hover:shadow-[0_8px_24px_rgba(141,75,71,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay Info */}
                  <div className="relative w-full aspect-[4/3] bg-[#fff8f6] rounded-2xl overflow-hidden mb-4 border border-[#d8c1bf]/20">
                    <img
                      src={review.image}
                      alt={review.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Like heart */}
                    <button
                      type="button"
                      onClick={() => handleLike(review.id)}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#8d4b47] text-xs font-bold shadow-xs border border-[#d8c1bf]/30 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#d98a84] fill-current">
                        favorite
                      </span>
                      <span>{totalLikes}</span>
                    </button>

                    {/* Special badge */}
                    {review.specialTag && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                        {review.specialTag}
                      </span>
                    )}
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-[#211a17]">{review.petName}</h3>
                      <span className="text-xs text-[#867371]">{review.breed}</span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center text-[#d98a84] justify-end">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px] fill-current">
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-[#867371] block">{review.date}</span>
                    </div>
                  </div>

                  {/* Owner and location */}
                  <div className="flex items-center gap-1 text-[11px] text-[#366759] font-semibold mb-3">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>
                      {review.ownerName} · {review.city}
                    </span>
                  </div>

                  {/* Comment */}
                  <blockquote className="text-xs font-bold text-[#211a17] mb-1.5 leading-snug">
                    {review.headline}
                  </blockquote>
                  <p className="text-xs text-[#534342] leading-relaxed mb-4">
                    {review.comment}
                  </p>
                </div>

                {/* Collar Spec & Action */}
                <div className="pt-3 border-t border-[#d8c1bf]/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#867371]">Modelo lucido:</span>
                    <span className="font-semibold text-[#8d4b47]">{review.collarModel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyModel(review)}
                    className="w-full py-2 px-3 rounded-xl bg-[#fff1eb] text-[#8d4b47] hover:bg-[#ffdad7] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#d8c1bf]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>Diseñar collar igual que {review.petName}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
