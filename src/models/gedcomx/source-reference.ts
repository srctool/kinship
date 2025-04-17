import { Attribution } from './attribution';
import { Qualifier } from './qualifier';


/**
 * The "SourceReference" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#source-reference
 *
 * The SourceReference data type defines a reference to a source description.
 */
export interface SourceReference {
    // Reference to a description of the source being referenced (URI).
    description?: string;

    // The ID of the target source.
    descriptionId?: string;

    // Attribution for this source reference.
    attribution?: Attribution;

    // Qualifiers for the reference, used to identify specific fragments of the source.
    qualifiers?: Qualifier[];
}