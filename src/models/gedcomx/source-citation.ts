/**
 * The "SourceCitation" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#source-citation
 */
export interface SourceCitation {
    // The text of the citation.
    lang?: string;

    value?: string;
}