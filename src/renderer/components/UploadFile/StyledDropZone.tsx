/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

// Material components
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';

import useStyles, { dropzoneStyles } from './styles';

export default function StyledDropzone({
  onUploadFile,
  fillsEntireViewPort,
}: {
  onUploadFile: (files: T[]) => void;
  fillsEntireViewPort: boolean;
}) {
  const classes = useStyles();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: '.mp3,audio/*', onDrop: onUploadFile });

  const style = useMemo(
    () => ({
      ...dropzoneStyles.baseStyle,
      ...(isDragActive ? dropzoneStyles.activeStyle : {}),
      ...(isDragAccept ? dropzoneStyles.acceptStyle : {}),
      ...(isDragReject ? dropzoneStyles.rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div
      className={classes.uploadButtonAndIconContainer}
      style={{ height: fillsEntireViewPort ? '94vh' : null }}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {fillsEntireViewPort && <PublishIcon style={{ fontSize: 100 }} />}
        <Button
          variant="contained"
          component="span"
          size="large"
          color="default"
          className={classes.button}
          startIcon={fillsEntireViewPort ? null : <PublishIcon />}
        >
          Drag and drop a MP3 file here, or click to select a MP3 file
        </Button>
      </div>
    </div>
  );
}
