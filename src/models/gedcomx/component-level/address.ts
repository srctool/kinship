/**
 * The "Address" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#address
 *
 * The Address data type defines a street or postal address of a person or organization.
 */

// Interface for Address as per GEDCOM X specifications
export interface Address {
  /**
   * A full representation of the complete address.
   *
   * string
   *
   * OPTIONAL.
   */
  value?: string;

  /**
   * The city.
   *
   * string
   *
   * OPTIONAL.
   */
  city?: string;

  /**
   * The country.
   *
   * string
   *
   * OPTIONAL.
   */
  country?: string;

  /**
   * The postal code.
   *
   * string
   *
   * OPTIONAL.
   */
  postalCode?: string;

  /**
   * The state or province.
   *
   * string
   *
   * OPTIONAL.
   */
  stateOrProvince?: string;

  /**
   * The street (first line).
   *
   * string
   *
   * OPTIONAL.
   */
  street?: string;

  /**
   * The street (second line).
   *
   * string
   *
   * OPTIONAL.
   */
  street2?: string;

  /**
   * The street (third line).
   *
   * string
   *
   * OPTIONAL.
   */
  street3?: string;

  /**
   * The street (fourth line).
   *
   * string
   *
   * OPTIONAL.
   */
  street4?: string;

  /**
   * The street (fifth line).
   *
   * string
   *
   * OPTIONAL.
   */
  street5?: string;

  /**
   * The street (sixth line).
   *
   * string
   *
   * OPTIONAL.
   */
  street6?: string;
}
