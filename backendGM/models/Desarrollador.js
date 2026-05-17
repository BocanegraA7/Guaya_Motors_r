const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Desarrollador = sequelize.define('Desarrollador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoEstudiante: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Evita códigos repetidos
    },
    rolProyecto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    githubURL: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false 
});

module.exports = Desarrollador;