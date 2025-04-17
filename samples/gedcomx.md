# Penjelasan

**GEDCOM X** adalah evolusi dari format GEDCOM tradisional. Dikembangkan oleh [FamilySearch](https://www.familysearch.org/), GEDCOM X dirancang untuk mengatasi keterbatasan GEDCOM dengan menambahkan fitur-fitur modern yang lebih sesuai dengan kebutuhan aplikasi genealogi saat ini.

- **Format File** : JSON atau XML.
- **Ekstensi File** : `.json` (untuk JSON) atau `.xml` (untuk XML).
- **Keunggulan** :
    - Mendukung metadata yang lebih kaya, seperti sumber referensi, bukti dokumen, dan catatan sejarah.
    - Mendukung hubungan keluarga yang lebih kompleks, termasuk hubungan adopsi, pernikahan poligami, dan lainnya.
    - Lebih mudah diintegrasikan dengan aplikasi modern karena menggunakan format JSON/XML.
    - Mendukung penyimpanan media digital (gambar, dokumen, video) sebagai bagian dari data silsilah.

## Contoh Struktur GEDCOM X dalam format JSON

```json
{
  "persons": [
    {
      "id": "p1",
      "names": [
        {
          "nameForms": [
            {
              "fullText": "John Doe"
            }
          ]
        }
      ],
      "gender": {
        "type": "http://gedcomx.org/Male"
      },
      "facts": [
        {
          "type": "http://gedcomx.org/Birth",
          "date": {
            "original": "1 January 1980"
          },
          "place": {
            "original": "New York, USA"
          }
        }
      ]
    }
  ]
}
```

## Contoh Struktur Lengkap Dengan Relasi GEDCOM X dalam format JSON

```json
{
    "persons": [
        {
            "id": "P1",
            "names": [
                {
                    "nameForms": [
                        {
                            "fullText": "John Doe"
                        }
                    ]
                }
            ],
            "gender": {
                "type": "http://gedcomx.org/Male"
            },
            "facts": [
                {
                    "type": "http://gedcomx.org/Birth",
                    "date": {
                        "original": "1950-05-20"
                    },
                    "place": {
                        "original": "New York, USA"
                    }
                }
            ]
        },
        {
            "id": "P2",
            "names": [
                {
                    "nameForms": [
                        {
                            "fullText": "Jane Smith"
                        }
                    ]
                }
            ],
            "gender": {
                "type": "http://gedcomx.org/Female"
            },
            "facts": [
                {
                    "type": "http://gedcomx.org/Birth",
                    "date": {
                        "original": "1955-08-10"
                    },
                    "place": {
                        "original": "Boston, USA"
                    }
                }
            ]
        },
        {
            "id": "P3",
            "names": [
                {
                    "nameForms": [
                        {
                            "fullText": "Emily Doe"
                        }
                    ]
                }
            ],
            "gender": {
                "type": "http://gedcomx.org/Female"
            },
            "facts": [
                {
                    "type": "http://gedcomx.org/Birth",
                    "date": {
                        "original": "1980-03-15"
                    },
                    "place": {
                        "original": "Chicago, USA"
                    }
                }
            ]
        }
    ],
    "relationships": [
        {
            "id": "R1",
            "type": "http://gedcomx.org/Couple",
            "person1": {
                "resource": "#P1"
            },
            "person2": {
                "resource": "#P2"
            },
            "facts": [
                {
                    "type": "http://gedcomx.org/Marriage",
                    "date": {
                        "original": "1975-06-30"
                    },
                    "place": {
                        "original": "New York, USA"
                    }
                }
            ]
        },
        {
            "id": "R2",
            "type": "http://gedcomx.org/ParentChild",
            "person1": {
                "resource": "#P1"
            },
            "person2": {
                "resource": "#P3"
            }
        },
        {
            "id": "R3",
            "type": "http://gedcomx.org/ParentChild",
            "person1": {
                "resource": "#P2"
            },
            "person2": {
                "resource": "#P3"
            }
        }
    ],
    "sources": [
        {
            "id": "S1",
            "description": "Birth certificate for Emily Doe",
            "about": "https://example.com/emily-birth-record"
        }
    ]
}
```

## Referensi Gedcom X

- [GEDCOM X Official Documentation](http://gedcomx.org/)
- [GEDCOM X JSON Format Specification](https://github.com/FamilySearch/gedcomx/blob/master/specifications/json-format-specification.md)
- [GEDCOM X XML Format Specification](https://github.com/FamilySearch/gedcomx/blob/master/specifications/xml-format-specification.md)