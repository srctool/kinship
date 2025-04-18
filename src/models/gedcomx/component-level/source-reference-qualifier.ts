/**
 * The "SourceReferenceQualifier" Enum
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#known-source-reference-qualifiers
 *
 * The SourceReferenceQualifier enum defines the types of qualifiers that can be applied to source references in genealogical data.
 */

// Enum for SourceReferenceQualifier as per GEDCOM X specifications
export enum SourceReferenceQualifier {
  /**
   * A region of text in a digital document, in the form of a,b where a is the index of the start character and b is the index of the end character.
   * The meaning of this qualifier is undefined if the source being referenced is not a digital document.
   */
  CharacterRegion = "http://gedcomx.org/CharacterRegion",

  /**
   * A rectangular region of a digital image. The value of the qualifier is interpreted as a series of four comma-separated numbers.
   * If all of the numbers are less than 1, the value is interpreted in the form of x1,y1,x2,y2 where x1,y1 is the relative percentage-based
   * coordinates of the top-left corner of the rectangle and x2,y2 is the relative percentage-based coordinates of the bottom-right corner of the rectangle.
   * If any of the numbers is more than 1, the value is interpreted in the form of x,y,w,h where x is the point on the X axis of the image in pixels,
   * y is the point on the Y axis in pixels, w is the width of the rectangle in pixels, and h is the height of the rectangle in pixels.
   */
  RectangleRegion = "http://gedcomx.org/RectangleRegion",

  /**
   * A region of time of a digital audio or video recording, in the form of a,b where a is the starting point in milliseconds and b is the ending point in milliseconds.
   * The meaning of this qualifier is undefined if the source being referenced is not a digital audio or video recording.
   */
  TimeRegion = "http://gedcomx.org/TimeRegion",

  /**
   * A single page in a multi-page document, in the form of a 1-based integer. This value always references the absolute page number,
   * it does not reference any type of custom page number in a multi-page document.
   * The meaning of this qualifier is undefined if the source being referenced is not a multi-page document.
   */
  Page = "http://gedcomx.org/Page",
}
