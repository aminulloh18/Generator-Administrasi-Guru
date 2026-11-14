const { Paragraph, TextRun, AlignmentType } = require('docx');
const L = require('./lib');
const { P, J, h1, h2, h3, pb, sp, bullets, numbered, tbl, box, fig, rich } = L;

const out = [];
const add = (...x) => x.flat().forEach(e => out.push(e));

// ======================= SAMPUL =======================
add(sp(500));
add(box(null, [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 80 }, children: rich('MODUL AJAR', { size: 36, bold: true, color: 'FFFFFF' }) }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: rich('PEMBELAJARAN MENDALAM (DEEP LEARNING)', { size: 30, bold: true, color: 'FFFFFF' }) }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: rich('MATEMATIKA', { size: 34, bold: true, color: 'FFFFFF' }) }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: rich('EKSPONEN (BILANGAN BERPANGKAT)', { size: 32, bold: true, color: 'FFD966' }) }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: rich('Fase E – Kelas X SMA | Kurikulum Merdeka', { size: 24, color: 'FFFFFF' }) }),
], { fill: '1F3B57', line: '1F3B57', size: 22 }));
add(sp(200));
add(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: rich('“Berlipat Ganda: Dari Bakteri sampai Bintang”', { size: 30, bold: true, italics: true, color: '1F3B57' }) }));
add(fig('bakteri', 430));
add(sp(200));
add(tbl(null, [
  ['Penyusun', ': ………………………………………………'],
  ['Satuan Pendidikan', ': ………………………………………………'],
  ['Tahun Pelajaran', ': 2026/2027'],
], [2600, 7038], { size: 22, border: 'FFFFFF', firstColBold: true }));
add(sp(160));
add(box('Isi modul ini', [
  '- **A–G** : modul ajar (identitas, kesiapan peserta didik, desain pembelajaran, pengalaman belajar per pertemuan, asesmen, refleksi guru)',
  '- **Lampiran 1–3** : LKPD 1, 2, dan 3 (siap cetak, dengan ilustrasi dan ruang jawaban)',
  '- **Lampiran 4** : Kunci dan pedoman penskoran LKPD (untuk guru)',
  '- **Lampiran 5** : Instrumen asesmen sumatif, kunci, dan rubrik',
  '- **Lampiran 6–7** : Bahan bacaan peserta didik dan glosarium, serta daftar pustaka',
].join('\n'), { fill: 'EEF4FB' }));

// ======================= A. IDENTITAS =======================
add(pb(), h1('A. INFORMASI UMUM'));
add(tbl(null, [
  ['Nama Penyusun', '………………………………………………'],
  ['Satuan Pendidikan', '………………………………………………'],
  ['Mata Pelajaran', 'Matematika'],
  ['Fase / Kelas', 'E / X'],
  ['Semester / Tahun Pelajaran', 'Ganjil / 2026/2027'],
  ['Topik', 'Eksponen (Bilangan Berpangkat)'],
  ['Alokasi Waktu', '3 pertemuan × 2 JP + 1 JP asesmen sumatif = 7 JP (1 JP = 45 menit; total 315 menit)'],
  ['Pendekatan dan Model', 'Pembelajaran Mendalam (Memahami – Mengaplikasi – Merefleksi) dengan model Problem-Based Learning (PBL) dan penemuan terbimbing (guided discovery)'],
  ['Moda Pembelajaran', 'Tatap muka (luring), dengan dukungan media digital yang bersifat opsional'],
  ['Sarana dan Prasarana', '- Ruang kelas dengan meja yang dapat disusun berkelompok\n- LKPD 1–3 (dicetak, 1 set per kelompok)\n- Kertas HVS/koran bekas, penggaris, kalkulator ilmiah\n- Papan tulis/whiteboard, spidol, kertas plano/karton untuk poster\n- Proyektor dan Desmos/GeoGebra (opsional, untuk memeriksa grafik $y=2^{x}$)'],
  ['Peserta Didik Sasaran', 'Peserta didik reguler/tipikal kelas X; pembelajaran dirancang dengan diferensiasi (lihat bagian B.3)'],
], [2900, 6738], { size: 21, firstColBold: true, firstColFill: 'EEF4FB' }));

// ======================= B. KESIAPAN =======================
add(h1('B. KESIAPAN DAN KARAKTERISTIK PESERTA DIDIK'));
add(J('Sebelum unit dimulai, guru melakukan asesmen diagnostik untuk memetakan kesiapan dan karakteristik peserta didik. Hasilnya dipakai untuk menyusun kelompok dan menentukan dukungan yang diperlukan (diferensiasi).'));

add(h2('B.1 Asesmen Diagnostik Kognitif (±10 menit, sebelum pertemuan 1)'));
add(P('Kerjakan secara mandiri tanpa kalkulator. Soal ini mengukur prasyarat: perkalian berulang, bilangan bulat negatif, pecahan, akar, dan bilangan besar.', { italics: true }));
add(tbl(['No', 'Soal', 'Kunci', 'Prasyarat yang diukur'], [
  ['1', 'Hitung $2×2×2×2$.', '$16$', 'Perkalian berulang'],
  ['2', 'Hitung $(-3)×(-3)×(-3)$.', '$-27$', 'Perkalian bilangan bulat negatif'],
  ['3', 'Hitung $\\frac{1}{2}×\\frac{1}{2}×\\frac{1}{2}$.', '$\\frac{1}{8}$', 'Perkalian pecahan'],
  ['4', 'Tentukan nilai $\\sqrt{49}$ dan $\\sqrt[3]{8}$.', '$7$ dan $2$', 'Akar kuadrat dan akar pangkat tiga'],
  ['5', 'Tulis $3.500.000$ sebagai hasil kali bilangan desimal dan $1.000.000$.', '$3{,}5×1.000.000$', 'Nilai tempat dan bilangan besar'],
], [600, 4700, 1800, 2538], { size: 20, center: [0] }));
add(sp(60));
add(tbl(['Jumlah jawaban benar', 'Kategori kesiapan', 'Tindak lanjut'], [
  ['4–5', 'Siap (Kelompok 1)', 'Langsung mengikuti pembelajaran; dapat menjadi teman diskusi dan diberi tantangan pengayaan.'],
  ['2–3', 'Perlu penguatan (Kelompok 2)', 'Penguatan singkat prasyarat di awal pertemuan 1 (pengulangan perkalian berulang dan akar) dengan contoh bertahap.'],
  ['0–1', 'Perlu pendampingan (Kelompok 3)', 'Pendampingan guru/tutor sebaya selama kegiatan; gunakan kartu bantu perkalian berulang dan tangga pangkat (Lampiran 6).'],
], [2300, 2700, 4638], { size: 20 }));

add(h2('B.2 Asesmen Diagnostik Non-Kognitif (±5 menit)'));
add(tbl(['Aspek', 'Pertanyaan / Pernyataan', 'Pilihan Jawaban'], [
  ['Gaya belajar', 'Saya paling mudah memahami materi baru dengan cara ...', 'a) melihat gambar/diagram   b) mendengar penjelasan/berdiskusi   c) mencoba atau mempraktikkan langsung'],
  ['Minat dan konteks', 'Hal yang paling dekat dengan keseharianku adalah ...', 'a) gawai dan permainan daring   b) sains dan alam   c) olahraga/seni   d) lainnya: ........'],
  ['Kesiapan emosi', 'Saat menghadapi soal matematika yang baru, perasaanku ...', 'Skala 1 (sangat cemas) – 4 (sangat percaya diri)'],
], [1800, 4000, 3838], { size: 20, firstColBold: true }));
add(sp(40));
add(J('**Pemanfaatan hasil:** gaya belajar dan minat dipakai untuk menentukan pilihan produk (poster, video, atau penjelasan lisan) dan konteks soal; skor kesiapan emosi rendah (1–2) menjadi dasar bagi guru memberi dorongan dan umpan balik yang lebih personal.'));

add(h2('B.3 Pemetaan dan Strategi Diferensiasi'));
add(tbl(['Aspek Diferensiasi', 'Kelompok 1 (Siap)', 'Kelompok 2 (Penguatan)', 'Kelompok 3 (Pendampingan)'], [
  ['Proses', 'Menyelidiki pola secara mandiri; mengerjakan tantangan di akhir tiap kegiatan LKPD', 'Mengikuti LKPD dengan petunjuk bertahap; guru memberi pertanyaan penuntun', 'Guru/tutor sebaya mendampingi; memakai tangga pangkat dan kartu bantu'],
  ['Konten', 'Soal tantangan (pangkat rasional, perbandingan bilangan besar)', 'Soal inti pada LKPD', 'Soal inti dengan angka kecil terlebih dahulu'],
  ['Produk', 'Poster/infografik dengan 3 perbandingan analitis', 'Poster dengan 2 perbandingan', 'Poster dengan 2 perbandingan dan bantuan templat'],
  ['Lingkungan', { t: 'Kelompok campuran (heterogen) beranggotakan 4 orang (idealnya 1 anggota Kelompok 1, 2 anggota Kelompok 2, dan 1 anggota Kelompok 3) sehingga tutor sebaya terjadi secara alami.', span: 3 }],
], [1700, 2700, 2600, 2638], { size: 19, firstColBold: true }));

// ======================= C. KARAKTERISTIK MATERI =======================
add(h1('C. KARAKTERISTIK MATERI DAN DIMENSI PROFIL LULUSAN'));
add(h2('C.1 Karakteristik Materi'));
add(bullets([
  '**Jenis pengetahuan:** konseptual (makna pangkat bulat positif, nol, negatif, dan rasional; hubungan antarsifat), prosedural (menyederhanakan dan menghitung bentuk pangkat), dan metakognitif (merefleksikan strategi dan kesalahan).',
  '**Relevansi:** pertumbuhan dan peluruhan (biologi, kimia, fisika), penyimpanan data (informatika: $2^{10}$ byte), ukuran sangat kecil dan sangat besar (sel sampai jarak antarbintang), serta dasar untuk logaritma dan fungsi eksponensial di Fase E dan F.',
  '**Prasyarat:** perkalian berulang, operasi bilangan bulat dan pecahan, akar kuadrat dan akar pangkat tiga sederhana.',
  '**Miskonsepsi yang umum:** $-3^{2}=9$ (seharusnya $-9$); $(2^{3})^{2}=2^{5}$ (seharusnya $2^{6}$); $a^{m}+a^{n}=a^{m+n}$; $2^{3}×3^{2}=6^{5}$; $a^{-n}$ dianggap bilangan negatif.',
]));
add(h2('C.2 Dimensi Profil Lulusan yang Dikembangkan'));
add(tbl(['Dimensi Profil Lulusan', 'Wujud dalam Pembelajaran'], [
  ['Penalaran Kritis', 'Menemukan pola, membuktikan sifat dengan contoh dan penalaran, menguji klaim lewat kegiatan “Detektif Kesalahan”.'],
  ['Kolaborasi', 'Bekerja dalam kelompok heterogen dengan pembagian peran (pemimpin, pencatat, penghitung, juru bicara).'],
  ['Komunikasi', 'Menjelaskan penalaran secara lisan dan tertulis; presentasi galeri (gallery walk) poster.'],
  ['Kreativitas', 'Merancang poster/infografik “Skala Semesta” dan membuat soal cerita sendiri.'],
  ['Kemandirian', 'Mengerjakan bagian LKPD secara individu, menulis jurnal refleksi, dan memantau ketercapaian belajarnya sendiri.'],
  ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Membuka dan menutup pembelajaran dengan doa serta merefleksikan rasa syukur atas keteraturan pola ciptaan (pertumbuhan, ukuran alam semesta).'],
], [3000, 6638], { size: 20, firstColBold: true }));

// ======================= D. DESAIN =======================
add(h1('D. DESAIN PEMBELAJARAN'));
add(h2('D.1 Capaian Pembelajaran (CP)'));
add(box('Elemen Bilangan – Fase E', 'Pada akhir Fase E, peserta didik dapat menggeneralisasi sifat-sifat operasi bilangan berpangkat (eksponen) dan logaritma. (Modul ini mencakup bagian eksponen; logaritma dibahas pada unit tersendiri.)', { fill: 'EEF4FB' }));
add(sp(40));
add(h2('D.2 Tujuan Pembelajaran (TP) dan Indikator'));
add(tbl(['TP', 'Rumusan Tujuan Pembelajaran', 'Pertemuan', 'Indikator Ketercapaian'], [
  ['TP 1', 'Melalui penyelidikan pola pembelahan bakteri dan “tangga pangkat”, peserta didik mampu **menjelaskan** makna bilangan berpangkat bulat positif, nol, dan negatif serta **menemukan** bentuk umumnya secara mandiri.', '1', '- Menyatakan perkalian berulang dalam bentuk pangkat\n- Menentukan nilai $a^{0}$ dan $a^{-n}$ beserta alasannya\n- Menjelaskan syarat $a≠0$'],
  ['TP 2', 'Melalui pengamatan pola dan diskusi kelompok, peserta didik mampu **menggeneralisasi** sifat-sifat operasi bilangan berpangkat (perkalian, pembagian, pangkat dari pangkat, pangkat dari perkalian dan pembagian) serta **menghubungkannya** dengan pangkat rasional (bentuk akar).', '2', '- Menyimpulkan sifat dari pola yang diamati\n- Menyederhanakan bentuk pangkat dengan benar\n- Menghubungkan $a^{\\frac{1}{n}}$ dengan akar pangkat $n$\n- Mengidentifikasi dan memperbaiki kesalahan penerapan sifat'],
  ['TP 3', 'Melalui pemecahan masalah kontekstual dan proyek mini, peserta didik mampu **menerapkan** sifat-sifat eksponen dan bentuk baku untuk menyelesaikan masalah pertumbuhan, peluruhan, dan perbandingan ukuran, serta **merefleksikan** strategi penyelesaiannya.', '3', '- Menyatakan bilangan sangat besar/kecil dalam bentuk baku\n- Memodelkan pertumbuhan dan peluruhan dengan pangkat\n- Membandingkan ukuran dengan penalaran eksponen\n- Menuliskan refleksi proses belajar'],
], [800, 3900, 1250, 3688], { size: 19, firstColBold: true, center: [2] }));

add(h2('D.3 Topik Kontekstual dan Lintas Disiplin'));
add(J('**“Berlipat Ganda: Dari Bakteri sampai Bintang”.** Pembelahan bakteri (Biologi), peluruhan zat radioaktif (Fisika/Kimia), kapasitas penyimpanan data (Informatika), serta jarak dan ukuran benda-benda alam (Astronomi dan Geografi). Peserta didik melihat bahwa satu “bahasa” matematika, yaitu pangkat, dapat menggambarkan hal-hal yang sangat berbeda ukurannya.'));
add(h2('D.4 Pemahaman Bermakna'));
add(box(null, [
  '- Pangkat adalah bahasa ringkas untuk perkalian berulang dan pertumbuhan yang berlipat ganda.',
  '- Sifat-sifat eksponen bukan aturan yang dihafal, melainkan hasil pola yang konsisten dan dapat dibuktikan.',
  '- Bentuk baku dan eksponen membantu kita memahami, membandingkan, dan menghitung ukuran yang sangat kecil maupun sangat besar.',
].join('\n'), { fill: 'FFF8E1', line: 'E0A800' }));
add(h2('D.5 Pertanyaan Pemantik'));
add(...numbered([
  'Jika selembar kertas tipis dilipat dua berulang-ulang, setelah berapa kali lipatan tebalnya melampaui tinggi sebuah gedung? Bahkan sampai ke Bulan?',
  'Mengapa $2^{0}=1$ dan mengapa $2^{-1}$ bukan bilangan negatif?',
  'Bagaimana para ilmuwan menuliskan jarak Bumi–Matahari tanpa harus menuliskan 11 angka nol?',
  'Mana yang lebih besar: $2^{100}$ atau $3^{60}$? Bagaimana membuktikannya tanpa kalkulator?',
]));
add(h2('D.6 Praktik Pedagogis'));
add(tbl(['Komponen', 'Rancangan'], [
  ['Model dan strategi', 'PBL dan penemuan terbimbing; pola “amati – duga – uji – simpulkan”; diskusi kolaboratif; gallery walk. Setiap pertemuan bergerak dari **Memahami** (mengeksplorasi konsep) ke **Mengaplikasi** (memecahkan masalah) lalu **Merefleksi**.'],
  ['Prinsip pembelajaran', '**Berkesadaran** (mindful: jeda napas 1 menit, tujuan belajar disadari), **bermakna** (konteks nyata dan lintas disiplin), dan **menggembirakan** (permainan “Detektif Kesalahan”, tantangan lipat kertas, poster kreatif).'],
  ['Kemitraan pembelajaran', 'Kolaborasi dengan guru Biologi/Fisika/Informatika untuk memvalidasi konteks (opsional); orang tua/wali dilibatkan dalam tugas wawancara singkat “Di mana pangkat dipakai pada pekerjaan di sekitar kita?” (opsional).'],
  ['Lingkungan belajar', 'Meja disusun berkelompok 4 orang; sudut galeri untuk memajang poster; norma kelas: “boleh salah, wajib menjelaskan”.'],
  ['Pemanfaatan digital', 'Kalkulator ilmiah untuk bilangan besar; Desmos/GeoGebra untuk membandingkan grafik $y=2^{x}$ dengan hasil perhitungan (opsional).'],
], [2500, 7138], { size: 20, firstColBold: true }));

module.exports = out;
