// types/gedcom-types.ts

/**
 * Type untuk ID dalam format @I1@, @F1@
 */
export type GedcomId = string;

export interface GEDCOMNode {
  level: number;
  tag: string;
  value?: string;
  children?: GEDCOMNode[];
}

/**
 * Nama individu dengan informasi tambahan
 */
export interface GedcomName {
  full: string; // contoh: "John /Smith/"
  given?: string;
  surname?: string;
  type?: string; // misalnya: BIRT, ALIAS, etc
}

/**
 * Fakta hidup (kelahiran, kematian, dll)
 */
export interface GedcomFact {
  type: string; // misalnya: BIRT, DEAT, MARR
  date?: string;
  place?: string;
  ageAtEvent?: string;
}

/**
 * Individu
 */
export interface Individual {
  id: GedcomId;
  names: GedcomName[];
  gender?: 'M' | 'F' | 'U'; // U = Unknown
  facts: GedcomFact[];
  familiesAsSpouse: GedcomId[]; // list family ID
  familyAsChild?: GedcomId; // satu family ID (keluarga asal)
  notes: GedcomId[]; // referensi ke note
}

/**
 * Keluarga
 */
export interface Family {
  id: GedcomId;
  husbandId?: GedcomId;
  wifeId?: GedcomId;
  childIds: GedcomId[];
  facts: GedcomFact[];
  notes: GedcomId[];
}

/**
 * Sumber (source)
 */
export interface Source {
  id: GedcomId;
  title: string;
  author?: string;
  publicationInfo?: string;
  repository?: GedcomId;
}

/**
 * Repositori sumber
 */
export interface Repository {
  id: GedcomId;
  name: string;
  address?: string;
}

/**
 * Media/file (seperti foto)
 */
export interface Media {
  id: GedcomId;
  file: string;
  title?: string;
  notes: GedcomId[];
}

/**
 * Catatan (note)
 */
export interface Note {
  id: GedcomId;
  text: string;
}

/**
 * Tempat (place)
 */
export interface Place {
  id: GedcomId;
  name: string;
  formalName?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Kutipan (citation)
 */
export interface Citation {
  id: GedcomId;
  sourceId: GedcomId;
  page?: string;
  text?: string;
}

/**
 * Struktur utama hasil parse GEDCOM
 */
export interface ParsedGedcom {
  individuals: Record<GedcomId, Individual>;
  families: Record<GedcomId, Family>;
  sources: Record<GedcomId, Source>;
  repositories: Record<GedcomId, Repository>;
  media: Record<GedcomId, Media>;
  notes: Record<GedcomId, Note>;
  places: Record<GedcomId, Place>;
  citations: Record<GedcomId, Citation>;
}
