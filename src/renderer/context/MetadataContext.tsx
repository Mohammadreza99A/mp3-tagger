import React, { createContext, FC, ReactNode, useState } from 'react';
import NodeID3 from 'node-id3';
import { MetadataContextState } from '../types/metadataContextState';

const defaultMetadataContext: MetadataContextState = {
  filePath: '',
  metadata: {},
  updateMetadata: () => {},
  fetchMetadata: () => {},
};

export const MetadataContext = createContext<MetadataContextState>(
  defaultMetadataContext
);

const MetadataProvider: FC = ({ children }: ReactNode) => {
  const [filePath, setFilePath] = useState<string>(
    defaultMetadataContext.filePath
  );
  const [metadata, setMetadata] = useState<NodeID3.Tags>(
    defaultMetadataContext.metadata
  );

  const updateMetadata = (updatedMetadata: NodeID3.Tags): void => {
    setMetadata(updatedMetadata);
  };

  const fetchMetadata = async (filepath: string): Promise<void> => {
    const mp3Metadata: NodeID3.Tags =
      await window.electron.ipcRenderer.uploadMP3File(filepath);

    setFilePath(filepath);
    updateMetadata(mp3Metadata);
  };

  return (
    <MetadataContext.Provider
      value={{
        filePath,
        metadata,
        fetchMetadata,
        updateMetadata,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataProvider;
