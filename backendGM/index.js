const express = require('express');
const cors = require('cors');
require('./models');

sequelize.sync();
const sequelize = require('./config/db');
const { Sequelize } = require('sequelize');
//PRODUCTOS
const Productos = require('./models/Producto');
const productoRoutes = require('./src/routes/productoRoutes');
//DESARROLLADORES
const Desarrollador = require('./models/Desarrollador')
const desarrolladorRoutes = require('./src/routes/desarrolladorRoutes')
//Usuarios
const Usuario = require('./models/Usuario');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

// PQRs
const Pqr = require('./models/Pqr');
const pqrRoutes = require('./src/routes/pqrRoutes');


const authRoutes = require('./src/routes/authRoutes');


const app = express();
app.use(cors());
app.use(express.json());

//Registro de rutas
app.use('/api/productos', productoRoutes);
app.use('/api/desarrolladores', desarrolladorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pqr', pqrRoutes)
app.use('/auth', authRoutes);

const PORT = process.env.PORT;
//DB CONECTION
async function Connection() {
    try{
        await sequelize.authenticate();
        console.log('Conexion a PostgreSQL (Docker) exitosa.');
        //Sincronizar modelos
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Servidor de Guaya Motors en http://localhost:${PORT}`);
        });
    }catch (error){
        console.error('No se pudo conectar a la DB: ',error);
    }
}

Connection();