import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, Container, TextField, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import DeleteIcon from '@mui/icons-material/Delete'
import { StyledButton } from '../Header/appHeader';

import fetchPostUser from '../services';
import axios from '../axios';

const Register = () => {
   const [value, setValue] = React.useState(1);
   const [positions, setPositions] = React.useState([]);
   const [myToken, setMyToken] = React.useState({});
   const [phoneValue, setPhoneValue] = React.useState('');

   //photo image upload
   const [photo, setPhoto] = React.useState('');
   const inputFileRef = React.useRef(null);
   const handleChangeFile = async (event) => {
      try {
         const formData = new FormData();
         const file = event.target.files[0]; //image
         formData.append('image', file); //conver image to formData
         //  const { data } = await axios.post('/upload/avatars', formData); //response image data
         //  setPhotoUrl(data.url);
         setPhoto(file);
         console.log(photo);
      } catch (error) {
         console.log(error);
         alert('error upload image', error);
      }
   };

   React.useEffect(() => {
      axios
         .get('/api/v1/positions')
         .then((res) => setPositions(res.data.positions))
         .catch((err) => console.log('error get positions'));

      axios.get('/api/v1/token').then((token) => setMyToken(token.data.token));
   }, []);

   const onClickRemoveImage = () => {
      setPhoto(''); //delete image
   };

   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      formState: { errors, isValid }
   } = useForm({
      defaultValues: {
         name: '',
         email: '',
         phone: ''
      },
      mode: 'onChange'
   });

   const onSubmit = async (e) => {
      let dataWithImage = { ...e, phone: '+38' + e.phone, position_id: value };
      if (photo) {
         dataWithImage = {
            ...e,
            phone: '+38' + e.phone,
            position_id: value,
            photo
         };
      }

    //   await axios
    //      .post('/api/v1/users', dataWithImage, {
    //         headers: {
    //            'Content-Type': 'multipart/form-data',
    //            Token: `${myToken}`
    //         }
    //      })
    //      .then((res) => {
    //         console.log(res.data);
    //      })
    //      .catch((error) => {
    //         console.error(error);
    //      });
      //  fetchPostUser(dataWithImage, myToken)
      console.log(dataWithImage);
   };

   const handlePhoneValue = () => {
    console.log('asd')
   }

   const handleRadio = (value) => {
      console.log(value.target.value);
      setValue(value.target.value);
   };
   return (
      <Container>
         <Typography variant='h1' sx={{ mt: '144px', textAlign: 'center' }}>
            Working with POST request
         </Typography>
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ mt: '50px' }}
         >
            <Box
               sx={{
                  height: 'auto'
               }}
               width='380px'
            >
               <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                     placeholder='Your name'
                     color='secondary'
                     error={Boolean(errors.fullName?.message)} //red color if error
                     helperText={errors.fullName?.message} //return error text
                     {...register(
                        'name',
                        {
                           minLength: {
                              value: 2,
                              message: 'Need 2 or more symbols' // JS only: <p>error message</p> TS only support string
                           }
                        },
                        {
                            maxLength: {
                               value: 60,
                               message: 'Maximum 60 symbols' // JS only: <p>error message</p> TS only support string
                            }
                         },
                        {
                           required: 'Enter the full Name'
                        }
                     )}
                     fullWidth
                     size='normal'
                     sx={{ mb: '50px' }}
                  />

                  <TextField
                     placeholder='Email'
                     color='secondary'
                     type='email' //browser validation
                     error={Boolean(errors.email?.message)}
                     helperText={errors.email?.message}
                     {...register('email', { required: 'Enter the mail' })}
                     fullWidth
                     size='normal'
                     sx={{ mb: '50px' }}
                  />
                  <TextField
                     placeholder='Phone( example 0991112233)'
                     color='secondary'
                    //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      type="number"
                    //  value={`+380`+ phoneValue}
                  
                  
                  
                     label='Phone'
                     error={Boolean(errors.phone?.message)}
                     helperText={errors.phone?.message}
                    //  type='number'
                      {...register('phone', {
                        pattern: {
                            value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                            message: 'invalid phone number(example 0991113322)' // JS only: <p>error message</p> TS only support string
                          }
                      },   {
                        minLength: {
                           value: 9,
                           message: 'Need 10 or more symbols' // JS only: <p>error message</p> TS only support string
                        }
                     },
                     {
                         maxLength: {
                            value: 11,
                            message: 'Maximum 11 symbols' // JS only: <p>error message</p> TS only support string
                         }
                      }, { required: 'Enter the phone' })}
                     fullWidth
                     size='normal'
                     sx={{ mb: '50px' }}
                   
                  />
                  <RadioGroup
                     aria-labelledby='demo-controlled-radio-buttons-group'
                     name='controlled-radio-buttons-group'
                     value={value}
                     onClick={handleRadio}
                  >
                     <Typography sx={{ mt: '43px' }}>
                        Select your position
                     </Typography>

                     {positions.map((position, index) => {
                        return (
                           <FormControlLabel
                              key={index}
                              sx={{ mt: '11px' }}
                              value={position.id}
                              color='red'
                              control={<Radio color='secondary' />}
                              label={position.name}
                           />
                        );
                     })}
                  </RadioGroup>
                  <Box
                     sx={{
                        width: '380px',
                        height: '54px',
                        mt: '47px',
                        mb: '84px',
                        border: 1,
                        display: 'flex'
                     }}
                  >
                     <Avatar
                        onClick={() => inputFileRef.current.click()}
                        sx={{
                           height: '100%',
                           width: '80px',
                           color: 'black',
                           background: 'none',
                           border: 1,
                           borderRadius: 0
                        }}
                     >
                        <input
                           ref={inputFileRef}
                           type='file'
                           onChange={handleChangeFile}
                           hidden
                        />
                        <Typography variant='h2'> Upload</Typography>
                     </Avatar>
                     <Box
                        sx={{
                           width: '100%',
                           display: 'flex',
                           justifyContent: 'space-between',
                           m: 1
                        }}
                     >
                        <Typography sx={{ mt: '5px', opacity: '50%' }}>
                           {photo ? 'Photo uploaded' : 'Upload your photo'}
                        </Typography>
                        {photo && (
                           <Box
                              className='delete-photo'
                              onClick={onClickRemoveImage}
                              sx={{
                                 width: '24px',
                                 height: '24px',
                                 border: 1,
                                 color: 'black',
                                 mt: '5px'
                              }}
                           ><DeleteIcon></DeleteIcon></Box>
                        )}
                     </Box>
                  </Box>
                  <StyledButton
                     type='submit'
                     variant='contained'
                     color='primary'
                     sx={{
                        mt: '0px',
                        mb: '150px',
                        left: '35%'
                     }}
                     disabled={!isValid}
                  >
                     Sign up
                  </StyledButton>
               </form>
            </Box>
         </Box>
      </Container>
   );
};

export default Register;
