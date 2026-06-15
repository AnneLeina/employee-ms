import axios from 'axios'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const isDemoMode=!window.location.hostname.includes("localhost");
=======
>>>>>>> 283cc4964b3c55a0d72272f28c9031248c6a0c24

=======
export const isDemoMode=!window.location.hostname.includes("localhost");
>>>>>>> adc503ca83176d893e438aaf49cb0710513142fa
=======

>>>>>>> 80a38e6f5b900c54ba60b568e8acbb7ef7ad5bf1
const API= axios.create({
    baseURL:  " https://false-unshaved-lilac.ngrok-free.dev",
    withCredentials:true,
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
})
  


export default API
