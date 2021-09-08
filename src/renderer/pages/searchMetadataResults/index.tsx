import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

import SearchMetadataInput from '../../components/SearchMetadata/SearchMetadataInput';
import SearchResultsList from '../../components/SearchMetadata/SearchResultsList';

import useStyles from './styles';

export default function SearchMetadataResultsPage() {
  const history = useHistory();

  const classes = useStyles();

  const onGoBack = () => {
    history.goBack();
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        history.goBack();
      }
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

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
        color="secondary"
        className={classes.button}
        onClick={onGoBack}
        startIcon={<ArrowBack />}
        fullWidth
      >
        Go Back
      </Button>
      <SearchMetadataInput />
      <SearchResultsList />
    </Grid>
  );
}
