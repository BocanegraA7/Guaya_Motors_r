const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { DESCRIBE } = require('sequelize/lib/query-types');

const Pqr = sequelize.define('Pqr', {
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
        validate: {
            isEmail: true
        }
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Cerrado', 'En Progreso', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Activo'            
    },
    tipo: {
        type: DataTypes.ENUM('Pregunta', 'Queja', 'Reclamo', 'Sugerencia'),
        allowNull: false,
        defaultValue: 'Pregunta'
    }
})

module.exports = Pqr