import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems",
    waitForConnections:true,
    connectionlimit:10,
    queuelimit:0,

})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("connected")
    }
})

export default con;