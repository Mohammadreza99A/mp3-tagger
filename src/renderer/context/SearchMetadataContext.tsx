import React, {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import { SearchMetadataContextState } from '../types/searchMetadataContextState';
import Id3Tags from '../types/id3Tags';
import { MetadataContext } from './MetadataContext';

const defaultSearchMetadataContext: SearchMetadataContextState = {
  searchQuery: '',
  foundMetadata: [],
  updateSearchQuery: () => {},
  searchMetadata: () => {},
};

export const SearchMetadataContext = createContext<SearchMetadataContextState>(
  defaultSearchMetadataContext
);

const SearchMetadataProvider: FC = ({ children }: ReactNode) => {
  const { metadata: uploadedMetadata } = useContext(MetadataContext);

  const [searchQuery, setSearchQuery] = useState<string>(
    defaultSearchMetadataContext.searchQuery
  );
  const [foundMetadata, setFoundMetadata] = useState<Id3Tags[]>(
    defaultSearchMetadataContext.foundMetadata
  );
  const updateSearchQuery = (updatedSearchQuery: string): void => {
    setSearchQuery(updatedSearchQuery);
  };

  const addMetadata = (metadata: Id3Tags): void => {
    setFoundMetadata((state) => [...state, metadata]);
  };

  const convertMetadataToId3Tag = (
    metadata: Record<string, unknown>
  ): Id3Tags => {
    const id3TagRet: Id3Tags = {};

    if (metadata.name) id3TagRet.title = metadata.name;

    if (metadata.artists && metadata.artists.length >= 1)
      id3TagRet.artist = metadata.artists[0].name;

    if (metadata.album) {
      if (metadata.album.name) id3TagRet.album = metadata.album.name;

      if (metadata.album.images && metadata.album.images.length >= 1) {
        id3TagRet.image = metadata.album.images[0].url;
      }
    }

    if (metadata.track_number) id3TagRet.trackNumber = metadata.track_number;

    return id3TagRet;
  };

  const searchMetadata = async (query: string): void => {
    const res: Record<string, unknown> =
      await window.electron.ipcRenderer.searchMetadata(query);

    setFoundMetadata(defaultSearchMetadataContext.foundMetadata);

    if (res && res.tracks && res.tracks.items) {
      res.tracks.items.forEach((elem) => {
        addMetadata(convertMetadataToId3Tag(elem));
      });
    }
  };

  useEffect(() => {
    setSearchQuery(`${uploadedMetadata.artist} - ${uploadedMetadata.title}`);
  }, [uploadedMetadata]);

  return (
    <SearchMetadataContext.Provider
      value={{ searchQuery, foundMetadata, updateSearchQuery, searchMetadata }}
    >
      {children}
    </SearchMetadataContext.Provider>
  );
};

export default SearchMetadataProvider;
