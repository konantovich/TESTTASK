import React from 'react';
import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import { Button, Typography,Container } from '@mui/material';

import { StyledButton } from '../Header/appHeader';

import './main-image.scss';

const MainImage = () => {
   return (
      <Container
         className='main-image'
         sx={{
            maxWidth: '1170px',
            maxHeght: '650px',
            
           
         }}
      >
        <div className='shadow'>
         <Box 
            sx={{
               display: 'flex',
               flexDirection: 'column',
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
             
               zIndex: 10
            }}
         >
            <Typography
               variant='h1'
               sx={{ width: '380px', color: '#ffff', textAlign: 'center' }}
            >
               Test assignment for front-end developer
            </Typography>
            <Typography
               variant='h2'
               sx={{
                  width: '380px',
                  color: '#ffff',
                  textAlign: 'center',
                  mt: '21px'
               }}
            >
               What defines a good front-end developer is one that has skilled
               knowledge of HTML, CSS, JS with a vast understanding of User
               design thinking as they'll be building web interfaces with
               accessibility in mind. They should also be excited to learn, as
               the world of Front-End Development keeps evolving.
            </Typography>
            <StyledButton
               variant='contained'
               color='primary'
               sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  mt: '32px',
                  left: '35%',
                 
               }}
            >
               Sign up
            </StyledButton>
         </Box>
         <CardMedia
            className='main-image-item'
            component='img'
           
            sx={{
               maxWidth: '1170px',
               maxHeight: '650px',
               display: 'flex',
               flexDirection: 'column',
              
            }}
            image='/assets/pexels-alexandr-podvalny-1227513.jpeg'
         ></CardMedia>
         </div>
      </Container>
   );
};

export default MainImage;
