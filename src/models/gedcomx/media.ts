export interface Media {
    id: string;
    type: string; // ex: "http://gedcomx.org/DigitalArtifact"
    mediaType?: string; // ex: "image/jpeg"
    contentUrl?: string;
    title?: string;
    about?: string; // ex: "#P-1"
}