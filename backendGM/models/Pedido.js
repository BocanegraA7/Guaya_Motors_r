const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { DESCRIBE } = require("sequelize/lib/query-types");

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM("Entregado", "En proceso", "Pendiente Aprobación"),
    allowNull: false,
  },
});

module.exports = Pedido;
