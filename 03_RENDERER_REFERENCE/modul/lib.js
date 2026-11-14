const fs = require('fs');
const D = require('docx');
const { Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType, BorderStyle, WidthType, ShadingType,
  HeadingLevel, ImportedXmlComponent, VerticalAlign } = D;
const om = require('../omml');

const FONT = 'Times New Roman';
const NAVY = '1F3B57';
const mathXml = x => ImportedXmlComponent.fromXmlString(x);

// teks dengan $rumus$ dan **tebal**
function rich(text, o = {}) {
  const size = o.size || 22;
  om.setSize(size);
  const out = [];
  String(text).split('$').forEach((seg, i) => {
    if (i % 2 === 1) { out.push(mathXml(om.inline(seg))); return; }
    seg.split('**').forEach((s, j) => {
      if (!s) return;
      out.push(new TextRun({ text: s, font: FONT, size, bold: o.bold || j % 2 === 1, italics: o.italics, color: o.color }));
    });
  });
  return out;
}
const P = (text, o = {}) => new Paragraph({
  children: Array.isArray(text) ? text : rich(text, o),
  alignment: o.align || AlignmentType.LEFT, indent: o.indent, keepNext: o.keepNext, keepLines: o.keepLines,
  spacing: { before: o.before || 0, after: o.after === undefined ? 80 : o.after, line: o.line },
  border: o.border, shading: o.shading, pageBreakBefore: o.pageBreakBefore,
});
const J = (text, o = {}) => P(text, { align: AlignmentType.JUSTIFIED, ...o });
const h1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT, size: 28, bold: true, color: NAVY })],
  spacing: { before: 280, after: 140 }, keepNext: true, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 2 } } });
const h2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT, size: 24, bold: true, color: NAVY })],
  spacing: { before: 200, after: 100 }, keepNext: true });
const h3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, font: FONT, size: 22, bold: true, italics: true, color: '333333' })],
  spacing: { before: 140, after: 60 }, keepNext: true });
const pb = () => new Paragraph({ children: [], pageBreakBefore: true, spacing: { after: 0 } });
const sp = (n = 80) => new Paragraph({ children: [], spacing: { after: n } });

const bullets = (items, o = {}) => items.map(t => new Paragraph({ children: rich(t, o), numbering: { reference: 'bul', level: o.level || 0 }, spacing: { after: 40 } }));
let inst = 0;
const numbered = (items, o = {}) => { inst++; return items.map(t => new Paragraph({ children: rich(t, o), numbering: { reference: 'num', level: 0, instance: inst }, spacing: { after: 40 } })); };

const bd = (c = '555555', s = 4) => ({ style: BorderStyle.SINGLE, size: s, color: c });
const allB = (c, s) => ({ top: bd(c, s), bottom: bd(c, s), left: bd(c, s), right: bd(c, s) });

// isi sel: string (\n = paragraf baru; '- ' = butir) atau array elemen docx
function cellContent(c, size, o = {}) {
  if (Array.isArray(c)) return c;
  const out = [];
  String(c).split('\n').forEach(line => {
    if (line.startsWith('- ')) out.push(new Paragraph({ children: rich(line.slice(2), { size, bold: o.bold }), numbering: { reference: 'cbul', level: 0 }, spacing: { after: 20 } }));
    else out.push(new Paragraph({ children: rich(line, { size, bold: o.bold }), alignment: o.center ? AlignmentType.CENTER : AlignmentType.LEFT, spacing: { after: 20 } }));
  });
  return out;
}
function tbl(headers, rows, widths, o = {}) {
  const size = o.size || 20; const total = widths.reduce((a, b) => a + b, 0);
  const mk = (c, w, i, head) => {
    const obj = (typeof c === 'object' && !Array.isArray(c) && c !== null) ? c : { t: c };
    return new TableCell({
      width: { size: w, type: WidthType.DXA }, borders: allB(o.border || '555555'), columnSpan: obj.span, verticalAlign: head ? VerticalAlign.CENTER : VerticalAlign.TOP,
      margins: { top: 50, bottom: 50, left: 90, right: 90 },
      shading: (head || obj.fill) ? { type: ShadingType.CLEAR, fill: obj.fill || o.hdrFill || 'D9E2F3', color: 'auto' } : (o.firstColFill && i === 0 ? { type: ShadingType.CLEAR, fill: o.firstColFill, color: 'auto' } : undefined),
      children: cellContent(obj.t, size, { bold: head || obj.bold || (o.firstColBold && i === 0), center: head || obj.center || (o.center && o.center.includes(i)) }),
    });
  };
  const trs = [];
  if (headers) trs.push(new TableRow({ tableHeader: true, cantSplit: true, children: headers.map((h, i) => mk(h, widths[i], i, true)) }));
  rows.forEach(r => {
    let ci = 0;
    trs.push(new TableRow({ cantSplit: o.cantSplit !== false, children: r.map(c => { const span = (c && c.span) || 1; const w = widths.slice(ci, ci + span).reduce((a, b) => a + b, 0); const cell = mk(c, w, ci, false); ci += span; return cell; }) }));
  });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: trs });
}
// kotak berwarna satu sel
function box(title, content, o = {}) {
  const fill = o.fill || 'EEF4FB', line = o.line || NAVY, size = o.size || 21, W = o.width || 9638;
  const kids = [];
  if (title) kids.push(new Paragraph({ children: rich(title, { size: size + 1, bold: true, color: line }), spacing: { after: 60 } }));
  kids.push(...cellContent(content, size, {}));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: o.cantSplit !== false, children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, borders: allB(line, 8), margins: { top: 90, bottom: 80, left: 140, right: 140 },
    shading: { type: ShadingType.CLEAR, fill, color: 'auto' }, children: kids })] })] });
}
const IMG = { // file, w, h
  bakteri: ['fig1_bakteri.png', 1156, 748], tangga: ['fig2_tangga.png', 1001, 871], grafik: ['fig3_grafik.png', 1122, 847],
  skala: ['fig4_skala.png', 1317, 640], kubus: ['fig5_kubus.png', 1032, 513],
};
function fig(key, width, caption) {
  const [f, w, h] = IMG[key];
  const out = [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: !!caption, spacing: { before: 60, after: 40 }, children: [new ImageRun({
    type: 'png', data: fs.readFileSync(__dirname + '/' + f), transformation: { width, height: Math.round(width * h / w) }, altText: { title: key, description: caption || key, name: key } })] })];
  if (caption) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: rich(caption, { size: 19, italics: true, color: '444444' }) }));
  return out;
}
// garis jawaban titik-titik
const lines = (n, o = {}) => Array.from({ length: n }, () => new Paragraph({ children: [], spacing: { before: 0, after: 0, line: o.line || 400 },
  border: { bottom: { style: BorderStyle.DOTTED, size: 6, color: '888888', space: 1 } } }));
const LKPD_FILL = 'FFF8E1', KUNCI_FILL = 'E8F5E9';
module.exports = { FONT, NAVY, rich, P, J, h1, h2, h3, pb, sp, bullets, numbered, tbl, box, fig, lines, mathXml, LKPD_FILL, KUNCI_FILL };
