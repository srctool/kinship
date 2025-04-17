import { Attribution } from './attribution';
import { Qualifier } from './qualifier';

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