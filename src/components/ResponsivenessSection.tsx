import React, { useState, useMemo } from 'react';
import { SambatTicket } from '../data/malangData';
import {
  Search,
  ThumbsUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  X,
  MapPin,
  GraduationCap
} from 'lucide-react';

interface ResponsivenessSectionProps {
  tickets: SambatTicket[];
  onAddTicket: (newTicket: SambatTicket) => void;
  onUpvoteTicket: (ticketId: string) => void;
  upvotedIds: string[];
  isNewReportModalOpen: boolean;
  setIsNewReportModalOpen: (open: boolean) => void;
}

export const ResponsivenessSection: React.FC<ResponsivenessSectionProps> = ({
  tickets,
  onAddTicket,
  onUpvoteTicket,
  upvotedIds,
  isNewReportModalOpen,
  setIsNewReportModalOpen
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'students'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || 'SMB-2026-9102');

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SambatTicket['category']>('Keamanan Mahasiswi & Kos');
  const [kecamatan, setKecamatan] = useState<SambatTicket['kecamatan']>('Lowokwaru');
  const [locationDetail, setLocationDetail] = useState('');
  const [campusArea, setCampusArea] = useState('Area Kampus UB / Lowokwaru');
  const [reporterName, setReporterName] = useState('');
  const [isStudentReport, setIsStudentReport] = useState(true);
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchFilter = filterMode === 'all' || (filterMode === 'students' && !!t.isStudentReport);
      const q = searchQuery.trim().toLowerCase();
      const matchQ =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.locationDetail.toLowerCase().includes(q) ||
        (t.campusArea && t.campusArea.toLowerCase().includes(q));
      return matchFilter && matchQ;
    });
  }, [tickets, filterMode, searchQuery]);

  const activeTicket = useMemo(() => {
    return (
      tickets.find((t) => t.id === selectedTicketId) ||
      filteredTickets[0] ||
      tickets[0]
    );
  }, [tickets, selectedTicketId, filteredTickets]);

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 8) {
      setFormError('Judul aduan wajib diisi minimal 8 karakter agar jelas ditindaklanjuti OPD.');
      return;
    }
    if (!locationDetail.trim()) {
      setFormError('Mohon isi alamat atau patokan lokasi jalan/gang.');
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      setFormError('Mohon jelaskan kondisi lapangan minimal 15 karakter.');
      return;
    }

    const opdMap: Record<SambatTicket['category'], string> = {
      'Keamanan Mahasiswi & Kos': 'Satpol PP Kota Malang, Bhabinkamtibmas & UPTD PPA',
      'Keamanan & Ketertiban': 'Satpol PP Kota Malang & Bhabinkamtibmas',
      'Penerangan Jalan (PJU)': 'Dinas Lingkungan Hidup (UPT PJU Kota Malang)',
      'Infrastruktur & Jalan': 'DPUPRPKP Kota Malang (Tim URC Bina Marga)',
      'Drainase & Banjir': 'Satgas Drainase DPUPRPKP Kota Malang',
      'Layanan Administrasi': 'Dispendukcapil & Inspektorat Daerah',
      'Transportasi Kampus': 'Dinas Perhubungan (Bidang Angkutan & Lalu Lintas)'
    };

    const rand = Math.floor(9200 + Math.random() * 800);
    const newId = `SMB-2026-${rand}`;
    const nowTime = '12 Okt 2026 · Baru Saja';

    const created: SambatTicket = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      category,
      kecamatan,
      locationDetail: locationDetail.trim(),
      campusArea: isStudentReport ? campusArea : undefined,
      reporterName: reporterName.trim() ? reporterName.trim() : 'Warga/Mahasiswa Kota Malang',
      isStudentReport,
      createdAt: nowTime,
      status: 'Verifikasi Cepat UPTD/OPD',
      opdAssigned: opdMap[category],
      responseTimeHours: 0.3,
      upvotes: 1,
      timeline: [
        {
          time: nowTime,
          stage: 'Laporan Diterima Sistem SAMBAT',
          actor: reporterName.trim() || 'Pelapor Terverifikasi',
          note: `Laporan di ${locationDetail.trim()}, Kec. ${kecamatan} tercatat dalam sistem respon cepat.`
        },
        {
          time: '12 Okt 2026 · (< 5 Menit)',
          stage: 'Disposisi Cepat Command Center 112',
          actor: `Sistem Terpadu -> ${opdMap[category]}`,
          note: 'Notifikasi instruksi lapangan diteruskan ke tim siaga dinas terkait.'
        }
      ]
    };

    onAddTicket(created);
    setSelectedTicketId(created.id);
    setTitle('');
    setLocationDetail('');
    setDescription('');
    setReporterName('');
    setFormError('');
    setIsNewReportModalOpen(false);
  };

  return (
    <section id="responsivitas-sambat" className="border-b border-blue-100 bg-blue-50/30 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Blue & White Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <span>Pilar Responsivitas · SAMBAT Online 112</span>
            </div>
            <h2 className="text-balance mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Tanggap Cepat Pengaduan Warga & Mahasiswa Rantau
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Sistem Aplikasi Masyarakat Bertanya Terpadu (SAMBAT) memprioritaskan penanganan lampu PJU padam di sekitar kos, jalur pejalan kaki kampus, serta laporan perlindungan warga dengan target SLA tanggap di bawah 2 jam.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsNewReportModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-xs font-bold whitespace-nowrap text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Buat Aduan SAMBAT Baru</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar: All vs Students */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-y border-blue-100 py-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-1 border border-blue-100">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Aduan Kota Malang
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('students')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                filterMode === 'students'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Khusus Aduan Mahasiswa & Kampus</span>
            </button>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari No. Tiket / Jl. Sigura-gura / Suhat..."
              aria-label="Cari tiket aduan SAMBAT"
              className="font-mono-tabular w-full rounded-xl border border-blue-200 bg-white py-2 pr-8 pl-10 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Feed & Detail Inspection */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Tickets */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {filteredTickets.map((ticket) => {
              const isSelected = activeTicket?.id === ticket.id;
              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-white shadow-md ring-1 ring-blue-600/20'
                      : 'border-blue-100 bg-white hover:border-blue-300 hover:shadow-xs'
                  }`}
                >
                  <div className="font-mono-tabular flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-bold text-blue-700">{ticket.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ticket.kecamatan}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      {ticket.status === 'Selesai Ditindaklanjuti' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : ticket.status === 'Dalam Pengerjaan Lapangan' ? (
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
                      )}
                      {ticket.status}
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {ticket.title}
                  </h3>

                  {ticket.campusArea && (
                    <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-700">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                      <span>{ticket.campusArea}</span>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{ticket.category}</span>
                    <span className="font-mono-tabular font-medium text-slate-700">
                      {ticket.upvotes} dukungan
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Ticket Audit */}
          {activeTicket && (
            <div className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-xs lg:col-span-7 lg:p-8">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blue-100 pb-5">
                  <div>
                    <div className="font-mono-tabular flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-blue-700">{activeTicket.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTicket.createdAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>Pelapor: {activeTicket.reporterName}</span>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {activeTicket.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpvoteTicket(activeTicket.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                      upvotedIds.includes(activeTicket.id)
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300'
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="font-mono-tabular">
                      {upvotedIds.includes(activeTicket.id) ? 'Didukung' : 'Dukung Prioritas'} ({activeTicket.upvotes})
                    </span>
                  </button>
                </div>

                {/* Location & OPD Details */}
                <div className="mt-5 grid grid-cols-1 gap-4 border-b border-blue-100 pb-5 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-slate-500">Lokasi & Area</div>
                    <div className="mt-1 flex items-start gap-1.5 text-sm font-semibold text-slate-900">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <span>{activeTicket.locationDetail} ({activeTicket.kecamatan})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">OPD / Tim Penindak Lanjut</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {activeTicket.opdAssigned}
                    </div>
                    <div className="font-mono-tabular mt-0.5 text-xs font-semibold text-blue-700">
                      Waktu Tanggap: {activeTicket.responseTimeHours} Jam
                    </div>
                  </div>
                </div>

                {/* Problem Description */}
                <div className="mt-5">
                  <div className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Rincian Kondisi Lapangan
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {activeTicket.description}
                  </p>
                </div>

                {/* Audit Timeline */}
                {activeTicket.timeline && activeTicket.timeline.length > 0 && (
                  <div className="mt-6 border-t border-blue-100 pt-5">
                    <div className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Jejak Tindak Lanjut Lapangan ({activeTicket.timeline.length} Tahap)
                    </div>
                    <div className="mt-4 space-y-3">
                      {activeTicket.timeline.map((step: any, idx: number) => (
                        <div key={idx} className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                          <div className="font-mono-tabular flex justify-between text-xs text-slate-500">
                            <span className="font-bold text-slate-900">0{idx + 1}. {step.stage}</span>
                            <span>{step.time}</span>
                          </div>
                          <div className="mt-1 text-xs font-semibold text-blue-700">
                            Pelaksana: {step.actor}
                          </div>
                          <p className="mt-1 text-xs text-slate-600">{step.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-blue-100 pt-4 text-xs font-medium text-slate-500">
                Laporan Terhubung ke Command Center 112 & SP4N LAPOR! Nasional
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: New Sambat Report */}
      {isNewReportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-blue-100 bg-white p-6 text-slate-900 shadow-2xl lg:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-4">
              <div>
                <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  SAMBAT Online · Disposisi Terbuka 24 Jam
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Sampaikan Keluhan atau Masalah Lingkungan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewReportModalOpen(false)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="mt-5 space-y-4">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                  {formError}
                </div>
              )}

              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-900">
                  <input
                    type="checkbox"
                    checked={isStudentReport}
                    onChange={(e) => setIsStudentReport(e.target.checked)}
                    className="accent-blue-600"
                  />
                  <span>Saya adalah Mahasiswi / Mahasiswa di Kota Malang</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Judul Keluhan
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Lampu jalan padam di gang kos Jl. Sigura-gura"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Kategori Laporan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SambatTicket['category'])}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Keamanan Mahasiswi & Kos">Keamanan Mahasiswi & Kos</option>
                    <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                    <option value="Penerangan Jalan (PJU)">Penerangan Jalan (PJU)</option>
                    <option value="Infrastruktur & Jalan">Infrastruktur & Jalan</option>
                    <option value="Drainase & Banjir">Drainase & Banjir</option>
                    <option value="Layanan Administrasi">Layanan Administrasi</option>
                    <option value="Transportasi Kampus">Transportasi Kampus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Kecamatan
                  </label>
                  <select
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value as SambatTicket['kecamatan'])}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Lowokwaru">Lowokwaru (UB/Polinema/UIN)</option>
                    <option value="Klojen">Klojen (UM/Pusat Kota)</option>
                    <option value="Blimbing">Blimbing (MCC/A. Yani)</option>
                    <option value="Sukun">Sukun (Unmer/Kanjuruhan)</option>
                    <option value="Kedungkandang">Kedungkandang</option>
                  </select>
                </div>
              </div>

              {isStudentReport && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Kawasan Kampus Terdekat
                  </label>
                  <select
                    value={campusArea}
                    onChange={(e) => setCampusArea(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Area Kampus UB / Lowokwaru">Area Kampus UB / Lowokwaru</option>
                    <option value="Area Kampus UM / Klojen">Area Kampus UM / Klojen</option>
                    <option value="Area UIN Maulana Malik Ibrahim">Area UIN Maulana Malik Ibrahim</option>
                    <option value="Area Polinema / Suhat">Area Polinema / Suhat</option>
                    <option value="Area Unisma / Dinoyo">Area Unisma / Dinoyo</option>
                    <option value="Area UMM / Tlogomas">Area UMM / Tlogomas</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Lokasi Lengkap / Patokan Jalan
                </label>
                <input
                  type="text"
                  value={locationDetail}
                  onChange={(e) => setLocationDetail(e.target.value)}
                  placeholder="Contoh: Jl. Kerto Raharjo Gg. 3 dekat Kos Melati"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Nama Pelapor
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Contoh: Rina / Budi"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Rincian Kondisi Lapangan
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan detail permasalahan agar tim teknis membawa perlengkapan yang tepat..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewReportModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Kirim Aduan SAMBAT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
