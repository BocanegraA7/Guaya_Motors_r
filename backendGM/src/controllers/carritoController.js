const Carrito = require("../models/Carrito");
const CarritoProducto = require("../models/CarritoProducto");

const carritoController = {

  // Agregar producto al carrito
  agregarProducto: async (req, res) => {
    try {

      const { usuarioId, productoId, cantidad } = req.body;

      if (!usuarioId || !productoId || !cantidad) {
        return res.status(400).json({
          success: false,
          message: "usuarioId, productoId y cantidad son obligatorios"
        });
      }

      // Buscar carrito del usuario
      let carrito = await Carrito.findOne({
        where: { usuarioId }
      });

      // Si no existe, crearlo
      if (!carrito) {
        carrito = await Carrito.create({
          usuarioId
        });
      }

      // Buscar si el producto ya existe en el carrito
      let item = await CarritoProducto.findOne({
        where: {
          carritoId: carrito.id,
          productoId
        }
      });

      // Si ya existe, aumentar cantidad
      if (item) {

        await item.update({
          cantidad: item.cantidad + cantidad
        });

        return res.status(200).json({
          success: true,
          message: "Cantidad actualizada",
          data: item
        });
      }

      // Si no existe, crearlo
      item = await CarritoProducto.create({
        carritoId: carrito.id,
        productoId,
        cantidad
      });

      return res.status(201).json({
        success: true,
        message: "Producto agregado al carrito",
        data: item
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  },

  // Obtener carrito de un usuario
  obtenerCarrito: async (req, res) => {
    try {

      const { usuarioId } = req.params;

      const carrito = await Carrito.findOne({
        where: { usuarioId }
      });

      if (!carrito) {
        return res.status(404).json({
          success: false,
          message: "Carrito no encontrado"
        });
      }

      const productos = await CarritoProducto.findAll({
        where: {
          carritoId: carrito.id
        }
      });

      return res.status(200).json({
        success: true,
        carrito,
        productos
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  },

  // Eliminar un producto del carrito
  eliminarProducto: async (req, res) => {
    try {

      const { carritoId, productoId } = req.params;

      const item = await CarritoProducto.findOne({
        where: {
          carritoId,
          productoId
        }
      });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado en el carrito"
        });
      }

      await item.destroy();

      return res.status(200).json({
        success: true,
        message: "Producto eliminado del carrito"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  },

  // Vaciar carrito
  vaciarCarrito: async (req, res) => {
    try {

      const { usuarioId } = req.params;

      const carrito = await Carrito.findOne({
        where: { usuarioId }
      });

      if (!carrito) {
        return res.status(404).json({
          success: false,
          message: "Carrito no encontrado"
        });
      }

      await CarritoProducto.destroy({
        where: {
          carritoId: carrito.id
        }
      });

      return res.status(200).json({
        success: true,
        message: "Carrito vaciado correctamente"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }

};

module.exports = carritoController;