const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB()

//Habilitar express.json
app.use(express.json({ extended: true }))

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//habilitar CORS
app.use(cors());

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//arrancar el servidor
app.listen(PORT, () => {
    console.log("desde el puerto: " + PORT)
})
