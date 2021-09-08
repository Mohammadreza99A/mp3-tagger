import React, { useState, useEffect, useContext } from 'react';

// Material components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Id3Image from '../../../types/id3Image';
import MetadataContextState from '../../../types/metadataContextState.d';
import { MetadataContext } from '../../../context/MetadataContext';

import useStyles from './styles';

export default function CoverImage({ image }: { image: Id3Image }) {
  const { updateCoverImage } =
    useContext<MetadataContextState>(MetadataContext);

  const [base64Cover, setBase64Cover] = useState<string | null>(null);

  const classes = useStyles();

  const convertBufferToBase64 = (buffer: Uint8Array) => {
    return window.btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
  };

  const handleCoverPhotoUpload = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    if (e.currentTarget.files && e.currentTarget.files?.length >= 1) {
      updateCoverImage(e.currentTarget.files[0].path);
    }
  };

  useEffect(() => {
    if (image && typeof image !== 'string')
      setBase64Cover(convertBufferToBase64(image.imageBuffer));
  }, [image]);

  return (
    <div className={classes.root}>
      {image && typeof image !== 'string' && (
        <>
          <img
            srcSet={`data:image/png;base64,${base64Cover}`}
            alt=""
            className={classes.coverImage}
          />
          <input
            color="primary"
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoUpload}
            id="song-cover-upload-button"
            className={classes.fileInput}
          />
        </>
      )}
      {!image && (
        <Typography
          className={classes.noImage}
          variant="h6"
          component="h3"
          align="center"
        >
          No cover image. Upload one!
        </Typography>
      )}
      {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="song-cover-upload-button" className={classes.fileLabel}>
        <Button
          variant="outlined"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          Upload cover
        </Button>
      </label>
    </div>
  );
}
