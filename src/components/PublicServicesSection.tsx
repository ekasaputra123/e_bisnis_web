import React, { useState, useMemo } from 'react';
import { MUNICIPAL_SERVICES, MunicipalService } from '../data/malangData';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  X,
  FileCheck2,
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface PublicServicesSectionProps {
  onOpenStudentDrawer: () => void;
}

export const PublicServicesSection: React.FC<PublicServicesSectionProps> = ({
  onOpenStudentDrawer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [serviceQuery, setServiceQuery] = useState('');
  const [activeService, setActiveService] = useState<MunicipalService | null>(null);

  // Application form simulation state
  const [nikOrKtm, setNikOrKtm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const filteredServices = useMemo(() => {
    return MUNICIPAL_SERVICES.filter((srv) => {
      const matchCat = selectedCategory === 'Semua' || srv.category === selectedCategory;
      const q = serviceQuery.trim().toLowerCase();
      const matchQ =
        !q ||
        srv.title.toLowerCase().includes(q) ||
        srv.code.toLowerCase().includes(q) ||
        srv.opd.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [selectedCategory, serviceQuery]);

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Mohon masukkan nama lengkap pemohon.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Mohon masukkan nomor WhatsApp aktif.');
      return;
    }
    setFormError('');
    const rand = Math.floor(1000 + Math.random() * 9000);
    setSubmittedReceipt(`MPP-MLG-${rand}`);
  };

  return (
    <section id="layanan-publik" className="border-b border-blue-100 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold text-blue-700">
              <Building2 className="h-3.5 w-3.5" />
              <span>Mal Pelayanan Publik (MPP Merdeka) & Layanan Daring</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
              Layanan Administrasi Warga & Mahasiswa Tanpa Pungli
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Satu gerbang resmi Pemerintah Kota Malang untuk pengurusan identitas kependudukan digital (IKD), surat domisili non-permanen (SKDS), pajak PBB, jaminan kesehatan UHC, hingga perizinan berusaha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenStudentDrawer}
              className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-700 shadow-xs hover:bg-blue-50 transition-colors"
            >
              <span>Buka Menu Khusus Mahasiswa (Universitas & Kost)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-y border-blue-100 py-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-1 border border-blue-100">
            {['Semua', 'Kependudukan', 'Kesehatan', 'Perizinan & UMKM', 'Pajak Daerah'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={serviceQuery}
              onChange={(e) => setServiceQuery(e.target.value)}
              placeholder="Cari KTP, SKDS Mahasiswa, PBB, NIB..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((srv) => (
            <article
              key={srv.id}
              className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-xs transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div>
                <div className="font-mono-tabular flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700">{srv.code}</span>
                  <span className="font-semibold text-emerald-600">{srv.cost}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {srv.title}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Penyelenggara: {srv.opd}
                </p>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {srv.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-3">
                <div className="font-mono-tabular text-xs text-slate-500">
                  SLA: {srv.sla}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveService(srv);
                    setSubmittedReceipt(null);
                    setFormError('');
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  <span>Akses Layanan Daring</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Modal Service Application */}
      {activeService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-blue-100 bg-white p-6 text-slate-900 shadow-2xl lg:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-4">
              <div>
                <div className="font-mono-tabular text-xs font-bold text-blue-600">
                  {activeService.code} · {activeService.cost}
                </div>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {activeService.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{activeService.opd}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submittedReceipt ? (
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold uppercase text-blue-600">Registrasi Berhasil</div>
                    <div className="font-mono-tabular text-lg font-bold text-slate-900">
                      Kode Berkas: {submittedReceipt}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Permohonan telah diteruskan ke petugas loket MPP Merdeka / Dinas terkait. Salinan bukti registrasi TTE dikirimkan ke WhatsApp Anda.
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveService(null)}
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitService} className="mt-5 space-y-3.5">
                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Nama Pemohon Sesuai KTP / KTM
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Farhan / Siti Rahma"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    NIK KTP / NOP Pajak / Nomor Mahasiswa
                  </label>
                  <input
                    type="text"
                    required
                    value={nikOrKtm}
                    onChange={(e) => setNikOrKtm(e.target.value)}
                    placeholder="Contoh: 357301xxxxxxxxxx / NIK / NIM"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveService(null)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    Kirim Permohonan Daring
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
