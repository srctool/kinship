/**
 * The "Identifier" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#identifier-type
 *
 * The Identifier data type defines the data structure used to supply an identifier of a genealogical resource.
 * The Identifier data type does NOT support extension properties (see Extension Properties)
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#extension-properties
 *
 *
 *
 */

/**
 * Known identifier types
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#known-identifier-types
 */

export enum IdentifierType {
  // The primary identifier for the resource.
  Primary = 'http://gedcomx.org/Primary',

  // An identifier for the resource in an external authority or expert system.
  Authority = 'http://gedcomx.org/Authority',

  // An identifier that has been deprecated or downgraded.
  Deprecated = 'http://gedcomx.org/Deprecated',
}

export interface Identifier {
  /**
   * The value of the identifier.
   *
   * URI
   *
   * REQUIRED.
   */
  value?: string;

  /**
   * Enumerated value that identifies how the identifier is to be used and the nature of the resource to which the identifier resolves.
   *
   * Enumerated Value
   *
   * OPTIONAL. If provided, MUST identify an identifier type, and use of a known identifier type is RECOMMENDED.
   * If no type is provided, the usage and nature of the identifier is application-specific.
   */
  type?: IdentifierType;
}
