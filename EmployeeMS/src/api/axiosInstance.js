import axios from 'axios'
export const isDemoMode=!window.location.hostname.includes("localhost");

const API= axios.create({
    baseURL:  " https://false-unshaved-lilac.ngrok-free.dev",
    withCredentials:true,
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
})
  


export default API