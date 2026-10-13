import React, { useState, useMemo } from 'react';
import {
  MALANG_STUDENT_STATS,
  UNIVERSITIES_LIST,
  KOST_RECOMMENDATIONS,
  UniversityItem,
  KostRecommendation
} from '../data/malangData';
import {
  X,
  GraduationCap,
  Home,
  Search,
  MapPin,
  ShieldCheck,
  Phone,
  CheckCircle2,
  ExternalLink,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

interface StudentPortalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSkdsService: () => void;
}

export const StudentPortalDrawer: React.FC<StudentPortalDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSkdsService
}) => {
  const [activeTab, setActiveTab] = useState<'universitas' | 'kost' | 'layanan'>('universitas');
  const [univSearch, setUnivSearch] = useState('');
  const [univTypeFilter, setUnivTypeFilter] = useState<'Semua' | 'Negeri' | 'Swasta' | 'Kedinasan / Politeknik'>('Semua');

  const [kostCampusFilter, setKostCampusFilter] = useState<string>('Semua');
  const [kostTypeFilter, setKostTypeFilter] = useState<'Semua' | 'Khusus Putri' | 'Campur'>('Semua');

  // Filter Universities
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_LIST.filter((univ) => {
      const matchType = univTypeFilter === 'Semua' || univ.type === univTypeFilter;
      const q = univSearch.trim().toLowerCase();
      const matchQ =
        !q ||
        univ.name.toLowerCase().includes(q) ||
        univ.shortName.toLowerCase().includes(q) ||
        univ.address.toLowerCase().includes(q) ||
        univ.kecamatan.toLowerCase().includes(q);
      return matchType && matchQ;
    });
  }, [univSearch, univTypeFilter]);

  // Filter Kosts
  const filteredKosts = useMemo(() => {
    return KOST_RECOMMENDATIONS.filter((kost) => {
      const matchCampus = kostCampusFilter === 'Semua' || kost.universityTarget.includes(kostCampusFilter);
      const matchType = kostTypeFilter === 'Semua' || kost.genderType === kostTypeFilter;
      return matchCampus && matchType;
    });
  }, [kostCampusFilter, kostTypeFilter]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-drawer-title"
    >
      <div className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        {/* Drawer Header (Blue & White) */}
        <div className="border-b border-blue-100 bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-blue-100">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Portal Mahasiswa & Kampus Kota Malang</span>
              </div>
              <h2 id="student-drawer-title" className="mt-2 text-2xl font-black text-white">
                Informasi Kampus & Rekomendasi Kost
              </h2>
              <p className="mt-1 text-xs text-blue-100">
                Data resmi 62 perguruan tinggi, 324.000+ mahasiswa, dan kos terverifikasi aman di Kota Malang.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Tutup panel mahasiswa"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Statistics Strip */}
          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-white/10 p-3 text-center">
            <div>
              <div className="font-mono-tabular text-lg font-black text-white">
                {MALANG_STUDENT_STATS.totalUniversities}
              </div>
              <div className="text-[10px] font-medium text-blue-200 uppercase">Perguruan Tinggi</div>
            </div>
            <div className="border-x border-white/20">
              <div className="font-mono-tabular text-lg font-black text-white">
                {MALANG_STUDENT_STATS.totalStudents.toLocaleString('id-ID')}
              </div>
              <div className="text-[10px] font-medium text-blue-200 uppercase">Mahasiswa Aktif</div>
            </div>
            <div>
              <div className="font-mono-tabular text-lg font-black text-yellow-300">
                54,6%
              </div>
              <div className="text-[10px] font-medium text-blue-200 uppercase">Mahasiswi Rantau</div>
            </div>
          </div>

          {/* Navigation Tabs inside Drawer */}
          <div className="mt-5 flex items-center gap-2">
            {[
              { id: 'universitas', label: 'Daftar Universitas', icon: GraduationCap },
              { id: 'kost', label: 'Rekomendasi Kost', icon: Home },
              { id: 'layanan', label: 'Layanan Mahasiswa', icon: ShieldCheck }
            ].map((tab) => {
              const IconComp = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    active
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-900 bg-slate-50">
          {/* TAB 1: DAFTAR UNIVERSITAS */}
          {activeTab === 'universitas' && (
            <div>
              {/* Search & Filter Bar */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={univSearch}
                    onChange={(e) => setUnivSearch(e.target.value)}
                    placeholder="Cari Universitas Brawijaya, UM, UIN, Polinema..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(['Semua', 'Negeri', 'Swasta', 'Kedinasan / Politeknik'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setUnivTypeFilter(t)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                        univTypeFilter === t
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Universities List */}
              <div className="mt-5 space-y-3.5">
                {filteredUniversities.map((univ) => (
                  <div
                    key={univ.id}
                    className="rounded-2xl border border-blue-100 bg-white p-4 shadow-xs transition-all hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-extrabold text-blue-700">
                            {univ.shortName}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            Status: {univ.type}
                          </span>
                        </div>
                        <h4 className="mt-1 text-base font-bold text-slate-900">
                          {univ.name}
                        </h4>
                      </div>

                      <div className="font-mono-tabular text-right">
                        <div className="text-xs font-black text-blue-600">
                          {univ.totalStudents.toLocaleString('id-ID')}
                        </div>
                        <div className="text-[10px] text-slate-500">Mahasiswa</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                      <span>{univ.address} (Kec. {univ.kecamatan})</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Fakultas / Program: </span>
                      {univ.keyFaculty}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                      <span className="text-slate-500">
                        Rasio Mahasiswi: <span className="font-semibold text-blue-700">{univ.femaleRatio}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('kost');
                          setKostCampusFilter(univ.shortName);
                        }}
                        className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800"
                      >
                        <span>Cari Kost Terdekat</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REKOMENDASI KOST BERDASARKAN UNIVERSITAS */}
          {activeTab === 'kost' && (
            <div>
              {/* Campus Filter Bar */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-700 mr-1">Filter Kampus:</span>
                  {['Semua', 'UB', 'UM', 'Polinema', 'UIN', 'UMM', 'Unmer'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setKostCampusFilter(c)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                        kostCampusFilter === c
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 mr-1">Tipe Kost:</span>
                  {(['Semua', 'Khusus Putri', 'Campur'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setKostTypeFilter(t)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                        kostTypeFilter === t
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kost Cards */}
              <div className="mt-5 space-y-4">
                {filteredKosts.map((kost) => (
                  <div
                    key={kost.id}
                    className="rounded-2xl border border-blue-100 bg-white p-5 shadow-xs transition-all hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                            kost.genderType === 'Khusus Putri' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {kost.genderType}
                          </span>
                          <span className="text-xs font-bold text-blue-700">
                            {kost.universityTarget}
                          </span>
                        </div>
                        <h4 className="mt-1.5 text-base font-bold text-slate-900">
                          {kost.name}
                        </h4>
                      </div>

                      <div className="font-mono-tabular text-right">
                        <div className="text-xs font-bold text-emerald-700">
                          {kost.priceMonthly}
                        </div>
                        <div className="text-[10px] text-slate-500">Estimasi Sewa</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span>{kost.distanceToCampus} (Jalan Kaki ~{kost.walkMinutes} Menit)</span>
                    </div>

                    <div className="mt-1 text-xs text-slate-500 pl-5">
                      {kost.address}
                    </div>

                    {/* Facilities Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {kost.facilities.map((fac) => (
                        <span
                          key={fac}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          ✓ {fac}
                        </span>
                      ))}
                    </div>

                    {/* Safety Verification Badge */}
                    <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5 text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5 font-bold">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Verifikasi Keamanan Lingkungan Pemkot Malang</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-emerald-700">{kost.securityNote}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                      <div className="flex items-center gap-1.5 font-mono-tabular text-slate-600">
                        <Phone className="h-3.5 w-3.5 text-blue-600" />
                        <span>Kontak: {kost.contactNumber}</span>
                      </div>
                      <a
                        href={`https://wa.me/${kost.contactNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-blue-600 px-3 py-1.5 font-bold text-white hover:bg-blue-700 transition-colors"
                      >
                        Hubungi Pemilik Kost
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LAYANAN KHUSUS MAHASISWA */}
          {activeTab === 'layanan' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-600 p-2.5 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Surat Domisili Non-Permanen (SKDS) Mahasiswa Daring
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      Bagi mahasiswa luar kota, Anda tidak perlu mengubah KTP asal. Cukup ajukan SKDS daring gratis untuk syarat beasiswa, buka rekening bank Malang, atau perizinan lainnya.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSkdsService();
                      }}
                      className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Ajukan SKDS Daring Sekarang
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="text-base font-bold text-slate-900">
                  Pindah Faskes BPJS / JKN ke Puskesmas Kampus
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Gunakan aplikasi Mobile JKN atau datangi Mal Pelayanan Publik (MPP) Merdeka untuk memindahkan faskes primer ke Puskesmas Dinoyo (Area UB/UIN), Puskesmas Kendalsari (Suhat), atau Puskesmas Rampal Celaket (UM).
                </p>
                <div className="font-mono-tabular mt-3 text-xs font-semibold text-blue-700">
                  Gratis · Ditanggung JKN / UHC Kota Malang
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="text-base font-bold text-slate-900">
                  Saluran Bantuan & Keamanan Mahasiswi 24 Jam
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Jika mengalami gangguan keamanan di sekitar kos, lampu gang padam, atau pelecehan jalanan, hubungi segera:
                </p>
                <div className="font-mono-tabular mt-3 space-y-1.5 text-xs font-bold text-slate-900">
                  <div>• Ngalam Command Center: 112 (Bebas Pulsa)</div>
                  <div>• UPTD Perlindungan Perempuan: 0811-3789-112</div>
                  <div>• Ambulans Cepat PSC: 119 / (0341) 362222</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
