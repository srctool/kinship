/**
 * The "PlaceReference" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#conclusion-place-reference
 *
 * The PlaceReference data type defines a reference to a description of a place.
 */

export interface PlaceReference {
  /**
   * The original place name text as supplied by the contributor.
   *
   * string
   *
   * OPTIONAL
   */
  original?: string;

  /**
   * A reference to a description of this place.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to a PlaceDescription.
   */
  descriptionRef?: string;
}
