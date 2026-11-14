// Konverter notasi ringkas -> OMML (Word equation)
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let FONT = '<w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/></w:rPr>';
const setSize = hp => { FONT = '<w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="' + hp + '"/></w:rPr>'; };
const run = (t, plain) =>
  `<m:r>${plain ? '<m:rPr><m:sty m:val="p"/></m:rPr>' : ''}${FONT}<m:t xml:space="preserve">${esc(t)}</m:t></m:r>`;
const e = x => `<m:e>${x}</m:e>`;

function parse(s) {
  s = s.replace(/\\left|\\right/g, '');
  let i = 0;
  const peek = (str) => s.startsWith(str, i);

  function group() {
    if (s[i] !== '{') throw new Error('Expected { at ' + i + ' in ' + s);
    i++;
    const r = seq(() => s[i] === '}');
    i++;
    return r;
  }
  function rawGroup() { // returns raw string inside balanced braces
    let depth = 0, start = i + 1;
    do { if (s[i] === '{') depth++; if (s[i] === '}') depth--; i++; } while (depth > 0);
    return s.slice(start, i - 1);
  }
  function seq(endFn) {
    let out = '';
    while (i < s.length && !endFn()) {
      if (s[i] === ' ') { i++; continue; }
      out += term();
    }
    return out;
  }
  function term() {
    const base = atom();
    let sub = null, sup = null;
    while (s[i] === '^' || s[i] === '_') {
      const k = s[i]; i++;
      const g = group();
      if (k === '^') sup = g; else sub = g;
    }
    if (sub !== null && sup !== null)
      return `<m:sSubSup>${e(base)}<m:sub>${sub}</m:sub><m:sup>${sup}</m:sup></m:sSubSup>`;
    if (sup !== null) return `<m:sSup>${e(base)}<m:sup>${sup}</m:sup></m:sSup>`;
    if (sub !== null) return `<m:sSub>${e(base)}<m:sub>${sub}</m:sub></m:sSub>`;
    return base;
  }
  function atom() {
    const c = s[i];
    if (c === '\\') {
      if (peek('\\frac')) { i += 5; const n = group(); const d = group();
        return `<m:f><m:num>${n}</m:num><m:den>${d}</m:den></m:f>`; }
      if (peek('\\sqrt')) { i += 5; let deg = null;
        if (s[i] === '[') { const j = s.indexOf(']', i); deg = parse(s.slice(i + 1, j)); i = j + 1; }
        const b = group();
        return deg !== null
          ? `<m:rad><m:radPr/><m:deg>${deg}</m:deg>${e(b)}</m:rad>`
          : `<m:rad><m:radPr><m:degHide m:val="1"/></m:radPr><m:deg/>${e(b)}</m:rad>`; }
      if (peek('\\plog')) { i += 5; const p = group(); // log berbasis ala Indonesia: (basis)log
        return `<m:sPre><m:sPrePr/><m:sub>${run('\u200b', true)}</m:sub><m:sup>${p}</m:sup>${e(run('log', true))}</m:sPre>` + run('\u2009', true); }
      if (peek('\\log')) { i += 4; return run('log', true) + run('\u2009', true); }
      if (peek('\\text')) { i += 5; const t = rawGroup(); return run(t, true); }
      if (peek('\\cases')) { i += 6; const raw = rawGroup();
        const rows = raw.split(';').map(r => parse(r.replace('=', '&=')));
        return `<m:d><m:dPr><m:begChr m:val="{"/><m:endChr m:val=""/></m:dPr>${e(`<m:eqArr><m:eqArrPr><m:maxDist m:val="1"/></m:eqArrPr>${rows.map(e).join('')}</m:eqArr>`)}</m:d>`; }
      if (peek('\\{')) { i += 2; const inner = seq(() => peek('\\}')); i += 2;
        return `<m:d><m:dPr><m:begChr m:val="{"/><m:endChr m:val="}"/></m:dPr>${e(inner)}</m:d>`; }
      throw new Error('Unknown command at ' + i + ' in ' + s);
    }
    if (c === '(') { i++; const inner = seq(() => s[i] === ')'); i++;
      return `<m:d><m:dPr><m:begChr m:val="("/><m:endChr m:val=")"/></m:dPr>${e(inner)}</m:d>`; }
    if (c === '~') { i++; return run('\u00a0', true); }
    if (c === '&') { i++; return `<m:r><m:t>&amp;</m:t></m:r>`; }
    // angka (desimal pakai {,})
    const m = /^\d+(\{,\}\d+|\.\d+)?/.exec(s.slice(i));
    if (m) { i += m[0].length; return run(m[0].replace('{,}', ','), true); }
    i++;
    if (/[A-Za-z]/.test(c)) return run(c, false);
    if (c === '-') return run('\u2212', true);
    return run(c, true);
  }
  return seq(() => false);
}

const inline = s => `<m:oMath>${parse(s)}</m:oMath>`;
const block = s => `<m:oMathPara><m:oMath>${parse(s)}</m:oMath></m:oMathPara>`;
module.exports = { inline, block, parse, setSize };
