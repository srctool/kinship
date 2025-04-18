import { NamePart } from "./name-part";

export interface NameForm {
  /**
   * A full rendering of the name (or as much of the name as is known).
   *
   * string
   *
   * OPTIONAL. If provided, the name SHOULD be rendered as it would normally be spoken in the applicable cultural context.
   */
  fullText?: string;

  /**
   * The locale identifier for the name form.
   *
   * IETF BCP 47 locale tag
   *
   * OPTIONAL. If not provided, the locale is determined per Internationalization Considerations.
   */
  lang?: string;

  /**
   * Any identified name parts from the name.
   *
   * List of http://gedcomx.org/v1/NamePart. Order is preserved.
   *
   * OPTIONAL. If provided, the list SHOULD be ordered such that the parts are in the order they would normally be spoken in the applicable cultural context.
   */
  parts?: NamePart[];
}
