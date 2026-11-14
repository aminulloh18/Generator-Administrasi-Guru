# PROMPT UTAMA — Web Generator Administrasi Pembelajaran (Word)

> Tempel isi file ini sebagai prompt pertama ke AI pembuat aplikasi (AI Studio Build / Claude Code / dll.).
> Lampirkan juga folder `02_DATA_CONTRACT`, `03_RENDERER_REFERENCE`, `04_CONTOH_OUTPUT`, `05_FIGURE_REFERENCE` (lihat 00_BACA_DULU.md).
> Kerjakan per **milestone** (bagian 14). Jangan minta semuanya jadi dalam satu kali jalan.

---

## 1. PERAN DAN TUJUAN

Kamu adalah senior full-stack engineer sekaligus pakar Kurikulum Merdeka dan Pembelajaran Mendalam (Deep Learning) di Indonesia.
Bangun **aplikasi web** untuk guru: guru memasukkan **mata pelajaran, fase/kelas, dan keyword materi**, memilih **dokumen apa yang ingin dibuat**, lalu aplikasi menghasilkan dokumen **Microsoft Word (.docx)** yang **rapi, detail, siap cetak, dan konsisten antardokumen**.

Standar kualitas yang harus dicapai: **setara dengan file di folder `04_CONTOH_OUTPUT`** (modul ajar 27 halaman dengan 3 LKPD berilustrasi, kisi-kisi, naskah soal + kunci, kartu soal). Buka file-file itu dan jadikan patokan visual dan isi. Jika hasil aplikasi terlihat lebih sederhana dari contoh, berarti belum selesai.

## 2. PENGGUNA

Guru SMA/SMP/SD di Indonesia, tidak teknis. Antarmuka berbahasa Indonesia, sederhana, dan ramah ponsel. Guru harus bisa **memeriksa dan mengedit** hasil sebelum mengunduh, karena AI bisa salah.

## 3. DOKUMEN YANG HARUS BISA DIBUAT

Guru memilih lewat checklist. Semua dokumen berasal dari **satu data bersama** (bagian 5).

**Fase 1 (wajib, kerjakan dulu):**
1. **Modul Ajar Pembelajaran Mendalam** (struktur A–G, bagian 10.1)
2. **LKPD** (3 buah per unit, berilustrasi, dengan kunci dan pedoman skor)
3. **Kisi-kisi** asesmen format Kurikulum Merdeka (CP, TP, materi pokok, indikator, level kognitif, bentuk, no. soal)
4. **Naskah soal + kunci jawaban** (Paket A/B/C, ada kop, identitas, petunjuk, lampiran kunci)
5. **Kartu soal** (1 kartu per halaman)
6. **Instrumen sumatif + rubrik + pedoman skor**

**Fase 2 (setelah Fase 1 stabil):** ATP, Prota, Promes, KKTP, asesmen diagnostik terpisah, analisis hasil dan program remedial/pengayaan, bahan ajar/bahan bacaan, jurnal mengajar.

## 4. ALUR PENGGUNA (WIZARD)

1. **Identitas:** satuan pendidikan, nama penyusun, tahun pelajaran, semester, kepala sekolah/guru + NIP (opsional, bisa disimpan sebagai profil).
2. **Materi:** pilih mata pelajaran, fase/kelas; ketik **keyword materi** (mis. "eksponen, bentuk akar"); jumlah pertemuan; menit per JP.
3. **CP dan TP:** aplikasi menampilkan CP dari **pustaka CP yang dapat diedit** (bagian 6) lalu mengusulkan TP; guru menyetujui/mengubah.
4. **Pilih output:** checklist dokumen + opsi (jumlah soal, distribusi level kognitif, jumlah paket, bentuk soal, tingkat kesulitan, konteks lokal/minat siswa).
5. **Generate:** tampilkan progres per dokumen (mis. “Menyusun TP… Menyusun soal… Memverifikasi kunci… Membuat gambar… Merakit Word…”).
6. **Review dan edit:** tab per dokumen, edit langsung, tombol “buat ulang butir ini”, lencana validasi (hijau/kuning/merah) dari bagian 8.
7. **Unduh:** per dokumen atau semua sekaligus dalam ZIP.

## 5. ARSITEKTUR WAJIB (PRINSIP EMAS)

Ini bagian terpenting. **Jangan menyuruh LLM menulis Word/HTML/Markdown final.** Pisahkan tiga lapis:

1. **LLM → JSON terstruktur.** LLM hanya mengisi objek sesuai `02_DATA_CONTRACT/types.ts`. Gunakan *structured output / JSON schema* (mis. `responseMimeType: "application/json"` + `responseSchema` pada Gemini API) dan validasi dengan **Zod**. Jika JSON tidak valid: coba perbaiki otomatis maksimal 2 kali, lalu tampilkan galat yang jelas.
2. **Validator (kode).** Memeriksa kebenaran dan konsistensi (bagian 8) sebelum guru melihat hasilnya.
3. **Renderer (kode deterministik) → .docx** memakai library **`docx`** (npm) yang berjalan di browser. Seluruh tampilan (font, tabel, kop, penomoran) ditentukan kode, bukan LLM, sehingga **selalu rapi dan konsisten**.

**Satu sumber kebenaran:** kisi-kisi, kartu soal, naskah, dan kunci **diturunkan dari `Butir[]` yang sama**. Dilarang membuat ulang soal/indikator secara terpisah untuk tiap dokumen. Perubahan pada satu butir otomatis tercermin di semua dokumen.

**Integritas silang (divalidasi kode):** setiap `Butir` merujuk TP yang ada; setiap TP muncul di minimal satu butir; total menit kegiatan tiap pertemuan = JP × menit per JP; total skor LKPD = 100; nomor soal berurutan tanpa lompat; jumlah opsi seragam.

## 6. DATA KURIKULUM (JANGAN DIKARANG LLM)

- Simpan **pustaka CP** sebagai data JSON yang dapat diedit (mapel, fase, elemen, teks CP, sumber regulasi). Awali dengan Matematika Fase E dan F (contoh teks CP ada di `04_CONTOH_OUTPUT`).
- LLM **tidak boleh** mengarang teks CP resmi. Jika CP untuk mapel/fase belum ada di pustaka, minta guru menempelkan teks CP dan beri label “belum diverifikasi”.
- Tampilkan selalu catatan: “Cocokkan dengan regulasi/panduan terbaru dan kebijakan sekolah.”
- Dimensi Profil Lulusan, istilah Pembelajaran Mendalam (Memahami–Mengaplikasi–Merefleksi; berkesadaran, bermakna, menggembirakan) disimpan sebagai data konfigurasi agar mudah diperbarui.

## 7. RUMUS MATEMATIKA → EQUATION WORD (WAJIB, BUKAN LaTeX)

- Guru **tidak boleh** melihat LaTeX mentah di dokumen akhir. Semua rumus harus menjadi **equation Word asli (OMML)** yang dapat diedit di Word.
- Di JSON, rumus ditulis di antara `$...$` memakai notasi ringkas yang didukung `03_RENDERER_REFERENCE/omml.js`:
  `^{ }`, `_{ }`, `\frac{a}{b}`, `\sqrt{x}`, `\sqrt[n]{x}`, `\plog{2}x` (log berbasis gaya Indonesia: ²log x), `\log`, `\text{cm}`, `\cases{a;b;c}` (sistem persamaan), `\{ \}`, tanda kurung otomatis, `~` (spasi tak terputus), `{,}` (koma desimal), simbol Unicode × · ÷ ≠ ≤ ≥ ≈.
- Gunakan **`omml.js` apa adanya** sebagai konverter (ia mengubah string → XML `m:oMath`), lalu sisipkan ke paragraf `docx` lewat `ImportedXmlComponent`. Perhatikan: hasil `ImportedXmlComponent.fromXmlString` membungkus node dengan elemen `<undefined>`; **hapus pembungkus itu** pada `word/document.xml` setelah dokumen dibuat (lihat `main.js`/`build_*.js` untuk contoh pasca-proses dengan JSZip).
- Perluas `omml.js` bila perlu (mis. `\sum`, `\int`, matriks, `\overline`, notasi vektor, limit) sambil tetap memakai pola yang sama. Tulis uji unit untuk setiap konstruksi baru.
- Teks biasa dan rumus boleh bercampur dalam satu kalimat. Di sel tabel, ukuran font rumus mengikuti ukuran teks sel (lihat `setSize`).

## 8. VERIFIKASI KEBENARAN SOAL (WAJIB)

Soal hitungan yang kuncinya salah adalah kesalahan paling merusak. Terapkan:

1. **`cek` otomatis dengan math.js.** Untuk setiap soal hitungan, LLM menulis `cek.ekspresi` (ekspresi yang dapat dievaluasi) dan `cek.hasilDiharapkan`. Kode mengevaluasi ekspresi dan membandingkannya dengan **jawaban benar**. Tidak cocok → status merah, buat ulang butir itu otomatis (maks. 2 kali), lalu minta guru memeriksa.
2. **Cocokkan jawaban benar dengan salah satu opsi** secara numerik/simbolik; **tidak boleh ada dua opsi yang sama nilainya**; pengecoh tidak boleh bernilai sama dengan jawaban benar.
3. **Posisi kunci diacak oleh KODE**, bukan LLM: LLM memberi `jawabanBenar` + `pengecoh[]`; kode menyusun opsi A–E dengan distribusi kunci yang seimbang (tidak ada huruf yang mendominasi, tidak ada tiga kunci beruntun yang sama) dan berbeda antarpaket.
4. **Paket B/C paralel:** indikator, level kognitif, dan tipe soal sama dengan Paket A; angka dan konteks berbeda; posisi kunci berbeda. Verifikasi `cek` dijalankan juga.
5. **Soal bergambar:** nilai pada gambar harus konsisten dengan `cek` (kode membuat gambar dari spesifikasi yang sama, bagian 9).
6. **Lencana validasi** per butir: hijau (lolos semua), kuning (lolos tetapi ada peringatan, mis. soal konsep tanpa `cek`), merah (gagal). Dokumen tetap dapat diunduh dengan peringatan yang jelas jika masih ada butir merah.
7. Untuk soal non-hitungan, LLM harus menandai `[PERIKSA]` bila tidak yakin pada fakta tertentu.

## 9. GAMBAR DAN ILUSTRASI (DIBUAT KODE, BUKAN LLM)

- LLM hanya mengeluarkan **`FigureSpec`** (lihat `types.ts`); kode merendernya menjadi **SVG lalu PNG** (Canvas/`resvg`/`sharp`/`html-to-image`) pada resolusi cetak (≥ 200 dpi, lebar tampil ≈ 12–16 cm).
- Tipe minimal: grafik fungsi (dengan titik penting dan garis bantu putus-putus), pohon pembelahan/diagram pohon, garis bilangan (termasuk skala logaritmik), tabel bergambar, bangun ruang sederhana, diagram alir.
- Lihat `05_FIGURE_REFERENCE` untuk gaya visual yang diharapkan (palet navy/hijau/oranye, label jelas, latar putih, tulisan Indonesia, rumus ditata rapi). Tiru gaya itu.
- Setiap gambar diberi **keterangan** (“Gambar 1. …”) dan `altText`.
- Jangan memakai gambar buatan generatif AI untuk bagan/grafik matematika. Jika butuh foto/ilustrasi bebas, sediakan **kotak penanda** “[Tempel gambar di sini]” dengan petunjuk gambar apa yang cocok.

## 10. SPESIFIKASI KUALITAS DOKUMEN WORD

### 10.0 Aturan umum (berlaku untuk semua dokumen)
- Ukuran **A4**; margin 2 cm (LKPD/kartu boleh 1,8–2 cm); kisi-kisi **lanskap**.
- Font **Times New Roman 11 pt** (isi tabel 9–10 pt); judul bagian 14 pt tebal berwarna navy `#1F3B57` dengan garis bawah; sub-judul 12 pt; gunakan **gaya Heading 1/2/3 yang asli** agar muncul di Navigation Pane Word.
- **Penomoran dan butir memakai fitur numbering Word yang asli** (bukan mengetik “1.” atau “•” secara manual). Pilihan ganda: huruf A–E dengan indent menggantung.
- Tabel: lebar total tetap (DXA), kolom eksplisit, **baris judul diulang** di halaman berikutnya (`tableHeader`), baris tidak terpotong (`cantSplit`) kecuali sel sangat panjang, header berwarna `#D9E2F3`, kolom pertama label tebal berlatar `#EEF4FB`, margin sel cukup, sel kosong isian diberi “……” atau garis titik-titik.
- Kotak informasi berwarna (tabel 1 sel): biru muda (tujuan), kuning (petunjuk/masalah), hijau (“Ingat!”, model), ungu (cerita pembuka), hijau muda (kunci guru).
- **Header** (judul dokumen, kecil, abu-abu) dan **footer “Halaman X”**; halaman sampul tanpa header/footer.
- Awali setiap lampiran/LKPD dengan **page break**. Hindari judul yatim di dasar halaman (`keepNext`), hindari gambar terpisah dari keterangannya.
- Kop surat naskah soal: pemerintah daerah, dinas, nama sekolah (huruf besar tebal), alamat, garis ganda. **Jangan menyisipkan logo jika tidak disediakan guru**; sediakan unggah logo opsional.
- Selalu keluarkan file `.docx` yang valid dan dapat dibuka tanpa peringatan di Microsoft Word. Uji dengan validator OOXML bila tersedia.

### 10.1 Modul Ajar Pembelajaran Mendalam (urutan bagian mengikuti contoh)
Sampul → **A. Informasi Umum** → **B. Kesiapan dan Karakteristik Peserta Didik** (diagnostik kognitif 5 soal + kunci + tindak lanjut; non-kognitif; pemetaan dan strategi diferensiasi) → **C. Karakteristik Materi dan Dimensi Profil Lulusan** (jenis pengetahuan, relevansi, prasyarat, miskonsepsi umum) → **D. Desain Pembelajaran** (CP; TP + indikator; topik kontekstual lintas disiplin; pemahaman bermakna; pertanyaan pemantik; praktik pedagogis: model, prinsip, kemitraan, lingkungan, pemanfaatan digital) → **E. Pengalaman Belajar** (ringkasan pertemuan + **tabel per pertemuan**: Pendahuluan → Inti [Memahami, Mengaplikasi, Merefleksi] → Penutup, dengan kolom waktu, langkah rinci guru–siswa, prinsip PM, catatan diferensiasi/asesmen; ada exit ticket) → **F. Asesmen** (ringkasan, formatif dengan rubrik, sumatif + rubrik produk, pengolahan nilai/KKTP, pengayaan dan remedial) → **G. Refleksi Guru** → Lampiran: LKPD 1–n, kunci dan pedoman skor LKPD, instrumen sumatif + kunci + pedoman skor, bahan bacaan, glosarium, daftar pustaka.
Aturan isi: pertemuan 90 menit **harus** berjumlah 90 menit; langkah ditulis operasional (siapa melakukan apa, berapa lama, pertanyaan penuntun apa); TP memakai kata kerja operasional HOTS dan diawali “Melalui …”; sertakan miskonsepsi nyata dan cara menanganinya; konteks lintas disiplin yang benar-benar relevan.

### 10.2 LKPD (tiap LKPD)
Identitas kelompok dan peran → Tujuan (kotak biru) → Petunjuk (kotak kuning) → Cerita pembuka (kotak ungu) → **Kegiatan 1…n**, tiap kegiatan diberi label tahap (Memahami/Mengaplikasi/Merefleksi) → pola “amati → lengkapi tabel → duga → **uji dugaan dengan contoh lain** → simpulkan”. Wajib ada: tabel isian dengan 1–2 baris contoh terisi, kotak “Ingat!”, minimal 1 pertanyaan **berpikir kritis**, kegiatan **“Detektif Kesalahan”**, soal cerita kontekstual, tantangan untuk siswa mahir, dan **jurnal refleksi 3-2-1** serta skala pemahaman. Sediakan garis titik-titik untuk jawaban uraian. LKPD siap cetak hitam-putih (jangan bergantung pada warna untuk makna).

### 10.3 Kisi-kisi
Identitas (satuan pendidikan, mapel, fase/kelas, semester, tahun ajaran, alokasi waktu, jumlah dan bentuk soal, jenis asesmen) → tabel lanskap: **No | CP | TP | Materi Pokok | Indikator Soal | Level Kognitif | Bentuk Soal | No. Soal**, dengan sel **CP/TP/Materi digabung vertikal** untuk baris sejenis, indikator berbentuk “Disajikan …, peserta didik dapat …”, level “C3 (Menerapkan)”. Tanda tangan di bawah. Usahakan muat rapi dalam 2 halaman untuk 25 soal.

### 10.4 Naskah soal + kunci
Kop → judul → tabel identitas (mapel, kelas, paket, hari/tanggal, alokasi waktu, jumlah soal) → kotak petunjuk umum → soal (nomor tebal, opsi A–E, gambar/tabel di bawah kalimat pengantar, persamaan sistem tampil di baris sendiri) → halaman baru **Lampiran Kunci Jawaban** (tabel No | Bentuk Soal | Kunci) → blok tanda tangan.

### 10.5 Kartu soal
Satu kartu per halaman: judul “KARTU SOAL”, identitas, elemen, CP, TP, materi, indikator, level, bentuk, nomor, kotak **Butir Soal** (soal + gambar/tabel + opsi), baris **Kunci Jawaban**. Semua isi diambil dari `Butir` yang sama dengan naskah.

## 11. PROMPT UNTUK LLM DI DALAM APLIKASI (TEMPLAT)

Simpan sebagai berkas terpisah, dengan variabel `{{...}}`. Setiap prompt: **“Keluarkan HANYA JSON yang valid sesuai skema. Tanpa penjelasan, tanpa markdown.”**

**11.1 System prompt umum**
> Kamu adalah perancang pembelajaran dan penyusun asesmen berpengalaman untuk Kurikulum Merdeka dan Pembelajaran Mendalam di Indonesia. Gunakan bahasa Indonesia baku yang jelas. Patuhi CP yang diberikan; jangan mengarang kutipan regulasi. Tujuan pembelajaran memakai kata kerja operasional (utamakan C3–C5) dan diawali “Melalui …, peserta didik mampu …”. Indikator soal diawali “Disajikan …, peserta didik dapat …”. Semua rumus ditulis dengan notasi $...$ sesuai panduan. Soal harus punya tepat satu jawaban benar. Untuk soal hitungan, isi `cek` dengan ekspresi yang dapat dievaluasi. Jika tidak yakin pada suatu fakta, tulis “[PERIKSA]”. Jangan menulis jawaban benar di dalam teks soal. Pengecoh harus masuk akal (berdasarkan miskonsepsi umum), bukan asal.

**11.2 Usulan TP dan indikator** — input: `{{mapel}}, {{fase}}, {{CP}}, {{keyword}}, {{jumlahPertemuan}}`; output: `TP[]` (2–4 TP, tiap TP punya indikator dan pemetaan pertemuan).

**11.3 Generator butir soal** — input: `TP[]`, jumlah soal, distribusi level (mis. C1 12%, C2–C3 56%, C4 32%), bentuk, daftar miskonsepsi; output: `Butir[]` dengan `jawabanBenar`, `pengecoh`, `cek`, `gambar` (spesifikasi) bila perlu. Wajibkan variasi tipe (kontekstual, grafik, tabel, penalaran), urutan dari mudah ke sulit, **tidak ada dua soal yang menguji hal yang sama persis**.

**11.4 Paket paralel** — input: `Butir[]` Paket A; output: Paket B dengan indikator/level/tipe sama, angka dan konteks berbeda.

**11.5 Modul ajar** — dibuat **bertahap per bagian** (bukan satu panggilan raksasa): (a) diagnostik dan karakteristik, (b) desain, (c) tiap pertemuan, (d) tiap LKPD, (e) asesmen, (f) bahan bacaan dan glosarium. Setiap panggilan menerima ringkasan hasil bagian sebelumnya agar konsisten, dan hasilnya divalidasi (mis. menit pertemuan, skor LKPD).

**11.6 LKPD** — input: TP, pertemuan, konteks; output `Lkpd` dengan pola penemuan konsep (bagian 10.2). Wajib memuat contoh terisi, uji dugaan, detektif kesalahan, berpikir kritis, tantangan, dan refleksi.

## 12. TEKNOLOGI

- **React + TypeScript + Vite + Tailwind**, dapat dijalankan murni di browser kecuali pemanggilan LLM.
- Dokumen: **`docx`** (npm), **JSZip**; verifikasi: **math.js** (+ opsional `nerdamer`/`algebrite` untuk bentuk akar/simbolik); validasi data: **Zod**.
- LLM: **Gemini API** (atau penyedia lain yang dapat dipertukarkan lewat satu antarmuka `generateJSON(schema, prompt)`). **Kunci API tidak boleh berada di kode klien** untuk aplikasi yang dipublikasikan: pakai fungsi server (mis. serverless) atau mekanisme kunci bawaan platform. Sediakan batas laju dan pesan galat yang ramah.
- Penyimpanan draf: **IndexedDB/localStorage** (hanya di browser guru) + ekspor/impor JSON proyek. Jangan menyimpan data siswa.
- Aksesibilitas dan performa: tombol besar, kontras baik, indikator progres, pembuatan dokumen tidak membekukan UI (Web Worker bila perlu).

## 13. KEAMANAN, ETIKA, BIAYA

- Tampilkan peringatan: “Hasil dibuat AI; periksa kebenaran materi, soal, dan kunci sebelum digunakan.”
- Jangan meminta atau menyimpan data pribadi siswa. NIP/nama guru hanya di perangkat guru.
- Tampilkan perkiraan penggunaan token/biaya per dokumen dan sediakan mode hemat (kurangi detail).
- Hormati hak cipta: jangan menyalin soal/teks buku secara verbatim; hasilkan soal orisinal.

## 14. RENCANA KERJA (MILESTONE) DAN DEFINISI SELESAI

Kerjakan berurutan; berhenti dan laporkan setelah tiap milestone, sertakan cara menjalankan dan contoh hasil.

- **M1 – Fondasi renderer:** muat `omml.js`; buat modul rendering `docx` (kop, tabel, kotak berwarna, numbering, header/footer, gambar); render **Naskah soal + kunci** dari `contoh-soal-paket-A.json`. *Selesai bila* file Word terbuka di Word, equation dapat diedit, dan tampilannya menyamai `Naskah_Soal_...Paket_A.docx`.
- **M2 – Turunan dokumen:** dari JSON yang sama, render **Kisi-kisi** dan **Kartu soal** (A dan B). *Selesai bila* menyamai contoh, termasuk sel digabung dan 25 halaman kartu.
- **M3 – Validator dan pengacak:** `cek` math.js, pemeriksaan opsi duplikat, pengacak posisi kunci, validasi silang (bagian 5, 8), lencana validasi di UI.
- **M4 – Gambar dari kode:** render tipe `FigureSpec` utama dan sisipkan ke dokumen.
- **M5 – Integrasi LLM untuk soal:** form wizard, prompt 11.2–11.4, review/edit, regenerasi per butir. Uji dengan keyword “eksponen” kelas X.
- **M6 – Modul ajar dan LKPD:** prompt 11.5–11.6 bertahap, validasi menit/skor, render modul penuh menyamai `Modul_Ajar_...docx`.
- **M7 – Poles:** unggah logo, profil guru tersimpan, ZIP semua dokumen, ekspor/impor proyek, pesan galat, uji pada ponsel.
- **M8 – Fase 2:** ATP, Prota, Promes, analisis hasil, dll.

**Uji penerimaan akhir (wajib lulus):** dengan input *Matematika / Fase E / Kelas X / “eksponen” / 3 pertemuan / 25 soal / Paket A dan B*, aplikasi menghasilkan: modul ajar dengan 3 LKPD berilustrasi, kisi-kisi, naskah A dan B, kartu soal A dan B, **tanpa satu pun kunci salah menurut validator**, semua rumus berupa equation Word, jumlah menit tiap pertemuan tepat, dan setiap file terbuka di Word tanpa peringatan.

## 15. CARA KERJAMU

1. Baca seluruh lampiran dulu, termasuk kode referensi; **pakai ulang** pola dan kodenya (terutama `omml.js` dan pola pasca-proses `<undefined>`), jangan menulis ulang dari nol tanpa alasan.
2. Kode referensi berjalan di Node dan membaca gambar dari disk; **porting ke browser** (gambar sebagai ArrayBuffer/base64, tanpa `fs`).
3. Berikan kode **lengkap dan dapat dijalankan** per milestone, bukan potongan. Sebutkan perintah instalasi dan cara menjalankan.
4. Jangan menyederhanakan spesifikasi diam-diam. Jika ada yang tidak bisa dipenuhi, katakan terus terang dan tawarkan alternatif.
5. Tanyakan hanya bila ada hambatan nyata; selain itu ambil keputusan yang masuk akal dan catat asumsimu di akhir laporan.
6. Setelah setiap milestone, lakukan **pemeriksaan mandiri**: bandingkan hasil dengan file di `04_CONTOH_OUTPUT` dan daftar kekurangannya.

**Mulai sekarang dari M1.** Sebelum menulis kode, ringkas pemahamanmu tentang arsitektur (bagian 5) dalam maksimal 10 baris, lalu kerjakan M1.
