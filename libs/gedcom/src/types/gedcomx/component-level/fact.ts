/**
 * The "Fact" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#3-fact-conclusion
 *
 * The Fact data type defines a data item that is presumed to be true about a specific subject, such as a person or relationship. To distinguish the concept of "fact" from "event", refer to Events Versus Facts.
 */

import { Date } from './date';
import { PlaceReference } from './place-reference';
import { Qualifier } from './qualifier';

export enum FactType {
  Adoption = 'http://gedcomx.org/Adoption',
  AdultChristening = 'http://gedcomx.org/AdultChristening',
  Apprenticeship = 'http://gedcomx.org/Apprenticeship',
  Arrest = 'http://gedcomx.org/Arrest',
  Baptism = 'http://gedcomx.org/Baptism',
  BarMitzvah = 'http://gedcomx.org/BarMitzvah',
  BasMitzvah = 'http://gedcomx.org/BasMitzvah',
  Birth = 'http://gedcomx.org/Birth',
  Blessing = 'http://gedcomx.org/Blessing',
  Burial = 'http://gedcomx.org/Burial',
  Census = 'http://gedcomx.org/Census',
  Christening = 'http://gedcomx.org/Christening',
  Circumcision = 'http://gedcomx.org/Circumcision',
  Confirmation = 'http://gedcomx.org/Confirmation',
  Cremation = 'http://gedcomx.org/Cremation',
  Death = 'http://gedcomx.org/Death',
  Divorce = 'http://gedcomx.org/Divorce',
  Education = 'http://gedcomx.org/Education',
  Emigration = 'http://gedcomx.org/Emigration',
  Engagement = 'http://gedcomx.org/Engagement',
  Ethnicity = 'http://gedcomx.org/Ethnicity',
  Excommunication = 'http://gedcomx.org/Excommunication',
  FirstCommunion = 'http://gedcomx.org/FirstCommunion',
  Graduation = 'http://gedcomx.org/Graduation',
  Immigration = 'http://gedcomx.org/Immigration',
  Imprisonment = 'http://gedcomx.org/Imprisonment',
  LandTransaction = 'http://gedcomx.org/LandTransaction',
  Marriage = 'http://gedcomx.org/Marriage',
  MilitaryAward = 'http://gedcomx.org/MilitaryAward',
  MilitaryDischarge = 'http://gedcomx.org/MilitaryDischarge',
  MilitaryDraftRegistration = 'http://gedcomx.org/MilitaryDraftRegistration',
  MilitaryInduction = 'http://gedcomx.org/MilitaryInduction',
  MilitaryService = 'http://gedcomx.org/MilitaryService',
  Mission = 'http://gedcomx.org/Mission',
  MoveFrom = 'http://gedcomx.org/MoveFrom',
  MoveTo = 'http://gedcomx.org/MoveTo',
  Nationality = 'http://gedcomx.org/Nationality',
  Naturalization = 'http://gedcomx.org/Naturalization',
  NumberOfChildren = 'http://gedcomx.org/NumberOfChildren',
  NumberOfMarriages = 'http://gedcomx.org/NumberOfMarriages',
  Occupation = 'http://gedcomx.org/Occupation',
  Ordination = 'http://gedcomx.org/Ordination',
  Pardon = 'http://gedcomx.org/Pardon',
  PhysicalDescription = 'http://gedcomx.org/PhysicalDescription',
  Probate = 'http://gedcomx.org/Probate',
  Property = 'http://gedcomx.org/Property',
  Race = 'http://gedcomx.org/Race',
  Religion = 'http://gedcomx.org/Religion',
  Residence = 'http://gedcomx.org/Residence',
  Retirement = 'http://gedcomx.org/Retirement',
  Separation = 'http://gedcomx.org/Separation',
  Stillbirth = 'http://gedcomx.org/Stillbirth',
  Will = 'http://gedcomx.org/Will',
}

export enum FactQualifierType {
  // The age of a person at the event described by the fact.
  Age = 'http://gedcomx.org/Age',

  // The cause of the fact, such as the cause of death.
  Cause = 'http://gedcomx.org/Cause',

  // The religion associated with a religious event such as a baptism or excommunication.
  Religion = 'http://gedcomx.org/Religion',

  // The name of the transport associated with an event that indicates a move.
  Transport = 'http://gedcomx.org/Transport',

  // An indicator that the event occurred non-consensually, e.g., under enslavement.
  NonConsensual = 'http://gedcomx.org/NonConsensual',
}

export interface Fact {
  /**
   * Enumerated value identifying the type of the fact.
   *
   * Enumerated Value
   *
   * REQUIRED. MUST identify a fact type, and use of a known fact type is RECOMMENDED.
   */
  type: FactType; // ex: "http://gedcomx.org/Birth"

  /**
   * The date of applicability of the fact.
   *
   * http://gedcomx.org/v1/Date
   *
   * OPTIONAL
   */
  date?: Date;

  /**
   * A reference to the place applicable to this fact.
   *
   * http://gedcomx.org/v1/PlaceReference
   *
   * OPTIONAL
   */
  place?: PlaceReference;

  /**
   * The value of the fact.
   *
   * string
   *
   * OPTIONAL.
   */
  value?: string;

  /**
   * Qualifiers to add additional details about the fact.
   *
   * List of http://gedcomx.org/v1/Qualifier
   *
   * OPTIONAL. If present, use of a known fact qualifier is RECOMMENDED.
   */
  qualifiers?: Qualifier[];
}
