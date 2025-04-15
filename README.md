# Kinship — Family Tree Application with GEDCOM Support

**Kinship** is an open-source family tree application built to help you create, explore, and share genealogical relationships.
It fully supports **GEDCOM (.ged)** file input and output for compatibility with other genealogy software.

Designed to be lightweight, extensible, and user-friendly — whether you're tracing your ancestry, building a community archive, or developing a genealogy-based app.

---

## Key Features

- **GEDCOM Import & Export**
- **Interactive Family Tree Visualization**
- **Comprehensive Kinship Mapping** (parents, children, siblings, spouses, and more)
- **Auto-detected Relationship Types**
- **Customizable Data Structure**

---

## Preview (Screenshot or Demo)

> Soon

---

## GEDCOM Support

This app supports **GEDCOM 5.5/5.5.1** format, including tags such as:

- `INDI` (Individual)
- `FAM` (Family)
- `BIRT`, `DEAT`, `MARR`, `DIV`
- `FAMC` (Child in family), `FAMS` (Spouse in family)
- `NOTE`, `PLAC`, and other events

---

## Tech Stack

- **Frontend**: React
- **GEDCOM Parser**: Custom-built or 3rd-party library
- **Storage**: LocalStorage & IndexDB

---

## Getting Started

```bash
git clone https://github.com/cacing69/Kinship.git
cd kinship
npm install
npm run dev
