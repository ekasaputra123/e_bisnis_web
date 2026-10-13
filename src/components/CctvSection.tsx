import React, { useState } from 'react';
import { CCTV_POINTS, CctvPoint } from '../data/malangData';
import { Camera, Radio, CheckCircle2, RefreshCw, Eye } from 'lucide-react';

export const CctvSection: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<CctvPoint>(CCTV_POINTS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <section id="pantau-cctv" className="border-b border-blue-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Camera className="h-3.5 w-3.5" />
              <span>Fitur Pantau CCTV Kota Malang (ATCS Live)</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
              Pantauan Langsung Arus Lalu Lintas & Keamanan Persimpangan
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Masyarakat dan mahasiswa dapat memantau kondisi lalu lintas secara langsung di titik-titik persimpangan utama Kota Malang untuk menghindari kemacetan dan memastikan jalur aman saat berkendara.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Segarkan Feed CCTV</span>
            </button>
          </div>
        </div>

        {/* 2-Column CCTV Interface */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Live Screen Simulator */}
          <div className="overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 p-4 shadow-xl lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl bg-slate-900">
              {/* CCTV Simulated Visual Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

              {/* Grid Lines Overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Live Badge & Timestamp */}
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-extrabold text-white animate-pulse">
                  <Radio className="h-3 w-3" />
                  <span>LIVE ATCS</span>
                </span>
                <span className="font-mono-tabular text-xs font-medium text-slate-200">
                  {selectedPoint.name}
                </span>
              </div>

              <div className="absolute top-4 right-4 font-mono-tabular text-xs font-semibold text-emerald-400">
                FPS: {selectedPoint.streamFps} · 1080p HD
              </div>

              {/* Center Simulation Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="rounded-full bg-white/10 p-4 backdrop-blur-md">
                  <Eye className="h-8 w-8 text-blue-300" />
                </div>
                <div className="mt-3 text-lg font-bold">
                  Feed Video Siaran Langsung CCTV
                </div>
                <div className="mt-1 text-xs text-slate-300 max-w-md">
                  {selectedPoint.description}
                </div>
              </div>

              {/* Bottom Stream Status */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-300">Status Lalu Lintas:</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-extrabold ${
                    selectedPoint.trafficStatus === 'Lancar'
                      ? 'bg-emerald-600 text-white'
                      : selectedPoint.trafficStatus === 'Ramai Lancar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}>
                    {selectedPoint.trafficStatus}
                  </span>
                </div>
                <div className="font-mono-tabular text-slate-300">
                  Dinas Perhubungan Kota Malang
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
              <span>Sensor ATCS Terintegrasi Smart City Kota Malang</span>
              <span className="font-mono-tabular">Diperbarui: Otomatis Tiap 5 Detik</span>
            </div>
          </div>

          {/* Right Column: CCTV Points Selector */}
          <div className="space-y-3 lg:col-span-4">
            <div className="text-xs font-bold tracking-wider text-slate-700 uppercase">
              Pilih Lokasi CCTV Persimpangan ({CCTV_POINTS.length} Titik)
            </div>

            {CCTV_POINTS.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setSelectedPoint(pt)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">
                      {pt.area}
                    </span>
                    <span className="font-mono-tabular text-[10px] font-semibold text-emerald-700">
                      ● {pt.status}
                    </span>
                  </div>

                  <h4 className="mt-1 text-sm font-bold text-slate-900">
                    {pt.name}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Arus: {pt.trafficStatus}</span>
                    <span className="font-mono-tabular font-semibold text-slate-700">
                      {isSelected ? 'Sedang Ditampilkan' : 'Klik untuk Pantau'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
