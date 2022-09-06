import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import { StyledButton } from '../Header/appHeader';
import axios from '../axios';

const UserCard = () => {
   const fakeUser = [
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      },
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      },
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      },
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      },
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      },
      {
         image: '/assets/photo-cover.svg',
         name: 'user name',
         job: 'front end',
         email: 'email@email.email',
         phone: '+380989991122'
      }
   ];
   const [users, setUsers] = React.useState([]);
   const [pageUsers, setPageUsers] = React.useState(1);
   const [totalPages, setTotalPages] = React.useState(9);

   React.useEffect(() => {
      axios
         .get(`/api/v1/users?page=${pageUsers}&count=6`)
         .then((users) => setUsers(users.data.users),setPageUsers(pageUsers + 1))
         .then(console.log(users));
   }, []);

   const handleShowMoreUsers = () => {
      setPageUsers(pageUsers + 1);

      axios
         .get(`/api/v1/users?page=${pageUsers}&count=6`)
         .then((usersData) => {
            setTotalPages(usersData.data.total_pages);
            setUsers(usersData.data.users);
         })
         .then(console.log(users));
   };

   return (
      <Container
         sx={{
            maxWidth: '1170px'
         }}
      >
         <Typography
            variant='h1'
            sx={{
               mt: '140px',
               mb: '140px',
               display: 'flex',
               flexDirection: 'column',

               alignItems: 'center'
            }}
         >
            Working with GET request
         </Typography>

         <Box
            sx={{
               width: '100%',
               display: 'flex',
               flexWrap: 'wrap',
               justifyContent: 'center',
               mb: '50px'
            }}
         >
            {users.map((user, index) => { //.sort((a,b)=>a.registration_timestamp - b.registration_timestamp)
               return (
                  <Card
                     key={index}
                     sx={{
                        maxWidth: 282,
                        alignItems: 'center',

                        display: 'flex',
                        flexDirection: 'column',
                        ml: '29px',
                        width: '282px',
                        height: '254px',
                        mt: '29px'
                     }}
                  >
                     <CardContent sx={{ display: 'flex' }}>
                        <div>
                           <Avatar
                              alt='Remy Sharp'
                              src={user.photo ? user.photo : fakeUser.image}
                              sx={{
                                 width: '70px',
                                 height: '70px',
                                 justifyContent: 'center',
                                 ml: '25%'
                              }}
                           />

                           <Typography
                              variant='h2'
                              sx={{ mt: '20px', textAlign: 'center' }}
                              color='text.secondary'
                              gutterBottom
                           >
                              {user.name}
                           </Typography>
                           <Typography
                              variant='h2'
                              component='div'
                              sx={{ mt: '20px', textAlign: 'center' }}
                           >
                              {user.job}
                           </Typography>
                           <Typography
                              variant='h2'
                              sx={{ textAlign: 'center' }}
                              color='text.secondary'
                           >
                              {user.email}
                           </Typography>
                           <Typography
                              variant='h2'
                              sx={{ textAlign: 'center' }}
                           >
                              {user.phone}
                              <br />
                           </Typography>
                           <Typography
                              variant='h2'
                              sx={{ textAlign: 'center', mb: '20px' }}
                           ></Typography>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </Box>
         {pageUsers !== totalPages && (
            <StyledButton
               variant='contained'
               color='primary'
               onClick={handleShowMoreUsers}
               sx={{
                  mt: '50px',
                  left: '45%'
               }}
            >
               <Typography sx={{ fontSize: '10px' }}>Show more</Typography>
            </StyledButton>
         )}
      </Container>
   );
};

export default UserCard;
