import { Fact } from './fact';
import { ResourceReference } from './resource-reference';
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
    type: RelationshipType; // ex: "http://gedcomx.org/ParentChild"
    person1: ResourceReference;
    person2: ResourceReference;
    facts: Fact[]
}