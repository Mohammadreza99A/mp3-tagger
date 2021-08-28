import Id3Tags from './id3Tags';

export type SearchMetadataContextState = {
  searchQuery: string;
  foundMetadata: Id3Tags[];
};
