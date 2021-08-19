import React from 'react';

// Material components
import Grid from '@material-ui/core/Grid';

// Components
import UploadFile from '../../components/UploadFile';

export default function Home() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <UploadFile />
    </Grid>
  );
}
