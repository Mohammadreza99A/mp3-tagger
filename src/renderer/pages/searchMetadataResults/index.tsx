import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

import SearchMetadata from '../../components/SearchMetadata';
import SearchResultsList from '../../components/SearchMetadata/SearchResultsList';

import useStyles from './styles';

export default function SearchMetadataResultsPage() {
  const history = useHistory();

  const classes = useStyles();

  const onGoBack = () => {
    history.goBack();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="contained"
        component="span"
        size="large"
        color="secondary"
        className={classes.button}
        onClick={onGoBack}
        startIcon={<ArrowBack />}
        fullWidth
      >
        Go Back
      </Button>
      <SearchMetadata />
      <SearchResultsList />
    </Grid>
  );
}
