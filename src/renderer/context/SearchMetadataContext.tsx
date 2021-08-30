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
  const [foundMetadata, setFoundMetadata] = useState<Id3Tags[]>(
    defaultSearchMetadataContext.foundMetadata
  );
  const updateSearchQuery = (updatedSearchQuery: string): void => {
    setSearchQuery(updatedSearchQuery);
  };

  const searchMetadata = async (query: string): void => {
    setFoundMetadata(defaultSearchMetadataContext.foundMetadata);

    const res: Id3Tags[] = await window.electron.ipcRenderer.searchMetadata(
      query
    );

    setFoundMetadata(res);
  };

  const applyOnlineMetadata = async (onlineMetadata: Id3Tags) => {
    if (onlineMetadata.image && typeof onlineMetadata.image === 'string') {
      try {
        const imageBuff = await axios.get(onlineMetadata.image, {
          responseType: 'arraybuffer',
        });
        onlineMetadata.image = {
          imageBuffer: imageBuff.data,
        };
      } catch (error) {
        delete onlineMetadata.image;
        updateMetadata(onlineMetadata);
      }
    }

    updateMetadata(onlineMetadata);
  };

  useEffect(() => {
    setSearchQuery(`${uploadedMetadata.artist} - ${uploadedMetadata.title}`);
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
