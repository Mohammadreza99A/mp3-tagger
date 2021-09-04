import OnlineMetadataTag from './onlineMetadataTag';

export type SearchMetadataContextState = {
  searchQuery: string;
  foundMetadata: OnlineMetadataTag[];
  updateSearchQuery: (updatedQuery: string) => void;
  searchMetadata: (query: string) => void;
  applyOnlineMetadata: (onlineMetadata: OnlineMetadataTag) => void;
};
