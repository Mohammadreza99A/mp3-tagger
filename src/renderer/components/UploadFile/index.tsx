import React, { useContext } from 'react';

// Material components
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { MetadataContext } from '../../context/MetadataContext';
import useStyles from './styles';

export default function UploadFile() {
  const { fetchMetadata } = useContext(MetadataContext);
  const classes = useStyles();

  async function handleUploadFile(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files?.length >= 1) {
      const filePath: string = e.currentTarget.files[0].path;
      fetchMetadata(filePath);
    }
    e.currentTarget.value = '';
  }

  return (
    <>
      <input
        color="primary"
        type="file"
        onChange={handleUploadFile}
        id="upload-mp3-file-button"
        className={classes.fileInput}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="upload-mp3-file-button" className={classes.fileLabel}>
        <Button
          variant="contained"
          component="span"
          size="large"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          Upload MP3 file
        </Button>
      </label>
    </>
  );
}
