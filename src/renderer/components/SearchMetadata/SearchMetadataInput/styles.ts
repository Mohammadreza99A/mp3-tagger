import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '10px 5px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '99%',
      justifyContent: 'space-between',
    },
    searchForm: {
      display: 'flex',
      border: '1px solid grey',
      borderColor: theme.palette.primary,
      alignItems: 'center',
      width: '85%',
    },
    input: {
      marginLeft: '5px',
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);
