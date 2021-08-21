import React, { useState, useEffect } from 'react';

import Id3Image from '../../../types/id3Image';

import useStyles from './styles';

export default function CoverImage({ image }: { image: Id3Image }) {
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

  useEffect(() => {
    if (image && typeof image !== 'string')
      setBase64Cover(convertBufferToBase64(image.imageBuffer));
  }, [image]);

  return (
    <div className={classes.root}>
      <img
        srcSet={`data:image/png;base64,${base64Cover}`}
        alt=""
        className={classes.coverImage}
      />
    </div>
  );
}
