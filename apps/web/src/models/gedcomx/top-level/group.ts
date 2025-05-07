/**
 * The "Group" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#group
 *
 * The Group data type describes a group of of persons. The concept of a "group" captures institutional associations
 * between persons that may or may not have direct familial relations between each other.
 * Examples of a group could include plantations, orphanages, or military units.
 */

import { Date } from '../component-level/date';
import { GroupRole } from '../component-level/group-role';
import { PlaceReference } from '../component-level/place-reference';
import { TextValue } from '../component-level/text-value';

// Interface for Group as per GEDCOM X specifications
export interface Group {
  /**
   * A list of names of the group.
   *
   * List of http://gedcomx.org/v1/TextValue. Order is preserved.
   *
   * REQUIRED. The list MUST contain at least one name.
   */
  names: TextValue[];

  /**
   * The date of applicability of the group.
   *
   * http://gedcomx.org/v1/Date
   *
   * OPTIONAL.
   */
  date?: Date;

  /**
   * A reference to the place applicable to this group.
   *
   * http://gedcomx.org/v1/PlaceReference
   *
   * OPTIONAL.
   */
  place?: PlaceReference;

  /**
   * Information about how persons were associated with the group.
   *
   * List of http://gedcomx.org/v1/GroupRole. Order is preserved.
   *
   * OPTIONAL.
   */
  roles?: GroupRole[];
}
