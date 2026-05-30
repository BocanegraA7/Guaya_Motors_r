const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { DESCRIBE } = require("sequelize/lib/query-types");

const Carrito = sequelize.define("Carrito", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Comprado"),
  },
});

module.exports = Carrito;
