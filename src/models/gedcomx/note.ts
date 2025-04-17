import { Attribution } from './attribution';

// Interface for Note
export interface Note {
    // The text of the note.
    text?: string;

    // Optional subject of the note.
    subject?: string;

    // Optional type of the note.
    type?: string;

    // Optional attribution for the note.
    attribution?: Attribution;
}