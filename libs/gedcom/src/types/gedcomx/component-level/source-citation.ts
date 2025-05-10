/**
 * The "SourceCitation" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#source-citation
 */
export interface SourceCitation {
  /**
   * The locale identifier for the bibliographic metadata.
   *
   * IETF BCP 47 locale tag
   *
   * OPTIONAL. If not provided, the locale is determined per Internationalization Considerations.
   */
  lang?: string;

  /**
   * The bibliographic metadata rendered as a full citation.
   *
   * string
   *
   * REQUIRED. This string is plain text, but MAY include an xhtml cite element.
   * If the value includes a cite element, the text-level semantics defined for cite MUST apply—i.e.,
   * the element MUST represent the title of a work.
   */
  value?: string;
}
