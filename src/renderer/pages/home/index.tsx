import React, { useContext } from 'react';
import { MetadataContextState } from 'renderer/types/metadataContextState';

// Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { MetadataContext } from '../../context/MetadataContext';

// Components
import UploadFile from '../../components/UploadFile';
import MetadataTable from '../../components/MetadataTable';
import SearchMetadata from '../../components/SearchMetadata';

import useStyles from './styles';

export default function Home() {
  const { metadata, saveMetadata } =
    useContext<MetadataContextState>(MetadataContext);
  const classes = useStyles();

  const onSaveTags = async (): void => {
    saveMetadata();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <UploadFile />
      {Object.keys(metadata).length !== 0 && (
        <>
          <SearchMetadata />
          <MetadataTable />

          <Button
            variant="contained"
            component="span"
            size="large"
            color="secondary"
            className={classes.button}
            onClick={onSaveTags}
            startIcon={<SaveIcon />}
            fullWidth
          >
            Save Tags
          </Button>
        </>
      )}
    </Grid>
  );
}
