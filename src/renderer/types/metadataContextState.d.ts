import NodeID3 from 'node-id3';

export type MetadataContextState = {
  filePath: string;
  metadata: NodeID3.Tags;
};
