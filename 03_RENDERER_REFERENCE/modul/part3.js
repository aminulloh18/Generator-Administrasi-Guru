const L = require('./lib');
const { P, J, h1, h2, h3, pb, sp, bullets, numbered, tbl, box, fig, lines, LKPD_FILL } = L;
const out = [];
const add = (...x) => x.flat().forEach(e => out.push(e));
const B = '……';          // isian pendek
const BL = '………………';   // isian sedang

function lkpdHead(no, judul, sub, pert, tujuan) {
  add(pb(), h1(`LAMPIRAN ${no}. LKPD ${no} – ${judul}`));
  add(P(sub, { italics: true, after: 80 }));
  add(tbl(null, [
    ['Kelompok / Kelas', ': …………………… / ………', 'Tanggal', ': ……………………………'],
    ['Anggota 1 (Pemimpin)', ': …………………………', 'Anggota 2 (Pencatat)', ': ……………………………'],
    ['Anggota 3 (Penghitung)', ': …………………………', 'Anggota 4 (Juru bicara)', ': ……………………………'],
  ], [2200, 2700, 2100, 2638], { size: 19, border: 'FFFFFF', firstColBold: true }));
  add(sp(60));
  add(box('Tujuan Pembelajaran', tujuan, { fill: 'EEF4FB' }));
  add(sp(40));
}
const petunjuk = (...x) => box('Petunjuk', x.map(t => '- ' + t).join('\n'), { fill: LKPD_FILL, line: 'E0A800' });
const kegiatan = (t, tahap) => [h2(t), P(`**Tahap Pembelajaran Mendalam: ${tahap}**`, { size: 19, color: '666666', after: 60 })];

// =========================================================================
// LKPD 1
// =========================================================================
lkpdHead(1, 'BERLIPAT GANDA', 'Makna bilangan berpangkat bulat positif, nol, dan negatif (Pertemuan 1)', 1,
  'Melalui pengamatan pola pembelahan bakteri dan “tangga pangkat”, aku mampu **menjelaskan** makna bilangan berpangkat bulat positif, nol, dan negatif serta **menemukan** bentuk umumnya (TP 1).');
add(petunjuk(
  'Kerjakan bersama kelompok. Gunakan peran yang sudah dibagi; pencatat menuliskan hasil kesepakatan kelompok.',
  'Isilah titik-titik (……) dan kotak yang tersedia. Tuliskan **alasan** setiap jawabanmu, bukan hanya hasil akhirnya.',
  'Kalkulator ilmiah boleh dipakai pada Kegiatan 3.',
  'Jika menemukan hal yang menurutmu janggal, catat sebagai pertanyaan dan sampaikan kepada guru.'));
add(sp(60));
add(box('Cerita Pembuka', 'Di laboratorium sekolah, seorang peneliti mengamati sebuah bakteri yang membelah diri menjadi dua setiap 20 menit. Peneliti ingin menuliskan banyaknya bakteri pada setiap waktu dengan cara yang **singkat dan rapi**. Bisakah kamu membantunya?', { fill: 'F3E8FF', line: '7B1FA2' }));

// ---- Kegiatan 1
add(...kegiatan('Kegiatan 1 – Mengamati Pembelahan Bakteri', 'Memahami'));
add(fig('bakteri', 430, 'Gambar 1. Pembelahan bakteri setiap 20 menit'));
add(P('**Lengkapi tabel berikut berdasarkan Gambar 1.** Dua baris pertama sudah diisi sebagai contoh.', { keepNext: true }));
add(tbl(['Pembelahan ke-$n$', 'Waktu (menit)', 'Banyak bakteri', 'Perkalian berulang', 'Bentuk pangkat'], [
  ['1', '20', '2', '$2$', '$2^{1}$'],
  ['2', '40', '4', '$2×2$', '$2^{2}$'],
  ['3', B, B, B, B],
  ['4', B, B, B, B],
  ['5', B, B, B, B],
  ['10', B, '…… (gunakan kalkulator)', '……  faktor 2', B],
  ['$n$', B, B, '……  faktor 2', B],
], [1600, 1500, 2100, 2338, 2100], { size: 20, center: [0, 1, 2, 3, 4] }));
add(sp(60));
add(box('Ingat!', 'Bentuk $a^{n}$ dibaca “$a$ pangkat $n$” dan berarti $a×a×…×a$ sebanyak $n$ faktor. Bilangan $a$ disebut **basis** (bilangan pokok), sedangkan $n$ disebut **eksponen** (pangkat).', { fill: 'E8F5E9', line: '2E7D32' }));
add(sp(60));
add(...numbered([
  'Hubungan antara pembelahan ke-$n$ dan banyak bakteri adalah ……………………………………………………',
  'Rumus banyak bakteri setelah $n$ kali pembelahan: $N=$ ……………',
  'Pada $2^{5}$: basis = ……, eksponen = ……, nilainya = ……',
  'Mengapa menulis $2^{10}$ lebih praktis daripada menulis $2×2×2×2×2×2×2×2×2×2$? Jelaskan dengan kata-katamu sendiri.',
]));
add(...lines(2));

// ---- Kegiatan 2
add(...kegiatan('Kegiatan 2 – Tangga Pangkat', 'Memahami'));
add(P('Bagaimana jika eksponennya **nol** atau **negatif**? Mari menyelidikinya dengan menuruni “tangga pangkat” di bawah ini.', { keepNext: true }));
add(fig('tangga', 330, 'Gambar 2. Tangga pangkat dengan basis 2'));
add(P('**a. Lengkapi dua tangga berikut** (setiap turun satu anak tangga, nilai dibagi basisnya).', { keepNext: true }));
add(tbl(['Basis 2', 'Nilai', 'Basis 3', 'Nilai'], [
  ['$2^{4}$', '16', '$3^{3}$', '27'],
  ['$2^{3}$', '8', '$3^{2}$', '9'],
  ['$2^{2}$', '4', '$3^{1}$', '3'],
  ['$2^{1}$', '2', '$3^{0}$', B],
  ['$2^{0}$', B, '$3^{-1}$', B],
  ['$2^{-1}$', B, '$3^{-2}$', B],
  ['$2^{-2}$', B, '$3^{-3}$', B],
  ['$2^{-3}$', B, '', ''],
], [2200, 2400, 2200, 2838], { size: 20, center: [0, 1, 2, 3] }));
add(sp(60));
add(...numbered([
  'Pola apa yang kamu lihat pada nilai ketika eksponen turun 1? ………………………………………………',
  'Dugaanku: $a^{0}=$ ……  (dengan syarat $a≠0$). Contoh bukti dari tabel: …………………………………',
  'Bandingkan $2^{-2}$ dengan $\\frac{1}{2^{2}}$ dan $3^{-2}$ dengan $\\frac{1}{3^{2}}$. Dugaanku: $a^{-n}=$ ……………',
  '**Berpikir kritis:** Mengapa pada $a^{0}$ dan $a^{-n}$ basis $a$ tidak boleh sama dengan 0? (Petunjuk: apa yang terjadi pada $\\frac{1}{0^{n}}$?)',
  '**Berpikir kritis:** Misalkan sekarang ada 1 bakteri ($n=0$). Secara matematis, 20 menit yang lalu ($n=-1$) ada $2^{-1}=\\frac{1}{2}$ bakteri. Apakah hasil ini masuk akal secara biologis? Apa pelajaran yang kamu dapat tentang model matematika?',
]));
add(...lines(3));

// ---- Kegiatan 3
add(...kegiatan('Kegiatan 3 – Tantangan Lipat Kertas', 'Mengaplikasi'));
add(box('Masalah', 'Selembar kertas HVS setebal $0{,}1$ mm dilipat dua berulang-ulang. Setiap lipatan **menggandakan** tebal tumpukan. Setelah $n$ kali lipatan, tebal tumpukan adalah $0{,}1×2^{n}$ mm.', { fill: 'FFF8E1', line: 'E0A800' }));
add(sp(60));
add(P('**Tebakan awalku:** setelah 20 lipatan tebalnya sekitar …………  m; setelah 42 lipatan sekitar …………  m.', { keepNext: true }));
add(P('**a. Lengkapi tabel dengan kalkulator.**', { keepNext: true }));
add(tbl(['Banyak lipatan $n$', 'Tebal (mm)', 'Tebal (meter)', 'Perbandingan'], [
  ['0', '0,1', '0,0001', 'Setipis kertas'],
  ['5', B, B, ''],
  ['10', B, B, 'Setebal / setinggi …… (sebutkan benda)'],
  ['15', B, B, ''],
  ['20', B, B, 'Bandingkan dengan Tugu Monas (±132 m)'],
], [2000, 2100, 2200, 3338], { size: 20, center: [0, 1, 2] }));
add(sp(60));
add(...numbered([
  'Pada lipatan ke-20, tebal tumpukan kertas sekitar ……  m. Apakah tebakanku tadi mendekati? ……………',
  '**Tantangan:** Jarak Bumi–Bulan sekitar $3{,}84×10^{8}$ meter. Tebal dalam meter setelah $n$ lipatan adalah $0{,}0001×2^{n}$. Coba $n=40$, $n=41$, dan $n=42$. Banyak lipatan paling sedikit agar tumpukan melampaui jarak Bumi–Bulan adalah …… lipatan. (Tuliskan hasil percobaanmu di bawah.)',
  'Dalam kenyataan, kertas tidak dapat dilipat sampai puluhan kali. Mengapa menurutmu? Apa perbedaan antara “model matematika” dan “kenyataan”?',
]));
add(...lines(3));

// ---- Kegiatan 4
add(...kegiatan('Kegiatan 4 – Detektif Kesalahan dan Penerapan', 'Mengaplikasi'));
add(P('**a. Detektif kesalahan.** Periksa pernyataan teman-temanmu. Tulis **Benar** atau **Salah**, lalu perbaiki disertai alasan.', { keepNext: true }));
add(tbl(['Pernyataan', 'Benar / Salah', 'Perbaikan dan alasan'], [
  ['Andi: $-3^{2}=9$', B, ''],
  ['Sari: $(-2)^{4}=-16$', B, ''],
  ['Dimas: $2^{-3}=-8$', B, ''],
  ['Rina: $7^{0}=0$', B, ''],
  ['Budi: $\\left(\\frac{2}{3}\\right)^{-2}=\\frac{4}{9}$', B, ''],
], [3200, 1700, 4738], { size: 20, center: [1] }));
add(sp(60));
add(P('**b. Hitung** (tuliskan langkahnya): $(-3)^{3}=$ ……;  $4^{-2}=$ ……;  $\\left(\\frac{1}{2}\\right)^{-3}=$ ……;  $10^{-3}=$ …… (dalam pecahan dan desimal).'));
add(P('**c. Soal cerita – Pesan berantai.** Seorang siswa mengirim pesan kepada 3 temannya (putaran 1). Setiap penerima meneruskannya kepada 3 teman **baru** yang belum menerima (putaran 2), dan seterusnya.', { keepNext: true }));
add(...numbered([
  'Banyak penerima baru pada putaran ke-$n$ dapat ditulis ……  Pada putaran ke-2 ada …… orang, putaran ke-3 ada …… orang.',
  'Banyak penerima baru pada putaran ke-6 adalah ……  orang.',
  '**Tantangan:** Total orang yang sudah menerima pesan setelah 4 putaran adalah …… orang.',
]));
add(...lines(2));

// ---- Kegiatan 5
add(...kegiatan('Kegiatan 5 – Refleksi Diri', 'Merefleksi'));
add(tbl(['Jurnal Refleksi 3-2-1', 'Jawabanku'], [
  ['**3** hal yang sudah aku pahami hari ini', '1. ………………………………………………\n2. ………………………………………………\n3. ………………………………………………'],
  ['**2** hal yang masih membingungkan', '1. ………………………………………………\n2. ………………………………………………'],
  ['**1** perasaan atau pertanyaan yang ingin aku sampaikan', '………………………………………………………………'],
  ['Tebakanku vs kenyataan', 'Tebakan awalku ………  vs hasil perhitungan ………  Pelajaran yang kudapat: ………………………………'],
], [3400, 6238], { size: 20, firstColBold: true }));
add(sp(60));
add(P('**Seberapa paham aku?** (lingkari)    1 = belum paham    2 = sedikit paham    3 = paham    4 = sangat paham dan bisa mengajarkan', { size: 20 }));

// =========================================================================
// LKPD 2
// =========================================================================
lkpdHead(2, 'DETEKTIF SIFAT EKSPONEN', 'Menemukan dan menguji sifat-sifat operasi bilangan berpangkat serta pangkat rasional (Pertemuan 2)', 2,
  'Melalui pengamatan pola dan diskusi, aku mampu **menggeneralisasi** sifat-sifat operasi bilangan berpangkat serta **menghubungkannya** dengan pangkat rasional (bentuk akar) (TP 2).');
add(petunjuk(
  'Setiap anggota menjadi **pakar** satu kegiatan: Pakar 1 = Kegiatan 1, Pakar 2 = Kegiatan 2, Pakar 3 = Kegiatan 3, Pakar 4 = Kegiatan 4 (±8 menit).',
  'Setelah selesai, setiap pakar **mengajarkan** temuannya kepada teman satu kelompok, lalu semua mengisi bagian Rangkuman Sifat bersama-sama.',
  'Setiap dugaan harus **diuji** dengan satu contoh angka lain sebelum dinyatakan sebagai sifat.',
  'Gunakan alasan: “karena …” pada setiap kesimpulan.'));
add(sp(60));
add(box('Misi Detektif', 'Kamu adalah detektif matematika. Ada “aturan rahasia” di balik operasi bilangan berpangkat. Tugasmu: **mengungkap aturan itu dengan bukti**, bukan menghafalnya.', { fill: 'F3E8FF', line: '7B1FA2' }));

add(...kegiatan('Kegiatan 1 (Pakar 1) – Misteri Perkalian Bilangan Berpangkat', 'Memahami'));
add(tbl(['Soal', 'Dijabarkan', 'Hasil (pangkat)', 'Pola eksponen'], [
  ['$2^{3}×2^{2}$', '$(2×2×2)×(2×2)$', '$2^{5}$', '$3+2=5$'],
  ['$3^{2}×3^{4}$', B, B, B],
  ['$5^{1}×5^{3}$', B, B, B],
  ['$a^{3}×a^{4}$', B, B, B],
  ['$a^{m}×a^{n}$', '–', B, B],
], [2200, 3000, 2200, 2238], { size: 20, center: [0, 1, 2, 3] }));
add(sp(40));
add(P('**Dugaanku:** $a^{m}×a^{n}=$ ……………'));
add(P('**Ujiku:** (i) $10^{2}×10^{3}$: hitung langsung = ……  dan memakai dugaanku = ……  (ii) $2^{5}×2^{-2}$: hitung langsung = ……  dan memakai dugaanku = ……  Dugaanku berlaku? ………'));

add(...kegiatan('Kegiatan 2 (Pakar 2) – Misteri Pembagian Bilangan Berpangkat', 'Memahami'));
add(tbl(['Soal', 'Dijabarkan', 'Hasil (pangkat)', 'Pola eksponen'], [
  ['$2^{5}÷2^{2}$', '$\\frac{2×2×2×2×2}{2×2}$', '$2^{3}$', '$5-2=3$'],
  ['$5^{6}÷5^{4}$', B, B, B],
  ['$a^{7}÷a^{3}$', B, B, B],
  ['$\\frac{a^{m}}{a^{n}}$', '–', B, B],
], [2200, 3000, 2200, 2238], { size: 20, center: [0, 1, 2, 3] }));
add(sp(40));
add(P('**Dugaanku:** $\\frac{a^{m}}{a^{n}}=$ ……………  (syarat $a≠0$)'));
add(P('**Mengapa konsisten dengan $a^{0}=1$?** Hitung $\\frac{2^{3}}{2^{3}}$ dengan dua cara: (i) hasilnya = ……  (ii) memakai dugaanku = $2^{…}$ = ……  Kesimpulan: ………………'));
add(P('**Ujiku:** $\\frac{3^{2}}{3^{5}}$: memakai dugaanku = ……  dan hitung langsung ($\\frac{9}{243}$ disederhanakan) = ……'));

add(...kegiatan('Kegiatan 3 (Pakar 3) – Misteri Pangkat dari Pangkat', 'Memahami'));
add(tbl(['Soal', 'Dijabarkan', 'Hasil (pangkat)', 'Pola eksponen'], [
  ['$(2^{3})^{2}$', '$2^{3}×2^{3}=2^{3+3}$', '$2^{6}$', '$3×2=6$'],
  ['$(3^{2})^{3}$', B, B, B],
  ['$(5^{2})^{2}$', B, B, B],
  ['$(a^{m})^{n}$', '–', B, B],
], [2200, 3000, 2200, 2238], { size: 20, center: [0, 1, 2, 3] }));
add(sp(40));
add(P('**Dugaanku:** $(a^{m})^{n}=$ ……………'));
add(P('**Ujiku:** $(2^{-1})^{3}$: memakai dugaanku = ……  dan hitung langsung $\\left(\\frac{1}{2}\\right)^{3}$ = ……'));

add(...kegiatan('Kegiatan 4 (Pakar 4) – Misteri Pangkat dari Perkalian dan Pembagian', 'Memahami'));
add(tbl(['Soal', 'Hitung langsung', 'Dijabarkan per faktor', 'Sama?'], [
  ['$(2×3)^{2}$', '$6^{2}=36$', '$2^{2}×3^{2}=4×9=36$', 'Ya'],
  ['$(2×5)^{3}$', B, B, B],
  ['$\\left(\\frac{2}{5}\\right)^{3}$', '$\\frac{8}{125}$', '$\\frac{2^{3}}{5^{3}}=$ ……', B],
  ['$\\left(\\frac{3}{4}\\right)^{2}$', B, B, B],
], [2200, 2200, 3000, 2238], { size: 20, center: [0, 1, 2, 3] }));
add(sp(40));
add(P('**Dugaanku:** $(ab)^{n}=$ ……………  dan  $\\left(\\frac{a}{b}\\right)^{n}=$ ……………  (syarat $b≠0$)'));
add(P('**Ujiku:** $(4×0{,}5)^{2}$: hitung langsung = ……  dan memakai dugaanku = ……'));

add(h2('Berbagi Temuan – Rangkuman Sifat Eksponen'));
add(P('Setelah semua pakar mengajarkan temuannya, lengkapi tabel berikut bersama kelompokmu.', { keepNext: true }));
add(tbl(['No', 'Sifat', 'Bentuk umum (tulis!)', 'Contoh milik kelompok'], [
  ['1', 'Perkalian', B, B],
  ['2', 'Pembagian', B, B],
  ['3', 'Pangkat dari pangkat', B, B],
  ['4', 'Pangkat dari perkalian', B, B],
  ['5', 'Pangkat dari pembagian', B, B],
  ['6', 'Pangkat nol', B, B],
  ['7', 'Pangkat negatif', B, B],
], [600, 2800, 3200, 3038], { size: 20, center: [0] }));

add(...kegiatan('Kegiatan 5 – Pangkat Rasional: Dari Kubus ke Akar', 'Memahami'));
add(fig('kubus', 400, 'Gambar 3. Rusuk kubus jika volumenya diketahui'));
add(...numbered([
  'Kubus pertama bervolume $8$ cm³. Panjang rusuknya $s$ memenuhi $s×s×s=8$, sehingga $s=$ …… cm. Kubus kedua bervolume $27$ cm³, sehingga $s=$ …… cm.',
  'Volume kubus $V=s^{3}$. Misalkan rusuknya dapat ditulis $s=V^{x}$. Maka $(V^{x})^{3}=V^{…}$. Karena $s^{3}=V^{1}$, maka $3x=$ ……, sehingga $x=$ ……',
  'Jadi $8^{\\frac{1}{3}}=$ ……  dan  $27^{\\frac{1}{3}}=$ ……  (bandingkan dengan $\\sqrt[3]{8}$ dan $\\sqrt[3]{27}$).',
  'Persegi dengan luas $49$ cm² memiliki sisi $49^{x}$ dengan $(49^{x})^{2}=49$, sehingga $x=$ …… dan $49^{\\frac{1}{2}}=$ ……',
  'Kesimpulan: $a^{\\frac{1}{n}}=$ ……  dan $a^{\\frac{m}{n}}=$ ……  (tulis dalam bentuk akar).',
]));
add(P('**Latihan:** hitung  $16^{\\frac{1}{2}}=$ ……;  $64^{\\frac{1}{3}}=$ ……;  $16^{\\frac{3}{4}}=$ ……;  $27^{\\frac{2}{3}}=$ ……;  $8^{-\\frac{2}{3}}=$ ……'));

add(...kegiatan('Kegiatan 6 – Menerapkan Sifat Eksponen', 'Mengaplikasi'));
add(P('**a. Sederhanakan** (tuliskan langkah dan sifat yang dipakai; hasil dengan pangkat positif).', { keepNext: true }));
add(tbl(['Soal', 'Langkah penyelesaian', 'Hasil'], [
  ['1. $2^{5}×2^{-2}÷2^{4}$', '', B],
  ['2. $(3^{2}×3^{-1})^{3}$', '', B],
  ['3. $(2x^{3}y^{-2})^{2}$', '', B],
  ['4. $\\frac{x^{5}y^{-3}}{x^{2}y^{-5}}$', '', B],
], [2800, 4800, 2038], { size: 20 }));
add(sp(60));
add(box('Tantangan Kelompok 1', 'Mana yang lebih besar: $2^{100}$ atau $3^{60}$? Petunjuk: samakan eksponennya. $2^{100}=(2^{5})^{…}=…^{…}$  dan  $3^{60}=(3^{3})^{…}=…^{…}$. Karena …… > ……, maka ……………', { fill: 'FFF8E1', line: 'E0A800' }));
add(sp(40));

add(...kegiatan('Kegiatan 7 – Detektif Kesalahan Tingkat Lanjut', 'Mengaplikasi'));
add(tbl(['No', 'Pernyataan', 'Benar/Salah', 'Perbaikan dan alasan'], [
  ['1', '$(2^{3})^{2}=2^{5}$', B, ''],
  ['2', '$2^{3}×3^{2}=6^{5}$', B, ''],
  ['3', '$2^{3}+2^{2}=2^{5}$', B, ''],
  ['4', '$\\frac{x^{6}}{x^{2}}=x^{3}$', B, ''],
  ['5', '$(2a)^{3}=2a^{3}$', B, ''],
], [600, 3000, 1500, 4538], { size: 20, center: [0, 2] }));
add(sp(60));
add(P('**Tukar soal:** tuliskan satu soal buatan kelompokmu yang jawabannya $2^{-2}$ (atau $\\frac{1}{4}$): ………………………………………………   Soal ini dikerjakan oleh kelompok ……  dan hasilnya (benar / perlu diperbaiki): ……'));

add(...kegiatan('Kegiatan 8 – Refleksi dan Peta Konsep', 'Merefleksi'));
add(tbl(['Refleksi', 'Jawabanku'], [
  ['Tuliskan rangkuman sifat eksponen dengan **kata-katamu sendiri** (boleh berupa peta konsep sederhana)', '\n\n\n'],
  ['Sifat yang paling sulit bagiku adalah …… karena ……', ''],
  ['Strategi yang akan kulakukan agar lebih paham:', ''],
], [4200, 5438], { size: 20, firstColBold: true }));

// =========================================================================
// LKPD 3
// =========================================================================
lkpdHead(3, 'SKALA SEMESTA', 'Bentuk baku, operasi eksponen dalam konteks nyata, pertumbuhan–peluruhan, dan proyek mini (Pertemuan 3)', 3,
  'Melalui pemecahan masalah kontekstual dan proyek mini, aku mampu **menerapkan** sifat-sifat eksponen dan bentuk baku untuk menyelesaikan masalah pertumbuhan, peluruhan, dan perbandingan ukuran, serta **merefleksikan** strategiku (TP 3).');
add(petunjuk(
  'Kerjakan Kegiatan 1–3 bersama kelompok; Kegiatan 4 adalah proyek poster yang dikerjakan di kertas plano/karton.',
  'Nilai ukuran pada Gambar 4 adalah **perkiraan** yang sudah dibulatkan.',
  'Boleh memakai kalkulator ilmiah. Tuliskan langkah penyelesaianmu.'));
add(sp(60));
add(box('Cerita Pembuka', 'Seorang ilmuwan ingin menyusun “peta ukuran alam semesta” mulai dari sel tubuh sampai Matahari. Jika semua ukuran ditulis dengan angka biasa, tulisannya terlalu panjang dan sulit dibandingkan. Bantulah ilmuwan itu dengan **eksponen**!', { fill: 'F3E8FF', line: '7B1FA2' }));

add(...kegiatan('Kegiatan 1 – Bentuk Baku dan Skala Ukuran', 'Memahami'));
add(fig('skala', 520, 'Gambar 4. Skala ukuran berbagai benda (dalam meter, skala logaritmik)'));
add(box('Bentuk baku (notasi ilmiah)', 'Bentuk baku adalah  $a×10^{n}$  dengan  $1≤a<10$  dan  $n$  bilangan bulat.\nContoh: $6.370.000=6{,}37×10^{6}$  dan  $0{,}000007=7×10^{-6}$.', { fill: 'E8F5E9', line: '2E7D32' }));
add(sp(60));
add(P('**a. Ubah ke bentuk baku.**', { keepNext: true }));
add(tbl(['Bilangan biasa', 'Bentuk baku', 'Bilangan biasa', 'Bentuk baku'], [
  ['$450.000$', B, '$0{,}0032$', B],
  ['$72.000.000$', B, '$0{,}0000081$', B],
  ['$150.000.000.000$', B, '$0{,}00045$', B],
], [2400, 2419, 2400, 2419], { size: 20, center: [0, 1, 2, 3] }));
add(sp(60));
add(P('**b. Urutkan** benda pada Gambar 4 dari yang terkecil (1) sampai yang terbesar (8) dan tulis ukurannya.', { keepNext: true }));
add(tbl(['Benda', 'Ukuran (m), bentuk baku', 'Urutan ke-'], [
  ['Jari-jari Bumi', B, B],
  ['Sel darah merah', B, B],
  ['Jarak Bumi–Matahari', B, B],
  ['Tinggi manusia', B, B],
  ['Diameter rambut', B, B],
  ['Gunung Everest', B, B],
  ['Semut', B, B],
  ['Jarak Bumi–Bulan', B, B],
], [3600, 4000, 2038], { size: 20, center: [1, 2] }));
add(sp(60));
add(P('**c. Berapa kali lebih besar?** Gunakan sifat pembagian eksponen ($10^{m}÷10^{n}=10^{m-n}$).', { keepNext: true }));
add(...numbered([
  'Tinggi Gunung Everest dibandingkan tinggi manusia: $\\frac{8{,}8×10^{3}}{1{,}7×10^{0}}≈$ ……  kali.',
  'Jari-jari Bumi dibandingkan ukuran sel darah merah: $\\frac{6{,}4×10^{6}}{7×10^{-6}}≈$ ……  kali. (Tuliskan dalam bentuk baku.)',
]));
add(...lines(2));

add(...kegiatan('Kegiatan 2 – Operasi pada Bentuk Baku', 'Memahami'));
add(P('**Soal 1 – Waktu tempuh cahaya.** Kecepatan cahaya $3×10^{8}$ m/s. Waktu = jarak ÷ kecepatan.', { keepNext: true }));
add(tbl(['Lintasan', 'Jarak (m)', 'Perhitungan', 'Waktu'], [
  ['Matahari → Bumi', '$1{,}5×10^{11}$', '$\\frac{1{,}5×10^{11}}{3×10^{8}}=$ ……', '…… detik ≈ …… menit'],
  ['Bulan → Bumi', '$3{,}84×10^{8}$', B, '…… detik'],
], [2200, 2000, 3200, 2238], { size: 20, center: [1] }));
add(sp(60));
add(box('Soal 2 – Kapasitas penyimpanan', 'Dalam komputer: 1 KB $=2^{10}$ byte, 1 MB $=2^{20}$ byte, dan 1 GB $=2^{30}$ byte. Sebuah ponsel memiliki memori 64 GB. Jika seluruh memori dipakai untuk foto berukuran 4 MB, berapa banyak foto yang dapat disimpan?', { fill: 'EEF4FB' }));
add(sp(40));
add(P('Langkah: 64 GB $=2^{6}×2^{30}=2^{…}$ byte;  4 MB $=2^{2}×2^{20}=2^{…}$ byte;  banyak foto $=\\frac{2^{…}}{2^{…}}=2^{…}=$ ……  foto.'));
add(...lines(2));

add(...kegiatan('Kegiatan 3 – Pertumbuhan, Peluruhan, dan Grafik', 'Mengaplikasi'));
add(box('Model', '**Pertumbuhan** (menggandakan diri tiap $T$ satuan waktu): $N=N_{0}×2^{t/T}$.\n**Peluruhan** (waktu paruh $T$): $N=N_{0}×\\left(\\frac{1}{2}\\right)^{t/T}$.\n$N_{0}$ = jumlah awal, $t$ = waktu berlalu.', { fill: 'E8F5E9', line: '2E7D32' }));
add(sp(60));
add(...numbered([
  '**Bakteri.** Awalnya ada 500 bakteri dan jumlahnya menggandakan diri setiap 3 jam. Banyak bakteri setelah 12 jam: $N=500×2^{…}=$ ……; setelah 18 jam: $N=$ ……',
  '**Zat radioaktif.** Massa awal 80 gram dengan waktu paruh 5 hari. Massa sisa setelah 10 hari = …… gram; setelah 20 hari: $N=80×\\left(\\frac{1}{2}\\right)^{…}=$ …… gram.',
]));
add(fig('grafik', 360, 'Gambar 5. Grafik fungsi $y=2^{x}$'));
add(...numbered([
  'Dari grafik, nilai $2^{3}=$ ……  dan $2^{-2}=$ ……  (bandingkan dengan perhitunganmu).',
  'Perkirakan $2^{2{,}5}$ dari grafik: ……  Hitung: $2^{2{,}5}=2^{2}×2^{\\frac{1}{2}}=4\\sqrt{2}≈$ ……',
  '**Berpikir kritis:** Apa yang terjadi pada nilai $2^{x}$ ketika $x$ semakin negatif? Apakah nilainya pernah mencapai 0 atau menjadi negatif? Jelaskan.',
]));
add(...lines(2));

add(...kegiatan('Kegiatan 4 – Proyek Mini “Skala Semesta”', 'Mengaplikasi'));
add(box('Misi Kelompok (20 menit)', [
  '- Pilih **6 objek** (boleh dari Gambar 4 atau ukuran lain yang kamu cari/ukur, mis. tinggi badan, panjang pulpen, tinggi gedung sekolah).',
  '- Tuliskan ukuran setiap objek dalam **bentuk baku** dan urutkan dari terkecil.',
  '- Buat **2–3 perbandingan** “berapa kali lebih besar” dengan penalaran eksponen.',
  '- Sajikan sebagai **poster/infografik** (atau video 60 detik/penjelasan lisan). Beri judul yang menarik dan satu ilustrasi.',
  '- Tulis nama semua anggota pada poster. Setelah selesai, lakukan **gallery walk**: beri 1 pujian dan 1 saran pada sticky note.',
].join('\n'), { fill: LKPD_FILL, line: 'E0A800' }));
add(sp(60));
add(P('**Perencanaan kelompok:**', { keepNext: true }));
add(tbl(['No', 'Objek', 'Ukuran (m), bentuk baku', 'Sumber data / cara memperoleh'], [
  ['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', ''], ['5', '', '', ''], ['6', '', '', ''],
], [600, 3000, 3000, 3038], { size: 20, center: [0] }));
add(sp(60));
add(P('**Perbandingan yang kami buat:**  (1) ……………………………………   (2) ……………………………………   (3) ……………………………………'));
add(P('**Checklist:**  ☐ semua ukuran dalam bentuk baku   ☐ urutan benar   ☐ minimal 2 perbandingan dengan penalaran   ☐ ada ilustrasi   ☐ semua anggota menjelaskan', { size: 20 }));

add(...kegiatan('Kegiatan 5 – Refleksi Akhir Unit', 'Merefleksi'));
add(tbl(['Pertanyaan Refleksi', 'Jawabanku'], [
  ['Hal yang paling bermakna bagiku dari unit Eksponen:', '\n'],
  ['Strategi belajar yang paling membantuku (mis. tangga pangkat, detektif kesalahan, diskusi):', '\n'],
  ['Bagian yang masih sulit bagiku dan rencana perbaikanku:', '\n'],
  ['Di mana aku menemukan eksponen/pangkat dalam kehidupan sehari-hari atau ciptaan Tuhan? Apa yang kusyukuri dari keteraturannya?', '\n'],
], [4200, 5438], { size: 20, firstColBold: true }));

module.exports = out;
