/**
 * The "Attribution" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#attribution
 *
 * The Attribution data type defines the data structure used to attribute who, when, and why to genealogical data.
 * Data is attributed to the agent who made the latest significant change to the nature of the data being attributed.
 * The definition of a "significant change" is outside the scope of this specification and is left to the implementer of the application.
 */

import { DateDetail } from './date-detail';
import { ResourceReference } from './resource-reference';

// Interface for Attribution as per GEDCOM X specifications
export interface Attribution {

    /**
     * Reference to the agent to whom the attributed data is attributed.
     *
     * URI
     *
     * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
     */
    contributor?: ResourceReference;


    /**
     * Timestamp of when the attributed data was contributed.
     *
     * timestamp
     *
     * OPTIONAL.
     */
    modified?: DateDetail;

    /**
     * A statement of why the attributed data is being provided by the contributor.
     *
     * string
     *
     * OPTIONAL
     */
    changeMessage?: string;

    /**
     * Reference to the agent that created the attributed data. The creator MAY be different from the contributor if changes were made to the attributed data.
     *
     * URI
     *
     * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/Agent.
     */
    creator?: ResourceReference;

    /**
     * Timestamp of when the attributed data was contributed.
     *
     * timestamp
     *
     * OPTIONAL.
     */
    created?: DateDetail;
}