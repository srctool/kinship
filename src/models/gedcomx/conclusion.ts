/**
 * The "Conclusion" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#conclusion
 *
 * The Conclusion data type defines the abstract concept for a basic genealogical data item.

 * In formal discussions of the genealogical research process, the term "conclusion"
 * usually has a more specific meaning and is used to refer to an "accepted" hypothesis in accordance
 * with the Genealogical Proof Standard. The name of the Conclusion data type is not meant
 * to be associated with the definition of the term "conclusion" as it is described in the genealogical research process.
 *
 * Rather, the name refers to the notion that any information that is interpreted from an "original"
 * is in some way a "conclusion"—even if the interpreter was diligent
 * in representing the information verbatim as it was found in the original.
 */

import { Attribution } from './attribution';
import { ConfidenceLevel } from './confidence-level';
import { Note } from './note';
import { SourceReference } from './source-reference';

// Interface for Conclusion as per GEDCOM X specifications
export interface Conclusion {

    /**
     * An identifier for the conclusion data.
     *
     * string
     *
     * OPTIONAL. The id is to be used as a "fragment identifier" as defined by RFC 3986, Section 3.5.
     */
    id?: string;

    /**
     * The locale identifier for the conclusion.
     *
     * IETF BCP 47 locale tag
     *
     * OPTIONAL. If not provided, the locale is determined per Internationalization Considerations.
     */
    lang?: string;

    /**
     * The list of references to the sources related to this conclusion.
     *
     * List of http://gedcomx.org/v1/SourceReference. Order is preserved.
     *
     * OPTIONAL. Note that the sources referenced from conclusions are also considered to be sources of the entities that contain them.
     */
    sources?: SourceReference[];

    /**
     * Reference to a document containing analysis supporting this conclusion.
     *
     * URI
     *
     * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Document of type http://gedcomx.org/Analysis.
     */
    analysis?: string;

    /**
     * A list of notes about this conclusion.
     *
     * List of http://gedcomx.org/Note
     *
     * OPTIONAL.
     */
    notes?: Note[];

    /**
     * Reference to a confidence level for this conclusion.
     *
     * Enumerated Value
     *
     * OPTIONAL. If provided, MUST identify a confidence level, and use of a known confidence level is RECOMMENDED.
     */
    confidence?: ConfidenceLevel;

    /**
     * The attribution of this conclusion.
     *
     * http://gedcomx.org/Attribution
     *
     * OPTIONAL. If not provided, the attribution of the containing data set (e.g., file) of the conclusion is assumed.
     */
    attribution?: Attribution;
}