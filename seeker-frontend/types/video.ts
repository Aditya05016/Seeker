// This represents a single line or segment of the video transcript
export interface TranscriptSegment {
  text: string;     // The actual words spoken
  start: number;    // The time in seconds when it was said
  duration: number; // How long that sentence lasted
}

// This represents the full data for a video saved in your database
export interface VideoData {
  videoId: string;
  title: string;
  transcript: TranscriptSegment[]; // An array of the segments above
  rawText: string;                 // The full text combined for searching
}