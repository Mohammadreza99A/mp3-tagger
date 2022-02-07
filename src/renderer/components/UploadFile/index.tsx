/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useCallback } from 'react';

import StyledDropZone from './StyledDropZone';

import { MetadataContext } from '../../context/MetadataContext';

import useStyles from './styles';

export default function UploadFile() {
  const { fetchMetadata, filePath } = useContext(MetadataContext);
  const classes = useStyles();

  const onUploadFile = useCallback(
    (files: T[]) => {
      if (files && files.length >= 1) {
        const chosenFilePath: string = files[0].path;
        const chosenFileName: string = files[0].name;
        fetchMetadata(chosenFilePath, chosenFileName);
      }
    },
    [fetchMetadata]
  );

  return (
    <div className={classes.root}>
      <StyledDropZone
        onUploadFile={onUploadFile}
        fillsEntireViewPort={filePath === ''}
      />
    </div>
  );
}
