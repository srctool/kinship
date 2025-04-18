import { SourceDescription } from "../top-level/source-description";
import { Attribution } from "./attribution";
import { Qualifier } from "./qualifier";

/**
 * The "SourceReference" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#source-reference
 *
 * The SourceReference data type defines a reference to a source description.
 */
export interface SourceReference {
  /**
   * Reference to a description of the target source.
   *
   * URI
   *
   * REQUIRED. MUST resolve to an instance of http://gedcomx.org/v1/SourceDescription.
   */
  description?: SourceDescription;

  /**
   * The id of the target source.
   *
   * string
   *
   * OPTIONAL.
   */
  descriptionId?: string;

  /**
   * The attribution of this source reference.
   *
   * http://gedcomx.org/Attribution
   *
   * OPTIONAL. If not provided, the attribution of the containing resource of the source reference is assumed.
   */
  attribution?: Attribution;

  /**
   * Qualifiers for the reference, used to identify specific fragments of the source that are being referenced.
   *
   * List of http://gedcomx.org/v1/Qualifier
   *
   * OPTIONAL. If present, use of a known source reference qualifier is RECOMMENDED.
   */
  qualifiers?: Qualifier[];
}
