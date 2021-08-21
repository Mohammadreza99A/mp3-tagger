import React, { useState } from 'react';

// Material components
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type UserDefinedText = {
  description: string;
  value: string;
};

export default function UserDefinedTextTable({
  userDefinedText,
}: {
  userDefinedText: UserDefinedText[];
}) {
  const [userDefinedTableCollapsState, setUserDefinedTableCollapsState] =
    useState<boolean>(false);

  return (
    <>
      {userDefinedText && (
        <>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>
              setUserDefinedTableCollapsState(!userDefinedTableCollapsState)
            }
          >
            {userDefinedTableCollapsState ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>

          <Collapse
            in={userDefinedTableCollapsState}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {userDefinedText.map((userDefined) => (
                    <TableRow key={userDefined.description}>
                      <TableCell component="th" scope="row">
                        {userDefined.description}
                      </TableCell>
                      <TableCell align="right">{userDefined.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </>
      )}
    </>
  );
}
