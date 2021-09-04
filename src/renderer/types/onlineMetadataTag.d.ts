import Id3Tags from './id3Tags';

type OnlineMetadataTag = Id3Tags & {
  id?: number;
  genre?: string;
  totalTracnks?: number;
};

export default OnlineMetadataTag;
