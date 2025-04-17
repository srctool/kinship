/**
 * The "ResourceReference" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#resource-reference
 *
 * The ResourceReference JSON type is used for properties that reference other resources. It uses the resource member to refer to other resources.
 */
export interface ResourceReference {

    // The URI to the resource being referenced.
    resource?: string;
}