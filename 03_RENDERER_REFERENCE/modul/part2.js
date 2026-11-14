const L = require('./lib');
const { P, J, h1, h2, h3, pb, sp, bullets, numbered, tbl, box, fig } = L;
const out = [];
const add = (...x) => x.flat().forEach(e => out.push(e));
const W3 = [1600, 5900, 2138];
const H3 = ['Tahap dan Waktu', 'Kegiatan Pembelajaran', 'Prinsip PM dan Catatan'];

// ======================= E. PENGALAMAN BELAJAR =======================
add(pb(), h1('E. PENGALAMAN BELAJAR'));
add(J('Setiap pertemuan mengikuti alur Pembelajaran Mendalam: **Pendahuluan** (membangun kesadaran dan motivasi), **Inti** yang terdiri atas **Memahami**, **Mengaplikasi**, dan **Merefleksi**, lalu **Penutup**. Peserta didik menemukan konsep melalui pengamatan pola, bukan sekadar diberi rumus.'));
add(tbl(['Pertemuan', 'Fokus', 'LKPD', 'TP'], [
  ['1 (2 JP)', 'Makna pangkat bulat positif, nol, dan negatif', 'LKPD 1 “Berlipat Ganda”', 'TP 1'],
  ['2 (2 JP)', 'Menemukan sifat-sifat eksponen dan pangkat rasional', 'LKPD 2 “Detektif Sifat Eksponen”', 'TP 2'],
  ['3 (2 JP)', 'Bentuk baku, pertumbuhan/peluruhan, proyek “Skala Semesta”', 'LKPD 3 “Skala Semesta”', 'TP 3'],
  ['4 (1 JP)', 'Asesmen sumatif dan umpan balik', 'Lampiran 5', 'TP 1–3'],
], [1500, 4600, 2538, 1000], { size: 20, center: [0, 3] }));

// ---------- Pertemuan 1 ----------
add(h2('Pertemuan 1 – “Berlipat Ganda” (2 JP = 90 menit)'));
add(P('**Tujuan:** TP 1.  **Media:** LKPD 1, ilustrasi pembelahan bakteri dan tangga pangkat, kertas HVS/koran bekas.', { after: 60 }));
add(tbl(H3, [
  ['**Pendahuluan**\n15 menit', [
    '1. Guru memberi salam, mengajak berdoa, dan memeriksa kehadiran serta kesiapan belajar.',
    '2. **Jeda napas (1 menit):** peserta didik menarik napas 4 hitungan dan menghembuskannya 4 hitungan, lalu menyebutkan satu harapan untuk pelajaran hari ini.',
    '3. **Apersepsi:** guru menuliskan $2×2×2×2×2$ dan $5×5×5$, lalu bertanya, “Adakah cara yang lebih singkat?” Peserta didik Kelompok 2 dan 3 mendapat penguatan singkat prasyarat (perkalian berulang).',
    '4. **Demonstrasi pemantik:** setiap kelompok melipat selembar kertas dua kali, tiga kali, dan seterusnya sampai tidak bisa dilipat lagi. Guru mengajukan pertanyaan pemantik 1; kelompok menuliskan **tebakan** tinggi tumpukan setelah 20 dan 42 lipatan di kertas kecil (dicek di akhir pertemuan).',
    '5. Guru menyampaikan tujuan, alur kegiatan (Memahami – Mengaplikasi – Merefleksi), dan kriteria keberhasilan; membagi kelompok heterogen 4 orang beserta perannya.',
  ].join('\n').split('\n').join('\n'), 'Berkesadaran dan menggembirakan.\nTebakan awal menumbuhkan rasa ingin tahu dan menjadi bahan refleksi.'],
  ['**Inti – Memahami**\n35 menit', [
    '**Kegiatan 1 (LKPD 1) – Mengamati pembelahan bakteri**',
    '- Peserta didik mengamati ilustrasi pembelahan bakteri tiap 20 menit dan mengisi tabel banyak bakteri pada pembelahan ke-0 sampai ke-5.',
    '- Guru berkeliling dengan pertanyaan penuntun: “Apa yang berubah setiap 20 menit?”, “Bagaimana menuliskan banyak bakteri tanpa menggambar?”',
    '- Diskusi kelas: merumuskan arti $a^{n}$ beserta istilah basis (bilangan pokok) dan eksponen (pangkat).',
    '**Kegiatan 2 (LKPD 1) – Tangga pangkat**',
    '- Peserta didik melengkapi tangga pangkat $2^{4}$ sampai $2^{-3}$ dan mengulanginya dengan basis 3, lalu menyimpulkan nilai $a^{0}$ dan $a^{-n}$.',
    '- Guru memandu dua pertanyaan kritis: “Mengapa syaratnya $a≠0$?” dan “Apa arti $2^{-1}$ pada pembelahan bakteri? Apakah model matematika selalu cocok dengan kenyataan?”',
  ].join('\n'), 'Bermakna: konsep ditemukan dari pola.\nFormatif: observasi diskusi (rubrik F.2).\nDiferensiasi: Kelompok 3 didampingi tangga pangkat bertahap.'],
  ['**Inti – Mengaplikasi**\n25 menit', [
    '**Kegiatan 3 (LKPD 1) – Tantangan lipat kertas:** menghitung tebal kertas setelah $n$ lipatan ($0{,}1$ mm × $2^{n}$), membandingkan dengan tinggi gedung, dan menentukan banyak lipatan agar melampaui jarak Bumi–Bulan.',
    '**Kegiatan 4 (LKPD 1) – Detektif kesalahan:** menilai pernyataan teman yang keliru (mis. $-3^{2}=9$) dan memperbaikinya, kemudian menyelesaikan soal pesan berantai.',
    'Dua kelompok mempresentasikan hasilnya; kelompok lain memberi tanggapan.',
  ].join('\n'), 'Penalaran kritis dan komunikasi.\nGuru mencatat miskonsepsi yang muncul untuk dibahas bersama.'],
  ['**Inti – Merefleksi**\n10 menit', [
    'Peserta didik menuliskan **jurnal refleksi 3-2-1** (LKPD 1 Kegiatan 5): 3 hal yang dipahami, 2 hal yang masih membingungkan, 1 perasaan/pertanyaan. Kelompok mengecek tebakan awal tinggi tumpukan kertas dan menjelaskan mengapa tebakan mereka tepat atau meleset.',
  ].join('\n'), 'Kemandirian.\nRefleksi menjadi dasar penguatan di awal pertemuan 2.'],
  ['**Penutup**\n5 menit', [
    '1. Bersama guru, peserta didik menyimpulkan: $a^{n}$ = perkalian berulang, $a^{0}=1$, dan $a^{-n}=\\frac{1}{a^{n}}$ untuk $a≠0$.',
    '2. **Exit ticket:** “Jelaskan dengan kata-katamu mengapa $5^{0}=1$.”',
    '3. Guru memberikan umpan balik, menyampaikan rencana pertemuan berikutnya, dan menutup dengan doa.',
  ].join('\n'), 'Formatif: exit ticket dikumpulkan sebagai bahan analisis.'],
], W3, { size: 19, cantSplit: false }));

// ---------- Pertemuan 2 ----------
add(h2('Pertemuan 2 – “Detektif Sifat Eksponen” (2 JP = 90 menit)'));
add(P('**Tujuan:** TP 2.  **Media:** LKPD 2, ilustrasi kubus (pangkat rasional), kartu sifat eksponen (Lampiran 6).', { after: 60 }));
add(tbl(H3, [
  ['**Pendahuluan**\n12 menit', [
    '1. Salam, doa, dan jeda napas 1 menit.',
    '2. Guru menyampaikan umpan balik dari exit ticket dan jurnal refleksi pertemuan 1 (mengangkat 1–2 miskonsepsi yang paling banyak muncul).',
    '3. **Permainan kilat “Tangga Pangkat”** (3 menit): guru menyebut $3^{-2}$, $10^{0}$, $\\left(\\frac{1}{2}\\right)^{-3}$; kelompok menuliskan nilainya secepat mungkin.',
    '4. Pertanyaan pemantik 4 dituliskan di papan: “Mana yang lebih besar, $2^{100}$ atau $3^{60}$?” Jawabannya ditunda sampai akhir kegiatan inti.',
  ].join('\n'), 'Berkesadaran dan menggembirakan.'],
  ['**Inti – Memahami**\n40 menit', [
    '**Kegiatan 1–4 (LKPD 2) – Pola sifat eksponen (pembelajaran “pakar”)**',
    '- Setiap anggota kelompok menjadi “pakar” satu pola: (1) perkalian $a^{m}×a^{n}$, (2) pembagian $a^{m}÷a^{n}$, (3) pangkat dari pangkat $(a^{m})^{n}$, (4) pangkat dari perkalian/pembagian $(ab)^{n}$ dan $\\left(\\frac{a}{b}\\right)^{n}$.',
    '- Pakar menyelidiki pola dengan mengisi tabel, menduga sifat, lalu **menguji dugaan** dengan satu contoh angka lain.',
    '- Pakar bergantian mengajarkan temuannya kepada teman satu kelompok (±3 menit per orang).',
    '- Diskusi kelas: tiap kelompok menyebutkan satu sifat dan alasannya; guru merangkum dan menegaskan syarat basis.',
    '**Kegiatan 5 (LKPD 2) – Pangkat rasional:** memakai ilustrasi kubus bervolume 8 cm³ dan 27 cm³; peserta didik menemukan bahwa rusuk kubus adalah $V^{\\frac{1}{3}}$, lalu mengaitkan $a^{\\frac{1}{n}}$ dengan akar pangkat $n$ serta menggeneralisasi $a^{\\frac{m}{n}}$.',
  ].join('\n'), 'Penalaran kritis dan kolaborasi.\nBermakna: sifat “dibuktikan” oleh peserta didik sendiri.\nFormatif: rubrik observasi kolaborasi dan penalaran.'],
  ['**Inti – Mengaplikasi**\n25 menit', [
    '**Kegiatan 6 (LKPD 2):** menyederhanakan bentuk pangkat dan menghitung pangkat rasional; membandingkan $2^{100}$ dan $3^{60}$ dengan menyamakan eksponen (jawaban pertanyaan pemantik 4).',
    '**Kegiatan 7 (LKPD 2) – Detektif kesalahan:** menemukan dan memperbaiki 4 kesalahan penerapan sifat; kemudian kelompok menukar satu soal buatan sendiri dengan kelompok lain.',
  ].join('\n'), 'Kreativitas dan komunikasi.\nDiferensiasi: soal tantangan untuk Kelompok 1.'],
  ['**Inti – Merefleksi**\n8 menit', [
    '**Kegiatan 8 (LKPD 2):** peserta didik menulis rangkuman sifat eksponen dengan kata-kata sendiri (peta konsep sederhana) dan menandai satu sifat yang masih sulit diterapkan.',
  ].join('\n'), 'Kemandirian: peserta didik menilai pemahaman diri.'],
  ['**Penutup**\n5 menit', [
    '1. Kesimpulan bersama: tujuh sifat eksponen (Lampiran 6) dan hubungan $a^{\\frac{1}{n}}=\\sqrt[n]{a}$.',
    '2. **Exit ticket:** “Sederhanakan $\\frac{x^{6}y^{-2}}{x^{2}y^{-5}}$.”',
    '3. Umpan balik, informasi pertemuan 3 (membawa satu benda/ukuran yang ingin dibandingkan, mis. tinggi badan), dan doa penutup.',
  ].join('\n'), 'Formatif: exit ticket.'],
], W3, { size: 19, cantSplit: false }));

// ---------- Pertemuan 3 ----------
add(h2('Pertemuan 3 – “Skala Semesta” (2 JP = 90 menit)'));
add(P('**Tujuan:** TP 3.  **Media:** LKPD 3, ilustrasi skala ukuran dan grafik $y=2^{x}$, kalkulator ilmiah, kertas plano/karton, spidol berwarna.', { after: 60 }));
add(tbl(H3, [
  ['**Pendahuluan**\n10 menit', [
    '1. Salam, doa, dan jeda napas 1 menit.',
    '2. Guru menampilkan ilustrasi skala ukuran dari sel darah merah sampai jarak Bumi–Matahari dan mengajukan pertanyaan pemantik 3.',
    '3. Peserta didik mengingat kembali tujuh sifat eksponen secara singkat (permainan tanya jawab 2 menit).',
    '4. Guru menyampaikan tujuan dan luaran hari ini: **poster/infografik “Skala Semesta”** dan penyelesaian masalah kontekstual.',
  ].join('\n'), 'Bermakna dan berkesadaran.'],
  ['**Inti – Memahami**\n20 menit', [
    '**Kegiatan 1 (LKPD 3) – Bentuk baku dan skala ukuran:** peserta didik mempelajari bentuk baku $a×10^{n}$ dengan $1≤a<10$ dari tabel ukuran benda, mengonversi bilangan biasa ke bentuk baku, dan mengurutkan ukuran dari yang terkecil.',
    '**Kegiatan 2 (LKPD 3) – Operasi bentuk baku:** menghitung waktu tempuh cahaya Matahari ke Bumi dan Bulan ke Bumi, serta kapasitas penyimpanan (banyaknya foto yang muat dalam memori) dengan sifat pembagian eksponen.',
  ].join('\n'), 'Penalaran kritis.\nDiferensiasi: Kelompok 3 memulai dari soal bilangan kecil.'],
  ['**Inti – Mengaplikasi**\n45 menit', [
    '**Kegiatan 3 (LKPD 3) – Pertumbuhan dan peluruhan (15 menit):** memodelkan pertumbuhan bakteri dan peluruhan zat radioaktif dengan $N=N_{0}×2^{t/T}$ dan membaca grafik $y=2^{x}$.',
    '**Kegiatan 4 (LKPD 3) – Proyek mini “Skala Semesta” (20 menit):** setiap kelompok memilih 6 objek, menuliskan ukurannya dalam bentuk baku, mengurutkannya, membuat minimal 2–3 perbandingan (“berapa kali lebih besar”), dan menyajikannya sebagai poster/infografik.',
    '**Gallery walk (10 menit):** kelompok berkeliling melihat poster, memberi satu pujian dan satu saran perbaikan pada sticky note.',
  ].join('\n'), 'Kreativitas, kolaborasi, komunikasi.\nProduk dinilai dengan rubrik poster (F.3).\nDiferensiasi produk: poster, video 60 detik, atau penjelasan lisan.'],
  ['**Inti – Merefleksi**\n10 menit', [
    '**Kegiatan 5 (LKPD 3):** jurnal refleksi akhir unit — apa yang paling bermakna, strategi yang membantu, kesulitan yang masih ada, dan bagaimana pangkat ditemui dalam kehidupan.',
  ].join('\n'), 'Kemandirian dan keimanan: bersyukur atas keteraturan pola alam.'],
  ['**Penutup**\n5 menit', [
    '1. Kesimpulan unit: pangkat memudahkan kita menulis, menghitung, dan membandingkan ukuran yang sangat kecil dan sangat besar.',
    '2. **Exit ticket:** “Tuliskan $0{,}00045$ dalam bentuk baku dan jelaskan arti pangkat negatifnya.”',
    '3. Informasi asesmen sumatif (pertemuan 4), umpan balik, dan doa penutup.',
  ].join('\n'), 'Formatif: exit ticket.'],
], W3, { size: 19, cantSplit: false }));

// ---------- Pertemuan 4 ----------
add(h2('Pertemuan 4 – Asesmen Sumatif (1 JP = 45 menit)'));
add(tbl(H3, [
  ['**Pelaksanaan**\n45 menit', [
    '1. Salam, doa, dan jeda napas; guru menyampaikan petunjuk pengerjaan.',
    '2. Peserta didik mengerjakan **tes tertulis uraian** (5 soal, 35 menit, Lampiran 5) secara mandiri; kalkulator ilmiah diperbolehkan.',
    '3. Guru membagikan umpan balik poster (hasil rubrik) dan menutup dengan doa.',
  ].join('\n'), 'Penilaian produk (poster) dilakukan pada pertemuan 3.'],
], W3, { size: 19 }));

// ======================= F. ASESMEN =======================
add(pb(), h1('F. ASESMEN'));
add(h2('F.1 Ringkasan Asesmen'));
add(tbl(['Jenis', 'Waktu', 'Teknik dan Instrumen', 'TP'], [
  ['Diagnostik', 'Sebelum pertemuan 1', 'Tes tertulis singkat (5 soal) dan angket gaya belajar/minat (bagian B)', '–'],
  ['Formatif', 'Setiap pertemuan', 'Observasi (rubrik F.2), LKPD, exit ticket, jurnal refleksi', 'TP 1–3'],
  ['Sumatif', 'Pertemuan 3 dan 4', 'Produk (poster/infografik) dan tes tertulis uraian (Lampiran 5)', 'TP 1–3'],
], [1800, 2200, 4538, 1100], { size: 20, firstColBold: true, center: [3] }));

add(h2('F.2 Asesmen Formatif'));
add(h3('a. Rubrik Observasi Kolaborasi dan Penalaran (per kelompok, skor 1–4)'));
add(tbl(['Aspek', 'Skor 4', 'Skor 3', 'Skor 2', 'Skor 1'], [
  ['Partisipasi dan peran', 'Semua anggota aktif dan menjalankan perannya', '3 anggota aktif', '1–2 anggota aktif', 'Hanya 1 anggota yang bekerja'],
  ['Penalaran', 'Menjelaskan alasan setiap langkah dan menguji dugaan dengan contoh', 'Menjelaskan alasan sebagian besar langkah', 'Menjawab benar tetapi alasan kurang jelas', 'Menjawab tanpa alasan'],
  ['Ketelitian perhitungan', 'Semua perhitungan benar dan terstruktur', 'Sedikit kesalahan, dapat memperbaiki sendiri', 'Beberapa kesalahan, perlu bantuan', 'Banyak kesalahan konsep'],
  ['Komunikasi', 'Presentasi runtut, jelas, menanggapi pertanyaan dengan baik', 'Presentasi jelas, tanggapan cukup', 'Presentasi kurang runtut', 'Tidak mampu menyampaikan hasil'],
], [1800, 2000, 1900, 1900, 2038], { size: 18, firstColBold: true }));
add(h3('b. Exit Ticket dan Kunci'));
add(tbl(['Pertemuan', 'Pertanyaan', 'Jawaban yang Diharapkan'], [
  ['1', 'Jelaskan dengan kata-katamu mengapa $5^{0}=1$.', 'Pada tangga pangkat, setiap eksponen turun 1 nilainya dibagi 5 ($5^{1}=5$, sehingga $5^{0}=5÷5=1$). Dapat pula: $\\frac{5^{3}}{5^{3}}=1$ sekaligus $=5^{3-3}=5^{0}$.'],
  ['2', 'Sederhanakan $\\frac{x^{6}y^{-2}}{x^{2}y^{-5}}$.', '$x^{6-2}y^{-2-(-5)}=x^{4}y^{3}$'],
  ['3', 'Tuliskan $0{,}00045$ dalam bentuk baku dan jelaskan arti pangkat negatifnya.', '$4{,}5×10^{-4}$; pangkat negatif berarti bilangan lebih kecil dari 1 (koma digeser 4 tempat ke kanan; sama dengan pembagian oleh $10^{4}$).'],
], [1200, 3800, 4638], { size: 19, center: [0] }));

add(h2('F.3 Asesmen Sumatif'));
add(J('**1. Tes tertulis uraian** (Lampiran 5): 5 soal, skor maksimum 100. **2. Produk:** poster/infografik “Skala Semesta”, dinilai dengan rubrik berikut (skor maksimum 16).'));
add(tbl(['Kriteria', 'Skor 4 (Mahir)', 'Skor 3 (Cakap)', 'Skor 2 (Berkembang)', 'Skor 1 (Perlu bimbingan)'], [
  ['Ketepatan bentuk baku dan perhitungan', 'Semua bentuk baku dan perhitungan benar', '1 kesalahan kecil', '2–3 kesalahan', '≥ 4 kesalahan'],
  ['Analisis perbandingan', '≥ 3 perbandingan “berapa kali lebih besar” dengan penalaran eksponen yang tepat', '2 perbandingan tepat', '1 perbandingan tepat', 'Tidak ada perbandingan tepat'],
  ['Kreativitas dan kejelasan visual', 'Sangat menarik, tertata, ilustrasi membantu pemahaman', 'Menarik dan cukup tertata', 'Kurang tertata', 'Tidak tertata'],
  ['Kolaborasi dan presentasi', 'Semua anggota berkontribusi dan menjelaskan dengan baik', 'Hampir semua berkontribusi', 'Sebagian berkontribusi', 'Hanya 1 anggota berkontribusi'],
], [2200, 2100, 1800, 1800, 1738], { size: 18, firstColBold: true }));

add(h2('F.4 Pengolahan Nilai'));
add(tbl(['Komponen', 'Bobot', 'Keterangan'], [
  ['LKPD 1–3 (rata-rata)', '30%', 'Skor mengacu pada pedoman di Lampiran 4'],
  ['Observasi kolaborasi dan penalaran', '20%', 'Rata-rata skor rubrik F.2, dikonversi ke skala 100'],
  ['Produk poster “Skala Semesta”', '20%', '(Skor rubrik ÷ 16) × 100'],
  ['Tes sumatif tertulis', '30%', 'Skor 0–100 (Lampiran 5)'],
], [3600, 1200, 4838], { size: 20, firstColBold: true, center: [1] }));
add(sp(40));
add(J('**Kriteria Ketercapaian Tujuan Pembelajaran (KKTP):** nilai akhir ≥ 75 dinyatakan tercapai. Interpretasi: ≥ 86 **Mahir**; 75–85 **Cakap**; 60–74 **Berkembang**; < 60 **Perlu bimbingan**. (Sesuaikan dengan kebijakan satuan pendidikan.)'));

add(h2('F.5 Pengayaan dan Remedial'));
add(tbl(['Tindak Lanjut', 'Sasaran', 'Kegiatan'], [
  ['Pengayaan', 'Nilai akhir ≥ 86', '- Menyelesaikan persamaan eksponen sederhana, mis. $2^{x+1}=32$ (jawab $x=4$) dan $9^{x}=27$ (jawab $x=\\frac{3}{2}$)\n- Menyelidiki fungsi $y=2^{x}$ dan membandingkannya dengan $y=\\left(\\frac{1}{2}\\right)^{x}$ memakai Desmos/GeoGebra\n- Membuat proyek “waktu paruh obat/zat” dan memodelkannya dengan pangkat'],
  ['Remedial', 'Nilai akhir < 75', '- Pembelajaran ulang dengan tangga pangkat dan kartu sifat eksponen\n- Latihan bertahap dengan angka kecil, didampingi guru/tutor sebaya\n- Asesmen ulang (tertulis singkat atau lisan) pada indikator yang belum tercapai'],
], [1500, 1700, 6438], { size: 19, firstColBold: true }));

// ======================= G. REFLEKSI GURU =======================
add(h1('G. REFLEKSI GURU'));
add(...numbered([
  'Apakah peserta didik benar-benar menemukan konsep melalui pola, atau saya terlalu cepat memberikan rumus?',
  'Bagian kegiatan mana yang paling memunculkan rasa ingin tahu dan kegembiraan belajar? Bagian mana yang membosankan?',
  'Miskonsepsi apa yang masih bertahan setelah pertemuan 3 dan bagaimana saya menanganinya?',
  'Apakah diferensiasi proses, konten, dan produk sudah membantu semua kelompok? Siapa yang belum terjangkau?',
  'Apa yang akan saya ubah ketika mengajarkan unit ini pada kelas berikutnya?',
]));

module.exports = out;
