import React, { ChangeEvent, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Material components
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import { SearchMetadataContext } from '../../../context/SearchMetadataContext';

import useStyles from './styles';

export default function SearchMetadata() {
  const history = useHistory();
  const { updateSearchQuery, searchMetadata, searchQuery } = useContext(
    SearchMetadataContext
  );
  const [searchInput, setSearchInput] = useState<string>('');

  const classes = useStyles();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  const handleSearchButtonClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateSearchQuery(searchInput);
    searchMetadata(searchInput);
    history.push('searchMetadataResults');
  };

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  return (
    <Paper component="div" className={classes.root}>
      <Typography>Search online</Typography>
      <Paper
        component="form"
        variant="elevation"
        elevation={24}
        className={classes.searchForm}
      >
        <InputBase
          className={classes.input}
          placeholder="Search for metadata"
          inputProps={{ 'aria-label': 'Search for metadata' }}
          onChange={handleSearchInputChange}
          value={searchInput}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearchButtonClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
}
