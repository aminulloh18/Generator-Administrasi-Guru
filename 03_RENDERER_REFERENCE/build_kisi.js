const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageOrientation,
} = require('docx');

const FONT = 'Times New Roman';
const T = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 20, bold: o.bold, italics: o.italics, underline: o.underline });
const P = (children, o = {}) => new Paragraph({ children, spacing: { after: 20 }, ...o });
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noB = { top: none, bottom: none, left: none, right: none };
const bd = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const B = { top: bd, bottom: bd, left: bd, right: bd };

// ---------- DATA ----------
const CP_BIL = 'Pada akhir Fase E, peserta didik dapat menggeneralisasi sifat-sifat operasi bilangan berpangkat (eksponen) dan logaritma.';
const CP_ALJ = 'Pada akhir Fase E, peserta didik dapat menyelesaikan masalah yang berkaitan dengan sistem persamaan linear tiga variabel, persamaan dan fungsi kuadrat (termasuk akar imajiner), dan persamaan eksponensial (berbasis sama).';

const groups = [
  { cp: ['Elemen Bilangan', CP_BIL], items: [
    { materi: 'Eksponen (Bilangan Berpangkat)',
      tp: 'Peserta didik mampu menggeneralisasi sifat-sifat operasi bilangan berpangkat (bulat dan rasional) serta menerapkannya untuk menyelesaikan masalah.',
      rows: [
        [1, 'Disajikan perkalian dua bilangan berpangkat dengan basis sama, peserta didik dapat menentukan hasilnya dengan sifat perkalian eksponen.', 'C2 (Memahami)'],
        [2, 'Disajikan bentuk pecahan berpangkat negatif yang dijumlahkan dengan bilangan berpangkat, peserta didik dapat menghitung nilainya dengan tepat.', 'C3 (Menerapkan)'],
        [3, 'Disajikan tiga bilangan berpangkat dengan basis dan pangkat berbeda, peserta didik dapat membandingkan nilainya dan mengurutkannya dari terkecil ke terbesar.', 'C4 (Menganalisis)'],
        [4, 'Disajikan bentuk operasi bilangan berpangkat pecahan, pangkat negatif, dan akar, peserta didik dapat menyederhanakannya.', 'C3 (Menerapkan)'],
        [5, 'Disajikan masalah kontekstual tentang luas prosesor dan jumlah transistor, peserta didik dapat menentukan luas tiap transistor dalam bentuk baku.', 'C3 (Menerapkan)'],
      ] },
    { materi: 'Bentuk Akar',
      tp: 'Peserta didik mampu melakukan operasi aljabar pada bentuk akar, termasuk merasionalkan penyebut, serta menerapkannya dalam masalah kontekstual.',
      rows: [
        [6, 'Disajikan penjumlahan dan pengurangan beberapa bentuk akar, peserta didik dapat menyederhanakannya.', 'C3 (Menerapkan)'],
        [7, 'Disajikan perkalian dua bentuk akar sekawan, peserta didik dapat menentukan hasil sederhananya.', 'C3 (Menerapkan)'],
        [8, 'Disajikan pecahan dengan penyebut bentuk akar, peserta didik dapat merasionalkan penyebut dan menyederhanakannya.', 'C3 (Menerapkan)'],
        [9, 'Disajikan luas dan lebar persegi panjang dalam bentuk akar, peserta didik dapat menentukan keliling persegi panjang tersebut.', 'C4 (Menganalisis)'],
      ] },
    { materi: 'Logaritma',
      tp: 'Peserta didik mampu menggunakan sifat-sifat logaritma untuk menyederhanakan dan menentukan nilai bentuk logaritma serta menyelesaikan persamaan logaritma sederhana.',
      rows: [
        [10, 'Diberikan nilai log 2 dan log 3, peserta didik dapat menentukan nilai log suatu bilangan dengan sifat-sifat logaritma.', 'C3 (Menerapkan)'],
        [11, 'Diberikan nilai dua logaritma berbasis 2 dalam bentuk variabel, peserta didik dapat menyatakan logaritma bilangan lain dalam variabel tersebut.', 'C3 (Menerapkan)'],
        [13, 'Disajikan persamaan logaritma berbasis 2, peserta didik dapat menentukan himpunan penyelesaiannya dengan memperhatikan syarat numerus.', 'C4 (Menganalisis)'],
      ] },
  ] },
  { cp: ['Elemen Aljabar dan Fungsi', CP_ALJ], items: [
    { materi: 'Persamaan Eksponen',
      tp: 'Peserta didik mampu menyelesaikan persamaan eksponensial berbasis sama.',
      rows: [
        [12, 'Disajikan persamaan eksponen dengan basis yang dapat disamakan, peserta didik dapat menentukan nilai variabel yang memenuhi.', 'C3 (Menerapkan)'],
      ] },
    { materi: 'Persamaan Kuadrat',
      tp: 'Peserta didik mampu menyelesaikan persamaan kuadrat dengan berbagai metode, menyusun persamaan kuadrat, dan menggunakan jumlah serta hasil kali akar-akarnya.',
      rows: [
        [14, 'Disajikan persamaan kuadrat, peserta didik dapat menentukan bentuk kuadrat sempurna hasil melengkapkan kuadrat.', 'C3 (Menerapkan)'],
        [15, 'Disajikan persamaan kuadrat, peserta didik dapat menentukan akar-akarnya dengan metode pemfaktoran.', 'C3 (Menerapkan)'],
        [16, 'Diketahui akar-akar persamaan kuadrat, peserta didik dapat menyusun persamaan kuadratnya.', 'C3 (Menerapkan)'],
        [17, 'Diketahui sebuah persamaan kuadrat, peserta didik dapat menyusun persamaan kuadrat baru yang akar-akarnya berhubungan dengan akar-akar persamaan semula.', 'C4 (Menganalisis)'],
        [18, 'Diketahui sebuah persamaan kuadrat, peserta didik dapat menentukan jumlah kuadrat akar-akarnya menggunakan jumlah dan hasil kali akar.', 'C3 (Menerapkan)'],
      ] },
    { materi: 'Fungsi Kuadrat',
      tp: 'Peserta didik mampu menentukan karakteristik fungsi kuadrat dan menyusun fungsi kuadrat dari grafik.',
      rows: [
        [19, 'Disajikan grafik fungsi kuadrat dengan titik puncak dan titik potong sumbu Y, peserta didik dapat menentukan hasil kali koefisien a, b, dan c.', 'C4 (Menganalisis)'],
        [20, 'Disajikan fungsi kuadrat dalam bentuk umum, peserta didik dapat menentukan koordinat titik balik grafiknya.', 'C3 (Menerapkan)'],
      ] },
    { materi: 'Sistem Persamaan Linear Tiga Variabel (SPLTV)',
      tp: 'Peserta didik mampu menjelaskan konsep SPLTV, menentukan penyelesaiannya dengan berbagai metode, dan menerapkannya dalam masalah kontekstual.',
      rows: [
        [21, 'Disajikan pernyataan tentang SPLTV, peserta didik dapat menyebutkan pangkat tertinggi variabel pada SPLTV.', 'C1 (Mengingat)'],
        [22, 'Disajikan beberapa bentuk persamaan, peserta didik dapat mengidentifikasi bentuk umum persamaan linear tiga variabel.', 'C1 (Mengingat)'],
        [23, 'Disajikan deskripsi langkah penyelesaian SPLTV, peserta didik dapat menyebutkan nama metode eliminasi.', 'C1 (Mengingat)'],
        [24, 'Disajikan SPLTV dalam bentuk simbolik, peserta didik dapat menentukan nilai x, y, dan z.', 'C3 (Menerapkan)'],
        [25, 'Disajikan gambar tiga paket cupcake beserta harganya, peserta didik dapat menyusun model SPLTV dan menentukan total harga pembelian.', 'C4 (Menganalisis)'],
      ] },
  ] },
];

// ---------- TABEL ----------
const W = [520, 2750, 2650, 1500, 4300, 1400, 1200, 1078]; // total 15398
const TOTAL = W.reduce((a, b) => a + b, 0);
const mk = (children, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders: B, rowSpan: o.rowSpan,
  verticalAlign: o.v || VerticalAlign.TOP, margins: { top: 25, bottom: 25, left: 80, right: 80 },
  shading: o.head ? { type: ShadingType.CLEAR, fill: 'D9E2F3', color: 'auto' } : undefined,
  children,
});
const txt = (t, o = {}) => [P([T(t, { size: 18, bold: o.bold })], { alignment: o.center ? AlignmentType.CENTER : AlignmentType.LEFT })];

const headers = ['No', 'Capaian Pembelajaran (CP)', 'Tujuan Pembelajaran (TP)', 'Materi Pokok', 'Indikator Soal', 'Level Kognitif', 'Bentuk Soal', 'No. Soal'];
const rows = [new TableRow({ tableHeader: true, cantSplit: true,
  children: headers.map((h, i) => mk(txt(h, { bold: true, center: true }), W[i], { head: true, v: VerticalAlign.CENTER })) })];
const numRow = new TableRow({ tableHeader: false, cantSplit: true,
  children: headers.map((_, i) => mk(txt(String(i + 1), { center: true }), W[i], { head: true })) });
rows.push(numRow);

let no = 0;
groups.forEach(g => {
  const gRows = g.items.reduce((a, it) => a + it.rows.length, 0);
  let firstOfGroup = true;
  g.items.forEach(it => {
    let firstOfItem = true;
    it.rows.forEach(([soal, indikator, level]) => {
      no++;
      const cells = [mk(txt(String(no), { center: true }), W[0])];
      if (firstOfGroup) cells.push(mk([
        P([T(g.cp[0], { size: 18, bold: true })]), P([T(g.cp[1], { size: 18 })], { alignment: AlignmentType.JUSTIFIED }),
      ], W[1], { rowSpan: gRows }));
      if (firstOfItem) {
        cells.push(mk(txt(it.tp), W[2], { rowSpan: it.rows.length }));
        cells.push(mk(txt(it.materi, { bold: true }), W[3], { rowSpan: it.rows.length }));
      }
      cells.push(mk(txt(indikator), W[4]));
      cells.push(mk(txt(level, { center: true }), W[5]));
      cells.push(mk(txt('Pilihan Ganda', { center: true }), W[6]));
      cells.push(mk(txt(String(soal), { center: true, bold: true }), W[7]));
      rows.push(new TableRow({ cantSplit: true, children: cells }));
      firstGroupDone();
      firstOfItem = false;
    });
  });
  function firstGroupDone() { firstOfGroup = false; }
});

const table = new Table({ width: { size: TOTAL, type: WidthType.DXA }, columnWidths: W, rows });

// ---------- IDENTITAS ----------
const idc = (t, w, bold) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noB,
  children: [P([T(t, { bold, size: 21 })])] });
const idRow = (a, b, c, d) => new TableRow({ children: [idc(a, 2400, true), idc(':', 300), idc(b, 4600), idc(c, 2900, true), idc(':', 300), idc(d, 4898)] });
const ident = new Table({
  width: { size: TOTAL, type: WidthType.DXA }, columnWidths: [2400, 300, 4600, 2900, 300, 4898], borders: { ...noB, insideHorizontal: none, insideVertical: none },
  rows: [
    idRow('Satuan Pendidikan', 'SMA Negeri 1 Bandung', 'Alokasi Waktu', '90 Menit'),
    idRow('Mata Pelajaran', 'Matematika', 'Jumlah dan Bentuk Soal', '25 butir, Pilihan Ganda (opsi A–E)'),
    idRow('Fase / Kelas', 'E / X', 'Jenis Asesmen', 'Penilaian Sumatif Akhir Semester (PSAS) Paket A'),
    idRow('Semester', '…………………………', 'Tahun Ajaran', '2025/2026'),
    idRow('Kurikulum', 'Kurikulum Merdeka', 'Penyusun', '…………………………………………'),
  ],
});

// ---------- TTD ----------
const sc = (a, b) => new TableCell({ width: { size: 7699, type: WidthType.DXA }, borders: noB, children: [
  P([T(a, { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
  P([T(b, { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 380 } }),
  P([T('....................................................', { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
  P([T('NIP. .................................................', { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
] });
const sign = new Table({ width: { size: TOTAL, type: WidthType.DXA }, columnWidths: [7699, 7699], borders: noB,
  rows: [new TableRow({ cantSplit: true, children: [sc('Mengetahui,', 'Kepala Sekolah / Waka Kurikulum'), sc('Bandung, ……………………………', 'Guru Mata Pelajaran, Matematika')] })] });

const doc = new Document({
  creator: 'Guru Matematika', title: 'Kisi-Kisi PSAS Matematika Kelas X Paket A',
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 560, bottom: 560, left: 720, right: 720 } } },
    children: [
      P([T('KISI-KISI PENILAIAN SUMATIF AKHIR SEMESTER (PSAS)', { bold: true, size: 28 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
      P([T('MATEMATIKA FASE E (KELAS X) – KURIKULUM MERDEKA', { bold: true, size: 24 })], { alignment: AlignmentType.CENTER, spacing: { after: 160 } }),
      ident, P([], { spacing: { after: 100 } }),
      table, P([], { spacing: { after: 60 } }), sign,
    ],
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync('Kisi-Kisi_PSAS_Matematika_X_Paket_A.docx', b); console.log('ok'); });
