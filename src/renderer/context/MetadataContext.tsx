import React, { createContext, FC, ReactNode, useState } from 'react';
import NodeID3 from 'node-id3';
import { MetadataContextState } from '../types/metadataContextState';

const defaultMetadataContext: MetadataContextState = {
  filePath: '',
  fileName: '',
  metadata: {},
  lyrics: '',
  updateLyrics: () => {},
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
  const [fileName, setFileName] = useState<string>(
    defaultMetadataContext.fileName
  );
  const [metadata, setMetadata] = useState<NodeID3.Tags>(
    defaultMetadataContext.metadata
  );
  const [lyrics, setLyrics] = useState<string>(defaultMetadataContext.lyrics);

  const updateMetadata = (updatedMetadata: NodeID3.Tags): void => {
    setMetadata((state) => ({ ...state, ...updatedMetadata }));
  };

  const fetchMetadata = async (
    filepath: string,
    filename: string
  ): Promise<void> => {
    const mp3Metadata: NodeID3.Tags =
      await window.electron.ipcRenderer.uploadMP3File(filepath);

    setFileName(filename);
    setFilePath(filepath);

    setMetadata(mp3Metadata);
    if (
      mp3Metadata.unsynchronisedLyrics &&
      mp3Metadata.unsynchronisedLyrics.text
    )
      setLyrics(mp3Metadata.unsynchronisedLyrics.text);
  };

  const updateLyrics = (newLyrics: string): void => {
    setLyrics(newLyrics);
  };

  const saveMetadata = async (): Promise<void> => {
    if (metadata) {
      const newFilePath = await window.electron.ipcRenderer.updateMP3Tags(
        filePath,
        fileName,
        metadata,
        lyrics
      );

      fetchMetadata(newFilePath, fileName);
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

  const updateFileName = (name: string): void => {
    setFileName(name);
  };

  return (
    <MetadataContext.Provider
      value={{
        filePath,
        fileName,
        metadata,
        lyrics,
        updateLyrics,
        fetchMetadata,
        updateMetadata,
        updateFileName,
        saveMetadata,
        updateCoverImage,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataProvider;
