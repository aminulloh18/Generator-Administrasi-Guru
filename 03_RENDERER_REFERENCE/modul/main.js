const fs = require('fs');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber, AlignmentType, LevelFormat, BorderStyle } = D;
const JSZip = require('jszip');
const L = require('./lib');
const parts = [].concat(require('./part1'), require('./part2'), require('./part3'), require('./part4'));

const hdr = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA', space: 2 } },
  children: [new TextRun({ text: 'Modul Ajar Pembelajaran Mendalam • Matematika • Eksponen • Fase E / Kelas X', font: L.FONT, size: 17, color: '666666' })] })] });
const ftr = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: 'Halaman ', font: L.FONT, size: 18, color: '666666' }), new TextRun({ children: [PageNumber.CURRENT], font: L.FONT, size: 18, color: '666666' })] })] });
const emptyH = new Header({ children: [new Paragraph({ children: [] })] });
const emptyF = new Footer({ children: [new Paragraph({ children: [] })] });

const doc = new Document({
  creator: 'Guru Matematika', title: 'Modul Ajar Pembelajaran Mendalam – Eksponen (Fase E / Kelas X)',
  styles: { default: { document: { run: { font: L.FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: L.FONT, size: 28, bold: true, color: L.NAVY }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: L.FONT, size: 24, bold: true, color: L.NAVY }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: L.FONT, size: 22, bold: true, italics: true }, paragraph: { spacing: { before: 140, after: 60 }, outlineLevel: 2 } },
    ] },
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
      { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 270 } } } }] },
    { reference: 'cbul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 260, hanging: 200 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
  ] },
  sections: [{
    properties: { titlePage: true, page: { size: { width: 11906, height: 16838 }, margin: { top: 1250, bottom: 1100, left: 1134, right: 1134 } } },
    headers: { default: hdr, first: emptyH }, footers: { default: ftr, first: emptyF },
    children: parts,
  }],
});
const OUT = 'Modul_Ajar_Deep_Learning_Eksponen_Kelas_X.docx';
Packer.toBuffer(doc).then(async buf => {
  const z = await JSZip.loadAsync(buf);
  let x = await z.file('word/document.xml').async('string');
  const n = (x.match(/<undefined>/g) || []).length;
  x = x.replace(/<undefined>/g, '').replace(/<\/undefined>/g, '');
  z.file('word/document.xml', x);
  fs.writeFileSync(OUT, await z.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log('ok', OUT, 'math:', n);
});
