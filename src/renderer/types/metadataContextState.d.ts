import NodeID3 from 'node-id3';

export type MetadataContextState = {
  filePath: string;
  metadata: NodeID3.Tags;
  updateMetadata: (updatedMetadata: NodeID3.Tags) => void;
  fetchMetadata: (filePath: string) => Promise<void>;
};