import React, {useState} from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const[values, setValues] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const navigate= useNavigate()
    axios.defaults.withCredentials=true;
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Button clicked! Current form values:", values)
        axios.post("http:// https://false-unshaved-lilac.ngrok-free.dev/auth/adminlogin", values, {withCredentials: true})
        .then(result => {
            if(result.data.loginStatus){
                 navigate("/dashboard")
                } else{alert(result.data.Error)
                    setError(result.data.Error)
                }
            }
   
        )
        .catch(err => console.log(err))
     }
  return (
    <div className="d-flex justify-content-end align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
            <div classname="text-danger" style={{color: "red", marinBottom: "10px"}}>
             {error}
            </div>
            <h2>Employee MS</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>mail</label>
                     <input type="email" placeholder="Enter Email" 
                     onChange={(e) => setValues({...values, email : e.target.value})}
                     />
                </div>
                <div>
                    <label>password</label>
                     <input type="password" placeholder="Enter Password"
                     onChange={(e) => setValues({...values, password : e.target.value})}
                     />
                </div>
              <div className="mb-3">
                <Link to="/forgot-password" className="text-decoration-none text-primary">
                        Forgot Password?
                        </Link>
              </div>
                <button >submit</button>
                <p className="terms">
                    By submitting, you are agreeing to the
                   <span className="termsLink">Terms and Conditions</span>
                </p>
             </form>
        </div>
    </div>
  )
}

export default Login