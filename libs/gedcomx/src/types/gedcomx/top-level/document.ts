/**
 * The "Document" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#document
 *
 * The Document data type defines the base conceptual model for genealogical data that are managed as textual documents.
 */

import { Attribution } from '../component-level/attribution';

/**
 * Known Document Types
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#known-document-types
 */

// Enum for Document Types
export enum DocumentType {
  Abstract = 'http://gedcomx.org/Abstract', // The document is an abstract of a record or document.
  Analysis = 'http://gedcomx.org/Analysis', // The document is an analysis done by a researcher; a genealogical proof statement is an example of one kind of analysis document.
  Biography = 'http://gedcomx.org/Biography', // A biographical document.
  Correspondence = 'http://gedcomx.org/Correspondence', // A correspondence document (e.g., letter or email).
  Diary = 'http://gedcomx.org/Diary', // A diary or journal document.
  Interview = 'http://gedcomx.org/Interview', // An interview transcript.
  LegalDocument = 'http://gedcomx.org/LegalDocument', // A legal document.
  Newspaper = 'http://gedcomx.org/Newspaper', // A newspaper article.
  Note = 'http://gedcomx.org/Note', // A general note or commentary.
  Transcription = 'http://gedcomx.org/Transcription', // The document is a transcription of a record or document.
  Translation = 'http://gedcomx.org/Translation', // The document is a translation of a record or document.
  Will = 'http://gedcomx.org/Will', // A last will and testament.
}

// Interface for Document as per GEDCOM X specifications
export interface Document {
  /**
   * Enumerated value identifying the type of the document.
   *
   * Enumerated Value
   *
   * OPTIONAL. If provided, MUST identify a document type, and use of a known document type is RECOMMENDED.
   */
  type?: DocumentType;

  /**
   * Whether this document is to be constrained as an extracted conclusion.
   *
   * boolean
   *
   * OPTIONAL. Default: false. Refer to Extracted Conclusion Constraints.
   */
  extracted?: boolean;

  /**
   * The type of text in the text property.
   *
   * string
   *
   * OPTIONAL. If provided, the value MUST be a valid text type. If no value is provided, "plain" is assumed.
   */
  textType?: string;

  /**
   * The text of the document.
   *
   * string
   *
   * REQUIRED.
   */
  text: string;

  /**
   * The attribution of the document.
   *
   * http://gedcomx.org/Attribution
   *
   * OPTIONAL. If not provided, the attribution of the containing data set (e.g., file) of the document is assumed.
   */
  attribution?: Attribution;
}
