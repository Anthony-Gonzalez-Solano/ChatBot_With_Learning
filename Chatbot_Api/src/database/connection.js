import sql from 'mssql';
import config from '../../config';

//datos de sesion de la base de datos
const dbSettings = {
    user: config.DBuser, //user name
    password: config.DBpassword, // password
    server: config.DBserver, //server ip
    database: config.DBdatabase, //name of the database
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

export async function conectar(){ //funcion que usamos para la conexion
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error)
    }
}

export {sql};