import express from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import multer from "multer"
import path from "path"
import { errorMonitor } from "events"
import crypto from "crypto"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/adminlogin", (req, res) => {
    console.log("Credentials received:", req.body);
    const sql = "SELECT * FROM admin WHERE email = ? AND password =?";

    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        console.log("database responded! Error:", err, "Result:", result)

        if (err) return res.json({ loginStatus: false, Error: "Querry error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.cookie("token", token);
            return res.json({ loginStatus: true, token: token });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    })
})

router.get("/dashboard-stats", (req, res) => {
    const stats = {};

    con.query("SELECT COUNT(*) AS total FROM employee", (err, empResult) => {
        if (err) return res.json({ Status: false, Error: "Query Error: " + err });
        stats.totalEmployees = empResult[0].total;

        con.query("SELECT COUNT(*) AS total FROM category", (err, catResult) => {
            if (err) return res.json({ Status: false, Error: "Query Error: " + err });
            stats.totalCategories = catResult[0].total;

            con.query("SELECT SUM(salary) AS total FROM employee", (err, salResult) => {
                if (err) return res.json({ Status: false, Error: "Query Error: " + err });
                stats.totalSalary = salResult[0].total || 0;

                con.query("SELECT COUNT(*) AS total FROM leaves WHERE status = 'pending'", (err, leaveResult) => {
                    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
                    stats.pendingLeaves = leaveResult[0].total;

                    return res.json({ Status: true, Result: stats });
                });
            });
        });
    });
});


router.get("/category", (req, res) => {
    const sql = "SELECT *FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.post("/add_category", (req, res) => {
    const sql = "INSERT INTO Category (name) VALUES (?) "
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post("/add_employee", upload.single("image"), (req, res) => {
    const sql = "INSERT INTO employee\ (name, email, password, address, salary, image, category_id) VALUES (?) "
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ status: false, Error: "Query Error" })

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Database SQL Execution Failure:", err)
                return res.json({ status: false, Error: "Query Error" })
            }
            return res.json({ Status: true })
        })
    })
})

router.get("/employee", (req, res) => {
    const sql = "SELECT *FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.get("/employee/:id", (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sql = "SELECT *FROM employee WHERE id=?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false, Error: err })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit_employee/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee set name=?, email=?, salary=?, address=?, category_id=? where id=?"
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.delete("/delete_employee/:id", (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id= ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/admin_detail", (req, res) => {
    const sql = "SELECT name, email FROM admin LIMIT 1"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result[0] })
    })
})

router.put("/change_password", (req, res) => {
    const { currentPassword, newPassword } = req.body
    const sql = "SELECT * FROM admin WHERE password=?"
    con.query(sql, [currentPassword], (err, result) => {
        if (err || result.length === 0)
            return res.json({ Status: false, Error: "Current password is incorrect" })
        con.query("UPDATE admin SET password=? WHERE password=?", [newPassword, currentPassword], (err2) => {
            if (err2) return res.json({ Status: false, Error: err2 })
            return res.json({ Status: true })
        })
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.json({ Status: true })
})

router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ Status: false, Error: "Email field is required." });
    }

    const sql = "SELECT * FROM employee WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Database query error" });
        if (result.length === 0) {
            return res.json({ Status: false, Error: "No account found with that email address." });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        const updateSql = "UPDATE employee SET reset_token = ?, reset_token_expires = ? WHERE email = ?";
        con.query(updateSql, [token, expirationTime, email], (updateErr) => {
            if (updateErr) return res.json({ Status: false, Error: "Failed to save token" });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const resetLink = `http://localhost:5173/reset_password/${token}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Employee MS - Password Reset Link',
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Valid for 1 hour.</p>`
            };

            transporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) return res.json({ Status: false, Error: "Failed to send email" });
                return res.json({ Status: true, Result: "Reset link sent to your email inbox." });
            });
        });
    });
});

router.post('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.json({ Status: false, Error: "New password must be supplied." });
    }

    const sql = "SELECT * FROM employee WHERE reset_token = ? AND reset_token_expires > NOW()";
    con.query(sql, [token], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Database query error" });
        if (result.length === 0) {
            return res.json({ Status: false, Error: "Token is invalid or has expired." });
        }

        const employeeEmail = result[0].email;

        bcrypt.hash(password, 10, (hashErr, hash) => {
            if (hashErr) return res.json({ Status: false, Error: "Hashing error" });

            const updateSql = "UPDATE employee SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE email = ?";
            con.query(updateSql, [hash, employeeEmail], (updateErr) => {
                if (updateErr) return res.json({ Status: false, Error: "Failed to update password" });
                return res.json({ Status: true, Result: "Password successfully updated." });
            });
        });
    });
});

router.put('/admin-profile/update', (req, res) => {
    // Expecting email from the session/token, or passed in req.body
    const { name, email, oldEmail } = req.body;

    if (!name || !email || !oldEmail) {
        return res.json({ Status: false, Error: "All fields are required." });
    }

    const sql = "UPDATE employee SET name = ?, email = ? WHERE email = ?";
    con.query(sql, [name, email, oldEmail], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Database update error" });
        if (result.affectedRows === 0) {
            return res.json({ Status: false, Error: "Admin profile record not found." });
        }
        return res.json({ Status: true, Result: "Profile updated successfully!" });
    });
});

export default router;