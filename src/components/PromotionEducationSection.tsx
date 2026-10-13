import React, { useState, useMemo } from 'react';
import {
  WALIKAN_DICTIONARY,
  KAYUTANGAN_IMAGE_PATH,
  MCC_IMAGE_PATH
} from '../data/malangData';
import {
  Search,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowUpRight
} from 'lucide-react';

export const PromotionEducationSection: React.FC = () => {
  const [walikanQuery, setWalikanQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Interactive Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const QUIZ_QUESTIONS = [
    {
      question: 'Jika teman kos menyapa: "Ayo kolem ngopi nang Kayutangan!", kata "Kolem" berarti...',
      options: ['Ikut / Bergabung', 'Pulang', 'Tidur', 'Membayar'],
      correct: 'Ikut / Bergabung',
      explanation: 'Kolem adalah kebalikan dari kata Jawa "Melok" yang artinya ikut/bergabung.'
    },
    {
      question: 'Saat naik angkot supir berkata: "Nuwun sewu Mbak, nyuwun ojir pas yo." Kata "Ojir" berarti...',
      options: ['Karcis', 'Uang / Duit', 'Nama jalan', 'Kembalian'],
      correct: 'Uang / Duit',
      explanation: 'Ojir adalah walikan dari kata "Rijo", slang lokal untuk uang atau duit.'
    },
    {
      question: 'Ungkapan khas warga Malang yang berarti sangat keren atau mantap sekali adalah...',
      options: ['Apik pol', 'Mbois ilakes', 'Monggo mawon', 'Sugeng rawuh'],
      correct: 'Mbois ilakes',
      explanation: 'Mbois berarti keren/hebat, sedangkan ilakes adalah walikan dari "sekali".'
    }
  ];

  const filteredWords = useMemo(() => {
    return WALIKAN_DICTIONARY.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const q = walikanQuery.trim().toLowerCase();
      const matchQ =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.original.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [walikanQuery, selectedCategory]);

  const handleSelectQuizOption = (opt: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    if (opt === QUIZ_QUESTIONS[quizIndex].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="promosi-edukasi" className="border-b border-blue-100 bg-blue-50/20 py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Blue & White Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <span>Pilar Promosi & Edukasi Budaya Kota</span>
            </div>
            <h2 className="text-balance mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Adaptasi Mudah Mahasiswi Rantau di Bumi Arema
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Pelajari bahasa Walikan khas Malang agar luwes berinteraksi di pasar, kampus, dan warung, serta jelajahi ruang kreatif dan fasilitas publik Kota Malang.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xs">
            <div className="text-xs text-slate-500">Pusat Edukasi Mahasiswi Rantau</div>
            <div className="font-mono-tabular mt-1 text-xs font-bold text-blue-700">
              Kamus Boso Walikan · Rute Kampus · MCC Co-Working
            </div>
          </div>
        </div>

        {/* Interactive Boso Walikan Module & Student Quiz */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Dictionary in Blue & White */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xs lg:col-span-7 lg:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
                  <BookOpen className="h-4 w-4" />
                  <span>Kamus Saku Boso Walikan (Osob Kiwalan)</span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Cari Kosakata Percakapan Sehari-hari
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-60">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={walikanQuery}
                  onChange={(e) => setWalikanQuery(e.target.value)}
                  placeholder="Cari Ayas, Mbois, Ojir..."
                  className="w-full rounded-xl border border-blue-200 bg-slate-50 py-1.5 pr-3 pl-8 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Semua', 'Sapaan & Gaul', 'Percakapan Sehari-hari', 'Transportasi & Tempat'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'border border-blue-100 bg-blue-50/50 text-slate-600 hover:bg-blue-100/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Word List */}
            <div className="mt-5 max-h-96 space-y-3 overflow-y-auto pr-1">
              {filteredWords.map((item) => (
                <div
                  key={item.word}
                  className="rounded-xl border border-blue-100 bg-blue-50/30 p-3.5 transition-colors hover:border-blue-300"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-base font-bold text-blue-700">
                      {item.word}
                    </span>
                    <span className="font-mono-tabular text-slate-500">
                      Asal: {item.original} ({item.category})
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-900">
                    Artinya: {item.meaning}
                  </div>
                  <div className="mt-1 text-xs italic text-slate-600">
                    Contoh: {item.contextUsage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quiz for Students */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xs lg:col-span-5 lg:p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
              <HelpCircle className="h-4 w-4" />
              <span>Uji Pemahaman Bahasa Lokal</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              Kuis Adaptasi Mahasiswi Rantau
            </h3>

            {quizFinished ? (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-blue-600" />
                <h4 className="mt-3 text-lg font-bold text-slate-900">
                  Skor Anda: {score} dari {QUIZ_QUESTIONS.length} Benar!
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {score === 3
                    ? 'Luar biasa! Pemahaman bahasa lokal Anda sudah sangat mbois dan siap membaur dengan warga Malang.'
                    : 'Bagus sekali! Simpan kamus ini sebagai panduan praktis selama berkuliah di Kota Malang.'}
                </p>
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="mt-5 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <div className="font-mono-tabular flex justify-between text-xs text-slate-500">
                  <span>Pertanyaan {quizIndex + 1} dari {QUIZ_QUESTIONS.length}</span>
                  <span className="font-semibold text-blue-600">Skor: {score}</span>
                </div>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-900">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </p>

                <div className="mt-4 space-y-2">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt) => {
                    const isPicked = selectedAnswer === opt;
                    const isCorrect = opt === QUIZ_QUESTIONS[quizIndex].correct;
                    let style = 'border-slate-200 bg-white text-slate-800 hover:border-blue-300';

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        style = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isPicked) {
                        style = 'border-red-600 bg-red-50 text-red-900';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectQuizOption(opt)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition-colors ${style}`}
                      >
                        <span>{opt}</span>
                        {selectedAnswer !== null && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        )}
                        {selectedAnswer !== null && isPicked && !isCorrect && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-4 rounded-xl bg-blue-50/70 p-3 text-xs text-slate-700">
                    <span className="font-bold text-blue-800">Penjelasan: </span>
                    {QUIZ_QUESTIONS[quizIndex].explanation}
                  </div>
                )}

                {selectedAnswer !== null && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil Akhir'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Student Creative & Study Hubs in Blue & White */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 1. Kayutangan Student Hub */}
          <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xs transition-all hover:border-blue-300 hover:shadow-md">
            <div>
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <img
                  src={KAYUTANGAN_IMAGE_PATH}
                  alt="Mahasiswi belajar dan berdiskusi di kafe cagar budaya Kampoeng Heritage Kayutangan Malang"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent" />
                <div className="absolute right-4 bottom-3 left-4 text-xs font-semibold text-white">
                  Kampoeng Heritage Kajoetangan · Dekat Kampus UM & Klojen
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-blue-600">
                  Spot Nugas, Diskusi & Cagar Budaya
                </div>
                <h4 className="mt-1.5 text-xl font-bold text-slate-900">
                  Kampoeng Heritage Kajoetangan
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Kawasan ramah pejalan kaki dengan puluhan kedai kopi rakyat, jalur lampu antik terang benderang, serta akses shuttle bus wisata gratis Macito. Tempat favorit mahasiswi untuk belajar kelompok di akhir pekan.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4">
              <a
                href="#mahasiswi-hub"
                className="flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Akses Informasi Shuttle Bus Macito Gratis</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>

          {/* 2. MCC Creative Hub */}
          <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xs transition-all hover:border-blue-300 hover:shadow-md">
            <div>
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <img
                  src={MCC_IMAGE_PATH}
                  alt="Mahasiswi berkolaborasi di fasilitas gratis Malang Creative Center MCC"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent" />
                <div className="absolute right-4 bottom-3 left-4 text-xs font-semibold text-white">
                  Malang Creative Center (MCC) · Jl. A. Yani, Blimbing
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-blue-600">
                  Co-Working & Inkubasi Digital Mahasiswi
                </div>
                <h4 className="mt-1.5 text-xl font-bold text-slate-900">
                  Gedung 8 Lantai Malang Creative Center
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Fasilitas umum gratis ber-AC dan Wi-Fi cepat bagi mahasiswi untuk mengerjakan skripsi, latihan podcast, studio desain grafis, hingga pelatihan wirausaha muda perempuan binaan Diskopindag.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4">
              <a
                href="#mahasiswi-hub"
                className="flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Klaim Kartu Akses Co-Working MCC</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
