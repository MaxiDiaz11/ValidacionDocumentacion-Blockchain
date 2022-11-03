const express = require('express');
const cors = require('cors');

//crear el servidor
const app = express();

//Habilitar express.json
app.use(express.json({ extended: true }))

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//habilitar CORS
app.use(cors());

//importar rutas
app.use('/api/document', require('./routes/document'))

//arrancar el servidor
app.listen(PORT, () => {
    console.log("desde el puerto: " + PORT)
})
