import React, { useContext } from 'react';
import { MetadataContextState } from 'renderer/types/metadataContextState';

// Material components
import Grid from '@material-ui/core/Grid';

import { MetadataContext } from '../../context/MetadataContext';

// Components
import UploadFile from '../../components/UploadFile';
import MetadataTable from '../../components/MetadataTable';
import SearchMetadataInput from '../../components/SearchMetadata/SearchMetadataInput';

import useStyles from './styles';

export default function Home() {
  const { metadata } = useContext<MetadataContextState>(MetadataContext);
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      display="flex"
      className={classes.root}
    >
      <UploadFile />
      {Object.keys(metadata).length !== 0 && (
        <>
          <SearchMetadataInput />
          <MetadataTable />
        </>
      )}
    </Grid>
  );
}
