import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Material components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

import { SearchMetadataContext } from '../../../context/SearchMetadataContext';

import OnlineMetadataTag from '../../../types/onlineMetadataTag';

import useStyles from './styles';

export default function SearchResultsList() {
  const classes = useStyles();
  const history = useHistory();

  const { foundMetadata, applyOnlineMetadata } = useContext(
    SearchMetadataContext
  );

  const saveOnlineMetadata = async (metadata: OnlineMetadataTag) => {
    applyOnlineMetadata(metadata);
    history.goBack();
  };

  if (Object.keys(foundMetadata).length !== 0) {
    return (
      <List className={classes.root}>
        {Object.keys(foundMetadata).map((key: OnlineMetadataTag) => (
          <div key={key}>
            {foundMetadata[key].artist && foundMetadata[key].title && (
              <ListItem key={key}>
                {foundMetadata[key].image &&
                  typeof foundMetadata[key].image === 'string' && (
                    <ListItemAvatar>
                      <Avatar
                        alt={`${foundMetadata[key].artist} - ${foundMetadata[key].title} Cover`}
                        src={foundMetadata[key].image}
                        className={classes.large}
                        variant="square"
                      />
                    </ListItemAvatar>
                  )}
                <ListItemText
                  primary={`${foundMetadata[key].artist} - ${foundMetadata[key].title}`}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`Album: ${foundMetadata[key].album}`}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    component="span"
                    color="secondary"
                    className={classes.button}
                    onClick={() => saveOnlineMetadata(foundMetadata[key])}
                    startIcon={<SaveIcon />}
                  >
                    Apply
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    );
  }
  return (
    <div className={classes.spinnerRoot}>
      <CircularProgress color="secondary" />
    </div>
  );
}
