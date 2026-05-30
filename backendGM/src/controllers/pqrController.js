const Pqr = require("../../models/Pqr");

const pqrController = {
  // Crear PQR
  createPqr: async (request, response) => {
    try {
      const nuevaPqr = await Pqr.create(request.body);
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
      return response.status(201).json({ success: true, data: pqrs });
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

      await pqr.update();
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
