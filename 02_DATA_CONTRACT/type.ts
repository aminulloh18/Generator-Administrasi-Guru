/**
 * DATA CONTRACT — satu sumber kebenaran untuk SEMUA dokumen.
 * Prinsip: LLM hanya mengisi objek-objek ini (JSON). Kode (renderer) yang membuat Word.
 * Kisi-kisi, kartu soal, naskah soal, dan kunci semuanya diturunkan dari `Butir[]` yang sama,
 * jadi TIDAK PERNAH boleh digenerate ulang secara terpisah oleh LLM.
 *
 * Notasi matematika: string dengan $...$ untuk equation Word inline (lihat omml.js).
 * Contoh: "Hasil dari $(\\frac{1}{3})^{-2}+2^{3}$ adalah ...."
 */

export type Level = 'C1 (Mengingat)' | 'C2 (Memahami)' | 'C3 (Menerapkan)' | 'C4 (Menganalisis)' | 'C5 (Mengevaluasi)' | 'C6 (Mengkreasi)';
export type TahapPM = 'Memahami' | 'Mengaplikasi' | 'Merefleksi';

// ---------- Konteks input pengguna ----------
export interface KonteksAsesmen {
  satuanPendidikan: string;
  namaPenyusun: string;
  mataPelajaran: string;
  fase: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  kelas: string;                // "X"
  semester: 'Ganjil' | 'Genap';
  tahunPelajaran: string;       // "2026/2027"
  topikKeyword: string[];       // ["eksponen", "bentuk akar"]
  jumlahPertemuan: number;      // JP per pertemuan = 2 (default)
  menitPerJP: number;           // 45 (SMA) / 40 / 35 ...
  kota?: string;
  kepalaSekolah?: { nama: string; nip: string };
  guru?: { nama: string; nip: string };
}

// ---------- Kurikulum (HARUS dari pustaka CP yang bisa diedit & diverifikasi, bukan karangan LLM) ----------
export interface CP { elemen: string; teks: string; sumber: string /* mis. "SK BSKAP 032/2024" */ }
export interface TP {
  kode: string;                 // "TP1"
  teks: string;                 // diawali "Melalui ..., peserta didik mampu ..." (KKO HOTS bila memungkinkan)
  indikator: string[];
  pertemuan: number[];
}

// ---------- Butir soal (inti kisi-kisi, naskah, kunci, kartu) ----------
export interface Butir {
  no: number;
  tpKode: string;
  materi: string;
  indikator: string;            // "Disajikan ..., peserta didik dapat ..."
  level: Level;
  bentuk: 'Pilihan Ganda' | 'Isian Singkat' | 'Uraian' | 'Benar Salah';
  stem: string;                 // boleh memuat $rumus$
  blokPersamaan?: string;       // persamaan tampil di baris sendiri (mis. sistem persamaan)
  gambar?: FigureSpec;          // gambar dibuat KODE dari spesifikasi, bukan oleh LLM
  tabel?: { head: string[]; rows: string[][] };
  stem2?: string;               // kalimat tanya setelah gambar/tabel
  // Pilihan ganda: LLM memberi jawaban benar + pengecoh; POSISI kunci diacak oleh KODE.
  jawabanBenar?: string;
  pengecoh?: string[];          // 4 untuk 5 opsi
  opsi?: string[];              // hasil akhir setelah diacak kode
  kunci?: 'A' | 'B' | 'C' | 'D' | 'E';
  pedomanSkor?: { langkah: string; skor: number }[];   // untuk uraian
  // Verifikasi otomatis (math.js) — wajib untuk soal hitungan:
  cek?: { ekspresi: string; hasilDiharapkan: string; toleransi?: number };
  pembahasan?: string;
}

// ---------- Spesifikasi gambar (dirender kode ke SVG/PNG) ----------
export type FigureSpec =
  | { tipe: 'grafikFungsi'; fungsi: string; xMin: number; xMax: number; titikPenting?: [number, number, string?][]; garisBantu?: boolean }
  | { tipe: 'pohonPembelahan'; tingkat: number; label: string }
  | { tipe: 'garisBilangan'; min: number; max: number; titik: { x: number; label: string }[]; logaritmik?: boolean }
  | { tipe: 'tabelGambar'; head: string[]; rows: string[][] }
  | { tipe: 'bangunRuang'; jenis: 'kubus' | 'balok'; label: string }
  | { tipe: 'diagramAlir'; node: string[] };

// ---------- Modul ajar Pembelajaran Mendalam ----------
export interface KegiatanTahap { tahap: 'Pendahuluan' | 'Memahami' | 'Mengaplikasi' | 'Merefleksi' | 'Penutup'; menit: number; langkah: string[]; prinsipPM: string[]; catatan?: string }
export interface Pertemuan { no: number; jp: number; judul: string; tpKode: string[]; media: string[]; kegiatan: KegiatanTahap[] /* jumlah menit WAJIB = jp * menitPerJP (divalidasi kode) */; exitTicket: { pertanyaan: string; jawaban: string } }
export interface Lkpd {
  no: number; judul: string; subjudul: string; tpKode: string[];
  cerita?: string;
  kegiatan: {
    judul: string; tahap: TahapPM; instruksi: string;
    figur?: FigureSpec; kotakInfo?: { judul: string; isi: string };
    tabelIsian?: { head: string[]; rows: string[][]; /* '' atau '……' = sel yang diisi siswa */ };
    pertanyaan: { teks: string; barisJawaban?: number; berpikirKritis?: boolean }[];
    tantangan?: string;
  }[];
  kunci: { kegiatan: number; jawaban: string; skor: number }[];   // total skor LKPD = 100
}
export interface ModulAjar {
  konteks: KonteksAsesmen; cp: CP; tp: TP[];
  diagnostik: { kognitif: { soal: string; kunci: string; prasyarat: string }[]; nonKognitif: { aspek: string; pertanyaan: string; pilihan: string }[] };
  dimensiProfilLulusan: { dimensi: string; wujud: string }[];
  topikKontekstual: string; pemahamanBermakna: string[]; pertanyaanPemantik: string[];
  praktikPedagogis: { komponen: string; rancangan: string }[];
  pertemuan: Pertemuan[]; lkpd: Lkpd[];
  asesmen: { formatif: unknown; sumatif: { butir: Butir[] }; rubrik: unknown; pengayaan: string[]; remedial: string[]; bobotNilai: { komponen: string; bobot: number }[]; kktp: number };
  bahanBacaan: string; glosarium: { istilah: string; arti: string }[]; daftarPustaka: string[];
}

// ---------- Paket soal ----------
export interface PaketSoal { paket: 'A' | 'B' | 'C'; jenis: 'PSAS' | 'PSTS' | 'Ulangan Harian' | 'Sumatif Lingkup Materi'; alokasiMenit: number; butir: Butir[] }
