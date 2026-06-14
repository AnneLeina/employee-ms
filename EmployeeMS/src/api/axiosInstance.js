import axios from 'axios'
import React from 'react'

export const isDemoMode=!window.location.hostname.includes("localhost");

const API= axios.create({
    baseURL: isDemoMode ?"https://api-placeholder.com": " https://false-unshaved-lilac.ngrok-free.dev",
    withCredentials:true
})
  


export default API