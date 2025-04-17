/**
 * The "Event" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#event
 *
 * The Event data type defines a description of a historical event.
 */

import { DateDetail } from './date-detail';
import { EventRole } from './event-role';
import { PlaceReference } from './place-reference';

// Enum for Event Types
export enum EventType {
    Adoption = "http://gedcomx.org/Adoption", // A birth event.
    Birth = "http://gedcomx.org/Birth", // A birth event.
    Census = "http://gedcomx.org/Census", // A census event.
    Christening = "http://gedcomx.org/Christening", // A christening event at birth. Note that this enumerated value does not identify an adult christening.
    Death = "http://gedcomx.org/Death", // A death event.
    Divorce = "http://gedcomx.org/Divorce", // A divorce event.
    Mariage = "http://gedcomx.org/Divorce", // A marriage event.
}

// Interface for Event as per GEDCOM X specifications
export interface Event {

    /**
     * Enumerated value identifying the type of the event.
     *
     * Enumerated Value
     *
     * OPTIONAL. If provided, MUST identify an event type, and use of a known event type is RECOMMENDED.
     */
    type?: EventType;

    /**
     * The date of the event.
     *
     * http://gedcomx.org/v1/Date
     *
     * OPTIONAL.
     */
    date?: DateDetail;

    /**
     * A reference to the place applicable to this event.
     *
     * http://gedcomx.org/v1/PlaceReference
     *
     * OPTIONAL.
     */
    place?: PlaceReference;

    /**
     * Information about how persons participated in the event.
     *
     * List of http://gedcomx.org/v1/EventRole. Order is preserved.
     *
     * OPTIONAL.
     */
    roles?: EventRole[];
}