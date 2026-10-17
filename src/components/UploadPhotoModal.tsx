import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';

export const UploadPhotoModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, showToast } = usePaws();
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [collarModel, setCollarModel] = useState('Collar Siena Coñac');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isUploadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadModalOpen(false);
    showToast(`¡Foto de ${petName || 'tu mascota'} enviada! Recibirás tu cupón del 15% en ${email || 'tu correo'}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211a17]/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#d8c1bf]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#fff1eb] border-b border-[#d8c1bf]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8d4b47] text-[24px]">workspace_premium</span>
            <div>
              <h3 className="text-base font-bold text-[#211a17]">Subir Foto &amp; Recibir 15%</h3>
              <p className="text-xs text-[#867371]">Se publicará en la galería de la manada</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-full text-[#534342] hover:bg-white"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          {/* File input mockup */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#211a17]">Fotografía de tu mascota luciendo el collar</label>
            <div
              onClick={() => {
                setFileName('paseo_playa_toby.jpg');
                showToast('Foto cargada: paseo_playa_toby.jpg');
              }}
              className="p-6 rounded-2xl bg-[#fff8f6] border-2 border-dashed border-[#d8c1bf] flex flex-col items-center justify-center text-center gap-1.5 hover:border-[#8d4b47] cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[32px] text-[#8d4b47]">add_a_photo</span>
              <p className="text-xs font-bold text-[#211a17]">
                {fileName ? `Archivo seleccionado: ${fileName}` : 'Haz clic para seleccionar foto'}
              </p>
              <p className="text-[11px] text-[#867371]">JPG, PNG o HEIC hasta 15MB (Luz natural recomendada)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a17]">Nombre de tu mascota</label>
              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ej: Rocky, Toby..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] text-xs border border-[#d8c1bf]/60 focus:border-[#d98a84] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a17]">Raza o especie</label>
              <input
                type="text"
                required
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                placeholder="Ej: Whippet, Gato Persa..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] text-xs border border-[#d8c1bf]/60 focus:border-[#d98a84] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a17]">Modelo del collar</label>
              <select
                value={collarModel}
                onChange={(e) => setCollarModel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] text-xs border border-[#d8c1bf]/60 focus:border-[#d98a84] focus:outline-none"
              >
                <option>Collar Siena Coñac</option>
                <option>Terciopelo Antiahogo (Gatos)</option>
                <option>Waterproof BioThane</option>
                <option>Forest Green Piel Suave</option>
                <option>Bicolor Terracota &amp; Latón</option>
                <option>Collar NightWalker Reflective</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a17]">Tu correo (para recibir el 15%)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] text-xs border border-[#d8c1bf]/60 focus:border-[#d98a84] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#211a17]">¿Qué tal ha sido la experiencia de paseo?</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos sobre el tacto de la piel, ajuste anatómico o resistencia..."
              className="w-full p-3 rounded-xl bg-[#fff8f6] text-xs border border-[#d8c1bf]/60 focus:border-[#d98a84] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#fff1eb] border border-[#ffdad7]">
            <span className="text-xs font-bold text-[#211a17]">Calificación de taller:</span>
            <div className="flex text-[#8d4b47]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-[#8d4b47] hover:bg-[#d98a84] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1 mt-1"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Enviar Foto &amp; Generar Cupón</span>
          </button>
        </form>
      </div>
    </div>
  );
};
