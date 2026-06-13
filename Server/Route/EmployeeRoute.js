import express from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const router = express.Router()



router.post("/employee_login", (req, res) => {
    console.log("Credentials received:", req.body);
    const sql = "SELECT * FROM employee WHERE email = ?";

    con.query(sql, [req.body.email], (err, result) => {
        console.log("database responded! Error:", err, "Result:", result)

        if (err) return res.json({ loginStatus: false, Error: "Querry error" })
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" })
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "employee", email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                     res.cookie("token", token);
            return res.json({ loginStatus: true, });
             }        
            })
           
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    })
})

router.get("/detail", (req, res) => {
  const token = req.cookies.token
  if (!token) return res.json({ loginStatus: false })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.json({ loginStatus: false })

    const sql = "SELECT id, name, email, salary, address, image, category_id FROM employee WHERE email = ?"
    con.query(sql, [decoded.email], (err, result) => {
      if (err || result.length === 0) return res.json({ loginStatus: false })
      return res.json(result[0])
    })
  })
})

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  return res.json({ logout: true })
})



export default router