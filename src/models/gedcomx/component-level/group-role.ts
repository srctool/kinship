/**
 * The "GroupRole" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#conclusion-group-role
 *
 * The GroupRole data type defines the data structure used to represent a role of a person in a group.
 * This data type extends the Conclusion data type.
 */

import { Date } from "./date";

// Enum for Role Types
export enum GroupRoleType {
  Head = "http://gedcomx.org/Head", // The head of the group (e.g., head of household).
  Member = "http://gedcomx.org/Member", // A general member of the group.
  Leader = "http://gedcomx.org/Leader", // A leader or organizer of the group.
  Participant = "http://gedcomx.org/Participant", // A participant in the group.
}

// Interface for GroupRole as per GEDCOM X specifications
export interface GroupRole {
  /**
   * Reference to the group participant.
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
   * OPTIONAL. If provided, MUST identify a role type.
   */
  type?: GroupRoleType;

  /**
   * The date of applicability of the role.
   *
   * http://gedcomx.org/v1/Date
   *
   * OPTIONAL.
   */
  date?: Date;

  /**
   * Details about the role of the participant in the group.
   *
   * string
   *
   * OPTIONAL.
   */
  details?: string;
}
