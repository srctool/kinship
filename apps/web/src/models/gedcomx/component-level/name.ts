/**
 * The "Name" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#name-conclusion
 *
 * The Name data type defines a name of a person.
 *
 * A Name is intended to represent a single variant of a person's name.
 * This means that nicknames, spelling variations, or other names (often distinguishable by a name type)
 * should be modeled with separate instances of Name.
 *
 * The name forms of a name contain alternate representations of the name.
 * A Name MUST contain at least one name form, presumably a representation of the name that is
 * considered proper and well formed in the person's native, historical cultural context. Other name forms MAY be included, which can be used to represent this name in contexts where the native name form is not easily recognized and interpreted. Alternate forms are more likely in situations where conclusions are being analyzed across cultural context boundaries that have both language and writing script differences.
 *
 * For example, a Korean name has a native Korean form, but can also have a Chinese form and a Roman/Latin
 * form—three different name forms, but each representing the same name.
 *
 * If more than one name form is provided, included name forms are presumed to be given in order of preference,
 * with the most preferred name form in the first position in the list.
 */

import { Date } from './date';
import { NameForm } from './name-form';

// Enum for NameType as per GEDCOM X specifications
export enum NameType {
  /**
   * Name given at birth.
   */
  BirthName = 'http://gedcomx.org/BirthName',

  /**
   * Name accepted at marriage.
   */
  MarriedName = 'http://gedcomx.org/MarriedName',

  /**
   * "Also known as" name.
   */
  AlsoKnownAs = 'http://gedcomx.org/AlsoKnownAs',

  /**
   * Nickname.
   */
  Nickname = 'http://gedcomx.org/Nickname',

  /**
   * Name given at adoption.
   */
  AdoptiveName = 'http://gedcomx.org/AdoptiveName',

  /**
   * A formal name, usually given to distinguish it from a name more commonly used.
   */
  FormalName = 'http://gedcomx.org/FormalName',

  /**
   * A name given at a religious rite or ceremony.
   */
  ReligiousName = 'http://gedcomx.org/ReligiousName',
}

// Interface for a Name object as per GEDCOM X specifications
export interface Name {
  /**
   * The name form(s) that best express this name,
   * usually representations considered proper and well formed in the person's native, historical cultural context.
   *
   * List of http://gedcomx.org/v1/NameForm. Order is preserved.
   *
   * REQUIRED. At least one name form MUST be provided. All included name forms SHOULD be representations of the same name,
   * and NOT variants of the name (i.e., not nicknames or spelling variations).
   */
  nameForms?: NameForm[];

  /**
   * The date of applicability of the name.
   *
   * http://gedcomx.org/v1/Date
   *
   * OPTIONAL.
   */
  date?: Date;

  /**
   * Enumerated value identifying the name type.
   *
   * Enumerated Value
   *
   * OPTIONAL. If provided, MUST identify a name type, and use of a known name type is RECOMMENDED.
   */
  type?: NameType;
}
