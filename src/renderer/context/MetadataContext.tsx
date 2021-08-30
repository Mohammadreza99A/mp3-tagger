import React, { createContext, FC, ReactNode, useState } from 'react';
import NodeID3 from 'node-id3';
import { MetadataContextState } from '../types/metadataContextState';

const defaultMetadataContext: MetadataContextState = {
  filePath: '',
  metadata: {},
  updateMetadata: () => {},
  fetchMetadata: () => {},
  saveMetadata: () => {},
  updateCoverImage: () => {},
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
    setMetadata((state) => ({ ...state, ...updatedMetadata }));
  };

  const fetchMetadata = async (filepath: string): Promise<void> => {
    const mp3Metadata: NodeID3.Tags =
      await window.electron.ipcRenderer.uploadMP3File(filepath);

    setFilePath(filepath);
    updateMetadata(mp3Metadata);
  };

  const saveMetadata = async (): Promise<void> => {
    if (metadata) {
      await window.electron.ipcRenderer.updateMP3Tags(filePath, metadata);
      fetchMetadata(filePath);
    }
  };

  const updateCoverImage = async (imageFilePath: string): void => {
    if (metadata.image && typeof metadata.image !== 'string') {
      const uploadedCoverBuffer: Buffer =
        await window.electron.ipcRenderer.uploadMP3CoverPhoto(imageFilePath);
      const updatedMetadata: NodeID3.Tags = {
        ...metadata,
        image: {
          ...metadata.image,
          imageBuffer: uploadedCoverBuffer,
        },
      };
      updateMetadata(updatedMetadata);
    }
  };

  return (
    <MetadataContext.Provider
      value={{
        filePath,
        metadata,
        fetchMetadata,
        updateMetadata,
        saveMetadata,
        updateCoverImage,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataProvider;
