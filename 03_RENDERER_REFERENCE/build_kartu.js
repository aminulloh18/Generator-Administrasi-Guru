const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType, BorderStyle,
  WidthType, ShadingType, ImportedXmlComponent, VerticalAlign,
} = require('docx');
const JSZip = require('jszip');
const { inline, block } = require('./omml');

const PK = (process.argv[2] || 'A').toUpperCase();
const Q = require(PK === 'A' ? './data' : './dataB');
const KEY = Q.KEY;
const GRAF = PK === 'A' ? { f: 'img1.png', w: 721, h: 589 } : { f: 'imgB_graf.png', w: 722, h: 603 };
const CUP = { f: 'img2.png', w: 583, h: 438 };

// ---- metadata dari kisi-kisi ----
const src = fs.readFileSync('build_kisi.js', 'utf8');
const a = src.indexOf('const CP_BIL'), b = src.indexOf('// ---------- TABEL');
const groups = new Function(src.slice(a, b) + '\nreturn groups;')();
const META = {};
groups.forEach(g => g.items.forEach(it => it.rows.forEach(([soal, indikator, level]) => {
  META[soal] = { elemen: g.cp[0], cp: g.cp[1], tp: it.tp, materi: it.materi, indikator, level };
})));
if (PK === 'B') { // indikator yang beda redaksi di Paket B
  META[21].indikator = 'Disajikan pernyataan tentang SPLTV, peserta didik dapat menyebutkan banyaknya persamaan minimal agar penyelesaian SPLTV tunggal.';
  META[23].indikator = 'Disajikan deskripsi langkah penyelesaian SPLTV, peserta didik dapat menyebutkan nama metode substitusi.';
  META[25].indikator = 'Disajikan tabel rincian tiga paket cupcake beserta harganya, peserta didik dapat menyusun model SPLTV dan menentukan total harga pembelian.';
}

const FONT = 'Times New Roman';
const T = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 21, bold: o.bold, italics: o.italics, underline: o.underline });
const P = (children, o = {}) => new Paragraph({ children, spacing: { after: 40 }, ...o });
const mathXml = x => ImportedXmlComponent.fromXmlString(x);
function rich(text, size = 22) {
  const out = [];
  text.split('$').forEach((seg, i) => {
    if (i % 2 === 0) { if (seg) out.push(new TextRun({ text: seg, font: FONT, size })); }
    else out.push(mathXml(inline(seg)));
  });
  return out;
}
const imageRun = (im, width) => new ImageRun({ type: 'png', data: fs.readFileSync(im.f),
  transformation: { width, height: Math.round(width * im.h / im.w) }, altText: { title: 'gambar', description: 'gambar soal', name: 'gambar' } });

const bd = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const B = { top: bd, bottom: bd, left: bd, right: bd };
const W1 = 2500, W2 = 7138, TW = W1 + W2;
const lab = (t) => new TableCell({ width: { size: W1, type: WidthType.DXA }, borders: B, margins: { top: 50, bottom: 50, left: 100, right: 100 },
  shading: { type: ShadingType.CLEAR, fill: 'E8EDF3', color: 'auto' }, children: [P([T(t, { bold: true })], { spacing: { after: 0 } })] });
const val = (t, bold) => new TableCell({ width: { size: W2, type: WidthType.DXA }, borders: B, margins: { top: 50, bottom: 50, left: 100, right: 100 },
  children: [P([T(t, { bold })], { spacing: { after: 0 } })] });
const row = (l, v, bold) => new TableRow({ cantSplit: true, children: [lab(l), val(v, bold)] });

function butir(q) {
  const c = [];
  c.push(P(rich(q.stem), { spacing: { after: 80 } }));
  if (q.block) c.push(P([mathXml(block(q.block))], { indent: { left: 400 }, spacing: { after: 60 } }));
  if (q.img) c.push(P([imageRun(q.img === 'graf' ? GRAF : CUP, q.img === 'graf' ? 230 : 270)], { indent: { left: 0 }, spacing: { after: 80 } }));
  if (q.table) {
    const tw = [1100, 1300, 1300, 1300, 1900];
    const tb = { style: BorderStyle.SINGLE, size: 4, color: '333333' }; const tB = { top: tb, bottom: tb, left: tb, right: tb };
    const tc = (t, w, head) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: tB, margins: { top: 30, bottom: 30, left: 80, right: 80 },
      shading: head ? { type: ShadingType.CLEAR, fill: 'E8EDF3', color: 'auto' } : undefined,
      children: [P([T(t, { bold: head, size: 20 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } })] });
    c.push(new Table({ width: { size: 6900, type: WidthType.DXA }, columnWidths: tw,
      rows: [new TableRow({ children: q.table.head.map((h, j) => tc(h, tw[j], true)) }),
        ...q.table.rows.map(r => new TableRow({ children: r.map((x, j) => tc(x, tw[j], false)) }))] }));
    c.push(P([], { spacing: { after: 60 } }));
  }
  if (q.stem2) c.push(P(rich(q.stem2), { spacing: { after: 80 } }));
  q.opts.forEach((o, i) => c.push(new Paragraph({
    children: [new TextRun({ text: 'ABCDE'[i] + '.\t', font: FONT, size: 22, bold: true }), ...rich(o)],
    indent: { left: 500, hanging: 500 }, spacing: { after: 50 }, tabStops: [{ type: 'left', position: 500 }],
  })));
  c.push(P([], { spacing: { after: 0 } }));
  return c;
}

const children = [];
Q.forEach((q, i) => {
  const m = META[q.n];
  children.push(new Paragraph({ pageBreakBefore: i > 0, alignment: AlignmentType.CENTER, spacing: { after: 0 },
    children: [T('KARTU SOAL', { bold: true, size: 30 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 },
    children: [T('PENILAIAN SUMATIF AKHIR SEMESTER (PSAS) – TAHUN AJARAN 2025/2026', { bold: true, size: 22 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 140 },
    children: [T(`Matematika Kelas X – Paket ${PK}`, { bold: true, size: 22 })] }));
  children.push(new Table({
    width: { size: TW, type: WidthType.DXA }, columnWidths: [W1, W2],
    rows: [
      row('Satuan Pendidikan', 'SMA Negeri 1 Bandung'),
      row('Mata Pelajaran', 'Matematika'),
      row('Fase / Kelas', 'E / X'),
      row('Kurikulum', 'Kurikulum Merdeka'),
      row('Elemen', m.elemen),
      row('Capaian Pembelajaran', m.cp),
      row('Tujuan Pembelajaran', m.tp),
      row('Materi Pokok', m.materi),
      row('Indikator Soal', m.indikator),
      row('Level Kognitif', m.level),
      row('Bentuk Soal', 'Pilihan Ganda'),
      row('Nomor Soal', String(q.n), true),
      new TableRow({ cantSplit: true, children: [new TableCell({ columnSpan: 2, width: { size: TW, type: WidthType.DXA }, borders: B,
        margins: { top: 80, bottom: 60, left: 120, right: 120 },
        children: [P([T('BUTIR SOAL', { bold: true, size: 22 })], { alignment: AlignmentType.CENTER, spacing: { after: 100 } }), ...butir(q)] })] }),
      new TableRow({ cantSplit: true, children: [lab('Kunci Jawaban'), val(KEY[i], true)] }),
    ],
  }));
});

const doc = new Document({
  creator: 'Guru Matematika', title: `Kartu Soal PSAS Matematika Kelas X Paket ${PK}`,
  styles: { default: { document: { run: { font: FONT, size: 21 } } } },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 900, left: 1134, right: 1134 } } }, children }],
});
const out = `Kartu_Soal_PSAS_Matematika_X_Paket_${PK}.docx`;
Packer.toBuffer(doc).then(async buf => {
  const z = await JSZip.loadAsync(buf);
  let x = await z.file('word/document.xml').async('string');
  x = x.replace(/<undefined>/g, '').replace(/<\/undefined>/g, '');
  z.file('word/document.xml', x);
  fs.writeFileSync(out, await z.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log('ok', out);
});
