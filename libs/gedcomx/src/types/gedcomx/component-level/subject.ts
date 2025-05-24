/**
 * The "Subject" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#subject
 *
 * The Subject data type defines the abstract concept of a genealogical subject.
 *
 * A "subject" is something with a unique and intrinsic identity, such as a person or a location on the surface of the earth.
 * We identify that subject in time and space using various supporting conclusions.
 * For example, a person is a subject with supporting conclusions such as name, birth, sex, etc.
 * We aggregate these supporting conclusions to form an apparently-unique identity by which we can
 * distinguish our subject from all other possible subjects.
 *
 * Note that a subject is itself a conclusion and can be used as a supporting conclusion for other subjects (via the evidence property).
 * However, not all supporting conclusions are subjects. Researchers may research and debate a fact (e.g. where it took place,
 * when it took place, the spelling of the name, etc.), but it is always within the context of a subject
 * (e.g. where was the person born, when was the person born, how should the person's name be spelled).
 */

import { Conclusion } from './conclusion';
import { EvidenceReference } from './evidence-reference';
import { Identifier } from './identifier';
import { SourceReference } from './source-reference';

// Interface for Subject as per GEDCOM X specifications
export interface Subject extends Conclusion {
  /**
   * Whether this subject is to be constrained as an extracted conclusion.
   *
   * boolean
   *
   * OPTIONAL. Default: false. Refer to Extracted Conclusion Constraints.
   */
  extracted?: boolean;

  /**
   * References to other subjects that support this subject.
   *
   * List of http://gedcomx.org/v1/EvidenceReference. Order is preserved.
   *
   * OPTIONAL. If provided, each reference MUST resolve to an instance of subject of the same type as this instance
   * (e.g., if the subject is an instance of Person, all of its evidence references must resolve to instances of Person).
   */
  evidence?: EvidenceReference[];

  /**
   * References to multimedia resources for this subject, such as photos or videos,
   * intended to provide additional context or illustration for the subject and not considered evidence supporting
   * the identity of the subject or its supporting conclusions.
   *
   * List of http://gedcomx.org/v1/SourceReference
   *
   * OPTIONAL. Media references SHOULD be ordered by priority such that applications that wish to display a single
   * media item (such as an image) MAY choose the first applicable media reference.
   */
  media?: SourceReference[];

  /**
   * A list of identifiers for the subject.
   *
   * List of http://gedcomx.org/v1/Identifier. Order is preserved.
   *
   * OPTIONAL.
   */
  identifiers?: Identifier[];
}
