import React, { useState, useEffect, ChangeEvent, useContext } from 'react';

// Material components
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { MetadataContext } from '../../../context/MetadataContext';
import Id3Tags from '../../../types/id3Tags';

export default function ID3Tags() {
  const { updateMetadata, metadata } = useContext(MetadataContext);

  const [rows, setRows] = useState<Id3Tags>({});

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateMetadata({
      ...metadata,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    const newRows: Id3Tags = {
      artist: metadata.artist ? metadata.artist : '',
      title: metadata.title ? metadata.title : '',
      album: metadata.album ? metadata.album : '',
      genre: metadata.genre ? metadata.genre : '',
      year: metadata.year ? metadata.year : '',
      trackNumber: metadata.trackNumber ? metadata.trackNumber : '',
    };
    setRows(newRows);
  }, [metadata]);

  return (
    <>
      {Object.keys(rows).length !== 0 &&
        Object.keys(rows).map((key: string) => (
          <TableRow key={key}>
            <TableCell component="th" scope="row">
              {key[0].toUpperCase() + key.substring(1).toLowerCase()}
            </TableCell>
            <TableCell align="right">
              <TextField
                size="small"
                id={key}
                label={key[0].toUpperCase() + key.substring(1).toLowerCase()}
                variant="outlined"
                value={rows[key]}
                onChange={handleTagInputChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
