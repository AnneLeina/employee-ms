import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Components/Login.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./Components/Dashboard";
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Logout from './Components/Logout';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDashboard from './Components/EmployeeDashboard';
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import AdminDashboard from './Components/AdminDashboard.jsx';


function App() {
 

  return (
 <BrowserRouter>
 <Routes>
    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
   <Route path="/" element={<Start/>} />
  <Route path="reset_password/:token" element={<ResetPassword />}></Route>
  <Route path="/employee-dashboard" element={<EmployeeDashboard/>}></Route>
  <Route path="/employeelogin" element={<EmployeeLogin/>}></Route>
  <Route path="/start" element={<Start/>}></Route>
  <Route path="/adminlogin" element={<Login/>}></Route>
  <Route path="/dashboard" element={<Dashboard/>}>
  <Route index  index element={<AdminDashboard />}/>
  <Route path="employee" element={<Employee />}/>
  <Route path="category" element={<Category />}/>
  <Route path="profile" element={<Profile />}/>
  <Route path="add_category" element={<AddCategory />}/>
  <Route path="add_employee" element={<AddEmployee />}/>
  <Route path="edit_employee/:id" element={<EditEmployee />}/>
  </Route>
  <Route path="/logout" element={<Logout />}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
