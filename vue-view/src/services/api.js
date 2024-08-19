import axios from 'axios'

const Api = axios.create({
    // set main url
    baseURL: 'http://localhost:3000/api',
})

export default Api
