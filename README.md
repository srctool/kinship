# Kinship — Family Tree Application with GEDCOM Support

<p align="center">
  [<a href="docs/README-ID.md">Indonesian</a>]
</p>

<div align="center">
  <a href="https://www.figma.com/design/RQDR497Zp1MXpAYxxHVDTs/Kinship?node-id=0-1&p=f&t=jGD1lQyCpMW6lvf0-0"><img src="https://raw.githubusercontent.com/srctool/kinship/refs/heads/main/ui-plan.svg" alt="UI Plan"></a>
</div>

**Frontend Design & Concept**: [Check Figma Here](https://www.figma.com/design/RQDR497Zp1MXpAYxxHVDTs/Kinship?node-id=0-1&p=f&t=jGD1lQyCpMW6lvf0-0)


**Kinship** is a modern, open-source family tree application built to help you create, explore, and share genealogical relationships.

It fully supports **GEDCOM (.ged)** and **GEDCOM X (.json)** file input and output for compatibility with other genealogy software.

Designed to be lightweight, extensible, and user-friendly, whether you're tracing your ancestry, building a community archive, or developing a genealogy-based app.

> We strictly adhere to a binary system, recognizing only two distinct categories: Male and Female. These classifications align with the foundational concept of binary representation, similar to 1 and 0 in computational logic each holding equal and unique significance within this framework.

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

## Tech Stack

- **Frontend**: [React](https://react.dev/)
- **GEDCOM Parser**: Custom-built
- **Storage**: LocalStorage & IndexDB
- **UI**: [Mantine](https://mantine.dev/)
- **Chart & Diagram**: [ReactFlow](https://reactflow.dev/)
- **Design & Concept**: [Figma](https://www.figma.com)

---

## Getting Started

```bash
git clone https://github.com/cacing69/Kinship.git
cd Kinship
npm install
npm run dev
