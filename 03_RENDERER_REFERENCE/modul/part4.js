const L = require('./lib');
const { P, J, h1, h2, h3, pb, sp, bullets, numbered, tbl, box, KUNCI_FILL } = L;
const out = [];
const add = (...x) => x.flat().forEach(e => out.push(e));

// =========================================================================
// LAMPIRAN 4 – KUNCI LKPD
// =========================================================================
add(pb(), h1('LAMPIRAN 4. KUNCI DAN PEDOMAN PENSKORAN LKPD (UNTUK GURU)'));
add(J('Skor setiap LKPD maksimum 100. Jawaban peserta didik yang berbeda namun benar secara matematis dan disertai alasan yang tepat tetap diberi skor penuh. Penilaian menekankan **alasan/penalaran**, bukan hanya hasil akhir.'));

add(h2('Kunci LKPD 1 – Berlipat Ganda'));
add(tbl(['Kegiatan', 'Kunci Jawaban', 'Skor'], [
  ['1 (20)', '- Tabel: $n=3$: 60 menit, 8 bakteri, $2×2×2$, $2^{3}$; $n=4$: 80, 16, $2^{4}$; $n=5$: 100, 32, $2^{5}$; $n=10$: 1.024 bakteri, 10 faktor 2, $2^{10}$; $n$: $20n$ menit, $2^{n}$.\n- (1) Banyak bakteri $=2$ pangkat banyaknya pembelahan. (2) $N=2^{n}$. (3) Basis 2, eksponen 5, nilai 32.\n- (4) Contoh: lebih singkat, mudah dibaca, dan mengurangi kesalahan menulis; menunjukkan perkalian berulang.', 'Tabel 10; no. 1–3 masing-masing 2; no. 4 diberi 4 (alasan).'],
  ['2 (25)', '- Basis 2: $2^{0}=1$, $2^{-1}=\\frac{1}{2}$, $2^{-2}=\\frac{1}{4}$, $2^{-3}=\\frac{1}{8}$. Basis 3: $3^{0}=1$, $3^{-1}=\\frac{1}{3}$, $3^{-2}=\\frac{1}{9}$, $3^{-3}=\\frac{1}{27}$.\n- (1) Setiap eksponen turun 1, nilai dibagi basisnya. (2) $a^{0}=1$. (3) $a^{-n}=\\frac{1}{a^{n}}$.\n- (4) Karena $\\frac{1}{0^{n}}$ berarti pembagian dengan nol yang tidak terdefinisi; pada $a^{0}$ nilai $0^{0}$ pun tidak terdefinisi.\n- (5) Secara biologis tidak masuk akal (tidak ada setengah bakteri); model matematika adalah penyederhanaan yang tepat dalam batas tertentu.', 'Tabel 8; no. 1–3 masing-masing 3; no. 4 dan 5 masing-masing 4 (ada penalaran).'],
  ['3 (25)', '- $n=5$: 3,2 mm (0,0032 m); $n=10$: 102,4 mm (0,1024 m ≈ 10 cm, setebal buku tebal); $n=15$: 3.276,8 mm (3,2768 m); $n=20$: 104.857,6 mm (±104,86 m).\n- (1) ±105 m, hampir mendekati Tugu Monas (±132 m). (2) $n=41$: ±$2{,}2×10^{8}$ m (belum cukup); $n=42$: ±$4{,}4×10^{8}$ m (melampaui). Jadi 42 lipatan.\n- (3) Kertas menebal dan luasnya mengecil sehingga tidak dapat dilipat; model mengabaikan batas fisik.', 'Tabel 10; no. 1 = 3; no. 2 = 7; no. 3 = 5.'],
  ['4 (20)', '- a) Andi salah ($-3^{2}=-9$, karena eksponen hanya berlaku untuk 3). Sari salah ($(-2)^{4}=16$). Dimas salah ($2^{-3}=\\frac{1}{8}$). Rina salah ($7^{0}=1$). Budi salah ($\\left(\\frac{2}{3}\\right)^{-2}=\\frac{9}{4}$).\n- b) $-27$; $\\frac{1}{16}$; $8$; $\\frac{1}{1.000}=0{,}001$.\n- c) $3^{n}$; putaran 2: 9; putaran 3: 27. Putaran 6: $3^{6}=729$. Tantangan: $3+9+27+81=120$.', 'a) 8 (1,6 per butir); b) 4; c) 8 (3 + 3 + 2).'],
  ['5 (10)', 'Jurnal 3-2-1 terisi lengkap dan jujur; ada perbandingan tebakan dengan hasil beserta pelajaran yang diambil.', 'Lengkap 10; sebagian 5–8; kosong 0.'],
], [1100, 6738, 1800], { size: 18, firstColBold: true, cantSplit: false }));

add(h2('Kunci LKPD 2 – Detektif Sifat Eksponen'));
add(tbl(['Kegiatan', 'Kunci Jawaban', 'Skor'], [
  ['1–4 (24)', '- **K1:** $3^{2}×3^{4}=3^{6}$ (2+4); $5^{1}×5^{3}=5^{4}$; $a^{3}×a^{4}=a^{7}$; $a^{m}×a^{n}=a^{m+n}$. Uji: $10^{5}$ dan $2^{3}=8$ (cocok: $32×\\frac{1}{4}=8$).\n- **K2:** $5^{6}÷5^{4}=5^{2}$; $a^{7}÷a^{3}=a^{4}$; $\\frac{a^{m}}{a^{n}}=a^{m-n}$. $\\frac{2^{3}}{2^{3}}=1$ dan $=2^{0}$, sehingga $2^{0}=1$ konsisten. Uji: $3^{-3}=\\frac{1}{27}$ dan $\\frac{9}{243}=\\frac{1}{27}$.\n- **K3:** $(3^{2})^{3}=3^{6}$; $(5^{2})^{2}=5^{4}$; $(a^{m})^{n}=a^{mn}$. Uji: $2^{-3}=\\frac{1}{8}$ dan $\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$.\n- **K4:** $(2×5)^{3}=1.000$ dan $2^{3}×5^{3}=8×125=1.000$ (sama); $\\left(\\frac{2}{5}\\right)^{3}=\\frac{8}{125}$ (sama); $\\left(\\frac{3}{4}\\right)^{2}=\\frac{9}{16}=\\frac{3^{2}}{4^{2}}$; $(ab)^{n}=a^{n}b^{n}$, $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. Uji: $(4×0{,}5)^{2}=4$ dan $16×0{,}25=4$.', 'Masing-masing kegiatan 6 (tabel 3, dugaan 1, uji 2).'],
  ['Rangkuman (10)', '$a^{m}×a^{n}=a^{m+n}$; $\\frac{a^{m}}{a^{n}}=a^{m-n}$; $(a^{m})^{n}=a^{mn}$; $(ab)^{n}=a^{n}b^{n}$; $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$; $a^{0}=1$; $a^{-n}=\\frac{1}{a^{n}}$ (syarat $a,b≠0$).', '7 sifat: 1 poin per sifat, + 3 untuk contoh yang tepat.'],
  ['5 (20)', '(1) $s=2$ cm; $s=3$ cm. (2) $(V^{x})^{3}=V^{3x}$; $3x=1$; $x=\\frac{1}{3}$. (3) $8^{\\frac{1}{3}}=2$; $27^{\\frac{1}{3}}=3$. (4) $x=\\frac{1}{2}$; $49^{\\frac{1}{2}}=7$. (5) $a^{\\frac{1}{n}}=\\sqrt[n]{a}$; $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}=(\\sqrt[n]{a})^{m}$.\nLatihan: $4$; $4$; $8$; $9$; $\\frac{1}{4}$.', 'No. 1–5 masing-masing 2; latihan 10.'],
  ['6 (20)', '1) $2^{5-2-4}=2^{-1}=\\frac{1}{2}$.  2) $(3^{1})^{3}=27$.  3) $4x^{6}y^{-4}=\\frac{4x^{6}}{y^{4}}$.  4) $x^{3}y^{2}$.\nTantangan: $2^{100}=(2^{5})^{20}=32^{20}$; $3^{60}=(3^{3})^{20}=27^{20}$; $32>27$ sehingga $2^{100}>3^{60}$.', 'Soal 1–4 masing-masing 3 (langkah 2, hasil 1); tantangan 8.'],
  ['7 (16)', '1) Salah: $(2^{3})^{2}=2^{6}$.  2) Salah: basis berbeda tidak dapat digabung; $2^{3}×3^{2}=8×9=72$.  3) Salah: penjumlahan tidak mengikuti sifat perkalian; $8+4=12$.  4) Salah: $x^{6-2}=x^{4}$.  5) Salah: $(2a)^{3}=8a^{3}$.\nTukar soal: contoh jawaban $\\frac{2^{3}}{2^{5}}$ atau $2^{-5}×2^{3}$.', 'Masing-masing butir 2; tukar soal 6.'],
  ['8 (10)', 'Rangkuman dengan kata-kata sendiri, refleksi sifat tersulit, dan strategi perbaikan terisi.', 'Lengkap 10; sebagian 5–8; kosong 0.'],
], [1300, 6538, 1800], { size: 18, firstColBold: true, cantSplit: false }));

add(h2('Kunci LKPD 3 – Skala Semesta'));
add(tbl(['Kegiatan', 'Kunci Jawaban', 'Skor'], [
  ['1 (20)', '- a) $4{,}5×10^{5}$; $3{,}2×10^{-3}$; $7{,}2×10^{7}$; $8{,}1×10^{-6}$; $1{,}5×10^{11}$; $4{,}5×10^{-4}$.\n- b) Urutan: sel darah merah $7×10^{-6}$ (1); diameter rambut $7×10^{-5}$ (2); semut $3×10^{-3}$ (3); tinggi manusia $1{,}7×10^{0}$ (4); Gunung Everest $8{,}8×10^{3}$ (5); jari-jari Bumi $6{,}4×10^{6}$ (6); Bumi–Bulan $3{,}84×10^{8}$ (7); Bumi–Matahari $1{,}5×10^{11}$ (8).\n- c) (1) $≈5{,}2×10^{3}$ kali (±5.200 kali). (2) $≈9{,}1×10^{11}$ kali.', 'a) 6; b) 8; c) 6.'],
  ['2 (25)', '- Soal 1: Matahari→Bumi $=0{,}5×10^{3}=5×10^{2}$ s ≈ 8,3 menit; Bulan→Bumi $=1{,}28$ s.\n- Soal 2: $64$ GB $=2^{36}$ byte; $4$ MB $=2^{22}$ byte; banyak foto $=2^{36-22}=2^{14}=16.384$ foto.', 'Soal 1 = 12; soal 2 = 13.'],
  ['3 (25)', '- (1) $500×2^{4}=8.000$; setelah 18 jam $500×2^{6}=32.000$. (2) 10 hari: 20 g; 20 hari: $80×\\left(\\frac{1}{2}\\right)^{4}=5$ g.\n- Grafik: $2^{3}=8$; $2^{-2}=\\frac{1}{4}$; $2^{2{,}5}≈5{,}7$ ($4\\sqrt{2}≈5{,}66$).\n- Berpikir kritis: nilainya makin mendekati 0 tetapi selalu positif, tidak pernah mencapai 0 atau negatif.', 'No. 1 = 6; no. 2 = 6; grafik = 7; berpikir kritis = 6.'],
  ['4 (20)', 'Tabel perencanaan 6 objek lengkap (ukuran dalam bentuk baku yang benar), 2–3 perbandingan tepat, checklist terisi. **Produk poster dinilai terpisah dengan rubrik F.3.**', 'Objek 8; perbandingan 8; checklist 4.'],
  ['5 (10)', 'Refleksi akhir terisi lengkap dan bermakna, mengaitkan eksponen dengan kehidupan/ciptaan.', 'Lengkap 10; sebagian 5–8; kosong 0.'],
], [1100, 6738, 1800], { size: 18, firstColBold: true, cantSplit: false }));

// =========================================================================
// LAMPIRAN 5 – SUMATIF
// =========================================================================
add(pb(), h1('LAMPIRAN 5. INSTRUMEN ASESMEN SUMATIF'));
add(h2('Kisi-Kisi Singkat'));
add(tbl(['No', 'TP', 'Indikator Soal', 'Level Kognitif', 'Skor'], [
  ['1', 'TP 2', 'Menyederhanakan bentuk pangkat dengan pangkat negatif memakai sifat-sifat eksponen', 'C3 (Menerapkan)', '20'],
  ['2', 'TP 1, 2', 'Menghitung nilai bentuk yang memuat pangkat rasional dan pangkat negatif', 'C3 (Menerapkan)', '20'],
  ['3', 'TP 2', 'Membandingkan dua bilangan berpangkat besar dengan penalaran dan menyamakan eksponen', 'C4 (Menganalisis)', '20'],
  ['4', 'TP 3', 'Memodelkan dan menyelesaikan masalah pertumbuhan bakteri', 'C4 (Menganalisis)', '20'],
  ['5', 'TP 3', 'Menyelesaikan masalah waktu tempuh cahaya dengan bentuk baku', 'C3–C4', '20'],
], [600, 1100, 4838, 2100, 1000], { size: 19, center: [0, 1, 4] }));
add(sp(80));
add(h2('Soal Tes Tertulis (Uraian) – 35 menit'));
add(P('Petunjuk: kerjakan secara mandiri. Tuliskan langkah penyelesaian dengan jelas. Kalkulator ilmiah diperbolehkan.', { italics: true }));
add(...numbered([
  'Sederhanakan $\\frac{(2a^{3}b^{-2})^{3}}{4a^{5}b^{-4}}$ dan nyatakan hasilnya dengan pangkat positif. **(20)**',
  'Hitunglah nilai $27^{\\frac{2}{3}}+16^{\\frac{3}{4}}-\\left(\\frac{1}{4}\\right)^{-2}$. **(20)**',
  'Manakah yang lebih besar, $5^{40}$ atau $2^{90}$? Jelaskan alasanmu tanpa menghitung nilai kedua bilangan itu secara langsung. **(20)**',
  'Sebuah koloni bakteri berjumlah awal 800 dan menggandakan diri setiap 45 menit. (a) Tuliskan model banyak bakteri setelah $t$ menit. (b) Berapa banyak bakteri setelah 3 jam 45 menit? (c) Kapan jumlah bakteri mencapai 51.200? **(20)**',
  'Bintang terdekat dari Matahari, Proxima Centauri, berjarak sekitar $4×10^{16}$ meter dari Bumi. Kecepatan cahaya $3×10^{8}$ m/s. (a) Tentukan waktu tempuh cahaya dari bintang itu ke Bumi dalam detik (bentuk baku). (b) Perkirakan dalam tahun, jika 1 tahun ≈ $3{,}15×10^{7}$ detik. **(20)**',
]));
add(sp(80));
add(h2('Kunci dan Pedoman Penskoran'));
add(tbl(['No', 'Penyelesaian', 'Rincian Skor'], [
  ['1', '$\\frac{(2a^{3}b^{-2})^{3}}{4a^{5}b^{-4}}=\\frac{8a^{9}b^{-6}}{4a^{5}b^{-4}}=2a^{9-5}b^{-6-(-4)}=2a^{4}b^{-2}=\\frac{2a^{4}}{b^{2}}$', 'Pangkat dari perkalian: 6; pembagian eksponen: 6; hasil sederhana: 4; pangkat positif: 4'],
  ['2', '$27^{\\frac{2}{3}}=(\\sqrt[3]{27})^{2}=9$; $16^{\\frac{3}{4}}=(\\sqrt[4]{16})^{3}=8$; $\\left(\\frac{1}{4}\\right)^{-2}=16$. Nilai $=9+8-16=1$', 'Tiap suku 5 (total 15); hasil akhir 5'],
  ['3', '$5^{40}=(5^{4})^{10}=625^{10}$ dan $2^{90}=(2^{9})^{10}=512^{10}$. Karena $625>512$, maka $5^{40}>2^{90}$.', 'Menyamakan eksponen kedua bilangan: 10; menentukan basis baru: 5; kesimpulan beralasan: 5'],
  ['4', '(a) $N=800×2^{t/45}$. (b) $3$ jam $45$ menit $=225$ menit, $\\frac{225}{45}=5$, $N=800×2^{5}=25.600$. (c) $\\frac{51.200}{800}=64=2^{6}$, sehingga $\\frac{t}{45}=6$ dan $t=270$ menit $=4{,}5$ jam.', '(a) 5; (b) 7; (c) 8'],
  ['5', '(a) $t=\\frac{4×10^{16}}{3×10^{8}}≈1{,}33×10^{8}$ detik. (b) $\\frac{1{,}33×10^{8}}{3{,}15×10^{7}}≈4{,}2$ tahun.', '(a) 12 (rumus 4, pembagian eksponen 4, bentuk baku 4); (b) 8'],
], [600, 5800, 3238], { size: 19, center: [0] }));

// =========================================================================
// LAMPIRAN 6 – BAHAN BACAAN
// =========================================================================
add(pb(), h1('LAMPIRAN 6. BAHAN BACAAN PESERTA DIDIK DAN GURU'));
add(h2('1. Bilangan Berpangkat'));
add(J('Untuk bilangan real $a$ dan bilangan bulat positif $n$, $a^{n}=a×a×…×a$ ($n$ faktor). Bilangan $a$ disebut basis dan $n$ disebut eksponen. Untuk $a≠0$ didefinisikan $a^{0}=1$ dan $a^{-n}=\\frac{1}{a^{n}}$.'));
add(h2('2. Sifat-Sifat Eksponen'));
add(P('Untuk $a$ dan $b$ bilangan real tidak nol, serta $m$ dan $n$ bilangan bulat:', { keepNext: true }));
add(tbl(['No', 'Sifat', 'Bentuk Umum', 'Contoh'], [
  ['1', 'Perkalian', '$a^{m}×a^{n}=a^{m+n}$', '$2^{3}×2^{4}=2^{7}=128$'],
  ['2', 'Pembagian', '$\\frac{a^{m}}{a^{n}}=a^{m-n}$', '$\\frac{5^{6}}{5^{4}}=5^{2}=25$'],
  ['3', 'Pangkat dari pangkat', '$(a^{m})^{n}=a^{mn}$', '$(3^{2})^{3}=3^{6}=729$'],
  ['4', 'Pangkat dari perkalian', '$(ab)^{n}=a^{n}b^{n}$', '$(2×5)^{3}=8×125=1.000$'],
  ['5', 'Pangkat dari pembagian', '$\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$', '$\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}$'],
  ['6', 'Pangkat nol', '$a^{0}=1$', '$7^{0}=1$'],
  ['7', 'Pangkat negatif', '$a^{-n}=\\frac{1}{a^{n}}$', '$2^{-3}=\\frac{1}{8}$'],
], [600, 2400, 3300, 3338], { size: 20, center: [0] }));
add(h2('3. Pangkat Rasional'));
add(J('Untuk $a>0$ dan bilangan bulat $n>1$: $a^{\\frac{1}{n}}=\\sqrt[n]{a}$ dan $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}=(\\sqrt[n]{a})^{m}$. Sifat-sifat eksponen di atas tetap berlaku. Contoh: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^{2}=4$.'));
add(h2('4. Bentuk Baku (Notasi Ilmiah)'));
add(J('Bilangan yang sangat besar atau sangat kecil ditulis $a×10^{n}$ dengan $1≤a<10$ dan $n$ bilangan bulat. Contoh: $1{,}5×10^{11}$ m dan $7×10^{-6}$ m. Pangkat positif berarti koma digeser ke kanan; pangkat negatif berarti koma digeser ke kiri.'));
add(h2('5. Contoh Soal'));
add(tbl(['Soal', 'Penyelesaian'], [
  ['Hitung $\\left(\\frac{2}{3}\\right)^{-2}$.', '$\\left(\\frac{2}{3}\\right)^{-2}=\\left(\\frac{3}{2}\\right)^{2}=\\frac{9}{4}$'],
  ['Sederhanakan $\\frac{a^{4}b^{-3}}{a^{-2}b}$.', '$a^{4-(-2)}b^{-3-1}=a^{6}b^{-4}=\\frac{a^{6}}{b^{4}}$'],
  ['Hitung $8^{\\frac{2}{3}}×4^{-\\frac{1}{2}}$.', '$8^{\\frac{2}{3}}=4$ dan $4^{-\\frac{1}{2}}=\\frac{1}{2}$, sehingga hasilnya $4×\\frac{1}{2}=2$'],
], [3800, 5838], { size: 20 }));
add(h2('6. Kartu Bantu “Tangga Pangkat” (untuk peserta didik yang memerlukan pendampingan)'));
add(tbl(['Eksponen', '4', '3', '2', '1', '0', '$-1$', '$-2$'], [
  ['Basis 2', '16', '8', '4', '2', '1', '$\\frac{1}{2}$', '$\\frac{1}{4}$'],
  ['Basis 3', '81', '27', '9', '3', '1', '$\\frac{1}{3}$', '$\\frac{1}{9}$'],
  ['Basis 5', '625', '125', '25', '5', '1', '$\\frac{1}{5}$', '$\\frac{1}{25}$'],
  ['Basis 10', '10.000', '1.000', '100', '10', '1', '$\\frac{1}{10}$', '$\\frac{1}{100}$'],
], [1500, 1300, 1200, 1100, 1100, 1100, 1100, 1238], { size: 19, firstColBold: true, center: [1, 2, 3, 4, 5, 6, 7] }));

// =========================================================================
// LAMPIRAN 7 – GLOSARIUM & PUSTAKA
// =========================================================================
add(h1('LAMPIRAN 7. GLOSARIUM DAN DAFTAR PUSTAKA'));
add(h2('Glosarium'));
add(tbl(['Istilah', 'Arti'], [
  ['Basis (bilangan pokok)', 'Bilangan yang dipangkatkan pada $a^{n}$, yaitu $a$.'],
  ['Eksponen (pangkat)', 'Bilangan yang menyatakan banyaknya faktor basis yang dikalikan, yaitu $n$ pada $a^{n}$.'],
  ['Pangkat rasional', 'Pangkat berbentuk pecahan $\\frac{m}{n}$ yang berkaitan dengan akar pangkat $n$.'],
  ['Bentuk baku (notasi ilmiah)', 'Penulisan bilangan sebagai $a×10^{n}$ dengan $1≤a<10$ dan $n$ bilangan bulat.'],
  ['Pembelahan biner', 'Pembelahan satu sel menjadi dua sel, dipakai sebagai konteks pertumbuhan berlipat ganda.'],
  ['Waktu paruh', 'Waktu yang diperlukan sehingga jumlah suatu zat tinggal separuh dari jumlah semula.'],
  ['Skala logaritmik', 'Skala dengan setiap satu langkah menunjukkan perkalian 10 kali (pangkat 10), dipakai pada Gambar 4.'],
  ['Pembelajaran mendalam', 'Pendekatan pembelajaran yang berkesadaran, bermakna, dan menggembirakan melalui pengalaman memahami, mengaplikasi, dan merefleksi.'],
], [3000, 6638], { size: 20, firstColBold: true }));
add(h2('Daftar Pustaka'));
add(...numbered([
  'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. Buku Teks Matematika Kelas X (Kurikulum Merdeka). Jakarta: Pusat Perbukuan. Tersedia pada buku.kemdikbud.go.id.',
  'Kementerian Pendidikan Dasar dan Menengah. Capaian Pembelajaran Mata Pelajaran Matematika Fase E. Tersedia pada guru.kemendikdasmen.go.id.',
  'Kementerian Pendidikan Dasar dan Menengah. Panduan Pembelajaran Mendalam (Deep Learning) (gunakan edisi yang berlaku di satuan pendidikan).',
  'Nilai ukuran benda pada Gambar 4 dan LKPD 3 merupakan pembulatan perkiraan untuk tujuan pembelajaran; guru dapat memverifikasinya dengan sumber sains resmi.',
]));
add(sp(120));
add(box('Catatan Penyusun', 'Modul ini adalah contoh yang dapat disesuaikan dengan kondisi kelas, ketersediaan waktu, dan kebijakan satuan pendidikan (nama sekolah, tahun pelajaran, KKTP, dan bobot penilaian). Nilai-nilai dan jawaban pada kunci telah diperiksa, namun tetap disarankan guru mencoba mengerjakan LKPD terlebih dahulu sebelum digunakan di kelas.', { fill: 'FFF8E1', line: 'E0A800' }));

module.exports = out;
