/**
 * The "EventRole" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#conclusion-event-role
 *
 * The EventRole data type defines a role played in an event by a person.
 */

// Enum for Role Types
export enum RoleType {
    Principal = "http://gedcomx.org/Principal", // The principal participant in the event.
    Witness = "http://gedcomx.org/Witness", // A witness to the event.
    Participant = "http://gedcomx.org/Participant", // A general participant in the event.
    Official = "http://gedcomx.org/Official", // The person officiating the event (e.g., a priest or judge).
}

// Interface for EventRole as per GEDCOM X specifications
export interface EventRole {

    /**
     * Reference to the event participant.
     *
     * URI
     *
     * REQUIRED. MUST resolve to an instance of http://gedcomx.org/v1/Person.
     */
    person: string;

    /**
     * Enumerated value identifying the participant's role.
     *
     * Enumerated Value
     *
     * OPTIONAL. If provided, MUST identify a role type, and use of a known role type is RECOMMENDED.
     */
    type?: RoleType;

    /**
     * Details about the role of the participant in the event.
     *
     * string
     *
     * OPTIONAL.
     */
    details?: string;
}