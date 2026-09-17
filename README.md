# 💍 Undangan Pernikahan Digital Modern & Meriah (Vercel Ready)

Website undangan pernikahan digital interaktif, mewah, dan meriah yang dirancang khusus dengan performa tinggi, tampilan responsif (*mobile-first*), dan siap di-hosting secara **100% GRATIS** di platform seperti **Vercel**, **GitHub Pages**, atau **Netlify**.

---

## ✨ Fitur Unggulan

1. 💌 **Cover Amplop Interaktif & Nama Tamu Personal**:
   - Membaca parameter URL otomatis, contoh:  
     `https://domain-anda.vercel.app/?to=Bapak+Joko+&+Keluarga`
   - Tombol "Buka Undangan" dengan transisi elegan sekaligus mengaktifkan musik latar.
2. 🌸 **Efek Meriah (Festive Atmosphere)**:
   - Animasi kanvas kelopak bunga mawar/sakura dan kilauan butiran emas (*gold sparkles & falling petals*).
3. 🎵 **Background Music Player (Floating Disc)**:
   - Tombol piringan hitam mengambang dengan efek rotasi putar dan kontrol Play/Pause.
4. 👰🤵 **Profil Kedua Mempelai Lengkap**:
   - Foto HD berbingkai lengkungan emas, nama lengkap, gelar, orang tua, dan tombol Instagram.
5. 📖 **Love Story Timeline**:
   - Jejak perjalanan cinta dari awal jumpa, pacaran, lamaran, hingga menuju pelaminan.
6. ⏳ **Real-time Countdown Timer**:
   - Hitung mundur hari, jam, menit, dan detik menuju waktu acara.
7. 📅 **Detail Acara & Integrasi Peta**:
   - Akad Nikah & Resepsi lengkap.
   - Tombol 1-klik **"Simpan ke Google Calendar"**.
   - Embed Google Maps interaktif + tombol petunjuk arah langsung ke aplikasi Maps.
   - Rekomendasi palet warna *dresscode*.
8. 🖼️ **Galeri Foto Prewedding & Lightbox**:
   - Grid foto estetik yang bisa diklik untuk memperbesar gambar (*full lightbox modal*).
9. 💳 **Amplop Digital / Tanda Kasih**:
   - Desain kartu bank modern (BCA & Mandiri) dengan tombol **"Salin No. Rekening"** dilengkapi notifikasi toast animasi.
   - Pop-up modal QRIS untuk kemudahan transfer via e-wallet (GoPay, OVO, ShopeePay, Dana, dll).
   - Alamat pengiriman kado fisik.
10. 📝 **Buku Tamu (RSVP) & Ucapan Interaktif**:
    - Konfirmasi kehadiran (Hadir / Ragu-ragu / Tidak Hadir) serta jumlah tamu.
    - Sistem tersimpan langsung di browser (`localStorage`), sehingga tamu langsung melihat ucapannya tampil di daftar doa.

---

## 🚀 Cara Hosting Gratis di Netlify (Paling Mudah: Drag & Drop!)

Karena project ini menggunakan murni **HTML5, CSS3, dan Vanilla JavaScript**, Netlify menyediakannya secara instan tanpa build time.

### Metode 1: Netlify Drop (Cukup Tarik Folder, 10 Detik Online!)
1. Buka browser dan kunjungi: **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Daftar atau login gratis (bisa menggunakan akun Google, Email, atau GitHub).
3. Buka File Explorer di laptop Anda, lalu **tarik (drag & drop) seluruh folder `undangannikahcontoh`** ke kotak yang bertuliskan *"Drag and drop your site output folder here"*.
4. Tunggu 5-10 detik. Website langsung online! 🎉
5. **Ganti Nama Domain Gratis Anda:**
   - Masuk ke menu **Site configuration** > **Change site name**.
   - Masukkan nama unik pilihan Anda, misal: `pernikahan-rizky-amanda`.
   - Domain Anda sekarang menjadi: `https://pernikahan-rizky-amanda.netlify.app`.

### Metode 2: Menggunakan GitHub (Auto Deploy saat Edit)
1. Unggah berkas project ini ke repositori GitHub Anda.
2. Buka **[app.netlify.com](https://app.netlify.com)** > klik **"Add new site"** > **"Import an existing project"**.
3. Pilih **GitHub** dan pilih repositori undangan Anda.
4. Biarkan *Build command* kosong dan *Publish directory* isi dengan `.` (titik atau root).
5. Klik **Deploy site**. Setiap kali Anda mengubah isi file di GitHub, Netlify otomatis memperbarui websitenya!

### Metode 3: Menggunakan Terminal / Netlify CLI
Jalankan perintah berikut di direktori ini:
```bash
npx netlify deploy --prod --dir=.
```

---

## ⚡ Cara Hosting Gratis di Vercel

### Cara 1: Menggunakan GitHub & Vercel Dashboard (Paling Mudah)
1. Unggah folder ini ke repository GitHub Anda (misal beri nama `undangan-nikah`).
2. Kunjungi [vercel.com](https://vercel.com/) dan login menggunakan akun GitHub Anda.
3. Klik tombol **"Add New..."** > **"Project"**.
4. Pilih repository `undangan-nikah` yang baru saja Anda buat.
5. Pada bagian **Framework Preset**, pilih **"Other"** (karena murni Static HTML/CSS/JS).
6. Klik tombol **Deploy**.
7. Dalam hitungan detik, website undangan pernikahan Anda sudah online dengan domain gratis seperti:  
   `https://undangan-nikah-kamu.vercel.app`! 🎉

### Cara 2: Menggunakan Terminal / Vercel CLI
Jalankan perintah berikut di direktori ini:
```bash
npx vercel
```
Ikuti instruksi singkat di terminal (tekan Enter untuk semua pilihan default).

---

## 📲 Cara Membuat Link Undangan Khusus untuk Tamu

Cukup tambahkan query parameter `?to=...` di akhir tautan undangan Anda:

- **Contoh untuk keluarga:**
  `https://undangan-nikah-kamu.vercel.app/?to=Keluarga+Besar+Bpk.+Handoko`
- **Contoh untuk teman kantor:**
  `https://undangan-nikah-kamu.vercel.app/?to=Dwi+Prasetyo`
- **Contoh untuk pasangan:**
  `https://undangan-nikah-kamu.vercel.app/?to=Farhan+%26+Partner`

Nama tamu undangan akan otomatis muncul di amplop depan dan di formulir RSVP!

---

## 🛠️ Cara Kustomisasi Sesuai Kebutuhan Anda

| Bagian yang Ingin Diubah | Lokasi File | Keterangan |
| :--- | :--- | :--- |
| **Nama Mempelai & Orang Tua** | `index.html` (Baris 110 - 150) | Ubah nama mempelai pria, wanita, gelar, dan nama orang tua. |
| **Tanggal & Lokasi Acara** | `index.html` (Baris 200 - 270) | Ubah tanggal, jam, nama gedung, dan link Google Maps. |
| **Target Countdown** | `js/app.js` (Baris 140) | Ubah tanggal target: `new Date('2026-12-12T09:00:00+07:00')`. |
| **Nomor Rekening & Bank** | `index.html` (Baris 320 - 360) | Ubah nomor rekening dan atribut `data-copy-text`. |
| **Foto Prewedding & Profil** | `index.html` | Ganti URL gambar di tag `<img src="...">` dengan foto Anda sendiri. |
| **Lagu Pengantin** | `index.html` (Tag `<audio>`) | Ganti sumber file MP3 lagu pernikahan kesukaan Anda. |

---

*Selamat merayakan hari bahagia! Semoga pernikahan Anda dipenuhi keberkahan dan kebahagiaan abadi.* 💐
