const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Desarrollador = sequelize.define(
  "Desarrollador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlFoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigoEstudiante: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Evita códigos repetidos
    },
    rolProyecto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    githubURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkedinURL: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Desarrollador;
