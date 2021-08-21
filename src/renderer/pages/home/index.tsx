import React, { useContext } from 'react';

// Material components
import Grid from '@material-ui/core/Grid';

// Components
import UploadFile from '../../components/UploadFile';
import MetadataTable from '../../components/MetadataTable';

import { MetadataContext } from '../../context/MetadataContext';

export default function Home() {
  const { metadata } = useContext(MetadataContext);

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
          <MetadataTable />
        </>
      )}
    </Grid>
  );
}
