import { FactQualifierType } from './fact';
import { SourceReferenceQualifier } from './source-reference-qualifier';

// Interface for Qualifier
export interface Qualifier {
  /**
   * The name of the qualifier.
   *
   * Enumerated Value
   *
   * REQUIRED. It is RECOMMENDED that the qualifier name resolve to an element of a constrained vocabulary.
   */
  name: string | FactQualifierType | SourceReferenceQualifier;

  /**
   * The value of the qualifier.
   *
   * string
   *
   * OPTIONAL. If provided, the name MAY give the semantic meaning of the value.
   */
  value?: string;
}
