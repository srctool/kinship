/**
 * The "OnlineAccount" Data Type
 * https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#online-account
 *
 * The OnlineAccount data type defines a description of an account for an online service provider.
 */

// Interface for OnlineAccount as per GEDCOM X specifications
export interface OnlineAccount {

    /**
     * The URI identifying the online service provider that holds the account being described.
     *
     * URI
     *
     * REQUIRED.
     */
    serviceHomepage: string;

    /**
     * The name, label, or id that uniquely identifies the account maintained by the online service provider.
     *
     * string
     *
     * REQUIRED.
     */
    accountName: string;
}