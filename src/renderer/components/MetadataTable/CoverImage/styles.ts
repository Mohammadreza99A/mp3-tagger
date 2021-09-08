import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      maxWidth: theme.spacing(50),
      maxHeight: theme.spacing(50),
    },

    button: {
      marginTop: '5px',
    },

    noImage: {
      border: '1px solid grey',
      borderStyle: 'double',
      padding: '150px 10px',
    },

    fileInput: {
      display: 'none',
    },

    fileLabel: {
      width: '100%',
    },

    coverImage: {
      maxWidth: '100%',
      height: 'auto',
    },
  })
);
