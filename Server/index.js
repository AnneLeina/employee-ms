import "dotenv/config";
import express from "express"
import cors from "cors"
import adminRouter from "./Route/AdminRoute.js";
import EmployeeRouter from "./Route/EmployeeRoute.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", adminRouter)
app.use(express.static("public"))
app.use("/employee", EmployeeRouter)


app.listen(5000, () =>{
    console.log("Server is running on port 5000")
})