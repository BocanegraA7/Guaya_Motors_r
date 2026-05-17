const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Evita dos usuarios con el mismo correo
        validate:{
            isEmail: true //Valida que tenga el formato micorreo@correo.com
        } 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rol: {
        type: DataTypes.ENUM('Administrador','Cliente','Empleado'),
        allowNull: false,
        defaultValue: 'Cliente' //Quien se registre sera cliente
    },
    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true //Para borrado lógico
    }
});
module.exports = Usuario;