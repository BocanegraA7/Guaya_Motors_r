const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('Repuestos','Racing','Calcas','Pintura'),
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imagenURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});
module.exports = Producto;