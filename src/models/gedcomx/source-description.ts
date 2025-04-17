/**
 * The "SourceDescription" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/json-format-specification.md#source-description
 */

import { Attribution } from './attribution';
import { Coverage } from './coverage';
import { Identifier } from './identifier';
import { Note } from './note';
import { ResourceReference } from './resource-reference';
import { SourceCitation } from './source-citation';
import { SourceReference } from './source-reference';
import { TextValue } from './text-value';

// Interface for SourceDescription as per GEDCOM X specifications
export interface SourceDescription {
    // The identifier for the JSON object holding the source description data.
    id?: string;

    // URI identifying the type of resource being described.
    resourceType?: string;

    // The citation(s) for this source.
    citations?: SourceCitation[];

    // A hint about the media type of the resource being described.
    mediaType?: string;

    // A uniform resource identifier (URI) for the resource being described.
    about?: string;

    // A reference to the entity that mediates access to the described source.
    mediator?: ResourceReference;

    // A reference to the entity responsible for making the described source available.
    publisher?: ResourceReference;

    // A list of references to the entities that authored the described source.
    authors?: ResourceReference[];

    // A list of references to any sources from which this source is derived.
    sources?: SourceReference[];

    // A reference to a document containing analysis about this source.
    analysis?: ResourceReference;

    // A reference to the source that contains this source.
    componentOf?: SourceReference;

    // The display name(s) for this source.
    titles?: TextValue[];

    // A list of notes about a source.
    notes?: Note[];

    // The attribution of this source.
    attribution?: Attribution;

    // The rights for this resource.
    rights?: ResourceReference[];

    // The coverage of the resource.
    coverage?: Coverage[];

    // Human-readable descriptions of this source.
    descriptions?: TextValue[];

    // A list of identifiers for the resource being described.
    identifiers?: Identifier;

    // Timestamp of when the resource being described was created.
    created?: number; // Milliseconds since epoch

    // Timestamp of when the resource being described was modified.
    modified?: number; // Milliseconds since epoch

    // Timestamp of when the resource being described was published.
    published?: number; // Milliseconds since epoch

    // A reference to the repository that contains the described resource.
    repository?: ResourceReference;
}