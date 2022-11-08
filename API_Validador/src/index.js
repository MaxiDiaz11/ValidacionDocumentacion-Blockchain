import express from 'express';
import conectarDB from './config/db.js'
import cors from 'cors'
import documentRouter from './routes/documentos.js';
import bodyParser from 'body-parser';
//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB()

//Habilitar express.json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}));
//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//habilitar CORS
app.use(cors());

//importar rutas
app.use('/api/documentos', documentRouter)

//arrancar el servidor
app.listen(PORT, () => {

    console.log("desde el puerto: " + PORT)
})
