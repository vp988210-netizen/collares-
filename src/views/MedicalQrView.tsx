import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';

export const MedicalQrView: React.FC = () => {
  const { medicalRecord, updateMedicalRecord, toggleLostMode, showToast } = usePaws();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    primaryPhone: medicalRecord.primaryPhone,
    rewardAmount: medicalRecord.rewardAmount,
    allergies: medicalRecord.allergies.join(', '),
    medication: medicalRecord.medication,
    behaviorNotes: medicalRecord.behaviorNotes,
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMedicalRecord({
      primaryPhone: editForm.primaryPhone,
      rewardAmount: Number(editForm.rewardAmount) || 0,
      allergies: editForm.allergies.split(',').map((s) => s.trim()).filter(Boolean),
      medication: editForm.medication,
      behaviorNotes: editForm.behaviorNotes,
    });
    setIsEditing(false);
    showToast('¡Ficha médica actualizada con éxito en los servidores de rescate!');
  };

  const copyChipNumber = () => {
    navigator.clipboard?.writeText(medicalRecord.chipNumber.replace(/\s+/g, ''));
    showToast(`Microchip copiado: ${medicalRecord.chipNumber}`);
  };

  const simulateQrScan = () => {
    showToast(`Simulando escaneo QR... Notificación SMS enviada a ${medicalRecord.primaryPhone}`);
  };

  return (
    <div className="w-full pt-6 pb-24">
      <div className="w-full px-5 md:px-8 lg:px-12 py-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 bg-[#b7ebd9] text-[#366759] text-xs rounded-full font-bold flex items-center gap-1 border border-[#b9eddc]">
                <span className="material-symbols-outlined text-[14px]">qr_code_2</span> Placa Digital NFC &amp; QR
              </span>
              <span className="px-3.5 py-1 bg-[#c6e7fe] text-[#18394c] text-xs rounded-full font-semibold border border-[#aacbe2]/50">
                Servicio Cloud 24/7 sin cuotas
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl text-[#211a17] tracking-tight font-bold">
              Ficha Médica &amp; Sistema de Rescate
            </h1>
            <p className="text-sm text-[#534342] max-w-2xl mt-1">
              Cada collar Paws &amp; Craft cuenta con una chapa de latón con micro-código QR grabado. Al ser escaneado por cualquier móvil, muestra esta ficha de emergencia veterinaria sin necesidad de descargar apps.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLostMode}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
                medicalRecord.isLost
                  ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a] animate-pulse ring-4 ring-[#ffdad6]'
                  : 'bg-white text-[#534342] border border-[#d8c1bf] hover:bg-[#fff1eb]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {medicalRecord.isLost ? 'warning' : 'notifications_off'}
              </span>
              <span>
                {medicalRecord.isLost ? 'Modo Extravío ACTIVO' : 'Activar Modo Extravío'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2.5 rounded-full bg-white text-[#8d4b47] border border-[#d8c1bf] hover:bg-[#ffdad7]/50 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isEditing ? 'close' : 'edit_note'}
              </span>
              <span>{isEditing ? 'Cancelar Edición' : 'Editar Datos'}</span>
            </button>
          </div>
        </div>

        {/* LOST PET EMERGENCY BANNER */}
        {medicalRecord.isLost && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#ba1a1a] to-[#93000a] text-white shadow-lg border border-[#ffdad6]/40 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[36px] text-white">emergency</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-white text-[#ba1a1a] text-xs font-black rounded-full uppercase tracking-wider">
                    Urgente
                  </span>
                  <span className="text-sm font-semibold text-white/90">
                    Mascota reportada extraviada
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mt-0.5">
                  ¡Ayúdanos a devolver a {medicalRecord.petName} a casa!
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                  Requiere medicación diaria para su condición de salud. Recompensa de{' '}
                  <strong className="text-white font-extrabold">{medicalRecord.rewardAmount} €</strong> a quien proporcione datos o lo custodie.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${medicalRecord.primaryPhone}`}
                className="px-6 py-3 rounded-full bg-white text-[#ba1a1a] font-bold text-sm shadow-md hover:bg-neutral-100 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Llamar al Dueño ({medicalRecord.primaryPhone})</span>
              </a>
            </div>
          </div>
        )}

        {/* EDIT FORM MODAL / ACCORDION */}
        {isEditing && (
          <form
            onSubmit={handleSaveEdit}
            className="mb-8 p-6 rounded-3xl bg-white border border-[#d8c1bf] shadow-md flex flex-col gap-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#d8c1bf]/40 pb-3">
              <h3 className="text-base font-bold text-[#211a17]">
                Actualizar Datos del Microchip &amp; Emergencia
              </h3>
              <span className="text-xs text-[#867371]">Sincronización instantánea con la nube</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#211a17] block mb-1">Teléfono Primario</label>
                <input
                  type="text"
                  value={editForm.primaryPhone}
                  onChange={(e) => setEditForm({ ...editForm, primaryPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8c1bf] text-xs text-[#211a17]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#211a17] block mb-1">Recompensa (€)</label>
                <input
                  type="number"
                  value={editForm.rewardAmount}
                  onChange={(e) => setEditForm({ ...editForm, rewardAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8c1bf] text-xs text-[#211a17]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#211a17] block mb-1">Alergias (separadas por comas)</label>
                <input
                  type="text"
                  value={editForm.allergies}
                  onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8c1bf] text-xs text-[#211a17]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#211a17] block mb-1">Medicación &amp; Dosis</label>
                <input
                  type="text"
                  value={editForm.medication}
                  onChange={(e) => setEditForm({ ...editForm, medication: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8c1bf] text-xs text-[#211a17]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#211a17] block mb-1">Notas de Carácter</label>
                <input
                  type="text"
                  value={editForm.behaviorNotes}
                  onChange={(e) => setEditForm({ ...editForm, behaviorNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8c1bf] text-xs text-[#211a17]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-[#534342]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#d98a84] text-white text-xs font-bold hover:bg-[#b86963] shadow-xs"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Pet Identity Passport & QR Code (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Passport Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#d8c1bf]/40 shadow-[0_2px_12px_rgba(141,75,71,0.04)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ffdad7] via-transparent to-transparent rounded-bl-full pointer-events-none" />

              {/* Pet Avatar & Status */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#d98a84] shadow-sm flex-shrink-0">
                  <img
                    src={medicalRecord.avatar}
                    alt={medicalRecord.petName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 p-1 bg-white rounded-tl-lg text-[#366759]">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#211a17]">{medicalRecord.petName}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fff1eb] text-[#8d4b47] text-[11px] font-bold border border-[#d8c1bf]/30">
                      {medicalRecord.gender}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#534342] mt-0.5">{medicalRecord.breed}</p>
                  <p className="text-[11px] text-[#867371]">
                    {medicalRecord.age} · {medicalRecord.weight}
                  </p>
                </div>
              </div>

              {/* Microchip Badge */}
              <div className="p-3 rounded-2xl bg-[#fff8f6] border border-[#d8c1bf]/30 flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-symbols-outlined text-[#8d4b47] text-[20px]">memory</span>
                  <div>
                    <span className="text-[10px] text-[#867371] block">Nº Microchip Identificativo</span>
                    <span className="font-mono font-bold text-[#211a17]">{medicalRecord.chipNumber}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyChipNumber}
                  title="Copiar número de chip"
                  className="p-1.5 rounded-xl bg-white text-[#534342] hover:text-[#8d4b47] border border-[#d8c1bf]/30 shadow-2xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>

              {/* QR Code Presentation */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#fff1eb] to-white rounded-2xl border border-[#d8c1bf]/40 text-center mb-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#d8c1bf]/30 mb-3">
                  {/* Clean SVG QR Code */}
                  <svg className="w-36 h-36 text-[#211a17]" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" />
                    {/* Corner 1 */}
                    <rect x="10" y="10" width="25" height="25" fill="#211a17" rx="3" />
                    <rect x="15" y="15" width="15" height="15" fill="#ffffff" rx="1.5" />
                    <rect x="18" y="18" width="9" height="9" fill="#8d4b47" rx="1" />
                    {/* Corner 2 */}
                    <rect x="65" y="10" width="25" height="25" fill="#211a17" rx="3" />
                    <rect x="70" y="15" width="15" height="15" fill="#ffffff" rx="1.5" />
                    <rect x="73" y="18" width="9" height="9" fill="#8d4b47" rx="1" />
                    {/* Corner 3 */}
                    <rect x="10" y="65" width="25" height="25" fill="#211a17" rx="3" />
                    <rect x="15" y="70" width="15" height="15" fill="#ffffff" rx="1.5" />
                    <rect x="18" y="73" width="9" height="9" fill="#8d4b47" rx="1" />
                    {/* Data pattern */}
                    <rect x="42" y="12" width="6" height="6" fill="#211a17" />
                    <rect x="52" y="12" width="6" height="6" fill="#211a17" />
                    <rect x="42" y="24" width="6" height="6" fill="#211a17" />
                    <rect x="42" y="42" width="16" height="16" fill="#8d4b47" rx="2" />
                    <rect x="14" y="42" width="6" height="6" fill="#211a17" />
                    <rect x="24" y="48" width="6" height="6" fill="#211a17" />
                    <rect x="68" y="42" width="6" height="6" fill="#211a17" />
                    <rect x="80" y="48" width="6" height="6" fill="#211a17" />
                    <rect x="42" y="68" width="6" height="6" fill="#211a17" />
                    <rect x="52" y="78" width="6" height="6" fill="#211a17" />
                    <rect x="68" y="68" width="18" height="6" fill="#211a17" />
                    <rect x="68" y="78" width="6" height="12" fill="#211a17" />
                    <rect x="80" y="78" width="6" height="12" fill="#211a17" />
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold text-[#8d4b47] tracking-wider">
                  ID: {medicalRecord.serialNumber}
                </span>
                <p className="text-[11px] text-[#867371] mt-1">
                  Enlazado a la chapa de latón del collar Toby
                </p>

                <button
                  type="button"
                  onClick={simulateQrScan}
                  className="mt-3 px-4 py-2 rounded-xl bg-white text-[#8d4b47] hover:bg-[#fff1eb] text-xs font-bold border border-[#d8c1bf]/40 shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                  <span>Simular Escaneo Móvil</span>
                </button>
              </div>

              {/* Last Detection Pin */}
              <div className="flex items-center gap-2.5 text-xs text-[#534342] pt-2 border-t border-[#d8c1bf]/30">
                <span className="material-symbols-outlined text-[#366759] text-[18px]">location_on</span>
                <span>
                  Última ubicación registrada:{' '}
                  <strong className="text-[#211a17]">{medicalRecord.lastDetected}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Critical Medical Records & Vet Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Medical Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#d8c1bf]/40 shadow-[0_2px_12px_rgba(141,75,71,0.04)] flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#d8c1bf]/30">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[24px]">medical_services</span>
                  <h3 className="text-lg font-bold text-[#211a17]">
                    Condiciones Médicas &amp; Cuidados Críticos
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ffdad7] text-[#713531] text-[11px] font-bold">
                  Prioridad 1
                </span>
              </div>

              {/* Conditions */}
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-xs font-bold text-[#867371] uppercase tracking-wide">
                    Diagnóstico Principal
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    {medicalRecord.medicalConditions.map((c, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-[#fff1eb] text-[#8d4b47] text-xs font-bold border border-[#d8c1bf]/40 flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">healing</span>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medication */}
                <div>
                  <span className="text-xs font-bold text-[#867371] uppercase tracking-wide">
                    Pauta de Medicación Diaria
                  </span>
                  <div className="mt-1 p-3 rounded-2xl bg-[#ffdad7]/30 border border-[#ffb3ad]/40 text-xs text-[#713531] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#8d4b47]">prescriptions</span>
                    <span>{medicalRecord.medication}</span>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <span className="text-xs font-bold text-[#867371] uppercase tracking-wide">
                    Alergias Alimentarias e Intolerancias
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {medicalRecord.allergies.map((allergy, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs rounded-full font-bold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px] text-amber-700">warning</span>
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Behavior notes */}
                <div>
                  <span className="text-xs font-bold text-[#867371] uppercase tracking-wide">
                    Comportamiento &amp; Manejo en la Calle
                  </span>
                  <p className="mt-1 text-xs text-[#534342] leading-relaxed bg-[#fff8f6] p-3 rounded-2xl border border-[#d8c1bf]/30">
                    {medicalRecord.behaviorNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Vet Clinic & Doctor Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#d8c1bf]/40 shadow-[0_2px_12px_rgba(141,75,71,0.04)] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#d8c1bf]/30">
                <div className="flex items-center gap-2 text-[#366759]">
                  <span className="material-symbols-outlined text-[24px]">local_hospital</span>
                  <h3 className="text-lg font-bold text-[#211a17]">
                    Centro Veterinario de Referencia
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#b7ebd9] text-[#366759] text-[11px] font-bold">
                  Servicio de Urgencias 24h
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#fff8f6] border border-[#d8c1bf]/30 flex flex-col gap-1">
                  <span className="text-[11px] text-[#867371]">Hospital Asignado</span>
                  <span className="text-sm font-bold text-[#211a17]">{medicalRecord.vetClinicName}</span>
                  <span className="text-xs text-[#534342]">{medicalRecord.vetDoctor}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff8f6] border border-[#d8c1bf]/30 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#867371]">Teléfono de Urgencias</span>
                    <span className="text-sm font-bold text-[#211a17] block">
                      {medicalRecord.vetClinicPhone}
                    </span>
                  </div>
                  <a
                    href={`tel:${medicalRecord.vetClinicPhone}`}
                    className="w-fit px-3 py-1.5 rounded-xl bg-[#366759] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2b4f44] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Llamar al Hospital</span>
                  </a>
                </div>
              </div>
            </div>

            {/* How QR Plate Works 3-Step Guide */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#fff1eb] to-[#f9ebe5] border border-[#d8c1bf]/40 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#211a17] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b47] text-[20px]">help</span>
                ¿Cómo protege esta placa a tu compañero?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#534342]">
                <div className="p-3 bg-white/80 rounded-2xl border border-[#d8c1bf]/30">
                  <strong className="text-[#8d4b47] block mb-1">01. Escaneo Inmediato</strong>
                  Quien lo encuentre sólo acerca su cámara al collar; no necesita aplicaciones ni contraseñas.
                </div>
                <div className="p-3 bg-white/80 rounded-2xl border border-[#d8c1bf]/30">
                  <strong className="text-[#8d4b47] block mb-1">02. Geolocalización</strong>
                  Si la persona lo autoriza, recibes un SMS al instante con las coordenadas GPS del escaneo.
                </div>
                <div className="p-3 bg-white/80 rounded-2xl border border-[#d8c1bf]/30">
                  <strong className="text-[#8d4b47] block mb-1">03. Historial Médico</strong>
                  Los veterinarios de urgencia acceden a sus alergias antes de administrar cualquier fármaco.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
