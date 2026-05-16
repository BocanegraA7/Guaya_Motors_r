const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { Sequelize } = require('sequelize');
const Productos = require('./models/Producto');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//Registro de rutas
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 5000;
//DB CONECTION
async function Connection() {
    try{
        await sequelize.authenticate();
        console.log('Conexion a PostgreSQL (Docker) exitosa.');
        //Sincronizar modelos
        await sequelize.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Servidor de Guaya Motors en http://localhost:${PORT}`);
        });
    }catch (error){
        console.error('No se pudo conectar a la DB: ',error);
    }
}

Connection();