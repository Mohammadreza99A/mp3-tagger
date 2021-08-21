import React, { useContext } from 'react';

// Mateiral components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { MetadataContext } from '../../context/MetadataContext';

import UserDefinedTextTable from './UserDefinedText';
import CoverImage from './CoverImage';
import ID3Tags from './ID3Tags';

import useStyles from './styles';

export default function MetadataTable() {
  const { metadata } = useContext(MetadataContext);

  const classes = useStyles();

  return (
    <>
      {Object.keys(metadata).length !== 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="metadata table">
            <TableBody>
              {/* ID3 tags table rows */}
              <ID3Tags />

              {/* Cover image celle */}
              {metadata.image && typeof metadata.image !== 'string' && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    Cover
                  </TableCell>
                  <TableCell align="right">
                    <CoverImage image={metadata.image} />
                  </TableCell>
                </TableRow>
              )}

              {/* User defined text inner table */}
              {metadata.userDefinedText && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    User defined
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
    </>
  );
}
