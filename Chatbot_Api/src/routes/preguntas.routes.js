import { Router } from 'express'
import { insertar,lista, modificar } from '../controllers/preguntas.controller'
//agregamos las meticiones mas utilizadas en nuestro controlador o cualquier otra peticion que necesitemos

const router = Router()

router.post('/myAPI/insertar',insertar); // obtener todos los usuaros

router.get('/myAPI/lista',lista); // obtener un Producto por id

router.put('/myAPI/modificar',modificar); // obtener un Producto por id



export default router