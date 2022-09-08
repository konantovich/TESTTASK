import axios from './axios';

export const fetchToken = async () => {
   return axios.get('/api/v1/token');
};

export const fetchPositions = async () => {
   return axios.get('/api/v1/positions');
};

export const fetchUsers = async (pageUsers) => {
   return await axios.get(`/api/v1/users?page=${pageUsers}&count=6`);
};

export const fetchRegisterUser = async (formData, token) => {
   console.log('axios',formData)
   return await axios
      .post('/api/v1/users', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            Token: `${token}`
         }
      })
     
};


