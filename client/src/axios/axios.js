import axios from "axios";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  //  timeout: 1000,
 //   headers: {'X-Custom-Header': 'foobar'}
});

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL
})

export default myAxios;