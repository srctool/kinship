/**
 * The "Gender" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#gender
 *
 * The Gender data type defines a gender of a person.
 */

export enum GenderType {
    Male = "http://gedcomx.org/Male",
    Female = "http://gedcomx.org/Female",
    Unknown = "http://gedcomx.org/Unknown",
    Intersex = "http://gedcomx.org/Intersex"
}

export interface Gender {
    /**
     * Enumerated value identifying the gender.
     *
     * Enumerated Value
     *
     * REQUIRED. MUST identify a gender type, and use of a known gender type is RECOMMENDED.
     */
    type: GenderType; // ex: "http://gedcomx.org/Male" atau "http://gedcomx.org/Female"
}
