import React from 'react';
import { Button, Typography, Container, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import { StyledButton } from '../Header/appHeader';
import axios from '../axios';
import { fetchUsers } from '../services';
import { UpdateUserCard } from '../App';

import './user-card.scss'

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
   const [loading, setIsLoading] = React.useState(true);

   const { updateUserCardAfterReg, setUpdateUserCardAfterReg } =
      React.useContext(UpdateUserCard);

   React.useEffect(() => {
      if (!updateUserCardAfterReg) {
         setPageUsers(1);
         setUpdateUserCardAfterReg(!updateUserCardAfterReg);
      } else {
         setPageUsers(pageUsers + 1);
      }

      console.log('updateUserCardAfterReg', updateUserCardAfterReg);
      console.log('updateUserCardAfterReg', pageUsers);
      fetchUsers(pageUsers)
         .then((users) => setUsers(users.data.users), setIsLoading(false))
         .then(console.log(users));
   }, [updateUserCardAfterReg]);

   const handleShowMoreUsers = () => {
      setPageUsers(pageUsers + 1);

      if (pageUsers > totalPages) {
         setPageUsers(1);
      }

      fetchUsers(pageUsers)
         .then((usersData) => {
            setTotalPages(usersData.data.total_pages);
            setUsers(usersData.data.users);
            setIsLoading(false);
         })
         .then(console.log(users));
   };

   return (
      <Container
        className='user-card-container'
         sx={{
            maxWidth: '1170px'
         }}
      >
         <Typography
            variant='h1'
            className='working-title'
            sx={{
               mt: '140px',
               mb: '200px',
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
            {loading ? (
               <CircularProgress color='secondary'></CircularProgress>
            ) : (
               users.sort((b,a)=>a.registration_timestamp - b.registration_timestamp).map((user, index) => {
                  //.sort((a,b)=>a.registration_timestamp - b.registration_timestamp)
                  return (
                     <Card
                        key={index}
                        className='users-card'
                        sx={{
                           maxWidth: 282,
                           alignItems: 'center',
                           width: '100%',
                           display: 'flex',
                           flexDirection: 'column',
                           ml: '29px',
                           mr: '29px',
                           // width: '282px',
                           height: '254px',
                           mt: '29px'
                        }}
                     >
                        <CardContent sx={{ display: 'flex' }}>
                           <div>
                              <Avatar
                                 alt={user.name}
                                 src={user.photo ? user.photo : fakeUser.image}
                                 style={{ margin: 'auto' }}
                                 sx={{
                                    width: '70px',
                                    height: '70px'
                                 }}
                              />
                                <Tooltip
                                 title={user.name}
                                 arrow
                                 componentsProps={{
                                    tooltip: {
                                       sx: {
                                          bgcolor: '#000000',
                                          '& .MuiTooltip-arrow': {
                                             color: 'common.black'
                                          }
                                       }
                                    }
                                 }}
                              >
                              <Typography
                                 variant='h2'
                                 sx={{
                                    m: '20px auto 10px auto',
                                    maxWidth: '240px',
                                    textAlign: 'center'
                                 }}
                                 color='text.secondary'
                                 noWrap
                              >
                                 {user.name}
                              </Typography>
                              </Tooltip>
                              <Typography
                                 variant='h2'
                                 sx={{ maxWidth: '260px', textAlign: 'center' }}
                              >
                                 {user.position}
                              </Typography>
                              <Tooltip
                                 title={user.email}
                                 arrow
                                 componentsProps={{
                                    tooltip: {
                                       sx: {
                                          bgcolor: '#000000',
                                          '& .MuiTooltip-arrow': {
                                             color: 'common.black'
                                          }
                                       }
                                    }
                                 }}
                              >
                                 <Typography
                                    variant='h2'
                                    sx={{
                                       maxWidth: '240px',
                                       height: 'auto',
                                       textAlign: 'center'
                                    }}
                                    color='text.secondary'
                                    noWrap
                                 >
                                    {user.email}
                                 </Typography>
                              </Tooltip>
                              <Typography
                                 variant='h2'
                                 sx={{
                                    maxWidth: '282px',
                                    pb: '20px',
                                    textAlign: 'center'
                                 }}
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
               })
            )}
         </Box>
         {pageUsers !== totalPages && (
            <StyledButton
            className='user-card-show-button'
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
