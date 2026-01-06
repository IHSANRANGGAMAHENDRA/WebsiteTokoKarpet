| Variable | Isi |
| -------- | --- |
| *Nama* | IHSAN RANGGA MAHENDRA  |
| *NIM* | 312310494 |
| *Kelas* | TI.23.A5 |
| *Mata Kuliah* | Pemrograman Visual Desktop (UAS)|
| *Dosen Pengampu* | Dr. Muhamad Fatchan, S.Kom., M.Kom|

# WebsiteKarpet

## 🏠 E-Commerce Karpet Modern

**WebsiteKarpet** adalah aplikasi **e-commerce berbasis web** yang dirancang untuk penjualan karpet secara online. Aplikasi ini memudahkan pengelolaan produk dan transaksi dengan antarmuka yang modern dan responsif.

Project ini dikembangkan sebagai **Ujian Akhir Semester (UAS)** pada mata kuliah **Pemrograman Visual Desktop**.

---

## 🌟 Fitur Utama

### 🛒 Fitur Belanja (Client)

*   **Katalog Produk**: Menampilkan daftar karpet dengan gambar dan harga.
*   **Detail Produk**: Informasi lengkap mengenai ukuran, bahan, dan deskripsi karpet.
*   **Keranjang & Checkout**: Proses pembelian yang mudah.
*   **Wishlist**: Simpan produk favorit untuk dibeli nanti.

### ⚙️ Fitur Teknis

*   **Client-Server Architecture**: Pemisahan jelas antara frontend dan backend.
*   **RESTful API**: Komunikasi data yang efisien menggunakan ASP.NET Core Web API.
*   **Database SQL Server**: Penyimpanan data yang relasional dan aman.
*   **Responsive Design**: Tampilan yang menyesuaikan perangkat (Mobile/Desktop) dengan Tailwind CSS.

---

## 🛠️ Teknologi yang Digunakan

### Backend (Server)

*   **ASP.NET Core Web API 9.0**
*   **Entity Framework Core** (ORM)
*   **SQL Server** (Database)
*   **Swagger API Documentation**

### Frontend (Client)

*   **React.js 19** (Vite)
*   **Tailwind CSS** (Styling)
*   **Axios** (HTTP Client)
*   **Lucide React** (Icons)
*   **Framer Motion** (Animations)

---

## 🚀 Cara Menjalankan Aplikasi

### Menjalankan Backend
1.  Buka terminal, masuk ke folder `server`:
    ```bash
    cd server
    ```
2.  Pastikan Connection String di DB sudah sesuai.
3.  Jalankan server:
    ```bash
    dotnet run
    ```
    *Server berjalan di `http://localhost:5000` (atau port default).*

### Menjalankan Frontend
1.  Buka terminal baru, masuk ke folder `client`:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi:
    ```bash
    npm run dev
    ```
4.  Akses di browser: `http://localhost:5173`

---

## 📂 Struktur Project

```
WebsiteKarpet/
├── client/                  # Frontend React (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── layouts/
│   └── package.json
├── server/                  # Backend ASP.NET Core
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
└── README.md                # Dokumentasi Project
```

---

## 📄 Lisensi

© 2026 **WebsiteKarpet** - Project UAS Pemrograman Visual Desktop
