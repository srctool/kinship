/**
 * The "Event" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#event
 *
 * The Event data type defines a description of a historical event.
 */

import { Date } from "../component-level/date";
import { EventRole } from "../component-level/event-role";
import { PlaceReference } from "../component-level/place-reference";

/**
 * Known Event Types
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#known-event-types
 *
 *
 */

// Enum for Event Types
export enum EventType {
  Adoption = "http://gedcomx.org/Adoption", // A birth event.
  Birth = "http://gedcomx.org/Birth", // A birth event.
  Census = "http://gedcomx.org/Census", // A census event.
  Christening = "http://gedcomx.org/Christening", // A christening event at birth. Note that this enumerated value does not identify an adult christening.
  Death = "http://gedcomx.org/Death", // A death event.
  Divorce = "http://gedcomx.org/Divorce", // A divorce event.
  Marriage = "http://gedcomx.org/Marriage", // A marriage event.
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
  date?: Date;

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
