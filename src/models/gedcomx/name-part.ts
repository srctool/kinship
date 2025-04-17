/**
 * The "NamePart" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#name-part
 *
 * The NamePart data type is used to model a portion of a full name, including the terms that make up that portion.
 * Some name parts may have qualifiers to provide additional semantic meaning to the name part (e.g., "given name" or "surname").
 */

export enum NamePartType {
    Given = "http://gedcomx.org/Given", // Nama depan (e.g., "John")
    Surname = "http://gedcomx.org/Surname", // Nama belakang (e.g., "Doe")
    Prefix = "http://gedcomx.org/Prefix", // Gelar atau awalan (e.g., "Mr.", "Dr.")
    Suffix = "http://gedcomx.org/Suffix", // Akhiran (e.g., "Jr.", "III")
}

/**
 * GEDCOM X Name Part Qualifiers
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/name-part-qualifiers-specification.md
 */

// Enum for NamePartQualifierType as per GEDCOM X specifications
export enum NamePartQualifierType {
    /**
     * A designation for honorifics (e.g., Dr., Rev., His Majesty, Haji), ranks (e.g., Colonel, General, Knight, Esquire),
     * positions (e.g., Count, Chief, Father, King), or other titles (e.g., PhD, MD).
     * Name part qualifiers of type Title SHOULD NOT provide a value.
     */
    Title = "http://gedcomx.org/Title",

    /**
     * A designation for the name of most prominent in importance among the names of that type (e.g., the primary given name).
     * Name part qualifiers of type Primary SHOULD NOT provide a value.
     */
    Primary = "http://gedcomx.org/Primary",

    /**
     * A designation for a name that is not primary in its importance among the names of that type (e.g., a secondary given name).
     * Name part qualifiers of type Secondary SHOULD NOT provide a value.
     */
    Secondary = "http://gedcomx.org/Secondary",

    /**
     * A designation useful for cultures that designate a middle name that is distinct from a given name and a surname.
     * Name part qualifiers of type Middle SHOULD NOT provide a value.
     */
    Middle = "http://gedcomx.org/Middle",

    /**
     * A designation for one's familiar name.
     * Name part qualifiers of type Familiar SHOULD NOT provide a value.
     */
    Familiar = "http://gedcomx.org/Familiar",

    /**
     * A designation for a name given for religious purposes.
     * Name part qualifiers of type Religious SHOULD NOT provide a value.
     */
    Religious = "http://gedcomx.org/Religious",

    /**
     * A name that associates a person with a group, such as a clan, tribe, or patriarchal hierarchy.
     * Name part qualifiers of type Family SHOULD NOT provide a value.
     */
    Family = "http://gedcomx.org/Family",

    /**
     * A designation given by women to their original surname after they adopt a new surname upon marriage.
     * Name part qualifiers of type Maiden SHOULD NOT provide a value.
     */
    Maiden = "http://gedcomx.org/Maiden",

    /**
     * A name derived from a father or paternal ancestor.
     * Name part qualifiers of type Patronymic SHOULD NOT provide a value.
     */
    Patronymic = "http://gedcomx.org/Patronymic",

    /**
     * A name derived from a mother or maternal ancestor.
     * Name part qualifiers of type Matronymic SHOULD NOT provide a value.
     */
    Matronymic = "http://gedcomx.org/Matronymic",

    /**
     * A name derived from associated geography.
     * Name part qualifiers of type Geographic SHOULD NOT provide a value.
     */
    Geographic = "http://gedcomx.org/Geographic",

    /**
     * A name derived from one's occupation.
     * Name part qualifiers of type Occupational SHOULD NOT provide a value.
     */
    Occupational = "http://gedcomx.org/Occupational",

    /**
     * A name derived from a characteristic.
     * Name part qualifiers of type Characteristic SHOULD NOT provide a value.
     */
    Characteristic = "http://gedcomx.org/Characteristic",

    /**
     * A name mandated by law for populations from Congo Free State / Belgian Congo / Congo / Democratic Republic of Congo (formerly Zaire).
     * Name part qualifiers of type Postnom SHOULD NOT provide a value.
     */
    Postnom = "http://gedcomx.org/Postnom",

    /**
     * A grammatical designation for articles (a, the, dem, las, el, etc.), prepositions (of, from, aus, zu, op, etc.),
     * initials, annotations (e.g., twin, wife of, infant, unknown), comparators (e.g., Junior, Senior, younger, little),
     * ordinals (e.g., III, eighth), descendancy words (e.g., ben, ibn, bat, bin, bint, bar), and conjunctions (e.g., and, or, nee, ou, y, o, ne, &).
     * Name part qualifiers of type Particle SHOULD NOT provide a value.
     */
    Particle = "http://gedcomx.org/Particle",

    /**
     * The "root" of a name part as distinguished from prefixes or suffixes. For example, the root of the Polish name "Wilkówna" is "Wilk".
     * A RootName qualifier MUST provide a value property.
     */
    RootName = "http://gedcomx.org/RootName",
}

// Interface for name parts.
export interface NamePart {
    // Type of the name part (e.g., Given, Surname).
    type?: NamePartType;

    // Value of the name part.
    value?: string;
    qualifiers: [

    ]
}