import express from "express";
import config from "./config"; //usamos variables de entorno para un mejor ejemplo

//importamos todas las rutas que tengamos
import preguntas from "./src/routes/preguntas.routes"

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors(
    {
    credentials: true,  //util para verificacions de acceso como JWT
    origin: 'http://localhost:4200' //Bloque toda peticion que no provenga de los endpoints especificados    
    }
))
app.use(express.urlencoded({extended: false}))

app.use(preguntas);    //esto debemos hacerlo con todas las routes que agreguemos

app.set('port', config.port);
export default app