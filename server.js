const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],  // Cambia la cadena a un array de métodos
        credentials: true
    }
))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medicamentos"
})

app.post('/login',(req, res)=>{
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json({Message: "Server side error"})
        if(data.length > 0){
            const name = data[0].name
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({Status: "Success"})
        }else{
            return res.json({Message: "No existe"})
        }
    })

} )

app.get('/logout', (req, res) =>{
    res.clearCookie('token')
    return res.json({Status: "Success"})
})

app.listen(8080, ()=>{
    console.log("API escuchando el puerto 8080")
})