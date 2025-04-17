import { Fact } from './fact';
import { Gender } from './gender';
import { Name } from './name';
import { SourceReference } from './source-reference';

export interface Person {
    id: string;
    names?: Name[];
    gender?: Gender;
    facts?: Fact[];
    sources?: SourceReference[];
}