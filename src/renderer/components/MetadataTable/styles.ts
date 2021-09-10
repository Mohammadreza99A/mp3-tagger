import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'hidden',
      justifyItems: 'center',
      justifyContent: 'center',
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    tableCell: {
      paddingBottom: 0,
      paddingTop: 0,
    },

    button: {
      marginTop: '5px',
    },

    columnFlex: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);
