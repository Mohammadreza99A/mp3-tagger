import React from 'react';

// Material components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h2" component="h3">
        Home
      </Typography>
    </Grid>
  );
}
