import React, { createContext, FC, ReactNode, useState } from 'react';
import NodeID3 from 'node-id3';
import { MetadataContextState } from '../types/metadataContextState';

const defaultMetadataContext: MetadataContextState = {
  filePath: '',
  metadata: {},
};

export const MetadataContext = createContext<MetadataContextState>(
  defaultMetadataContext
);

const MetadataProvider: FC = ({ children }: ReactNode) => {
  const [filePath] = useState<string>(defaultMetadataContext.filePath);
  const [metadata] = useState<NodeID3.Tags>(defaultMetadataContext.metadata);

  return (
    <MetadataContext.Provider value={{ filePath, metadata }}>
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataProvider;
