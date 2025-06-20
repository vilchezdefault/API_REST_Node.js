const { Pool } = require("pg");
require("dotenv").config();
///Uso de variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
///Función para probar la conexion a la base de datos
const probarConexion = async () => {
  try {
    const cliente = await pool.connect();
    console.log("Conexion exitosa a postgreSQL");
    console.log(`Base de datos:${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Error al conectar", error.message);
  }
};
///Llamar a la funcion para que ejecutee
module.exports = { pool, probarConexion };
