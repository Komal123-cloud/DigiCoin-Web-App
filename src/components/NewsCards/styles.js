
// export default makeStyles({
//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     height: '45vh',
//     padding: '10%',
//     borderRadius: 10,
//     color: 'white',
//   },
//   infoCard: {
//     display: 'flex', flexDirection: 'column', textAlign: 'center',
//   },
//   container: {
//     padding: '0 5%', width: '100%', margin: 0,
//   },
// });

// import { makeStyles } from '@material-ui/core/styles';

// export default makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     padding: theme.spacing(2),
//     overflow: 'hidden',
//   },
//   infoCard: {
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'center',
//   },
//   card: {
//     padding: theme.spacing(3),
//     borderRadius: '15px',
//     width: '100%',
//     backgroundColor: 'white',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow for depth
//     transition: 'transform 0.3s ease-in-out', // Add a smooth transition effect
//     '&:hover': {
//       transform: 'scale(1.05)', // Add a slight scale effect on hover
//     },
//   },
// }));


import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
    overflow: 'hidden',
    background: 'url("https://wallpaperaccess.com/full/1424845.jpg")', 
  },
  header: {
    marginBottom: theme.spacing(2), // Add margin for spacing
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor : '#B5B5B5',
    color: 'white'
  },
  card: {
    padding: theme.spacing(3),
    borderRadius: '15px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));