import React from 'react';
import { APBD_2026_DATA } from '../data/malangData';
import { Download, ShieldCheck, FileText } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  const DOCUMENTS = [
    {
      code: 'PPID-APBD-2026',
      title: 'Ringkasan APBD Kota Malang TA 2026 & Alokasi Responsif Gender/Pemuda',
      size: '4.2 MB (PDF & CSV Terbuka)',
      highlights: [
        'Total Belanja Rp 2,74 Triliun dengan alokasi ramah perempuan & generasi muda Rp 348,5 Miliar.',
        'Penyediaan beasiswa perguruan tinggi untuk 2.400 mahasiswa berprestasi dan keluarga prasejahtera.',
        'Pembangunan dan peremajaan lampu PJU LED pintar di koridor pendidikan Lowokwaru dan Klojen.'
      ]
    },
    {
      code: 'PPID-AUDIT-BPK',
      title: 'Laporan Hasil Pemeriksaan BPK RI atas Laporan Keuangan Pemkot Malang',
      size: '5.1 MB (PDF Terbuka)',
      highlights: [
        'Opini Wajar Tanpa Pengecualian (WTP) ke-14 kali secara berturut-turut.',
        'Zero temuan material kerugian negara pada pos belanja sosial dan pelayanan publik.',
        'Tingkat kepatuhan tindak lanjut rekomendasi BPK mencapai 94,8%.'
      ]
    },
    {
      code: 'PPID-KAMPUS-SAFE',
      title: 'Rencana Tata Ruang Koridor Kampus Ramah Pejalan Kaki & Jalur Sepeda Mahasiswi',
      size: '3.8 MB (Peta Geospasial & PDF)',
      highlights: [
        'Pelebaran trotoar ramah disabilitas di Jl. Veteran, Jl. Bandung, dan Jl. Mayjen Panjaitan.',
        'Integrasi 120 sensor CCTV ATCS Dishub yang dapat dipantau oleh kepolisian dan masyarakat.',
        'Titik pangkalan resmi ojek daring dengan fasilitas ruang tunggu aman mahasiswi.'
      ]
    }
  ];

  return (
    <section id="transparansi-publik" className="border-b border-blue-100 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <span>Pilar Transparansi · APBD 2026 & PPID</span>
            </div>
            <h2 className="text-balance mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Anggaran Kota Malang yang Adil Gender & Terbuka untuk Mahasiswa
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Setiap rupiah dari pajak daerah dan alokasi dana transfer pusat diaudit secara independen oleh BPK RI. Pemkot Malang membuka transparansi program beasiswa, lampu jalan gang kampus, dan sarana mobilitas terpadu.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-4">
            <div className="text-xs text-slate-500">Keterbukaan Informasi Publik (UU No. 14/2008)</div>
            <div className="font-mono-tabular mt-1 text-xs font-bold text-emerald-700">
              Opini Audit: {APBD_2026_DATA.auditOpinion}
            </div>
          </div>
        </div>

        {/* 4 Quantitative Budget Tiles in Blue & White */}
        <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-xs sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-100 pb-4 sm:border-r sm:border-b-0 sm:pr-6 sm:pb-0">
            <div className="text-xs text-slate-500">Total Belanja APBD TA 2026</div>
            <div className="font-mono-tabular mt-1 text-2xl font-bold text-slate-900">
              Rp {APBD_2026_DATA.totalExpenditureTrillion.toFixed(2)} T
            </div>
            <div className="font-mono-tabular mt-1 text-xs text-slate-500">
              PAD Mandiri: Rp {APBD_2026_DATA.padBillion.toLocaleString('id-ID')} M
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0">
            <div className="text-xs text-slate-500">Alokasi Ramah Gender & Mahasiswi</div>
            <div className="font-mono-tabular mt-1 text-2xl font-bold text-blue-600">
              Rp {APBD_2026_DATA.youthAndGenderAllocationBillion.toLocaleString('id-ID')} M
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Proteksi perempuan, kesehatan & ruang publik
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4 sm:border-r sm:border-b-0 sm:pr-6 sm:pb-0">
            <div className="text-xs text-slate-500">Beasiswa Mahasiswa & Riset</div>
            <div className="font-mono-tabular mt-1 text-2xl font-bold text-emerald-600">
              Rp {APBD_2026_DATA.scholarshipAllocationBillion.toLocaleString('id-ID')} M
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Untuk 2.400 mahasiswa berprestasi & 3T
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500">PJU Pintar & Jalur Aman Kampus</div>
            <div className="font-mono-tabular mt-1 text-2xl font-bold text-slate-900">
              Rp {APBD_2026_DATA.pjuAndSafetyCampusBillion.toLocaleString('id-ID')} M
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Penerangan 1.200 titik gang kos mahasiswi
            </div>
          </div>
        </div>

        {/* PPID Open Documents */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900">
            Dokumen Informasi Publik Terbuka PPID Kota Malang
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Dapat diakses dan diunduh langsung oleh mahasiswa, akademisi, jurnalis, maupun warga umum tanpa birokrasi perizinan.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.code}
                className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-xs transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="font-mono-tabular text-xs font-semibold text-blue-600">
                    {doc.code} · {doc.size}
                  </div>
                  <h4 className="mt-2 text-base font-bold text-slate-900">
                    {doc.title}
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {doc.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3">
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                      `DOKUMEN RESMI PPID PEMKOT MALANG\n${doc.code}: ${doc.title}\n\nPoin Utama:\n${doc.highlights.join('\n')}`
                    )}`}
                    download={`${doc.code}.txt`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-2 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Unduh Dokumen Publik</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
