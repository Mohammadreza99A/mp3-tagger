import React, { createContext, FC, ReactNode, useState } from 'react';
import { SearchMetadataContextState } from '../types/searchMetadataContextState';
import Id3Tags from '../types/id3Tags';

const defaultSearchMetadataContext: SearchMetadataContextState = {
  searchQuery: '',
  foundMetadata: [],
};

export const SearchMetadataContext = createContext<SearchMetadataContextState>(
  defaultSearchMetadataContext
);

const SearchMetadataProvider: FC = ({ children }: ReactNode) => {
  const [searchQuery, setSearchQuery] = useState<string>(
    defaultSearchMetadataContext.searchQuery
  );
  const [metadatas, setMetadatas] = useState<Id3Tags[]>(
    defaultSearchMetadataContext.foundMetadata
  );

  const updateSearchQuery = (updatedSearchQuery: string): void => {
    setSearchQuery(updatedSearchQuery);
  };

  const addMetadata = (metadata: Id3Tags): void => {
    setMetadatas([...metadatas, metadata]);
  };

  const convertMetadataToId3Tag = (
    metadata: Record<string, unknown>
  ): Id3Tags => {
    const id3TagRet: Id3Tags = {};
    if (metadata.title) id3TagRet.title = metadata.title;
    if (metadata.artist && metadata.artist.name)
      id3TagRet.artist = metadata.artist.name;
    if (metadata.album && metadata.album.title)
      id3TagRet.album = metadata.album.title;
    return id3TagRet;
  };

  const searchMetadata = async (query: string): void => {
    const res: Record<string, unknown> =
      await window.electron.ipcRenderer.searchMetadata(query);

    if (res && res.data) {
      res.data.forEach((elem) => {
        addMetadata(convertMetadataToId3Tag(elem));
      });
    }
  };

  return (
    <SearchMetadataContext.Provider
      value={{ searchQuery, updateSearchQuery, searchMetadata }}
    >
      {children}
    </SearchMetadataContext.Provider>
  );
};

export default SearchMetadataProvider;
