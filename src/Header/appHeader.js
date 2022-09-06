import React from 'react';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';




import './appHeader.scss';

export const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
   width: 100, height: 34, borderRadius: '80px', color: 'black',  backgroundColor: color,
    ':hover': {
      color: 'black',
      backgroundColor: '#FFE302',
    },
  }));

const AppHeader = ({handleScrollUsers, handleScrollSignUp}) => {

   const theme = useTheme();

   console.log(theme)


  
   return (
   
      <div className='app-header'>
         <AppBar position='static' sx={{ height: 60, justifyContent: 'space-between', background:theme.palette.background.main }}>
         <Container>
        <div className='app-header-items'> 
         <img className='img-logo' src='assets/Logo.svg' alt='Logo' />
            <div className='app-header-right-side'>
            <StyledButton onClick={handleScrollUsers} variant="contained" color='primary' sx={{mr: 2}} >Users</StyledButton>
            <StyledButton onClick={handleScrollSignUp} variant="contained" color='primary' >Sign up</StyledButton>

            </div>
            </div>
            </Container>
         </AppBar>
      </div>
     
   );
};

export default AppHeader;
