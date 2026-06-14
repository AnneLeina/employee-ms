import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http:// https://false-unshaved-lilac.ngrok-free.dev/auth/logout", { withCredentials: true })
      .then(r => {
        if (r.data.Status) navigate("/adminlogin")
      })
      .catch(console.log)
  }, [])

  return null
}

export default Logout

