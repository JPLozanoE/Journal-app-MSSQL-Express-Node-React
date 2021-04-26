const {sql} = require('./headersConst');

// CONEXION A BD
const pool = new sql.ConnectionPool({
    "user": "user_test", // usuario de la base de datos 
    "password": "user123456", // password de la base de datos
    "server": "localhost", // localhost o ip
    "database": "pruebas",
});

pool.connect();

pool.on('error',err=>console.error("Error en la conexión a la base de datos",err));

module.exports={
    pool,
    sql
}