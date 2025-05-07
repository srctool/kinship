/**
 * The "TextValue" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#text-value
 *
 * The TextValue data type defines a literal text value.
 * The TextValue data type does NOT support extension properties (see Extension Properties).
 */

// Interface for Text Value
export interface TextValue {
  /**
   * The locale identifier for the value of the text.
   *
   * IETF BCP 47 locale tag
   *
   * OPTIONAL. If not provided, the locale is determined per Internationalization Considerations.
   */
  lang?: string;

  /**
   * The text value.
   *
   * string
   *
   * REQUIRED.
   */
  value: string;
}
