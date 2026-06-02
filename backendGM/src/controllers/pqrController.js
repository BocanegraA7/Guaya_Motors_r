const Pqr = require("../../models/Pqr");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const pqrController = {
  // Crear PQR
  createPqr: async (request, response) => {
    try {
      const { nombre, email, asunto, descripcion, tipo } = request.body;

      if (!nombre || !email || !asunto || !descripcion) {
        return response.status(400).json({
          success: false,
          message: "Nombre, email, asunto y descripción son obligatorios."
        });
      }

      if (!emailRegex.test(email)) {
        return response.status(400).json({
          success: false,
          message: "Formato de correo electrónico inválido."
        });
      }

      const nuevaPqr = await Pqr.create({
        nombre,
        email,
        asunto,
        descripcion,
        tipo,
        fecha: new Date()
      });
      return response.status(201).json({ success: true, data: nuevaPqr });
    } catch (error) {
      return response
        .status(500)
        .json({ success: false, message: error.message });
    }
  },

  // Ver todas las PQRs
  getAllPqr: async (request, response) => {
    try {
      const pqrs = await Pqr.findAll();
      return response.status(200).json({ success: true, data: pqrs });
    } catch (error) {
      return response
        .status(500)
        .json({ success: false, message: error.message });
    }
  },

  // Leer PQR por ID
  getPqrById: async (request, response) => {
    try {
      const pqr = await Pqr.findByPk(request.params.id);
      if (!pqr)
        return response
          .status(404)
          .json({ success: false, message: "PQR no encontrado" });
      return response.status(200).json({ success: true, data: pqr });
    } catch (error) {
      return response
        .status(500)
        .json({ success: false, message: error.message });
    }
  },

  //ACTUALIZAR PQR
  updatePqr: async (request, response) => {
    try {
      const { email } = request.body;
      if (email && !emailRegex.test(email)) {
        return response.status(400).json({
          success: false,
          message: "Formato de correo electrónico inválido."
        });
      }

      const pqr = await Pqr.findByPk(request.params.id);
      if (!pqr)
        return response
          .status(404)
          .json({ success: false, message: "PQR no encontrado" });

      await pqr.update(request.body);
      return response.status(200).json({ success: true, data: pqr });
    } catch (error) {
      return response
        .status(400)
        .json({ success: false, message: error.message });
    }
  },

  //ELIMINAR PQR
  deletePqr: async (request, response) => {
    try {
      const pqr = await Pqr.findByPk(request.params.id);
      if (!pqr)
        return response
          .status(404)
          .json({ success: false, message: "PQR no existe" });

      await pqr.destroy();
      return response.status(200).json({
        success: true,
        message: "PQR eliminada de la base de datos",
      });
    } catch (error) {
      return response
        .status(400)
        .json({ success: false, message: error.message });
    }
  },
};

module.exports = pqrController;
