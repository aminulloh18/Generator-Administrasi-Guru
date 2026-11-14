# STARTER KIT — Generator Administrasi Pembelajaran (Word)

## Isi folder
| Folder / file | Fungsi |
|---|---|
| `01_PROMPT_UTAMA.md` | Prompt utama (spesifikasi lengkap) untuk AI pembuat aplikasi |
| `02_DATA_CONTRACT/types.ts` | Struktur data (satu sumber kebenaran untuk semua dokumen) |
| `02_DATA_CONTRACT/contoh-soal-paket-A.json`, `...-B.json` | 25 soal nyata lengkap dengan CP, TP, indikator, level, opsi, dan kunci. Dipakai sebagai contoh dan bahan uji |
| `03_RENDERER_REFERENCE/` | Kode yang menghasilkan dokumen-dokumen contoh (Node.js). **Referensi**, bukan aplikasi siap jalan |
| `03_RENDERER_REFERENCE/omml.js` | Konverter notasi rumus → equation Word (OMML). Murni JavaScript, bisa dipakai di browser |
| `04_CONTOH_OUTPUT/` | 6 file Word hasil akhir sebagai standar kualitas |
| `05_FIGURE_REFERENCE/` | Contoh ilustrasi dan skrip pembuatnya (gaya visual yang ditiru) |

## Kenapa hasil sebelumnya rapi, dan apa yang harus dijaga
1. **Pemisahan tugas.** AI menulis *isi* (JSON); **kode** yang menyusun Word. Kalau AI disuruh menulis dokumen Word/HTML langsung, hasilnya tidak konsisten dan sering berantakan.
2. **Satu data untuk semua dokumen.** Kisi-kisi dan kartu soal diturunkan dari soal yang sama.
3. **Rumus jadi equation Word** lewat `omml.js`.
4. **Kebenaran soal diperiksa kode** (hitung ulang), bukan dipercaya begitu saja.
5. **Gambar dibuat kode** dari spesifikasi.

## Di mana paling enak membangunnya?
Jujur, semuanya bisa; bedanya di kemudahan menguji hasil Word.

- **Claude Code (agen koding yang bisa menjalankan perintah di komputermu):** paling mulus untuk proyek ini, karena ia bisa menjalankan kode, membuka dan memeriksa file Word hasilnya, memperbaiki sendiri, lalu membantu deploy (mis. ke Vercel/Netlify). Cocok bila kamu mau hasil terbaik dan siap belajar sedikit terminal.
- **Google AI Studio (Build):** cocok karena kamu sudah terbiasa, ada pratinjau langsung dan akses Gemini. Bisa, asalkan **bertahap per milestone** dan **kamu yang membuka file Word hasilnya di Word** untuk memeriksa tampilan. Cek di menu terbaru AI Studio bagaimana kunci API ditangani dan opsi deploy-nya.
- **Prototipe di chat Claude:** bisa dibuat sebagai halaman web yang dipublikasikan, tetapi kemampuan unduh file dan pemanggilan AI dari halaman itu bergantung pengaturan akunmu, jadi perlu dicek dulu. Cocok untuk prototipe cepat, bukan versi final multi-guru.

## Cara pakai (langkah singkat)
1. Buka AI pembuat aplikasi (mis. AI Studio → Build) pada percakapan baru.
2. **Unggah** semua file di folder `02`–`05` (atau sebanyak yang bisa; prioritas: `types.ts`, kedua JSON, `omml.js`, `lib.js`, `build_soal.js`, `build_kisi.js`, `build_kartu.js`, dan 2–3 contoh `.docx`).
3. Tempel isi **`01_PROMPT_UTAMA.md`** sebagai pesan pertama.
4. Biarkan ia mengerjakan **M1**. Unduh hasil Word-nya, **buka di Microsoft Word**, bandingkan dengan `04_CONTOH_OUTPUT`. Lanjut ke M2 hanya jika M1 sudah rapi.
5. Bila hasil kurang rapi, beri umpan balik spesifik (mis. “tabel kisi-kisi tidak punya sel gabungan”, “equation tampil sebagai teks”) sambil menunjuk file contoh.
6. Satu percakapan per 1–2 milestone agar tidak melampaui batas konteks.

## Hal yang perlu kamu tahu (jujur)
- **Kode referensi diuji di Node.js**, bukan di browser. Porting ke browser perlu penyesuaian (membaca gambar, tanpa `fs`). Ini wajar dan sudah ditulis di prompt.
- Tampilan equation di Word **belum bisa dilihat langsung saat pembuatan contoh** (pratinjau tidak menampilkan equation); strukturnya sudah dibaca-balik dan benar. Pemeriksaan visual final di Word tetap penting.
- AI bisa salah. Validator `cek` menangkap banyak kesalahan hitung, tetapi **soal konsep, konteks, dan teks CP tetap harus dibaca guru**.
- Hasil sedetail contoh **tidak akan muncul dari satu prompt sekali jalan**. Yang membuatnya bagus adalah kombinasi renderer, skema data, validator, dan iterasi per milestone.
- Biaya: panggilan AI untuk satu modul lengkap cukup besar (puluhan ribu token). Jika dipublikasikan untuk banyak guru, perlu kunci API milik sendiri, batas penggunaan, dan sebaiknya server kecil.

## Keputusan yang sebaiknya kamu tetapkan sebelum mulai
1. Hanya untuk dirimu sendiri, atau dibuka untuk guru lain (perlu login, batas pemakaian, biaya API)?
2. Mata pelajaran: Matematika saja dulu, atau semua mapel (pustaka CP perlu diisi dan diverifikasi per mapel)?
3. Jenjang: SMA saja, atau SD–SMP juga (menit per JP, kop, dimensi profil lulusan berbeda)?
