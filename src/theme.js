import { createTheme } from '@mui/material';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#F4E041',
         secondary: '#ffff',
      },
      secondary: {
         main: '#00BDD3'
      },
      background: {
         main: '#F8F8F8'
      }
   },
   typography: {
      h1: {
         fontSize: '40px',
         lineHeight: '40px'
      },
      h2: {
         fontSize: '16px',
         lineHeight: '26px'
      },
      fontFamily: ['Nunito', 'sans-serif'].join(',')
   }
});
