/**
 * The "PlaceDescription" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#place-description
 *
 * The PlaceDescription data type describes the details of a place in terms of its name and possibly its type,
 * time period, and/or a geospatial description -- functioning as a description of a place as a snapshot in time.
 */

import { Date } from '../component-level/date';
import { TextValue } from '../component-level/text-value';

// Enum for Place Types (Optional and implementation-specific)
export enum PlaceType {
  Address = 'http://gedcomx.org/Address', // An address.
  City = 'http://gedcomx.org/City', // A city.
  County = 'http://gedcomx.org/County', // A county.
  Province = 'http://gedcomx.org/Province', // A province.
  State = 'http://gedcomx.org/State', // A state.
  Country = 'http://gedcomx.org/Country', // A country.
}

// Interface for PlaceDescription as per GEDCOM X specifications
export interface PlaceDescription {
  /**
   * A list of standardized (or normalized), fully-qualified names for this place.
   *
   * List of http://gedcomx.org/v1/TextValue. Order is preserved.
   *
   * REQUIRED. The list MUST contain at least one name.
   */
  names: TextValue[];

  /**
   * An implementation-specific uniform resource identifier (URI) used to identify the type of a place.
   *
   * Enumerated Value
   *
   * OPTIONAL. There is no current definition of a set of known place types.
   */
  type?: PlaceType;

  /**
   * An identifier for the place being described.
   *
   * URI
   *
   * OPTIONAL. Descriptions that provide the same value for place are interpreted as alternate descriptions of the same place.
   * If provided, MUST NOT use a base URI of http://gedcomx.org/.
   * If provided, the value MAY resolve to an external resource that is application-specific and outside the scope of this specification.
   */
  place?: string;

  /**
   * A reference to a description of the jurisdiction of this place.
   *
   * URI
   *
   * OPTIONAL. If provided, MUST resolve to an instance of http://gedcomx.org/v1/PlaceDescription.
   */
  jurisdiction?: string;

  /**
   * Angular distance, in degrees, north or south of the Equator (0.0 degrees).
   *
   * double
   *
   * OPTIONAL. If provided, MUST provide longitude also.
   * Values range from −90.0 degrees (south of the equator) to 90.0 degrees (north of the equator).
   */
  latitude?: number;

  /**
   * Angular distance, in degrees, east or west of the Prime Meridian (0.0 degrees).
   *
   * double
   *
   * OPTIONAL. If provided, MUST provide latitude also.
   * Values range from −180.0 degrees (west of the Meridian) to 180.0 degrees (east of the Meridian).
   */
  longitude?: number;

  /**
   * A description of the time period to which this place description is relevant.
   *
   * http://gedcomx.org/v1/Date
   *
   * OPTIONAL.
   */
  temporalDescription?: Date;

  /**
   * A reference to a geospatial description of this place.
   *
   * URI
   *
   * OPTIONAL. It is RECOMMENDED that this geospatial description resolve to a KML document.
   */
  spatialDescription?: string;
}
