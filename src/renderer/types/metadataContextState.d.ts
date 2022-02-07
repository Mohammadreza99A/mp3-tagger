import NodeID3 from 'node-id3';

export type MetadataContextState = {
  filePath: string;
  fileName: string;
  metadata: NodeID3.Tags;
  updateMetadata: (updatedMetadata: NodeID3.Tags) => void;
  fetchMetadata: (filePath: string) => Promise<void>;
  saveMetadata: () => Promise<void>;
  updateCoverImage: (imageFilePath: string) => void;
};
