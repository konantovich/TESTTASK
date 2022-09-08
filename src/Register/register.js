import React from 'react';
import Box from '@mui/material/Box';
import { Typography, Container, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledButton } from '../Header/appHeader';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchPositions, fetchToken, fetchRegisterUser } from '../services';
import axios from '../axios';
import { UpdateUserCard } from '../App';

import './register.scss';

const Register = ({ handleScrollUsers }) => {
   const [value, setValue] = React.useState(1);
   const [positions, setPositions] = React.useState([]);
   const [myToken, setMyToken] = React.useState({});
   const [loading, setIsLoading] = React.useState(true);
   const [phoneValidationValue, setPhoneValidationValue] =
      React.useState('+380');

   const { updateUserCardAfterReg, setUpdateUserCardAfterReg } =
      React.useContext(UpdateUserCard);

   //photo image upload
   const [photo, setPhoto] = React.useState('');
   const inputFileRef = React.useRef(null);
   const handleChangeFile = async (event) => {
      try {
         const formData = new FormData();
         const file = event.target.files[0]; //image
         if (!file.name.match(/\.(jpg|jpeg)$/i)) {
            alert('not an jpg/jpeg photo format');
         } else {
            // formData.append('image', file); //conver image to formData
            console.log(file);
            setPhoto(file);
            // setPhoto(URL.createObjectURL(file));
         }
      } catch (error) {
         console.log(error);
         alert('error upload image', error);
      }
   };

   React.useEffect(() => {
      console.log('updateUserCardAfterReg reg', updateUserCardAfterReg);
      fetchPositions()
         .then((res) => setPositions(res.data.positions))
         .catch((err) => console.log('error get positions'));

      fetchToken().then((token) => setMyToken(token.data.token));
   }, []);

   const onClickRemoveImage = () => {
      setPhoto(''); //delete image
   };

   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      formState: { errors, isValid },
      reset
   } = useForm({
      defaultValues: {
         name: '',
         email: '',
         phone: ''
      },
      mode: 'onChange'
   });

   const onSubmit = (e) => {
      console.log(e.phone);
      let dataWithImage = {
         ...e,
         email: e.email.toLowerCase(),
         position_id: value
      };
      if (photo) {
         dataWithImage = {
            ...e,
            email: e.email.toLowerCase(),
            position_id: value,
            photo
         };
      }

      fetchRegisterUser(dataWithImage, myToken)
         .then((res) => {
            console.log('response', res.data);
            setUpdateUserCardAfterReg(!updateUserCardAfterReg);
            handleScrollUsers();
            setIsLoading(false);

            //clear form if reg submit
            reset();
            setPhoneValidationValue('+380');
            setPhoto('');
            setValue(1);
         })
         .catch((error) => {
            const err = error.response.data.fails;
            alert(
               `Error registeration ${
                  err.phone || err.photo || err.name || err.password
               }`
            );
            console.error('error registeration', error);
         });

      console.log(dataWithImage);
      console.log(myToken);
   };

   const handleRadio = (value) => {
      console.log(value.target.value);
      setValue(value.target.value);
   };

   const validationPhone = (phoneLetter) => {
      if (phoneLetter.name === 'phone') {
         console.log('+380', phoneLetter.value.substring(0));
         //  const firstLetterStr = phoneLetter.value.substring(0, 4);
         const firstLetterStr = '+380';
         if (firstLetterStr !== '+380') {
            firstLetterStr = '+380';
         } else {
            const allPhoneInput = phoneLetter.value
               .substring(4)
               // .substring(1)
               .replace(/\D/g, '');

            // console.log('firstLetterStr',firstLetterStr )
            console.log('allPhoneInput', allPhoneInput);
            // console.log('phoneValidationValue',phoneValidationValue)
            return setPhoneValidationValue(firstLetterStr + allPhoneInput);
         }
      }
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
               className='register-page'
               sx={{
                  height: 'auto'
               }}
               width='380px'
            >
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  onChange={(value) => validationPhone(value.target)}
               >
                  <TextField
                     placeholder='Your name'
                     color='secondary'
                     error={Boolean(errors.fullName?.message)} //red color if error
                     helperText={errors.fullName?.message} //return error text
                     {...register('name', {
                        minLength: {
                           value: 2,
                           message: 'Need 2 or more symbols' // JS only: <p>error message</p> TS only support string
                        },
                        maxLength: {
                           value: 60,
                           message: 'Maximum 60 symbols' // JS only: <p>error message</p> TS only support string
                        },
                        required: 'Enter the full Name'
                     })}
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
                     placeholder='Phone( example +380991112233)'
                     color='secondary'
                     //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     //  type='number'
                     //  value={`+380`+ phoneValue}
                     // pattern="/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im"
                     label='Phone'
                     error={Boolean(errors.phone?.message)}
                     helperText={errors.phone?.message}
                     value={phoneValidationValue}
                     //  type='number'
                     {...register('phone', {
                        pattern: {
                           value: /^[0-9+\b]+$/,
                           //    value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                           message: 'invalid symbol enter' // JS only: <p>error message</p> TS only support string
                        },

                        minLength: {
                           value: 13,
                           message: 'Need 13 symbols' // JS only: <p>error message</p> TS only support string
                        },
                        maxLength: {
                           value: 13,
                           message: 'Maximum 13 symbols' // JS only: <p>error message</p> TS only support string
                        },
                        required: 'Enter the phone'
                     })}
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
                     className='photo-upload'
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
                           {photo ? (
                              <div className='photo-uploaded'>
                                 <img
                                    className='user-image'
                                    src={URL.createObjectURL(photo)}
                                    alt='photo'
                                 ></img>
                                 Photo uploaded
                              </div>
                           ) : (
                              <div className='photo-uploaded'>
                                 Upload your photo jpg/jpeg
                              </div>
                           )}
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
                           >
                              <DeleteIcon></DeleteIcon>
                           </Box>
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
                     disabled={!isValid || !photo}
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
