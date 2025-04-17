// Enum for Name Part Types
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
export enum NamePartQualifierType {
    // Common qualifiers
    Nickname = "http://gedcomx.org/Nickname", // A nickname or informal name.
    BirthName = "http://gedcomx.org/BirthName", // The name given at birth.
    MarriedName = "http://gedcomx.org/MarriedName", // The name taken after marriage.
    AlsoKnownAs = "http://gedcomx.org/AlsoKnownAs", // An alias or alternate name.
    ReligiousName = "http://gedcomx.org/ReligiousName", // A name associated with a religious ceremony.
    AdoptiveName = "http://gedcomx.org/AdoptiveName", // A name given upon adoption.
    FormerName = "http://gedcomx.org/FormerName", // A name that is no longer used.

    // Less common qualifiers
    AdultName = "http://gedcomx.org/AdultName", // A name used in adulthood (often after a childhood name).
    AmericanizedName = "http://gedcomx.org/AmericanizedName", // A name that has been Americanized.
    AnglicizedName = "http://gedcomx.org/AnglicizedName", // A name that has been Anglicized.
    CasteName = "http://gedcomx.org/CasteName", // A name associated with a caste or social group.
    CoupledWithSpouse = "http://gedcomx.org/CoupledWithSpouse", // A name shared with a spouse (e.g., "Mr. and Mrs. John Doe").
    FatherlineName = "http://gedcomx.org/FatherlineName", // A name passed down through the father's lineage.
    FictitiousName = "http://gedcomx.org/FictitiousName", // A fictional or made-up name.
    GenericName = "http://gedcomx.org/GenericName", // A generic name (e.g., "Unknown").
    ImmigrantName = "http://gedcomx.org/ImmigrantName", // A name used upon immigration to a new country.
    MaidenName = "http://gedcomx.org/MaidenName", // The surname before marriage.
    MotherlineName = "http://gedcomx.org/MotherlineName", // A name passed down through the mother's lineage.
    OfficialName = "http://gedcomx.org/OfficialName", // A formal or legal name.
    PatronymicName = "http://gedcomx.org/PatronymicName", // A name derived from the father's name.
    PenName = "http://gedcomx.org/PenName", // A pseudonym or pen name used by an author.
    PreferredName = "http://gedcomx.org/PreferredName", // The name preferred by the individual.
    ProfessionalName = "http://gedcomx.org/ProfessionalName", // A name used in a professional context.
    Pseudonym = "http://gedcomx.org/Pseudonym", // A fictitious or assumed name.
    SlaveName = "http://gedcomx.org/SlaveName", // A name given during slavery.
    StageName = "http://gedcomx.org/StageName", // A name used in performance or entertainment.
    TerritorialName = "http://gedcomx.org/TerritorialName", // A name associated with a specific territory or region.
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

// Interface for a Name object as per GEDCOM X specifications
export interface Name {

    // Different forms of the name.
    nameForms?: NameForm[];
}

export interface NameForm {
    // Full text representation of the name.
    fullText?: string;

    // Parts of the name (e.g., given name, surname).
    parts?: NamePart[];
}