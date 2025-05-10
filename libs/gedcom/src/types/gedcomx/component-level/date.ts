/**
 * The "Date" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#conclusion-date
 *
 * The Date data type defines a genealogical date.
 */
export interface Date {
  /**
   * The original value of the date as supplied by the contributor.
   *
   * string
   *
   * OPTIONAL
   */
  original?: string;

  /**
   * The standardized formal value of the date, formatted according to the GEDCOM X Date Format specification.
   *
   * GEDCOM X DATE
   * https://github.com/FamilySearch/gedcomx/blob/master/specifications/date-format-specification.md
   *
   * OPTIONAL
   */
  formal?: string;
}
