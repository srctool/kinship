/**
 * The "PlaceDescription" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#place-description
 *
 *
 */

import { DateDetail } from './date-detail';
import { TextValue } from './text-value';

// Interface for PlaceDescription as per GEDCOM X specifications
export interface PlaceDescription {
    // A list of standardized (or normalized), fully-qualified names for this place.
    names: TextValue[];

    // An implementation-specific URI used to identify the type of a place.
    type?: string;

    // An identifier for the place being described.
    place?: string;

    // A reference to a description of the jurisdiction of this place.
    jurisdiction?: string;

    // Angular distance, in degrees, north or south of the Equator.
    latitude?: number;

    // Angular distance, in degrees, east or west of the Prime Meridian.
    longitude?: number;

    // A description of the time period to which this place description is relevant.
    temporalDescription?: DateDetail;

    // A reference to a geospatial description of this place.
    spatialDescription?: string;
}