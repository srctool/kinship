import { Fact } from '../component-level/fact';
import { Gender } from '../component-level/gender';
import { Name } from '../component-level/name';

export interface Person {
  /**
   * Whether this instance of Person has been designated for limited distribution or display.
   *
   * boolean
   *
   * OPTIONAL. A description of how implementations should use private data is outside the scope of this specification.
   */
  private?: boolean;

  id?: string;

  /**
   * The names of the person.
   *
   * List of http://gedcomx.org/v1/Name. Order is preserved.
   *
   * OPTIONAL. If more than one name is provided, names are assumed to be given in order of preference,
   * with the most preferred name in the first position in the list.
   */
  names?: Name[];

  /**
   * The sex of the person as assigned at birth (see "Sex Assignment").
   *
   * http://gedcomx.org/v1/Gender
   *
   * OPTIONAL.
   */
  gender?: Gender;

  /**
   * The facts of the person.
   *
   * List of http://gedcomx.org/v1/Fact. Order is preserved.
   *
   * OPTIONAL.
   */
  facts?: Fact[];
}
