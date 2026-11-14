const fs = require('fs');
const D = require('docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType, BorderStyle,
  WidthType, ShadingType, LevelFormat, ImportedXmlComponent, VerticalAlign, PageBreak,
} = D;
const { inline, block } = require('./omml');
const Q = require('./data');
const KEY = Q.KEY;

const FONT = 'Times New Roman';
const SZ = 22; // 11pt
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const noCellBorders = { top: none, bottom: none, left: none, right: none };

const mathXml = x => ImportedXmlComponent.fromXmlString(x);

// "teks $rumus$ teks" -> children paragraf
function rich(text, opts = {}) {
  const out = [];
  text.split('$').forEach((seg, idx) => {
    if (idx % 2 === 0) { if (seg) out.push(new TextRun({ text: seg, font: FONT, size: opts.size || SZ, bold: opts.bold })); }
    else out.push(mathXml(inline(seg)));
  });
  return out;
}
const P = (children, o = {}) => new Paragraph({ children, ...o });

const img = (file, w) => {
  const buf = fs.readFileSync(file);
  const dims = { logo: [1452, 670], graf: [721, 589], cupcake: [583, 438] };
  return buf;
};
const imgs = {
  logo: { f: 'img0.png', w: 1452, h: 670 },
  graf: { f: 'img1.png', w: 721, h: 589 },
  cupcake: { f: 'img2.png', w: 583, h: 438 },
};
const imageRun = (k, width) => new ImageRun({
  type: 'png', data: fs.readFileSync(imgs[k].f),
  transformation: { width, height: Math.round(width * imgs[k].h / imgs[k].w) },
  altText: { title: k, description: k, name: k },
});

// ---------- KOP ----------
const T = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || SZ, bold: o.bold, italics: o.italics, underline: o.underline });
const center = (children, o = {}) => P(children, { alignment: AlignmentType.CENTER, ...o });

const kop = new Table({
  width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], borders: noBorders,
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 9638, type: WidthType.DXA }, borders: noCellBorders, verticalAlign: VerticalAlign.CENTER,
      children: [
        center([T('PEMERINTAH DAERAH PROVINSI JAWA BARAT', { bold: true, size: 24 })], { spacing: { after: 0 } }),
        center([T('DINAS PENDIDIKAN', { bold: true, size: 24 })], { spacing: { after: 0 } }),
        center([T('SMA NEGERI 1 BANDUNG', { bold: true, size: 30 })], { spacing: { after: 0 } }),
        center([T('Jalan Ir. H. Juanda No. 93, Kota Bandung, Jawa Barat 40132 | Telp. (022) 2503948', { italics: true, size: 18 })], { spacing: { after: 0 } }),
      ] }),
  ] })],
});
const rule = P([], { border: { bottom: { style: BorderStyle.DOUBLE, size: 6, color: '000000', space: 1 } }, spacing: { after: 120 } });

// ---------- IDENTITAS ----------
const idRow = (a, b, c, d) => new TableRow({ children: [
  [a, 1750, true], [':', 300], [b, 2700], [c, 1750, true], [':', 300], [d, 2838],
].map(([t, w, bold]) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noCellBorders,
  children: [P([T(t, { bold, size: 21 })], { spacing: { after: 20 } })] })) });
const ident = new Table({
  width: { size: 9638, type: WidthType.DXA }, columnWidths: [1750, 300, 2700, 1750, 300, 2838], borders: noBorders,
  rows: [
    idRow('Mata Pelajaran', 'Matematika', 'Hari / Tanggal', '……………………………'),
    idRow('Kelas / Tingkat', 'Kelas X', 'Alokasi Waktu', '90 Menit'),
    idRow('Paket Soal', 'PSAS KELAS X PAKET A', 'Jumlah Soal', '25 Butir Soal'),
  ],
});

// ---------- PETUNJUK ----------
const petunjuk = [
  'Berdoalah sebelum memulai mengerjakan soal.',
  'Tuliskan identitas Anda (Nama, Kelas, dan Nomor Peserta) pada lembar jawaban yang tersedia.',
  'Periksa dan bacalah setiap butir soal dengan saksama sebelum Anda menjawabnya.',
  'Dahulukan menjawab soal-soal yang Anda anggap mudah.',
  'Laporkan kepada pengawas ujian jika terdapat teks atau gambar soal yang kurang jelas atau rusak.',
];
const bd = { style: BorderStyle.SINGLE, size: 6, color: '555555' };
const petunjukBox = new Table({
  width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: 9638, type: WidthType.DXA }, borders: { top: bd, bottom: bd, left: bd, right: bd },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    children: [
      P([T('PETUNJUK UMUM:', { bold: true, size: 20 })], { spacing: { after: 40 } }),
      ...petunjuk.map(t => P([T(t, { size: 20 })], { numbering: { reference: 'petunjuk', level: 0 }, spacing: { after: 20 } })),
    ] })] })],
});

// ---------- SOAL ----------
const body = [];
Q.forEach((q, qi) => {
  body.push(P(rich(q.stem), { numbering: { reference: 'soal', level: 0 }, keepNext: true, spacing: { before: qi === 0 ? 200 : 160, after: 60 } }));
  if (q.block) body.push(P([mathXml(block(q.block))], { indent: { left: 850 }, keepNext: true, spacing: { after: 40 } }));
  if (q.img) body.push(P([imageRun(q.img, q.img === 'graf' ? 230 : 270)], { indent: { left: 425 }, keepNext: true, spacing: { after: 60 } }));
  if (q.stem2) body.push(P(rich(q.stem2), { indent: { left: 425 }, keepNext: true, spacing: { after: 60 } }));
  q.opts.forEach((o, oi) => body.push(P(rich(o), {
    numbering: { reference: 'opsi', level: 0, instance: qi + 1 }, keepNext: oi < 4, keepLines: true, spacing: { after: 30 },
  })));
});

// ---------- KUNCI ----------
const bdr = { style: BorderStyle.SINGLE, size: 4, color: '333333' };
const cb = { top: bdr, bottom: bdr, left: bdr, right: bdr };
const cw = [900, 3000, 5738];
const cell = (t, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders: cb, margins: { top: 50, bottom: 50, left: 100, right: 100 },
  shading: o.head ? { type: ShadingType.CLEAR, fill: 'E8EDF3', color: 'auto' } : undefined,
  children: [P([T(t, { bold: o.bold, size: 21 })], { alignment: o.center ? AlignmentType.CENTER : AlignmentType.LEFT })],
});
const kunci = new Table({
  width: { size: 9638, type: WidthType.DXA }, columnWidths: cw,
  rows: [
    new TableRow({ tableHeader: true, children: [cell('No', cw[0], { head: true, bold: true, center: true }), cell('Bentuk Soal', cw[1], { head: true, bold: true, center: true }), cell('Kunci Jawaban', cw[2], { head: true, bold: true, center: true })] }),
    ...KEY.map((k, i) => new TableRow({ cantSplit: true, children: [
      cell(String(i + 1), cw[0], { center: true, bold: true }), cell('Pilihan Ganda', cw[1], { center: true }), cell(k, cw[2], { bold: true })] })),
  ],
});

const sign = new Table({
  width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], borders: noBorders,
  rows: [new TableRow({ cantSplit: true, children: [
    ['Mengetahui,', 'Kepala Sekolah / Waka Kurikulum'], ['', 'Guru Mata Pelajaran, Matematika'],
  ].map(([a, b]) => new TableCell({ width: { size: 4819, type: WidthType.DXA }, borders: noCellBorders, children: [
    P([T(a, { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
    P([T(b, { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 700 } }),
    P([T('....................................................', { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
    P([T('NIP. .................................................', { size: 21 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
  ] })) })],
});

const doc = new Document({
  creator: 'Guru Matematika', title: 'Naskah Soal PSAS Matematika Kelas X Paket A',
  styles: { default: { document: { run: { font: FONT, size: SZ }, paragraph: { spacing: { after: 60 } } } } },
  numbering: { config: [
    { reference: 'petunjuk', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 360 } } } }] },
    { reference: 'soal', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { bold: true }, paragraph: { indent: { left: 425, hanging: 425 } } } }] },
    { reference: 'opsi', levels: [{ level: 0, format: LevelFormat.UPPER_LETTER, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { bold: true }, paragraph: { indent: { left: 850, hanging: 425 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    children: [
      kop, rule,
      center([T('NASKAH SOAL ASESMEN SUMATIF / UJIAN SEKOLAH', { bold: true, underline: {}, size: 26 })], { spacing: { before: 60, after: 20 } }),
      center([T('TAHUN AJARAN 2025/2026', { bold: true, size: 24 })], { spacing: { after: 120 } }),
      ident, P([], { spacing: { after: 60 } }), petunjukBox,
      ...body,
      P([new PageBreak()]),
      center([T('LAMPIRAN KUNCI JAWABAN', { bold: true, size: 26 })], { spacing: { after: 20 } }),
      center([T('Mata Pelajaran: Matematika • Kelas: X • Paket: PSAS KELAS X PAKET A', { size: 21 })], { spacing: { after: 160 } }),
      kunci, P([], { spacing: { after: 240 } }), sign,
    ],
  }],
});
const JSZip = require('jszip');
Packer.toBuffer(doc).then(async b => {
  const z = await JSZip.loadAsync(b);
  let x = await z.file('word/document.xml').async('string');
  x = x.replace(/<undefined>/g, '').replace(/<\/undefined>/g, '');
  z.file('word/document.xml', x);
  const out = await z.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('Naskah_Soal_PSAS_Matematika_X_Paket_A.docx', out); console.log('ok');
});
