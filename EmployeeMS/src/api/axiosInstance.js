import axios from 'axios'
<<<<<<< HEAD
export const isDemoMode=!window.location.hostname.includes("localhost");
=======
>>>>>>> 283cc4964b3c55a0d72272f28c9031248c6a0c24

const API= axios.create({
    baseURL:  " https://false-unshaved-lilac.ngrok-free.dev",
    withCredentials:true,
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
})
  


export default API
