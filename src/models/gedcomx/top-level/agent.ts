/**
 * The "Agent" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#agent
 *
 * The Agent data type defines someone or something that curates genealogical data,
 * such as a genealogical researcher, user of software, or organization.
 */

import { Address } from "../component-level/address";
import { Identifier } from "../component-level/identifier";
import { OnlineAccount } from "../component-level/online-account";
import { TextValue } from "../component-level/text-value";
import { Person } from "./person";

// Interface for Agent as per GEDCOM X specifications
export interface Agent {
  /**
   * An identifier for the data structure holding the agent data.
   *
   * string
   *
   * OPTIONAL. The id is to be used as a "fragment identifier" as defined by RFC 3986, Section 3.5.
   * As such, the constraints of the id are provided in the definition of the media type (e.g., XML, JSON) of the data structure.
   */
  id?: string;

  /**
   * A list of identifiers for the agent.
   *
   * List of http://gedcomx.org/v1/Identifier. Order is preserved.
   *
   * OPTIONAL.
   */
  identifiers?: Identifier[];

  /**
   * The name(s) of the person or organization.
   *
   * List of http://gedcomx.org/TextValue. Order is preserved.
   *
   * OPTIONAL. If more than one name is provided, names are assumed to be given in order of preference,
   * with the most preferred name in the first position in the list.
   */
  names?: TextValue[];

  /**
   * The homepage of the person or organization.
   *
   * URI
   *
   * OPTIONAL.
   */
  homepage?: string;

  /**
   * The openid of the person or organization.
   *
   * URI
   *
   * OPTIONAL.
   */
  openid?: string;

  /**
   * The online account(s) of the person or organization.
   *
   * List of http://gedcomx.org/v1/OnlineAccount. Order is preserved.
   *
   * OPTIONAL.
   */
  accounts?: OnlineAccount[];

  /**
   * The email address(es) of the person or organization.
   *
   * List of URI. Order is preserved.
   *
   * OPTIONAL. If provided, MUST resolve to a valid e-mail address (e.g., "mailto:someone@gedcomx.org").
   */
  emails?: string[];

  /**
   * The phone(s) (voice, fax, mobile) of the person or organization.
   *
   * List of URI. Order is preserved.
   *
   * OPTIONAL. If provided, MUST resolve to a valid phone number (e.g., "tel:+1-201-555-0123").
   */
  phones?: string[];

  /**
   * The address(es) of the person or organization.
   *
   * List of http://gedcomx.org/v1/Address. Order is preserved.
   *
   * OPTIONAL.
   */
  addresses?: Address[];

  /**
   * A reference to the person that describes this agent.
   *
   * URI
   *
   * OPTIONAL. MUST resolve to an instance of http://gedcomx.org/v1/Person.
   */
  person?: Person;
}
