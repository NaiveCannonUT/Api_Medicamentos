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

db.connect(function (error) {
    if (error) {
        console.log("error al conectarse")
    } else {
        console.log("conexion exitosa!!!")
    }
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "Server side error" })
        if (data.length > 0) {
            const name = data[0].name
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Message: "No existe" })
        }
    })

})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: "Success" })
})

app.get('/obtenerDosis', (peticion, respuesta) =>{
    const sql = "SELECT * FROM dosis"
    db.query(sql, (error, resultado) =>{
        if(error) return respuesta.json({error: "error 404"})
        return respuesta.json({dosis: resultado})
    })
})

app.get('/obtenerHorario', (peticon, respuesta) =>{
    const sql = "SELECT * FROM horario"
    db.query(sql, (error, resultado) =>{
        if(error) return respuesta.json({error: "error 404"})
        return respuesta.json({horario: resultado})
    })
})

app.get('/obtenerMedicamentos', (peticion, respuesta) =>{
    const sql = "SELECT * FROM medicamentos"
    db.query(sql, (error, resultado)=>{
        if(error) return respuesta.json({error: "error en 404"})
        return respuesta.json({medicamentos: resultado})
    })
})

app.get('/obtenerMedicamentosMorning', (peticion, respuesta) => {
    const sql = "SELECT id_medicamentos, medicamento, dosis, hora, fecha, id_horario FROM medicamentos  INNER JOIN dosis ON medicamentos.dosis_id = dosis.id_dosis  WHERE id_horario = 1;"
    db.query(sql, (error, resultado) => {
        if (error) return respuesta.json({ error: "error en 404" })
        return respuesta.json({medicamentos: resultado})
    })

})

app.get('/obtenerMedicamentosNoon', (peticion, respuesta) => {
    const sql = "SELECT id_medicamentos, medicamento, dosis, hora, fecha, id_horario FROM medicamentos  INNER JOIN dosis ON medicamentos.dosis_id = dosis.id_dosis  WHERE id_horario = 2;"
    db.query(sql, (error, resultado) => {
        if (error) return respuesta.json({ error: "error en 404" })
        return respuesta.json({medicamentos: resultado})
    })

})

app.get('/obtenerMedicamentosEvening', (peticion, respuesta) => {
    const sql = "SELECT id_medicamentos, medicamento, dosis, hora, fecha, id_horario FROM medicamentos  INNER JOIN dosis ON medicamentos.dosis_id = dosis.id_dosis  WHERE id_horario = 3;"
    db.query(sql, (error, resultado) => {
        if (error) return respuesta.json({ error: "error en 404" })
        return respuesta.json({medicamentos: resultado})
    })

})

app.get('/obtenerMedicamentosNigth', (peticion, respuesta) => {
    const sql = "SELECT id_medicamentos, medicamento, dosis, hora, fecha, id_horario FROM medicamentos  INNER JOIN dosis ON medicamentos.dosis_id = dosis.id_dosis  WHERE id_horario = 4;"
    db.query(sql, (error, resultado) => {
        if (error) return respuesta.json({ error: "error en 404" })
        return respuesta.json({medicamentos: resultado})
    })

})

app.get('/obtenerMedicamentosOnlywhen', (peticion, respuesta) => {
    const sql = "SELECT id_medicamentos, medicamento, dosis, hora, fecha, id_horario FROM medicamentos  INNER JOIN dosis ON medicamentos.dosis_id = dosis.id_dosis  WHERE id_horario = 5;"
    db.query(sql, (error, resultado) => {
        if (error) return respuesta.json({ error: "error en 404" })
        return respuesta.json({medicamentos: resultado})
    })

})

app.post('/crearMedicamento', (req, res) =>{
    const {medicamento, dosis, hora, fecha, horario} = req.body
    db.query('INSERT INTO medicamentos (medicamento, dosis_id, hora, fecha, id_horario) VALUES (?, ?, ?, ?, ?)', [medicamento, dosis, hora, fecha, horario], (error, results) =>{
        if(error){
            console.error("Error al agregar medicamento", error)
            res.status(500).json({
                error: "Error al agregar medicamento, ERROR 500"
            })
        }else{
            res.json({message: "Medicamento agregado"})
        }
    })
})

app.post('/crearDosis', (req, res) =>{
    const {dosis, medida} = req.body
    db.query('INSERT INTO dosis (dosis, medida) VALUES (?, ?)', [dosis, medida], (error, results) =>{
        if(error){
        console.error("Error alagregar dosis", error)
        res.status(500).json({
            error: "Error al agreagar la dosis numeros"
            })
        }else{
        res.json({menssage: "dosis agregada"})
        }
    })
})

app.get('/obtenerMedicamentos/:id', (peticion, respuesta)=>{
    const id = peticion.params.id;
    const sql = "SELECT * FROM medicamentos WHERE id_medicamentos=?"
    db.query(sql, [id], (error, resultado) =>{
        if(error) return respuesta.json ({Error: "Error en la consulta"})
        return respuesta.json({Estatus: "Correcto", Resultado: resultado})
    })
})

app.post('')


app.listen(3001, () => {
    console.log("API escuchando el puerto 3001")
})