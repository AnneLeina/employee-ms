import axios from 'axios'

const API= axios.create({
    baseURL:  " https://false-unshaved-lilac.ngrok-free.dev",
    withCredentials:true,
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
})
  


export default API
