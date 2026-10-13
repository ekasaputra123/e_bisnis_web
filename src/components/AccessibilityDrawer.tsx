import React from 'react';
import { Eye, Type, Volume2, X, Check, RotateCcw, Globe, PhoneCall } from 'lucide-react';

export type LanguageMode = 'id' | 'walikan' | 'en';
export type FontScaleMode = 'normal' | 'lg' | 'xl';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fontScale: FontScaleMode;
  setFontScale: (scale: FontScaleMode) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  dyslexiaSpacing: boolean;
  setDyslexiaSpacing: (val: boolean) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  onReset: () => void;
  onSpeakSummary: () => void;
  isSpeaking: boolean;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({
  isOpen,
  onClose,
  fontScale,
  setFontScale,
  highContrast,
  setHighContrast,
  dyslexiaSpacing,
  setDyslexiaSpacing,
  language,
  setLanguage,
  onReset,
  onSpeakSummary,
  isSpeaking
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
    >
      <div className="relative flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-blue-100 bg-white p-6 text-slate-900 shadow-xl">
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-4">
            <div>
              <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                Standar Inklusivitas WCAG 2.1 AA
              </p>
              <h2 id="a11y-title" className="mt-1 text-xl font-bold text-slate-900">
                Pengaturan Aksesibilitas Web
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Tutup panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            Sesuaikan kenyamanan membaca portal agar ramah bagi mahasiswi berkebutuhan khusus, warga lansia, maupun pengguna dengan low-vision.
          </p>

          {/* 1. Font scale */}
          <div className="mt-6 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Type className="h-4 w-4 text-blue-600" />
              <span>Ukuran Teks Proporsional</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: '100% Normal' },
                { id: 'lg', label: '112% Besar' },
                { id: 'xl', label: '125% Ekstra' }
              ].map((item) => {
                const active = fontScale === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFontScale(item.id as FontScaleMode)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                      active
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Visual Assistance */}
          <div className="mt-5 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>Bantuan Visual & Keterbacaan</span>
            </div>

            <div className="mt-3 space-y-2.5">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-colors ${
                  highContrast
                    ? 'border-blue-500 bg-blue-900 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-semibold">Mode Kontras Tinggi</div>
                  <div className="text-xs text-slate-500">Standar kontras tinggi untuk low-vision</div>
                </div>
                {highContrast && <Check className="h-4 w-4 shrink-0 text-blue-300" />}
              </button>

              <button
                type="button"
                onClick={() => setDyslexiaSpacing(!dyslexiaSpacing)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-colors ${
                  dyslexiaSpacing
                    ? 'border-blue-600 bg-blue-600 text-white font-bold'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-semibold">Spasi Ramah Disleksia</div>
                  <div className="text-xs text-slate-500">Perlebar jarak huruf dan spasi kata</div>
                </div>
                {dyslexiaSpacing && <Check className="h-4 w-4 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={onSpeakSummary}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-colors ${
                  isSpeaking
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Volume2 className="h-4 w-4 shrink-0 text-blue-600" />
                  <div>
                    <div className="font-semibold">
                      {isSpeaking ? 'Hentikan Pembaca Suara' : 'Bacakan Ringkasan Layanan (TTS)'}
                    </div>
                    <div className="text-xs text-slate-500">Bantuan suara untuk disabilitas netra</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Language & Dialect */}
          <div className="mt-5 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Bahasa & Dialek Pengantar</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: 'id', label: 'Indonesia' },
                { id: 'walikan', label: 'Basa Walikan' },
                { id: 'en', label: 'English' }
              ].map((lang) => {
                const active = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id as LanguageMode)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                      active
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Emergency direct call */}
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase">
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Hotline Darurat 24 Jam</span>
            </div>
            <div className="font-mono-tabular mt-1 text-sm font-bold text-slate-900">
              Ngalam Command Center: 112 (Bebas Pulsa)
            </div>
            <div className="mt-0.5 text-xs text-slate-600">
              UPTD Perlindungan Perempuan: 0811-3789-112
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 pt-3">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Atur Ulang</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};
