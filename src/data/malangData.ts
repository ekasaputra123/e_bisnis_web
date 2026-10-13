export const HERO_IMAGE_PATH = '/src/assets/images/hero_mahasiswi_malang_1791867094537.jpg';
export const KAYUTANGAN_IMAGE_PATH = '/src/assets/images/kayutangan_student_hub_1791867096758.jpg';
export const MCC_IMAGE_PATH = '/src/assets/images/mcc_female_creative_1791867096585.jpg';
export const SAFE_STREET_IMAGE_PATH = '/src/assets/images/safe_campus_neighborhood_1791867096388.jpg';

export interface UniversityItem {
  id: string;
  name: string;
  shortName: string;
  type: 'Negeri' | 'Swasta' | 'Kedinasan / Politeknik';
  totalStudents: number;
  femaleRatio: string;
  address: string;
  kecamatan: string;
  keyFaculty: string;
  website: string;
}

export interface KostRecommendation {
  id: string;
  name: string;
  universityTarget: string;
  genderType: 'Khusus Putri' | 'Campur' | 'Khusus Putra';
  priceMonthly: string;
  distanceToCampus: string;
  walkMinutes: number;
  address: string;
  facilities: string[];
  safetyVerified: boolean;
  securityNote: string;
  contactNumber: string;
}

export interface CctvPoint {
  id: string;
  name: string;
  area: string;
  status: 'Live Online' | 'Maintenance';
  streamFps: number;
  trafficStatus: 'Lancar' | 'Ramai Lancar' | 'Padat Merayap';
  description: string;
}

export interface MunicipalService {
  id: string;
  code: string;
  title: string;
  opd: string;
  category: 'Kependudukan' | 'Kesehatan' | 'Perizinan & UMKM' | 'Pajak Daerah';
  sla: string;
  cost: string;
  description: string;
}

export interface SambatTicket {
  id: string;
  title: string;
  description: string;
  category: 'Keamanan Mahasiswi & Kos' | 'Keamanan & Ketertiban' | 'Penerangan Jalan (PJU)' | 'Infrastruktur & Jalan' | 'Drainase & Banjir' | 'Layanan Administrasi' | 'Transportasi Kampus';
  kecamatan: 'Lowokwaru' | 'Klojen' | 'Blimbing' | 'Sukun' | 'Kedungkandang';
  locationDetail: string;
  campusArea?: string;
  reporterName: string;
  isStudentReport?: boolean;
  createdAt: string;
  status: 'Selesai Ditindaklanjuti' | 'Dalam Pengerjaan Lapangan' | 'Verifikasi Cepat OPD' | 'Verifikasi Cepat UPTD/OPD';
  opdAssigned: string;
  responseTimeHours: number;
  upvotes: number;
  timeline?: {
    time: string;
    stage: string;
    actor: string;
    note: string;
  }[];
}

export interface WalikanWord {
  word: string;
  original: string;
  meaning: string;
  contextUsage: string;
  category: string;
}

// -------------------------------------------------------------
// DATA MAHASISWA & UNIVERSITAS DI KOTA MALANG
// -------------------------------------------------------------
export const MALANG_STUDENT_STATS = {
  totalUniversities: 62,
  totalStudents: 324500,
  femaleStudentsRatio: '54.6% Mahasiswi (18-22 Tahun)',
  outOfTownRatio: '78.2% Mahasiswa Pendatang / Rantau',
  mainCampusDistricts: ['Lowokwaru (Pusat Kampus)', 'Klojen (Pusat Kota)', 'Sukun (Kampus Selatan)', 'Blimbing (Kreatif & Vokasi)']
};

export const UNIVERSITIES_LIST: UniversityItem[] = [
  {
    id: 'ub',
    name: 'Universitas Brawijaya',
    shortName: 'UB',
    type: 'Negeri',
    totalStudents: 68500,
    femaleRatio: '56%',
    address: 'Jl. Veteran No. 10-11, Ketawanggede',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Kedokteran, FIA, FILKOM, FEB, Teknik, Pertanian, Hukum',
    website: 'https://ub.ac.id'
  },
  {
    id: 'um',
    name: 'Universitas Negeri Malang',
    shortName: 'UM',
    type: 'Negeri',
    totalStudents: 43200,
    femaleRatio: '61%',
    address: 'Jl. Semarang No. 5, Sumbersari',
    kecamatan: 'Lowokwaru / Klojen',
    keyFaculty: 'Keguruan & Pendidikan, Sastra, FMIPA, Psikologi, Teknik',
    website: 'https://um.ac.id'
  },
  {
    id: 'uin',
    name: 'Universitas Islam Negeri Maulana Malik Ibrahim',
    shortName: 'UIN Malang',
    type: 'Negeri',
    totalStudents: 26800,
    femaleRatio: '58%',
    address: 'Jl. Gajayana No. 50, Dinoyo',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Humaniora, Syariah, Tarbiyah, Psikologi, Sains & Teknologi, Kedokteran',
    website: 'https://uin-malang.ac.id'
  },
  {
    id: 'polinema',
    name: 'Politeknik Negeri Malang',
    shortName: 'Polinema',
    type: 'Kedinasan / Politeknik',
    totalStudents: 23500,
    femaleRatio: '48%',
    address: 'Jl. Soekarno-Hatta No. 9, Jatimulyo',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Teknik Elektro, Teknologi Informasi, Akuntansi, Teknik Sipil',
    website: 'https://polinema.ac.id'
  },
  {
    id: 'umm',
    name: 'Universitas Muhammadiyah Malang',
    shortName: 'UMM',
    type: 'Swasta',
    totalStudents: 42000,
    femaleRatio: '55%',
    address: 'Jl. Raya Tlogomas No. 246 & Kampus II Bendungan Sutami',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Kedokteran, Psikologi, FISIP, FAI, Pertanian & Peternakan',
    website: 'https://umm.ac.id'
  },
  {
    id: 'unmer',
    name: 'Universitas Merdeka Malang',
    shortName: 'Unmer',
    type: 'Swasta',
    totalStudents: 15400,
    femaleRatio: '51%',
    address: 'Jl. Terusan Raya Dieng No. 62-64',
    kecamatan: 'Sukun',
    keyFaculty: 'Ekonomi & Bisnis, Hukum, Teknik, Ilmu Sosial & Politik, Psikologi',
    website: 'https://unmer.ac.id'
  },
  {
    id: 'unisma',
    name: 'Universitas Islam Malang',
    shortName: 'Unisma',
    type: 'Swasta',
    totalStudents: 17800,
    femaleRatio: '54%',
    address: 'Jl. Mayjen Haryono No. 193, Dinoyo',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Kedokteran, Pertanian, Peternakan, Agama Islam, Hukum',
    website: 'https://unisma.ac.id'
  },
  {
    id: 'itn',
    name: 'Institut Teknologi Nasional Malang',
    shortName: 'ITN',
    type: 'Swasta',
    totalStudents: 9200,
    femaleRatio: '38%',
    address: 'Jl. Bendungan Sigura-gura No. 2',
    kecamatan: 'Lowokwaru',
    keyFaculty: 'Teknik Arsitektur, Teknik Sipil, Teknik Geodesi, Teknik Industri',
    website: 'https://itn.ac.id'
  },
  {
    id: 'poltekkes',
    name: 'Poltekkes Kemenkes Malang',
    shortName: 'Poltekkes',
    type: 'Kedinasan / Politeknik',
    totalStudents: 7800,
    femaleRatio: '78%',
    address: 'Jl. Besar Ijen No. 77C, Oro-oro Dowo',
    kecamatan: 'Klojen',
    keyFaculty: 'Keperawatan, Kebidanan, Gizi, Perekam Medis, Analis Farmasi',
    website: 'https://poltekkes-malang.ac.id'
  },
  {
    id: 'unikama',
    name: 'Universitas PGRI Kanjuruhan Malang',
    shortName: 'Unikama',
    type: 'Swasta',
    totalStudents: 10400,
    femaleRatio: '59%',
    address: 'Jl. S. Supriadi No. 48, Bandungrejosari',
    kecamatan: 'Sukun',
    keyFaculty: 'Pendidikan Bahasa, Sains & Teknologi, Ekonomi & Bisnis',
    website: 'https://unikama.ac.id'
  }
];

// -------------------------------------------------------------
// REKOMENDASI KOST BERDASARKAN LOKASI UNIVERSITAS
// -------------------------------------------------------------
export const KOST_RECOMMENDATIONS: KostRecommendation[] = [
  {
    id: 'kost-ub-01',
    name: 'Kost Putri Griya Melati Ketawanggede',
    universityTarget: 'UB (Universitas Brawijaya)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 850.000 - Rp 1.400.000 / bln',
    distanceToCampus: '250 m ke Gerbang Kerto / FIA UB',
    walkMinutes: 4,
    address: 'Jl. Kerto Raharjo No. 18, Ketawanggede, Lowokwaru',
    facilities: ['Wi-Fi 100 Mbps', 'Kamar Mandi Dalam', 'CCTV 24 Jam', 'Dapur Bersama', 'Penjaga Kos Siaga'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Satpol PP & Bhabinkamtibmas: Berizin resmi, PJU terang, akses gerbang kartu digital.',
    contactNumber: '0812-3344-5561'
  },
  {
    id: 'kost-ub-02',
    name: 'Kost Putri Asri Sigura-gura',
    universityTarget: 'UB (Universitas Brawijaya)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 950.000 - Rp 1.600.000 / bln',
    distanceToCampus: '450 m ke Gerbang Veteran UB & ITN',
    walkMinutes: 6,
    address: 'Jl. Bendungan Sigura-gura Barat V No. 8, Lowokwaru',
    facilities: ['Wi-Fi Cepat', 'Kamar Mandi Dalam', 'AC & Water Heater', 'Parkir Motor Luas', 'Mesin Cuci Bersama'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Satpol PP: Lingkungan pemukiman tenang, sistem satu pintu (one gate system).',
    contactNumber: '0813-7788-9912'
  },
  {
    id: 'kost-um-01',
    name: 'Kost Mahasiswi Graha Sumbersari',
    universityTarget: 'UM (Universitas Negeri Malang)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 800.000 - Rp 1.300.000 / bln',
    distanceToCampus: '300 m ke Gerbang Semarang / Rektorat UM',
    walkMinutes: 5,
    address: 'Jl. Sumbersari Gg. 3 No. 24, Lowokwaru',
    facilities: ['Wi-Fi Kampus Cepat', 'Kasur Springbed', 'Dapur Bersama', 'Kulkas Bersama', 'CCTV 24 Jam'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Kecamatan: Jalur pedestrian berlampu terang menuju kampus UM.',
    contactNumber: '0819-5566-7788'
  },
  {
    id: 'kost-polinema-01',
    name: 'Kost Griya Suhat Residence',
    universityTarget: 'Polinema (Politeknik Negeri Malang)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 1.100.000 - Rp 1.750.000 / bln',
    distanceToCampus: '350 m ke Gerbang Utama Polinema',
    walkMinutes: 5,
    address: 'Jl. Bunga Coklat No. 12, Jatimulyo, Lowokwaru',
    facilities: ['AC', 'Kamar Mandi Dalam', 'Wi-Fi 150 Mbps', 'Parkir Motor Terlindung', 'Akses Kunci Kartu'],
    safetyVerified: true,
    securityNote: 'Terverifikasi DLH & Satpol PP: PJU koridor Suhat aktif, pos kamling aktif 24 jam.',
    contactNumber: '0821-4455-6677'
  },
  {
    id: 'kost-uin-01',
    name: 'Kost Putri Al-Hidayah Dinoyo',
    universityTarget: 'UIN Maulana Malik Ibrahim',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 750.000 - Rp 1.200.000 / bln',
    distanceToCampus: '200 m ke Gerbang Belakang UIN / Sunan Ampel',
    walkMinutes: 3,
    address: 'Jl. Gajayana Gg. 2 No. 15, Dinoyo, Lowokwaru',
    facilities: ['Kamar Mandi Dalam/Luar', 'Wi-Fi', 'Mushola Bersama', 'Dapur', 'Keamanan 24 Jam'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Kelurahan: Lingkungan islami dan tertib jam malam pukul 22.00 WIB.',
    contactNumber: '0857-8899-1122'
  },
  {
    id: 'kost-umm-01',
    name: 'Kost Melati Tlogomas Permai',
    universityTarget: 'UMM (Universitas Muhammadiyah Malang)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 700.000 - Rp 1.100.000 / bln',
    distanceToCampus: '400 m ke Kampus III UMM Tlogomas',
    walkMinutes: 6,
    address: 'Jl. Tlogomas Gg. 7 No. 9, Lowokwaru',
    facilities: ['Wi-Fi Bebas FUP', 'Kasur Busa Tebal', 'Lemari Pakaian', 'Dapur Gas Gratis', 'Parkir Motor'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Satpol PP: Bebas banjir dan diawasi pos ronda RT 04.',
    contactNumber: '0812-9988-7766'
  },
  {
    id: 'kost-unmer-01',
    name: 'Kost Putri Dieng Indah Sukun',
    universityTarget: 'Unmer (Universitas Merdeka)',
    genderType: 'Khusus Putri',
    priceMonthly: 'Rp 800.000 - Rp 1.350.000 / bln',
    distanceToCampus: '250 m ke Kampus Utama Unmer Dieng',
    walkMinutes: 4,
    address: 'Jl. Terusan Dieng Barat Kav. 4, Sukun',
    facilities: ['Kamar Mandi Dalam', 'Wi-Fi', 'Ruang Tamu Putri', 'CCTV', 'Balkon Jemuran Luas'],
    safetyVerified: true,
    securityNote: 'Terverifikasi Polsek Sukun: Jalur terang dan bebas kebisingan jalan raya.',
    contactNumber: '0813-2233-4455'
  }
];

// -------------------------------------------------------------
// TITIK PANTAU CCTV KOTA MALANG (ATCS ONLINE)
// -------------------------------------------------------------
export const CCTV_POINTS: CctvPoint[] = [
  {
    id: 'cctv-tugu',
    name: 'Simpang Balai Kota & Alun-Alun Tugu Malang',
    area: 'Klojen (Pusat Pemerintahan)',
    status: 'Live Online',
    streamFps: 30,
    trafficStatus: 'Lancar',
    description: 'Kamera panoramik 360 derajat mengarah ke Tugu Malang dan Balai Kota.'
  },
  {
    id: 'cctv-suhat',
    name: 'Simpang Jembatan Soekarno-Hatta (Suhat)',
    area: 'Lowokwaru (Kawasan Kampus UB - Polinema)',
    status: 'Live Online',
    streamFps: 30,
    trafficStatus: 'Ramai Lancar',
    description: 'Pemantauan arus lalu lintas mahasiswa dari arah Dinoyo menuju Borobudur.'
  },
  {
    id: 'cctv-dinoyo',
    name: 'Simpang Tiga Dinoyo - MT Haryono (Unisma / UIN)',
    area: 'Lowokwaru (Arah Batu & Kampus)',
    status: 'Live Online',
    streamFps: 25,
    trafficStatus: 'Ramai Lancar',
    description: 'Pemantauan titik padat pejalan kaki mahasiswa dan angkot jalur AL/GL.'
  },
  {
    id: 'cctv-kayutangan',
    name: 'Koridor Pedestrian Basuki Rahmat (Kayutangan Heritage)',
    area: 'Klojen (Kawasan Wisata & Kampus UM)',
    status: 'Live Online',
    streamFps: 30,
    trafficStatus: 'Lancar',
    description: 'Kamera pedestrian untuk keamanan pejalan kaki dan wisatawan malam.'
  },
  {
    id: 'cctv-gadang',
    name: 'Simpang Terminal Gadang',
    area: 'Sukun / Kedungkandang',
    status: 'Live Online',
    streamFps: 25,
    trafficStatus: 'Padat Merayap',
    description: 'Simpul transportasi logistik dan angkutan antar-kota wilayah selatan.'
  }
];

// -------------------------------------------------------------
// LAYANAN RESMI PEMKOT MALANG (G2C UTAMA)
// -------------------------------------------------------------
export const MUNICIPAL_SERVICES: MunicipalService[] = [
  {
    id: 'srv-adminduk',
    code: 'DUKCAPIL-01',
    title: 'Adminduk Terpadu (KTP-el, KIA & Identitas Digital IKD)',
    opd: 'Dinas Kependudukan dan Pencatatan Sipil',
    category: 'Kependudukan',
    sla: 'Selesai 15 Menit - 1 Hari Kerja',
    cost: 'Rp 0 (Gratis Resmi)',
    description: 'Penerbitan dokumen kependudukan tanda tangan elektronik (TTE) resmi secara daring atau loket MPP Merdeka.'
  },
  {
    id: 'srv-skds',
    code: 'DUKCAPIL-02',
    title: 'Surat Domisili Non-Permanen (SKDS) Mahasiswa Rantau Daring',
    opd: 'Dinas Kependudukan dan Pencatatan Sipil',
    category: 'Kependudukan',
    sla: 'Selesai 1 Jam (PDF TTE Langsung)',
    cost: 'Rp 0 (Gratis Resmi)',
    description: 'Layanan domisili bagi mahasiswa luar kota tanpa ubah KTP daerah asal untuk syarat beasiswa & perizinan.'
  },
  {
    id: 'srv-pajak-pbb',
    code: 'BAPENDA-03',
    title: 'e-SPPT PBB Perkotaan & Pembayaran Pajak QRIS',
    opd: 'Badan Pendapatan Daerah (Bapenda)',
    category: 'Pajak Daerah',
    sla: 'Konfirmasi Lunas Real-Time Detik Itu Juga',
    cost: 'Sesuai Ketetapan NOP',
    description: 'Cek tagihan PBB berbasis NOP, unduh e-SPPT resmi, dan bayar lewat QRIS Bank Jatim atau e-wallet.'
  },
  {
    id: 'srv-uhc-kesehatan',
    code: 'DINKES-04',
    title: 'Jaminan Kesehatan UHC Malang Mbois & Pindah Faskes Kampus',
    opd: 'Dinas Kesehatan Kota Malang',
    category: 'Kesehatan',
    sla: 'Aktivasi Instan < 1 Jam',
    cost: 'Rp 0 (Ditanggung APBD)',
    description: 'Jaminan rawat inap/jalan gratis di 16 Puskesmas dan RSUD serta mutasi faskes BPJS mahasiswa.'
  },
  {
    id: 'srv-nib-umkm',
    code: 'DPMPTSP-05',
    title: 'Perizinan Usaha NIB UMKM & Sertifikasi Halal Gratis',
    opd: 'Dinas Penanaman Modal & PTSP (MPP Merdeka)',
    category: 'Perizinan & UMKM',
    sla: 'NIB Terbit 10 Menit Otomatis',
    cost: 'Rp 0 (Subsidi Penuh)',
    description: 'Penerbitan Nomor Induk Berusaha berbasis risiko via OSS terpadu di Mal Pelayanan Publik Merdeka.'
  }
];

export const INITIAL_SAMBAT_TICKETS: SambatTicket[] = [
  {
    id: 'SMB-2026-9102',
    title: 'Lampu PJU Padam di Gang Kos Jl. Kerto Raharjo Ketawanggede',
    description: 'Lampu jalan penerangan di gang kos padam sejak 2 hari lalu, kondisi gelap saat mahasiswa pulang kuliah malam.',
    category: 'Penerangan Jalan (PJU)',
    kecamatan: 'Lowokwaru',
    locationDetail: 'Jl. Kerto Raharjo Gg. 3, Ketawanggede',
    reporterName: 'Salsabila (Mahasiswi UB)',
    createdAt: '12 Okt 2026 · 19:10 WIB',
    status: 'Dalam Pengerjaan Lapangan',
    opdAssigned: 'Dinas Lingkungan Hidup (UPT PJU) & Satpol PP',
    responseTimeHours: 0.8,
    upvotes: 94,
    timeline: [
      {
        time: '12 Okt 2026 · 19:10 WIB',
        stage: 'Laporan Diterima Sistem SAMBAT',
        actor: 'Mahasiswi Pelapor',
        note: 'Titik koordinat gang kos dan foto malam hari terekam.'
      },
      {
        time: '12 Okt 2026 · 19:45 WIB',
        stage: 'Disposisi & Pengecekan Lapangan',
        actor: 'UPT PJU DLH Kota Malang',
        note: 'Petugas lapangan meluncur membawa modul driver lampu LED baru.'
      }
    ]
  },
  {
    id: 'SMB-2026-9088',
    title: 'Perbaikan Aspal Berlubang di Simpang Suhat (Depan Taman Krida)',
    description: 'Terdapat lubang berdiameter 60 cm membahayakan pengendara roda dua mahasiswa saat malam hari.',
    category: 'Infrastruktur & Jalan',
    kecamatan: 'Lowokwaru',
    locationDetail: 'Jl. Soekarno-Hatta No. 42 (Simpang Krida Budaya)',
    reporterName: 'Bagus Prasetyo',
    createdAt: '11 Okt 2026 · 16:30 WIB',
    status: 'Selesai Ditindaklanjuti',
    opdAssigned: 'DPUPRPKP Kota Malang (Tim URC Jalan)',
    responseTimeHours: 1.4,
    upvotes: 112,
    timeline: [
      {
        time: '11 Okt 2026 · 16:30 WIB',
        stage: 'Laporan Masuk',
        actor: 'Warga Pelapor',
        note: 'Foto dan lokasi lubang jalan terkonfirmasi.'
      },
      {
        time: '12 Okt 2026 · 08:00 WIB',
        stage: 'Penambalan Selesai 100%',
        actor: 'Tim URC DPUPRPKP',
        note: 'Penambalan aspal hotmix dan pemadatan telah rampung.'
      }
    ]
  },
  {
    id: 'SMB-2026-9041',
    title: 'Normalisasi Drainase Luapan Air di Gerbang Semarang Kampus UM',
    description: 'Saluran inlet tersumbat sampah dedaunan menyebabkan genangan 15 cm ketika hujan deras sore.',
    category: 'Drainase & Banjir',
    kecamatan: 'Klojen',
    locationDetail: 'Jl. Semarang No. 5 (Depan Rektorat UM)',
    reporterName: 'Fatimah Az-Zahra',
    createdAt: '10 Okt 2026 · 14:15 WIB',
    status: 'Selesai Ditindaklanjuti',
    opdAssigned: 'Satgas Drainase DPUPRPKP Kota Malang',
    responseTimeHours: 1.1,
    upvotes: 68,
    timeline: [
      {
        time: '10 Okt 2026 · 14:15 WIB',
        stage: 'Laporan Diterima',
        actor: 'Mahasiswi UM',
        note: 'Informasi genangan terekam.'
      },
      {
        time: '10 Okt 2026 · 16:30 WIB',
        stage: 'Pembersihan Inlet Selesai',
        actor: 'Satgas Drainase',
        note: 'Sedimen dan sampah dibersihkan, aliran air normal kembali.'
      }
    ]
  }
];

export const WALIKAN_DICTIONARY: WalikanWord[] = [
  {
    word: 'Ayas',
    original: 'Saya',
    meaning: 'Saya / Aku',
    contextUsage: '"Ayas maba anyar nang Malang, Sam."',
    category: 'Sapaan & Gaul'
  },
  {
    word: 'Umak',
    original: 'Kamu',
    meaning: 'Kamu / Anda',
    contextUsage: '"Umak kuliah nang kampus ngendi, Mbak?"',
    category: 'Sapaan & Gaul'
  },
  {
    word: 'Mbois',
    original: 'Keren / Mantap',
    meaning: 'Keren, anggun, hebat, membanggakan',
    contextUsage: '"Malang tamane resik tenan, mbois ilakes!"',
    category: 'Percakapan Sehari-hari'
  },
  {
    word: 'Ilakes',
    original: 'Sekali',
    meaning: 'Sangat / Sekali (penguat kata)',
    contextUsage: '"Bakso bakar nang Suhat uenak ilakes!"',
    category: 'Percakapan Sehari-hari'
  },
  {
    word: 'Ojir',
    original: 'Rijo (Duit)',
    meaning: 'Uang / Duit',
    contextUsage: '"Bayar angkot iki ojir pas ae yo Mbak."',
    category: 'Percakapan Sehari-hari'
  },
  {
    word: 'Kolem',
    original: 'Melok',
    meaning: 'Ikut / Bergabung',
    contextUsage: '"Ayo kolem ngerjakno tugas bareng nang MCC Blimbing."',
    category: 'Percakapan Sehari-hari'
  },
  {
    word: 'Nawak',
    original: 'Kawan',
    meaning: 'Sahabat / Teman karib',
    contextUsage: '"Nawak-nawak kos wingi melu workshop digital gratis."',
    category: 'Sapaan & Gaul'
  },
  {
    word: 'Ngalam',
    original: 'Malang',
    meaning: 'Kota Malang',
    contextUsage: '"Hawane Ngalam adhem seger, cocok gawe sinau."',
    category: 'Transportasi & Tempat'
  }
];

export const APBD_2026_DATA = {
  totalExpenditureTrillion: 2.74,
  padBillion: 1045.8,
  youthAndGenderAllocationBillion: 348.5,
  scholarshipAllocationBillion: 38.2,
  pjuAndSafetyCampusBillion: 42.6,
  auditOpinion: 'Wajar Tanpa Pengecualian (WTP 14x Beruntun)'
};
