import {conectar, sql, queries} from "../database";

export const insertar = async (req,res) => {
    const {Pregunta,Respuesta} = req.body          //Get body

    try {
        const pool = await conectar();                                                  //connection DB
        const result = await pool.request()
        .input("pregunta",sql.VarChar,Pregunta)                                       //Parameters of the query
        .input("respuesta",sql.VarChar,Respuesta)
        .query(queries.insertar)                                                        //Select the query
        res.status(200).json(result.recordset);                                          //response
    } catch (error) {
        res.status(500);                                                                //server error
        res.send(error.message);
    }
}

export const lista = async (req,res) => {    //Get body

    try {
        const pool = await conectar();                                                  //connection DB
        const result = await pool.request()
        .query(queries.obtener)                                                        //Select the query
        res.status(200).json(result.recordset);                                          //response
    } catch (error) {
        res.status(500);                                                                //server error
        res.send(error.message);
    }
}

export const modificar = async (req,res) => {    //Get body
    const {Pregunta,Respuesta} = req.body          //Get body

    try {
        const pool = await conectar();                                                  //connection DB
        const result = await pool.request()
        .input("pregunta",sql.VarChar,Pregunta)                                       //Parameters of the query
        .input("respuesta",sql.VarChar,Respuesta)
        .query(queries.modificar)                                                        //Select the query
        res.status(200).json(result.recordset);                                          //response
    } catch (error) {
        res.status(500);                                                                //server error
        res.send(error.message);
    }
}