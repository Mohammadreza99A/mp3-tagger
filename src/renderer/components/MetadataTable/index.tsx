import React, { useContext } from 'react';

// Material components
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';

import { MetadataContext } from '../../context/MetadataContext';

import UserDefinedTextTable from './UserDefinedText';
import CoverImage from './CoverImage';
import ID3Tags from './ID3Tags';
import Lyrics from './Lyrics';
import FileNameInput from './FileNameInput';

import useStyles from './styles';

export default function MetadataTable() {
  const { metadata, saveMetadata } = useContext(MetadataContext);

  const classes = useStyles();

  const onSaveTags = async (): void => {
    saveMetadata();
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        display="flex"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={6}>
          {Object.keys(metadata).length !== 0 && (
            <TableContainer component={Paper}>
              <Table aria-label="metadata table">
                <TableBody>
                  {/* ID3 tags table rows */}
                  <ID3Tags />

                  {/* User defined text inner table */}
                  {metadata.userDefinedText && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Custom
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        <UserDefinedTextTable
                          userDefinedText={metadata.userDefinedText}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Button
            variant="contained"
            component="span"
            color="secondary"
            className={classes.button}
            onClick={onSaveTags}
            startIcon={<SaveIcon />}
            fullWidth
          >
            Save Tags
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.columnFlex}>
            <div style={{ width: '100%', flexGrow: 1 }}>
              <TableContainer component={Paper} style={{ height: '100%' }}>
                <Table>
                  <TableBody>
                    {/* File name cell */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        File
                      </TableCell>
                      <TableCell align="right">
                        <FileNameInput />
                      </TableCell>
                    </TableRow>

                    {/* Cover image cell */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Cover
                      </TableCell>
                      <TableCell align="right">
                        <CoverImage image={metadata.image} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Lyrics
                      </TableCell>
                      <TableCell align="right">
                        <Lyrics />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
