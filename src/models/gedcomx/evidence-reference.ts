/**
 * The "EvidenceReference" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#evidence-reference
 *
 * The EvidenceReference data type defines a reference to data being used to derive the given instance of Subject.
 * For example, an "evidence" Subject (i.e., the object holding the EvidenceReference instance)
 * can refer to content extracted from a source (i.e., an "extracted" Subject) as information
 * being used to derive the evidence expressed in this Subject.
 */

import { Attribution } from './attribution';

// Interface for EvidenceReference as per GEDCOM X specifications
export interface EvidenceReference {

    /**
     * Reference to the supporting data.
     *
     * URI
     *
     * REQUIRED. MUST resolve to an instance of http://gedcomx.org/v1/Subject.
     */
    resource: string;

    /**
     * The attribution of this evidence reference.
     *
     * http://gedcomx.org/Attribution
     *
     * OPTIONAL. If not provided, the attribution of the containing resource of the source reference is assumed.
     */
    attribution?: Attribution;
}