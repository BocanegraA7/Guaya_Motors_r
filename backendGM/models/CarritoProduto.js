const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { DESCRIBE } = require("sequelize/lib/query-types");
const Carrito = require("./Carrito");

const CarritoProducto = sequelize.define("CarritoProducto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CarritoProducto;
