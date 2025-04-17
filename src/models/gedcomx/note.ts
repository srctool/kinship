/**
 * The "Note" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#note
 *
 * The Note data type defines a note that was contributed from genealogical research.
 * Notes are not intended to contain genealogical conclusions.
 * Notes are only associated with a single genealogical resource.
 */

import { Attribution } from './attribution';

// Interface for Note as per GEDCOM X specifications
export interface Note {

    /**
     * The locale identifier for the note.
     *
     * IETF BCP 47 locale tag
     *
     * OPTIONAL. If not provided, the locale is determined per Internationalization Considerations.
     */
    lang?: string;

    /**
     * A subject or title for the note.
     *
     * string
     *
     * OPTIONAL.
     */
    subject?: string;

    /**
     * The text of the note.
     *
     * string
     *
     * REQUIRED.
     */
    text: string;

    /**
     * The attribution of this note.
     *
     * http://gedcomx.org/Attribution
     *
     * OPTIONAL. If not provided, the attribution of the containing resource of the note is assumed.
     */
    attribution?: Attribution;
}