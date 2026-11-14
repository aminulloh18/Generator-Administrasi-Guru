const KEY = 'C A D E B A D B C A E C B D A B E C D A E B D C B'.split(' ');
const raw = [
  { n: 1, stem: 'Hasil dari operasi perkalian eksponen $3^{2}×3^{5}$ adalah ....', ans: '$3^{7}$', wrong: ['$3^{10}$', '$3^{3}$', '$9^{7}$', '$9^{10}$'] },
  { n: 2, stem: 'Hasil perhitungan dari $(\\frac{1}{2})^{-3}+3^{2}$ adalah ....', ans: '$17$', wrong: ['$15$', '$19$', '$\\frac{1}{17}$', '$\\frac{1}{15}$'] },
  { n: 3, stem: 'Diberikan tiga buah bilangan eksponen yaitu $A=2^{50}$, $B=3^{30}$, dan $C=5^{10}$. Setelah melakukan evaluasi perbandingan nilai, urutan yang benar dari bilangan terkecil ke terbesar adalah ....', ans: '$C<B<A$', wrong: ['$A<B<C$', '$B<C<A$', '$A<C<B$', '$C<A<B$'] },
  { n: 4, stem: 'Bentuk sederhana dari $(27)^{\\frac{2}{3}}·(\\frac{1}{3})^{-2}·\\sqrt[3]{9^{-3}}$ adalah ....', ans: '$9$', wrong: ['$81$', '$27$', '$3$', '$1$'] },
  { n: 5, stem: 'Sebuah chip memori yang berbentuk persegi dengan luas $6~\\text{cm}^{2}$ memuat 30 juta transistor. Luas untuk setiap transistor adalah ....', ans: '$2×10^{-5}~\\text{mm}^{2}$', wrong: ['$2×10^{-7}~\\text{mm}^{2}$', '$2×10^{-6}~\\text{mm}^{2}$', '$2×10^{-4}~\\text{mm}^{2}$', '$2×10^{-3}~\\text{mm}^{2}$'] },
  { n: 6, stem: 'Bentuk sederhana dari $\\sqrt{72}+\\sqrt{32}-\\sqrt{18}+\\sqrt{27}$ adalah ....', ans: '$7\\sqrt{2}+3\\sqrt{3}$', wrong: ['$7\\sqrt{2}-3\\sqrt{3}$', '$-7\\sqrt{2}+3\\sqrt{3}$', '$13\\sqrt{2}+3\\sqrt{3}$', '$4\\sqrt{2}+3\\sqrt{3}$'] },
  { n: 7, stem: 'Bentuk sederhana dari $(2\\sqrt{7}+3\\sqrt{2})(2\\sqrt{7}-3\\sqrt{2})$ adalah ....', ans: '$10$', wrong: ['$-10$', '$46$', '$10\\sqrt{7}$', '$5\\sqrt{2}$'] },
  { n: 8, stem: 'Bentuk sederhana dari $\\frac{4}{\\sqrt{6}-\\sqrt{2}}$ adalah ....', ans: '$\\sqrt{6}+\\sqrt{2}$', wrong: ['$\\sqrt{6}-\\sqrt{2}$', '$2\\sqrt{6}+2\\sqrt{2}$', '$4\\sqrt{6}-4\\sqrt{2}$', '$\\frac{\\sqrt{6}+\\sqrt{2}}{2}$'] },
  { n: 9, stem: 'Diketahui luas suatu persegi panjang $(11+6\\sqrt{3})~\\text{cm}^{2}$ dan lebarnya $(2+\\sqrt{3})~\\text{cm}$. Keliling persegi panjang tersebut adalah ....', ans: '$(12+4\\sqrt{3})~\\text{cm}$', wrong: ['$(12+6\\sqrt{3})~\\text{cm}$', '$(10+4\\sqrt{3})~\\text{cm}$', '$(8+4\\sqrt{3})~\\text{cm}$', '$(6+2\\sqrt{3})~\\text{cm}$'] },
  { n: 10, stem: 'Jika $\\log 2=0{,}3010$ dan $\\log 3=0{,}4771$; nilai $\\log 72$ adalah ....', ans: '1,8572', wrong: ['1,5562', '1,2552', '0,7781', '2,0791'] },
  { n: 11, stem: 'Diketahui $\\plog{2}5=p$ dan $\\plog{2}3=q$. Nilai dari $\\plog{2}75$ adalah ....', ans: '$2p+q$', wrong: ['$p+2q$', '$p^{2}+q$', '$2(p+q)$', '$p+q$'] },
  { n: 12, stem: 'Nilai $x$ yang memenuhi persamaan $(\\frac{1}{27})^{x-1}=9^{x+1}$ adalah ....', ans: '$\\frac{1}{5}$', wrong: ['$5$', '$-\\frac{1}{5}$', '$1$', '$0$'] },
  { n: 13, stem: 'Himpunan penyelesaian dari $\\plog{2}x+\\plog{2}(x-2)=3$ adalah ....', ans: '$\\{4\\}$', wrong: ['$\\{-2,4\\}$', '$\\{-2\\}$', '$\\{2\\}$', '$\\{8\\}$'] },
  { n: 14, stem: 'Bentuk melengkapkan kuadrat sempurna dari persamaan $x^{2}-6x+5=0$ sehingga diperoleh akar-akarnya adalah ....', ans: '$(x-3)^{2}=4$', wrong: ['$(x-3)^{2}=5$', '$(x-6)^{2}=4$', '$(x+3)^{2}=4$', '$(x-3)^{2}=14$'] },
  { n: 15, stem: 'Akar-akar dari persamaan kuadrat $x^{2}-7x+12=0$ dengan metode pemfaktoran adalah ....', ans: '$x=3$ atau $x=4$', wrong: ['$x=-3$ atau $x=-4$', '$x=2$ atau $x=6$', '$x=-2$ atau $x=-6$', '$x=1$ atau $x=12$'] },
  { n: 16, stem: 'Persamaan kuadrat yang akar-akarnya $4$ dan $-3$ adalah ....', ans: '$x^{2}-x-12=0$', wrong: ['$x^{2}+x-12=0$', '$x^{2}-x+12=0$', '$x^{2}+x+12=0$', '$x^{2}-7x-12=0$'] },
  { n: 17, stem: 'Jika $x_{1}$ dan $x_{2}$ adalah akar-akar dari persamaan $x^{2}-5x+2=0$, maka persamaan kuadrat baru yang akar-akarnya $2x_{1}$ dan $2x_{2}$ adalah ....', ans: '$x^{2}-10x+8=0$', wrong: ['$x^{2}-10x+4=0$', '$x^{2}-5x+8=0$', '$x^{2}+10x+8=0$', '$2x^{2}-10x+2=0$'] },
  { n: 18, stem: 'Jika $x_{1}$ dan $x_{2}$ adalah akar-akar dari persamaan $2x^{2}-10x+8=0$, maka nilai dari $x_{1}^{2}+x_{2}^{2}$ adalah ....', ans: '$17$', wrong: ['$25$', '$21$', '$9$', '$33$'] },
  { n: 19, stem: 'Perhatikan grafik berikut.', img: 'graf',
    stem2: 'Jika grafik fungsi kuadrat pada gambar mempunyai $y=ax^{2}+bx+c$, maka hasil kali dari $a·b·c$ sama dengan ....', ans: '$30$', wrong: ['$-30$', '$6$', '$-6$', '$5$'] },
  { n: 20, stem: 'Titik balik grafik parabola $f(x)=x^{2}+4x-5$ adalah ....', ans: '$(-2,-9)$', wrong: ['$(2,-9)$', '$(-2,9)$', '$(-2,-5)$', '$(2,9)$'] },
  { n: 21, stem: 'Dalam sebuah Sistem Persamaan Linear Tiga Variabel (SPLTV), banyaknya persamaan minimal yang diperlukan agar diperoleh penyelesaian tunggal adalah ....', ans: 'Tiga', wrong: ['Satu', 'Dua', 'Empat', 'Lima'] },
  { n: 22, stem: 'Manakah di bawah ini yang merupakan persamaan linear tiga variabel dengan variabel $x$, $y$, dan $z$?', ans: '$2x-3y+z=7$', wrong: ['$x^{2}-3y+z=7$', '$xy+z=7$', '$2x-3y=7$', '$\\frac{2}{x}-3y+z=7$'] },
  { n: 23, stem: 'Metode penyelesaian SPLTV yang dilakukan dengan cara menyatakan salah satu variabel dalam variabel lain, kemudian memasukkannya ke persamaan yang lain disebut metode ....', ans: 'Metode Substitusi', wrong: ['Metode Eliminasi', 'Metode Campuran', 'Metode Determinan', 'Metode Cramer'] },
  { n: 24, stem: 'Diketahui sistem persamaan', block: '\\cases{x+2y+z=3;2x-y+3z=14;3x+y-2z=-1}',
    stem2: 'Nilai $x$, $y$, dan $z$ berturut-turut adalah ....', ans: '$2$, $-1$, dan $3$', wrong: ['$2$, $1$, dan $3$', '$-2$, $1$, dan $-3$', '$3$, $-1$, dan $2$', '$2$, $-1$, dan $-3$'] },
  { n: 25, stem: 'Sebuah toko menawarkan tiga jenis paket kue cupcake. Setiap paket kue terdiri atas tiga rasa cupcake, yaitu cokelat, vanila, dan stroberi, dengan rincian sebagai berikut.',
    table: { head: ['Paket', 'Cokelat', 'Vanila', 'Stroberi', 'Harga'], rows: [['A', '3', '2', '2', 'Rp68.000,00'], ['B', '2', '3', '3', 'Rp72.000,00'], ['C', '4', '1', '2', 'Rp71.000,00']] },
    stem2: 'Total harga yang harus dibayar seorang pembeli jika ingin membeli paket A namun ingin menambah 2 cupcake vanila dan 1 cupcake stroberi dengan harga satuan adalah ....',
    ans: 'Rp93.000,00', wrong: ['Rp100.000,00', 'Rp86.000,00', 'Rp105.000,00', 'Rp79.000,00'] },
];
const L = 'ABCDE';
const out = raw.map((q, i) => {
  const k = L.indexOf(KEY[i]); const w = [...q.wrong]; w.splice(k, 0, q.ans);
  const { ans, wrong, ...rest } = q; return { ...rest, opts: w };
});
module.exports = out; module.exports.KEY = KEY;
