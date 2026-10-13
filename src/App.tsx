import React, { useState, useEffect } from 'react';
import {
  INITIAL_SAMBAT_TICKETS,
  SambatTicket,
  MALANG_STUDENT_STATS
} from './data/malangData';
import {
  AccessibilityDrawer,
  FontScaleMode,
  LanguageMode
} from './components/AccessibilityDrawer';
import { StudentPortalDrawer } from './components/StudentPortalDrawer';
import { PublicServicesSection } from './components/PublicServicesSection';
import { CctvSection } from './components/CctvSection';
import { ResponsivenessSection } from './components/ResponsivenessSection';
import { TransparencySection } from './components/TransparencySection';
import { PromotionEducationSection } from './components/PromotionEducationSection';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  GraduationCap,
  Menu,
  Sparkles,
  PhoneCall,
  Camera,
  ShieldAlert,
  FileText,
  MapPin,
  HeartHandshake,
  Layers,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [tickets, setTickets] = useState<SambatTicket[]>(INITIAL_SAMBAT_TICKETS);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');

  // Hamburger Menu Student Drawer state
  const [isStudentDrawerOpen, setIsStudentDrawerOpen] = useState(false);

  // Smartphone app preview interactive state
  const [phoneSearchQuery, setPhoneSearchQuery] = useState('');
  const [phoneToast, setPhoneToast] = useState<string | null>(null);
  const [phoneTab, setPhoneTab] = useState<'beranda' | 'aktivitas' | 'notifikasi' | 'profil'>('beranda');

  // Accessibility state
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [fontScale, setFontScale] = useState<FontScaleMode>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaSpacing, setDyslexiaSpacing] = useState(false);
  const [language, setLanguage] = useState<LanguageMode>('id');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-lg', 'font-scale-xl');
    if (fontScale === 'lg') root.classList.add('font-scale-lg');
    if (fontScale === 'xl') root.classList.add('font-scale-xl');
  }, [fontScale]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (dyslexiaSpacing) {
      root.classList.add('dyslexia-spacing');
    } else {
      root.classList.remove('dyslexia-spacing');
    }
  }, [dyslexiaSpacing]);

  const handleResetA11y = () => {
    setFontScale('normal');
    setHighContrast(false);
    setDyslexiaSpacing(false);
    setLanguage('id');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakSummary = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text =
      'Portal Resmi Malang Mbois Pemerintah Kota Malang. Menyediakan layanan kependudukan, pantau CCTV kota, pengaduan SAMBAT 112, transparansi APBD, serta menu khusus mahasiswa berisi daftar universitas dan rekomendasi kost.';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAddTicket = (newTicket: SambatTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpvoteTicket = (ticketId: string) => {
    const already = upvotedIds.includes(ticketId);
    setUpvotedIds((prev) =>
      already ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]
    );
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, upvotes: already ? t.upvotes - 1 : t.upvotes + 1 }
          : t
      )
    );
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim().toLowerCase();
    if (q.includes('cctv') || q.includes('lalu lintas')) {
      document.getElementById('pantau-cctv')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('sambat') || q.includes('lapor') || q.includes('aduan')) {
      document.getElementById('responsivitas-sambat')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('kost') || q.includes('kos') || q.includes('kampus') || q.includes('univ')) {
      setIsStudentDrawerOpen(true);
    } else {
      document.getElementById('layanan-publik')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneButton = (name: string, targetSection?: string) => {
    setPhoneToast(`Membuka: ${name}`);
    setTimeout(() => setPhoneToast(null), 2500);
    if (targetSection) {
      if (targetSection === 'student-drawer') {
        setIsStudentDrawerOpen(true);
      } else {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation Bar: Matching the reference screenshot */}
      <header className="sticky top-0 z-40 border-b border-blue-900/30 bg-blue-950 text-white shadow-md backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3.5">
          {/* Logo Zone: Rounded M + MalangMbois */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 font-extrabold text-white shadow-sm">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Malang<span className="text-blue-300">Mbois</span>
            </span>
          </a>

          {/* Navigation Links for Core Municipal Features */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden items-center gap-6 text-xs font-semibold tracking-wide text-blue-100 md:flex lg:gap-8"
          >
            <a href="#" className="transition-colors hover:text-white">
              Home
            </a>
            <a href="#layanan-publik" className="transition-colors hover:text-white">
              Layanan Publik
            </a>
            <a href="#pantau-cctv" className="transition-colors hover:text-white">
              Pantau CCTV
            </a>
            <a href="#responsivitas-sambat" className="transition-colors hover:text-white">
              Aduan SAMBAT
            </a>
            <a href="#transparansi-publik" className="transition-colors hover:text-white">
              Transparansi APBD
            </a>
          </nav>

          {/* Right Area: Partner Badges + Accessibility + HAMBURGER MENU FOR STUDENTS */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden items-center gap-2 lg:flex">
              <span className="rounded-md bg-blue-900/80 px-2 py-1 text-[10px] font-bold text-blue-200">
                PEMKOT MALANG
              </span>
              <span className="rounded-md bg-blue-800/80 px-2 py-1 text-[10px] font-bold text-yellow-300">
                MBOIS BERKELAS
              </span>
              <span className="rounded-md bg-red-600 px-2 py-1 text-[10px] font-extrabold text-white shadow-xs">
                112 NGALAM
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsA11yOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-blue-400/40 bg-blue-900/70 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-800"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-blue-300" />
              <span className="hidden sm:inline">Aksesibilitas</span>
            </button>

            {/* HAMBURGER MENU BUTTON: Special Highlight for Student Hub */}
            <button
              type="button"
              onClick={() => setIsStudentDrawerOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/30 hover:bg-blue-500 transition-all"
              aria-label="Buka menu mahasiswa & rekomendasi kost"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Menu Mahasiswa & Kost</span>
              <span className="flex h-2 w-2 rounded-full bg-yellow-300" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION: Simple, clean, attractive blue-and-white UI with smartphone app simulator */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 pt-12 pb-20 text-white lg:pt-16 lg:pb-28">
          {/* Ambient Lighting & Sparkles */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute top-12 left-1/4 h-64 w-64 rounded-full bg-blue-400 blur-3xl" />
            <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-indigo-300 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute top-16 right-1/3">
            <Sparkles className="h-6 w-6 text-blue-200 animate-pulse" />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-6">
            {/* Context Badge for Malang Citizens & Students */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-900/60 px-4 py-1.5 text-xs font-bold text-blue-100 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span>Portal Resmi Kota Malang · Digunakan Warga & 324.000+ Mahasiswa</span>
              </div>

              {/* Quick shortcut to open student drawer */}
              <button
                type="button"
                onClick={() => setIsStudentDrawerOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-white transition-colors"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Lihat 62 Universitas & Rekomendasi Kost di Kota Malang →</span>
              </button>
            </div>

            {/* Grid: Left Headline & Search / Right Smartphone App Simulator */}
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Big Headline matching reference screenshot */}
              <div className="lg:col-span-7">
                <h1
                  className="font-extrabold tracking-tight text-white"
                  style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4.2rem)', lineHeight: 1.08 }}
                >
                  Layanan Publik Kota Malang dalam Satu Genggaman.
                </h1>

                <p className="mt-5 max-w-xl text-base font-normal leading-relaxed text-blue-100 lg:text-lg">
                  Akses terpadu pengurusan dokumen kependudukan, pantau CCTV arus lalu lintas real-time, sampaikan laporan SAMBAT 112, serta jelajahi informasi 62 kampus dan rekomendasi kost aman di Kota Malang.
                </p>

                {/* Hero Search Bar */}
                <form onSubmit={handleHeroSearch} className="mt-8 flex max-w-lg flex-col gap-2.5 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="Cari Layanan di Malang Mbois (KTP, CCTV, Kost, SAMBAT)..."
                      className="w-full rounded-xl border border-white/20 bg-white py-3.5 pr-4 pl-11 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 text-xs font-bold whitespace-nowrap text-white shadow-lg transition-colors hover:bg-black shrink-0"
                  >
                    <span>Cari Layanan</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {/* Popular Tags */}
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
                  <span className="font-semibold text-white">Layanan Populer:</span>
                  {[
                    { label: 'Pantau CCTV Live', action: () => document.getElementById('pantau-cctv')?.scrollIntoView({ behavior: 'smooth' }) },
                    { label: 'Rekomendasi Kost Dekat Kampus', action: () => setIsStudentDrawerOpen(true) },
                    { label: 'SKDS Mahasiswa Daring', action: () => document.getElementById('layanan-publik')?.scrollIntoView({ behavior: 'smooth' }) },
                    { label: 'Aduan SAMBAT 112', action: () => document.getElementById('responsivitas-sambat')?.scrollIntoView({ behavior: 'smooth' }) }
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={btn.action}
                      className="rounded-full bg-blue-900/40 px-3 py-1 font-medium text-blue-100 hover:bg-white hover:text-blue-700 transition-colors"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Realistic Smartphone App Preview matching user's uploaded screenshot */}
              <div className="flex justify-center lg:col-span-5 lg:justify-end">
                <div className="relative w-full max-w-[340px] drop-shadow-2xl">
                  {/* Smartphone Frame */}
                  <div className="relative overflow-hidden rounded-[42px] border-[10px] border-slate-900 bg-white shadow-2xl">
                    {/* Phone Top Notch Bar */}
                    <div className="relative flex items-center justify-between bg-blue-600 px-6 pt-3 pb-2 text-[10px] font-bold text-white">
                      <span>09:41</span>
                      <div className="h-4 w-20 rounded-full bg-slate-900" />
                      <div className="flex items-center gap-1.5">
                        <span>5G</span>
                        <div className="h-2.5 w-4 rounded-xs border border-white bg-white" />
                      </div>
                    </div>

                    {/* App Internal Header */}
                    <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-4 pt-2 pb-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white font-black text-blue-600 text-xs">
                            M
                          </div>
                          <span className="text-xs font-extrabold tracking-tight">KOTA MALANG</span>
                        </div>
                        <span className="rounded-full bg-blue-700/80 px-2 py-0.5 text-[9px] font-bold text-yellow-300">
                          112 SIAGA
                        </span>
                      </div>

                      {/* Search Bar inside Phone */}
                      <div className="mt-3 relative">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={phoneSearchQuery}
                          onChange={(e) => setPhoneSearchQuery(e.target.value)}
                          placeholder="Cari Layanan di Malang Mbois"
                          className="w-full rounded-xl bg-white py-2 pr-3 pl-8 text-[11px] font-medium text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* App Scrollable Content */}
                    <div className="h-[430px] overflow-y-auto bg-slate-50 p-3 text-slate-900">
                      {/* Toast inside Phone */}
                      {phoneToast && (
                        <div className="mb-2.5 rounded-lg bg-blue-600 p-2 text-center text-[10px] font-bold text-white shadow-md animate-fade-in">
                          {phoneToast}
                        </div>
                      )}

                      {/* 8-Grid Icon Menu inside Phone (Exactly as in the reference image) */}
                      <div className="grid grid-cols-4 gap-2 rounded-2xl bg-white p-3 shadow-xs">
                        {[
                          { label: 'Berita', icon: FileText, color: 'text-blue-600 bg-blue-50', target: 'layanan-publik' },
                          { label: 'CCTV', icon: Camera, color: 'text-indigo-600 bg-indigo-50', target: 'pantau-cctv' },
                          { label: 'Lapor', icon: ShieldAlert, color: 'text-red-600 bg-red-50', target: 'responsivitas-sambat' },
                          { label: '112 Siaga', icon: PhoneCall, color: 'text-amber-600 bg-amber-50', target: 'responsivitas-sambat' },
                          { label: 'Adminduk', icon: Building2, color: 'text-blue-700 bg-blue-100', target: 'layanan-publik' },
                          { label: 'Kost & Univ', icon: GraduationCap, color: 'text-purple-600 bg-purple-50', target: 'student-drawer' },
                          { label: 'Pajak PBB', icon: Layers, color: 'text-emerald-600 bg-emerald-50', target: 'layanan-publik' },
                          { label: 'Semua', icon: CheckCircle2, color: 'text-sky-600 bg-sky-50', target: 'layanan-publik' }
                        ].map((btn) => {
                          const IconComp = btn.icon;
                          return (
                            <button
                              key={btn.label}
                              type="button"
                              onClick={() => handlePhoneButton(btn.label, btn.target)}
                              className="flex flex-col items-center gap-1 p-1 hover:opacity-80 transition-opacity"
                            >
                              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${btn.color} shadow-xs`}>
                                <IconComp className="h-4 w-4" />
                              </div>
                              <span className="text-[10px] font-semibold text-slate-700 truncate w-full text-center">
                                {btn.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Featured Card in Phone: Mal Pelayanan Publik (MPP) Kota Malang */}
                      <div className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3.5 text-white shadow-sm">
                        <div className="text-[10px] font-bold tracking-wider text-blue-200 uppercase">
                          Layanan Prioritas
                        </div>
                        <div className="mt-1 text-xs font-bold leading-tight">
                          Mal Pelayanan Publik (MPP) Merdeka
                        </div>
                        <p className="mt-1 text-[10px] leading-relaxed text-blue-100">
                          Bebas antre fisik! Layanan adminduk, SKDS mahasiswa, & perizinan usaha.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById('layanan-publik')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="mt-2.5 rounded-lg bg-white px-3 py-1 text-[10px] font-bold text-blue-700 shadow-xs"
                        >
                          Buka Layanan Daring
                        </button>
                      </div>

                      {/* Student Special Banner inside Phone */}
                      <div
                        onClick={() => setIsStudentDrawerOpen(true)}
                        className="mt-3 cursor-pointer rounded-2xl border border-blue-200 bg-blue-50/80 p-3 shadow-xs hover:bg-blue-100/60 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-blue-900">Menu Khusus Mahasiswa</span>
                          <span className="text-blue-600 font-extrabold">Buka →</span>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-600">
                          Cek 62 Kampus & Rekomendasi Kost Aman Berdasarkan Lokasi Kampus
                        </div>
                      </div>
                    </div>

                    {/* Bottom Navigation Bar inside Smartphone Screen (as in reference screenshot) */}
                    <div className="flex items-center justify-around border-t border-slate-200 bg-white py-2 text-[9px] font-bold text-slate-500">
                      <button
                        type="button"
                        onClick={() => setPhoneTab('beranda')}
                        className={`flex flex-col items-center ${phoneTab === 'beranda' ? 'text-blue-600' : ''}`}
                      >
                        <span className="text-xs">⌂</span>
                        <span>BERANDA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneTab('aktivitas');
                          setIsNewReportModalOpen(true);
                        }}
                        className={`flex flex-col items-center ${phoneTab === 'aktivitas' ? 'text-blue-600' : ''}`}
                      >
                        <span className="text-xs">📋</span>
                        <span>AKTIVITAS</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhoneTab('notifikasi')}
                        className={`flex flex-col items-center ${phoneTab === 'notifikasi' ? 'text-blue-600' : ''}`}
                      >
                        <span className="text-xs">🔔</span>
                        <span>NOTIFIKASI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhoneTab('profil')}
                        className={`flex flex-col items-center ${phoneTab === 'profil' ? 'text-blue-600' : ''}`}
                      >
                        <span className="text-xs">👤</span>
                        <span>PROFIL</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 QUICK ACCESS TILES MATCHING ACTUAL MALANG MBOIS FEATURES */}
        <section className="border-b border-blue-100 bg-white py-8">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { label: 'Adminduk', desc: 'KTP & IKD Online', icon: Building2, target: 'layanan-publik' },
                { label: 'Pantau CCTV', desc: 'Kamera ATCS Live', icon: Camera, target: 'pantau-cctv' },
                { label: 'Lapor SAMBAT', desc: 'Pengaduan Warga', icon: ShieldAlert, target: 'responsivitas-sambat' },
                { label: 'Ngalam 112', desc: 'Darurat Bebas Pulsa', icon: PhoneCall, target: 'responsivitas-sambat' },
                { label: 'Pajak Daerah', desc: 'e-SPPT PBB QRIS', icon: Layers, target: 'layanan-publik' },
                { label: 'MPP Merdeka', desc: 'Mal Pelayanan Publik', icon: CheckCircle2, target: 'layanan-publik' },
                { label: 'Transparansi', desc: 'APBD & Dokumen PPID', icon: FileText, target: 'transparansi-publik' },
                { label: 'Info Kampus & Kost', desc: '62 Univ & Kost Aman', icon: GraduationCap, target: 'student-drawer' }
              ].map((item) => {
                const IconC = item.icon;
                const isStudentTrigger = item.target === 'student-drawer';
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (isStudentTrigger) {
                        setIsStudentDrawerOpen(true);
                      } else {
                        document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-blue-100 bg-slate-50 p-4 text-center transition-all hover:border-blue-300 hover:bg-blue-50/70 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                      <IconC className="h-5 w-5" />
                    </div>
                    <span className="mt-2.5 text-xs font-bold text-slate-900">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate w-full">
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 1. Layanan Publik Terpadu (Aksesibilitas G2C) */}
        <PublicServicesSection
          onOpenStudentDrawer={() => setIsStudentDrawerOpen(true)}
        />

        {/* 2. Fitur Pantau CCTV Kota Malang (ATCS Live) */}
        <CctvSection />

        {/* 3. Fitur Responsivitas: Pengaduan SAMBAT Online 112 */}
        <ResponsivenessSection
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onUpvoteTicket={handleUpvoteTicket}
          upvotedIds={upvotedIds}
          isNewReportModalOpen={isNewReportModalOpen}
          setIsNewReportModalOpen={setIsNewReportModalOpen}
        />

        {/* 4. Fitur Transparansi: APBD 2026 Kota Malang & Dokumen PPID */}
        <TransparencySection />

        {/* 5. Fitur Promosi & Edukasi: Kamus Boso Walikan & Cagar Budaya */}
        <PromotionEducationSection />
      </main>

      {/* Modern Blue & White Institutional Footer */}
      <footer className="border-t border-blue-900/40 bg-blue-950 py-14 text-blue-100">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-10 border-b border-blue-900/40 pb-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-blue-500 font-extrabold text-white text-sm">
                  M
                </div>
                <span className="text-xl font-black text-white">
                  Malang<span className="text-blue-300">Mbois</span>
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-blue-200">
                Portal Resmi Pelayanan Publik Government-to-Citizen (G2C) Pemerintah Kota Malang untuk seluruh warga dan komunitas mahasiswa.
              </p>
              <div className="font-mono-tabular mt-4 text-xs text-blue-300">
                Balai Kota Malang · Jl. Tugu No. 1, Klojen, Kota Malang 65119
              </div>
            </div>

            <div>
              <div className="text-xs font-bold tracking-wider text-white uppercase">
                Fitur Utama Portal Mbois
              </div>
              <ul className="mt-3 space-y-2 text-xs text-blue-200">
                <li><a href="#layanan-publik" className="hover:text-white">• Layanan Adminduk & MPP Merdeka</a></li>
                <li><a href="#pantau-cctv" className="hover:text-white">• Pantau CCTV Lalu Lintas ATCS Live</a></li>
                <li><a href="#responsivitas-sambat" className="hover:text-white">• Pengaduan SAMBAT & SP4N-LAPOR!</a></li>
                <li><a href="#transparansi-publik" className="hover:text-white">• Transparansi APBD 2026 & PPID</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold tracking-wider text-white uppercase">
                Portal Mahasiswa Kota Malang
              </div>
              <ul className="mt-3 space-y-2 text-xs text-blue-200">
                <li>
                  <button type="button" onClick={() => setIsStudentDrawerOpen(true)} className="hover:text-white text-left">
                    • 62 Universitas & Kampus di Kota Malang
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsStudentDrawerOpen(true)} className="hover:text-white text-left">
                    • Rekomendasi Kost Berdasarkan Kampus
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsStudentDrawerOpen(true)} className="hover:text-white text-left">
                    • Surat Domisili Mahasiswa (SKDS Daring)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsStudentDrawerOpen(true)} className="hover:text-white text-left">
                    • Faskes BPJS Kampus & Hotline 112
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold tracking-wider text-white uppercase">
                Kontak Siaga & Inklusivitas
              </div>
              <ul className="font-mono-tabular mt-3 space-y-1.5 text-xs text-blue-200">
                <li>Ngalam Command Center: 112 (Bebas Pulsa)</li>
                <li>UPTD Perlindungan Perempuan: 0811-3789-112</li>
                <li>Ambulans Medis PSC: 119 / (0341) 362222</li>
              </ul>
              <button
                type="button"
                onClick={() => setIsA11yOpen(true)}
                className="mt-4 rounded-xl border border-blue-400/40 bg-blue-900/80 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-800"
              >
                Pengaturan Aksesibilitas WCAG
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-blue-300 sm:flex-row">
            <div>
              © 2026 Pemerintah Kota Malang · Dinas Komunikasi dan Informatika Kota Malang.
            </div>
            <div className="flex items-center gap-4">
              <span>Sistem Pemerintahan Berbasis Elektronik (SPBE)</span>
              <span aria-hidden="true">·</span>
              <span>Kota Pendidikan & Mbois Berkelas</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STUDENT PORTAL DRAWER (HAMBURGER MENU) */}
      <StudentPortalDrawer
        isOpen={isStudentDrawerOpen}
        onClose={() => setIsStudentDrawerOpen(false)}
        onOpenSkdsService={() => {
          document.getElementById('layanan-publik')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Accessibility Drawer */}
      <AccessibilityDrawer
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
        fontScale={fontScale}
        setFontScale={setFontScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        dyslexiaSpacing={dyslexiaSpacing}
        setDyslexiaSpacing={setDyslexiaSpacing}
        language={language}
        setLanguage={setLanguage}
        onReset={handleResetA11y}
        onSpeakSummary={handleSpeakSummary}
        isSpeaking={isSpeaking}
      />
    </div>
  );
}
