const Usuario = require("../../models/Usuario");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const usuarioController = {
  //CREAR usuario
  createUser: async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;

      if (!email || !nombre || !password) {
        return res.status(400).json({ success: false, message: "Nombre, email y contraseña son requeridos" });
      }

      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Formato de correo electrónico inválido (ej: usuario@correo.com)" });
      }

      const nuevoUsuario = await Usuario.create({ nombre, email, password, rol });
      return res.status(201).json({ success: true, data: nuevoUsuario });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  //LEER todos los usuarios activos
  getAllUsers: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({ where: { activo: true } });
      return res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //LEER uno por ID
  getByIdUser: async (req, res) => {
    try {
      const usuario = await Usuario.findOne({ where: { id: req.params.id, activo: true } });
      if (!usuario)
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      return res.status(200).json({ success: true, data: usuario });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //ACTUALIZAR usuario
  updateUser: async (req, res) => {
    try {
      const { email } = req.body;
      if (email && !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Formato de correo electrónico inválido" });
      }

      const usuario = await Usuario.findOne({ where: { id: req.params.id, activo: true } });
      if (!usuario)
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });

      await usuario.update(req.body);
      return res.status(200).json({ success: true, data: usuario });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  //ELIMINAR usuario (Borrado lógico)
  deleteUser: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario)
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });

      await usuario.update({ activo: false });
      return res.status(200).json({
        success: true,
        message: "Usuario eliminado de la base de datos",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = usuarioController;
