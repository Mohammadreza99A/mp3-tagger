import React, {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import axios from 'axios';

import { SearchMetadataContextState } from '../types/searchMetadataContextState';
import OnlineMetadataTag from '../types/onlineMetadataTag';
import Id3Tags from '../types/id3Tags';
import { MetadataContext } from './MetadataContext';

const defaultSearchMetadataContext: SearchMetadataContextState = {
  searchQuery: '',
  foundMetadata: [],
  updateSearchQuery: () => {},
  searchMetadata: () => {},
  applyOnlineMetadata: () => {},
};

export const SearchMetadataContext = createContext<SearchMetadataContextState>(
  defaultSearchMetadataContext
);

const SearchMetadataProvider: FC = ({ children }: ReactNode) => {
  const { metadata: uploadedMetadata, updateMetadata } =
    useContext(MetadataContext);

  const [searchQuery, setSearchQuery] = useState<string>(
    defaultSearchMetadataContext.searchQuery
  );
  const [foundMetadata, setFoundMetadata] = useState<OnlineMetadataTag[]>(
    defaultSearchMetadataContext.foundMetadata
  );
  const updateSearchQuery = (updatedSearchQuery: string): void => {
    setSearchQuery(updatedSearchQuery);
  };

  const searchMetadata = async (query: string): void => {
    setFoundMetadata(defaultSearchMetadataContext.foundMetadata);

    const res: OnlineMetadataTag[] =
      await window.electron.ipcRenderer.searchMetadata(query);

    setFoundMetadata(res);
  };

  const applyOnlineMetadata = async (onlineMetadata: OnlineMetadataTag) => {
    const id3Tags: Id3Tags = await window.electron.ipcRenderer.getMetadataById(
      onlineMetadata
    );

    updateMetadata(id3Tags);
  };

  useEffect(() => {
    if (uploadedMetadata.artist)
      setSearchQuery(`${uploadedMetadata.artist} - ${uploadedMetadata.title}`);
    else setSearchQuery(`${uploadedMetadata.title}`);
  }, [uploadedMetadata]);

  return (
    <SearchMetadataContext.Provider
      value={{
        searchQuery,
        foundMetadata,
        updateSearchQuery,
        searchMetadata,
        applyOnlineMetadata,
      }}
    >
      {children}
    </SearchMetadataContext.Provider>
  );
};

export default SearchMetadataProvider;
