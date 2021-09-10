import { createStyles, makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

export default makeStyles(() =>
  createStyles({
    button: {
      marginTop: '5px',
      marginBottom: '5px',
    },

    uploadButtonAndIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
      borderWidth: 3,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      height: '100%',
      width: '95%',
    },
  })
);

export const dropzoneStyles = {
  baseStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStyle: {
    borderColor: blue[400],
  },
  acceptStyle: {
    borderColor: green[400],
  },
  rejectStyle: {
    borderColor: red[400],
  },
};
