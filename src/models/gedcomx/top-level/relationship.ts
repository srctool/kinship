import { Fact } from "../component-level/fact";
import { Person } from "./person";

/**
 * The "Relationship" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/relationship-types-specification.md
 */
export enum RelationshipType {
  Couple = "http://gedcomx.org/Couple",
  ParentChild = "http://gedcomx.org/ParentChild",
  AdoptiveParentChild = "http://gedcomx.org/AdoptiveParentChild",
  FosterParentChild = "http://gedcomx.org/FosterParentChild",
  GuardianParentChild = "http://gedcomx.org/GuardianParentChild",
  EnslavedBy = "http://gedcomx.org/EnslavedBy",
  Godparent = "http://gedcomx.org/Godparent",
  AncestorDescendant = "http://gedcomx.org/AncestorDescendant",
}

export interface Relationship {
  /**
   * Enumerated value identifying the type of the relationship.
   *
   * Enumerated Value
   *
   * OPTIONAL. If provided, MUST identify a relationship type, and use of a known relationship type is RECOMMENDED.
   */
  type: RelationshipType;

  /**
   * Reference to the first person in the relationship.
   *
   * URI
   *
   * REQUIRED. MUST resolve to an instance of http://gedcomx.org/v1/Person
   */
  person1: Person;

  /**
   * Reference to the second person in the relationship.
   *
   * URI
   *
   * REQUIRED. MUST resolve to an instance of http://gedcomx.org/v1/Person
   */
  person2: Person;

  /**
   * The facts about the relationship.
   *
   * List of http://gedcomx.org/v1/Fact. Order is preserved.
   *
   * OPTIONAL.
   */
  facts: Fact[];
}
