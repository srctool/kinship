# Kinship — Aplikasi Silsilah Keluarga dengan Dukungan GEDCOM

<p align="center">
  [<a href="../README.md">English</a>]
</p>

**Kinship** adalah aplikasi *open source* modern silsilah keluarga yang dibangun untuk membantu kamu membuat, menjelajahi, dan berbagi hubungan asal-usul silsilah keluarga.

Aplikasi ini sepenuhnya mendukung file **GEDCOM (.ged)** dan **GEDCOM X (.json)**  untuk *input* dan *output* demi kompatibilitas dengan perangkat lunak genealogi lainnya.

Dirancang dengan mempertimbangkan efisiensi dan keringanan, dapat diperluas (*extensible*), dan mudah digunakan, baik ketika kamu melacak silsilah keluarga, membangun arsip komunitas, atau mengembangkan aplikasi berbasis genealogi.

>Kami mengikuti sistem biner secara konsisten, di mana hanya ada dua kategori yang diakui: laki-laki dan perempuan. Pembagian ini sejalan dengan konsep dasar dalam logika biner, seperti angka 1 dan 0 dalam dunia komputer yang masing-masing punya peran dan makna unik dalam sistem tersebut.

---

## Fitur Unggulan

- **GEDCOM Import & Export**
- **Visualisasi Silsilah Keluarga yang Interaktif**
- **Peta Relasi Keluarga yang Komprehensif** (Orang tua, anak, saudara kandung, pasangan, dan lainnya)
- **Pengenalan Otomatis Tipe Hubungan Keluarga**
- **Struktur Data yang Fleksibel**

---

## Pratinjau (Cuplikan Layar atau Demo)

> Menyusul

## Stack Teknologi

- **Frontend**: [React](https://react.dev/)
- **GEDCOM Parser**: Custom-built or 3rd-party library
- **Storage**: LocalStorage & IndexDB
- **UI**: [Mantine](https://mantine.dev/)

---

## Cara Memulai

```bash
git clone https://github.com/cacing69/Kinship.git
cd Kinship
npm install
npm run dev
