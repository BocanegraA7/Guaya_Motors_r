require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('./models');

//PRODUCTOS
const productoRoutes = require('./src/routes/productoRoutes');
//DESARROLLADORES
const desarrolladorRoutes = require('./src/routes/desarrolladorRoutes');
//Usuarios
const usuarioRoutes = require('./src/routes/usuarioRoutes');
// PQRs
const pqrRoutes = require('./src/routes/pqrRoutes');
// Carrito
const carritoRoutes = require('./src/routes/carritoRoutes');
// Auth
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//Registro de rutas
app.use('/api/productos', productoRoutes);
app.use('/api/desarrolladores', desarrolladorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pqr', pqrRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;
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