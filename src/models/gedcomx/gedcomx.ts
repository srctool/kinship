import { Media } from './media';
import { Person } from './person';
import { Relationship } from './relationship';
import { SourceDescription } from './source-description';

export interface GedcomX {
    persons?: Person[];
    relationships?: Relationship[];
    sourceDescriptions?: SourceDescription[];
    media?: Media[];
}
