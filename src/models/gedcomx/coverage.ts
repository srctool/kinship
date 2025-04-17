import { DateDetail } from './date-detail';
import { PlaceReference } from './place-reference';

/**
 * The "Coverage" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#coverage
 *
 * The Coverage data type defines the data structure used to supply information about the coverage of a resource.
 */
export interface Coverage {

    /**
     * The spatial (i.e., geographic) coverage.
     *
     * http://gedcomx.org/v1/PlaceReference
     *
     * OPTIONAL
     */
    spatial?: PlaceReference;

    /**
     * The temporal coverage.
     *
     * http://gedcomx.org/v1/Date
     *
     * OPTIONAL
     */
    temporal?: DateDetail;
}