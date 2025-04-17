# Penjelasan

**GEDCOM** (Genealogical Data Communication) adalah format file standar yang digunakan untuk bertukar data silsilah keluarga antara perangkat lunak genealogi yang berbeda. Format ini dikembangkan oleh **The Church of Jesus Christ of Latter-day Saints (LDS Church)** pada tahun 1984 dan telah menjadi standar de facto dalam industri genealogi.

- **Format File** : Teks biasa (plain text) dengan struktur berbasis tag
- **Ekstensi File** : `.ged`
- **Keunggulan** :
    - Kompatibel dengan banyak aplikasi genealogi (misalnya: My Family Tree, Family Tree Maker, Gramps, Ancestry.com).
    - Mudah dibaca dan diedit secara manual jika diperlukan.
- **Keterbatasan** : Format yang sudah tua, sehingga memiliki keterbatasan dalam hal representasi data modern seperti media digital, metadata kompleks, atau hubungan non-tradisional.

## Contoh Struktur Sederhana

```gedcom
0 HEAD
1 SOUR MyGenealogyApp
2 VERS 1.0
1 DEST ANY
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
1 BIRT
2 DATE 1 JAN 1980
2 PLAC New York, USA
0 TRLR
```

## Contoh Struktur Lengkap Dengan Relasi

```gedcom
0 HEAD
1 SOUR ChatGPT
1 GEDC
2 VERS 5.5
2 FORM LINEAGE-LINKED
1 CHAR UTF-8

0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
1 BIRT
2 DATE 20 MAY 1950
2 PLAC New York, USA

0 @I2@ INDI
1 NAME Jane /Smith/
1 SEX F
1 BIRT
2 DATE 10 AUG 1955
2 PLAC Boston, USA

0 @I3@ INDI
1 NAME Emily /Doe/
1 SEX F
1 BIRT
2 DATE 15 MAR 1980
2 PLAC Chicago, USA

0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 CHIL @I3@
1 MARR
2 DATE 30 JUN 1975
2 PLAC New York, USA

0 TRLR

```

## Penjelasan Struktur

- `@I1@`, `@I2@`, `@I3@` → Individu dengan ID unik.
- `@F1@` → Keluarga, menghubungkan John dan Jane sebagai pasangan dan Emily sebagai anak mereka.
- `NAME` menggunakan format `Nama /Marga/`.
- Semua tanggal pakai format `DD MMM YYYY` (standar GEDCOM).
- `HEAD` dan `TRLR` adalah bagian pembuka dan penutup file GEDCOM.
