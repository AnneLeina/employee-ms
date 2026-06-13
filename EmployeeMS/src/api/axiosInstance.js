import axios from 'axios'
import React from 'react'

export const isDemoMode=!window.location.hostname.includes("localhost");

const API= axios.create({
    baseURL: isDemoMode ?"https://api-placeholder.com": "http://localhost:5000",
    withCredentials:true
})
  


export default API