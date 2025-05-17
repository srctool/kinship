/**
 * The "SourceDescription" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/json-format-specification.md#source-description
 */

import { Attribution } from '../component-level/attribution';
import { Coverage } from '../component-level/coverage';
import { Identifier } from '../component-level/identifier';
import { Note } from '../component-level/note';
import { SourceCitation } from '../component-level/source-citation';
import { SourceReference } from '../component-level/source-reference';
import { TextValue } from '../component-level/text-value';
import { Agent } from './agent';

/**
 * Known Resource Types
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#known-resource-types
 *
 *
 */

// temp fix

export type Document = string;

// Enum for ResourceType as per GEDCOM X specifications
export enum ResourceType {
  /**
   * A collection of genealogical resources. A collection may contain physical artifacts (such as a collection of books in a library),
   * records (such as the 1940 U.S. Census), or digital artifacts (such as an online genealogical application).
   */
  Collection = 'http://gedcomx.org/Collection',

  /**
   * A physical artifact, such as a book.
   */
  PhysicalArtifact = 'http://gedcomx.org/PhysicalArtifact',

  /**
   * A digital artifact, such as a digital image of a birth certificate or other record.
   */
  DigitalArtifact = 'http://gedcomx.org/DigitalArtifact',

  /**
   * A historical record, such as a census record or a vital record.
   */
  Record = 'http://gedcomx.org/Record',
}

// Interface for SourceDescription as per GEDCOM X specifications
export interface SourceDescription {
  /**
   * An identifier for the data structure holding the source description data.
   *
   * string
   *
   * OPTIONAL. The id is to be used as a "fragment identifier" as defined by RFC 3986, Section 3.5. As such, the constraints of the id are provided in the definition of the media type (e.g. XML, JSON) of the data structure.
   */
  id?: string;

  /**
   * Enumerated value identifying the type of resource being described.
   *
   * Enumerated Value	OPTIONAL.
   *
   * If provided, MUST identify a resource type, and use of a known resource type is RECOMMENDED.
   */
  resourceType?: ResourceType;

  /**
   * The citation(s) for this source.
   *
   * http://gedcomx.org/v1/SourceCitation. Order is preserved.
   *
   * REQUIRED. At least one citation MUST be provided. If more than one citation is provided, citations are assumed to be given in order of preference, with the most preferred citation in the first position in the list.
   */
  citations?: SourceCitation[];

  /**
   * A hint about the media type of the resource being described.
   *
   * string
   *
   * OPTIONAL. If provided, MUST be a valid MIME (media) type as specified by RFC 4288.
   */
  mediaType?: string;

  /**
   * A uniform resource identifier (URI) for the resource being described.
   *
   * URI
   *
   * OPTIONAL.
   */
  about?: string;

  /**
   * mediator	A reference to the entity that mediates access to the described source.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
   */
  mediator?: Agent;

  /**
   * A reference to the entity responsible for making the described source available.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
   */
  publisher?: Agent;

  /**
   * A reference to the entities that authored the described source.
   *
   * List of URI	OPTIONAL.
   *
   * If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
   */
  authors?: Agent[];

  /**
   * A list of references to any sources from which this source is derived.
   *
   * List of http://gedcomx.org/v1/SourceReference
   *
   * OPTIONAL.
   */
  sources?: SourceReference[];

  /**
   * A reference to a document containing analysis about this source.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Document of type http://gedcomx.org/Analysis.
   */
  analysis?: Document;

  /**
   * A reference to the source that contains this source, i.e. its parent context. Used when the description of a source is not complete without the description of its parent (or containing) source.
   *
   * http://gedcomx.org/v1/SourceReference
   *
   * OPTIONAL.
   */
  componentOf?: SourceReference;

  /**
   * The display name(s) for this source.
   *
   * List of http://gedcomx.org/TextValue. Order is preserved.
   *
   * OPTIONAL. If more than one title is provided, titles are assumed to be given in order of preference,
   * with the most preferred title in the first position in the list.
   */
  titles?: TextValue[];

  /**
   * A list of notes about a source.
   *
   * List of http://gedcomx.org/Note
   *
   * OPTIONAL.
   */
  notes?: Note[];

  /**
   * The attribution of this source description.
   *
   * http://gedcomx.org/Attribution
   *
   * OPTIONAL. If not provided, the attribution of the containing data set (e.g. file) of the source description is assumed.
   */
  attribution?: Attribution;

  /**
   * The rights for this resource.
   *
   * List of URI. Order is preserved.
   *
   * OPTIONAL. If provided, MUST resolve to a resource that describes the rights associated with the resource being described.
   */
  rights?: string[];

  /**
   * The coverage of the resource.
   *
   * List of http://gedcomx.org/v1/Coverage
   *
   * OPTIONAL.
   */
  coverage?: Coverage[];

  /**
   * Human-readable descriptions of this source.
   *
   * List of http://gedcomx.org/TextValue. Order is preserved.
   *
   * OPTIONAL. If more than one description is provided, descriptions are assumed to be given in order of preference,
   * with the most preferred description in the first position in the list.
   */
  descriptions?: TextValue[];

  /**
   * A list of identifiers for the resource being described.
   *
   * List of http://gedcomx.org/v1/Identifier. Order is preserved.
   *
   * OPTIONAL.
   */
  identifiers?: Identifier[];

  /**
   * Timestamp of when the resource being described was created.
   *
   * timestamp
   *
   * OPTIONAL.
   */
  created?: number; // Milliseconds since epoch

  /**
   * Timestamp of when the resource being described was modified.
   *
   * timestamp
   *
   * OPTIONAL.
   */
  modified?: number; // Milliseconds since epoch

  /**
   * Timestamp of when the resource being described was published.
   *
   * timestamp
   *
   * OPTIONAL.
   */
  published?: number; // Milliseconds since epoch

  /**
   * A reference to the repository that contains the described resource.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
   */
  repository?: Agent;
}
