import axios from './axios'




 const fetchPostUser = async (formData, token) => {
    return await axios.post('/api/v1/users', formData, {
        headers: {
            Token: `${token}`
        }
    }).then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      }) 

  
}

export default fetchPostUser;