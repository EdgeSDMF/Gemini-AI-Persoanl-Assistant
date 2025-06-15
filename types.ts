
export enum Feature {
  REPLY_EMAIL = 'Reply to Email',
  CANCEL_SUBSCRIPTION = 'Cancel Subscription',
  MEETING_NOTES = 'Take Meeting Notes',
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ProcessedAiResponse {
  text: string;
  sources: GroundingSource[];
}

// Type for individual items in groundingMetadata.groundingChunks
// This is what we expect from the API based on documentation.
export interface WebGroundingSource {
  web?: { // Making web optional to safely access chunk.web
    uri: string;
    title?: string; 
  };
  // The Part type from @google/genai could also include other fields like 'text', 
  // but for grounding sources we are interested in 'web'.
}
