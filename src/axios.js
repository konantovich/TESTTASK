import axios from "axios";


const instance = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency'
});


export default instance;