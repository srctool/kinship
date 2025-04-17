import { FactQualifierType } from './fact';

// Interface for Qualifier
export interface Qualifier {
    // The name of the qualifier (e.g., "http://gedcomx.org/Page").
    name: string | FactQualifierType;

    // The value of the qualifier (e.g., "Page 42").
    value?: string;
}