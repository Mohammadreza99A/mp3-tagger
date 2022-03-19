import React, { useState, useContext, useEffect } from 'react';

// Material components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MetadataContext } from '../../../context/MetadataContext';

export default function Lyrics() {
  const [open, setOpen] = useState(false);
  const [newLyrics, setNewLyrics] = useState<string>('');

  const { lyrics, updateLyrics } = useContext(MetadataContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEdit = () => {
    updateLyrics(newLyrics);
    handleClose();
  };

  const handleLyricsTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLyrics(e.currentTarget.value);
  };

  useEffect(() => {
    setNewLyrics(lyrics);
  }, [lyrics]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add/Edit Lyrics
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add/edit the lyrics by writing it down blew.
          </DialogContentText>
          <TextField
            id="lyrics-text"
            label="Lyrics"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            defaultValue={lyrics}
            onChange={handleLyricsTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEdit}>Add/Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
