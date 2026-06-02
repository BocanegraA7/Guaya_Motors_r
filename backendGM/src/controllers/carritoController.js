const { Carrito, CarritoProducto, Producto, Usuario, Pedido } = require("../../models");
const sequelize = require("../../config/db");

// Expresiones regulares para la pasarela de pago ficticia (Requisito o)
const cardRegex = /^\d{16}$/; // Tarjeta de 16 dígitos
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Formato MM/YY
const cvvRegex = /^\d{3}$/; // CVV de 3 dígitos

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

      if (cantidad <= 0) {
        return res.status(400).json({
          success: false,
          message: "La cantidad debe ser mayor que 0"
        });
      }

      // Validar que el producto exista y esté activo
      const producto = await Producto.findOne({ where: { id: productoId, activo: true } });
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: "El producto no existe o está inactivo"
        });
      }

      // Validar si hay stock disponible
      if (producto.stock < cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente. Solo quedan ${producto.stock} unidades de ${producto.nombre}.`
        });
      }

      // Buscar o crear el carrito del usuario
      let [carrito] = await Carrito.findOrCreate({
        where: { usuarioId },
        defaults: { estado: 'Activo' }
      });

      // Buscar si el producto ya existe en el carrito
      let item = await CarritoProducto.findOne({
        where: {
          carritoId: carrito.id,
          productoId
        }
      });

      // Si ya existe, aumentar cantidad
      if (item) {
        const nuevaCantidad = item.cantidad + cantidad;
        if (producto.stock < nuevaCantidad) {
          return res.status(400).json({
            success: false,
            message: `No se puede agregar más. Stock insuficiente. Stock total: ${producto.stock}.`
          });
        }

        await item.update({ cantidad: nuevaCantidad });

        return res.status(200).json({
          success: true,
          message: "Cantidad de producto actualizada en el carrito",
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
        message: "Producto agregado al carrito correctamente",
        data: item
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener carrito de un usuario con los detalles de los productos
  obtenerCarrito: async (req, res) => {
    try {
      const { usuarioId } = req.params;

      let carrito = await Carrito.findOne({
        where: { usuarioId },
        include: [{
          model: Producto,
          where: { activo: true },
          required: false, // Para que si está vacío igual traiga el carrito
          through: { attributes: ['cantidad'] }
        }]
      });

      // Si no tiene carrito, le devolvemos una estructura vacía en vez de 404 para facilidad del frontend
      if (!carrito) {
        return res.status(200).json({
          success: true,
          data: {
            usuarioId,
            Productos: []
          }
        });
      }

      return res.status(200).json({
        success: true,
        data: carrito
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
  },

  // Procesar compra y pago ficticio (Checkout) con control de stock e inventario y generación de factura
  checkout: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { usuarioId, numeroTarjeta, fechaExpiracion, cvv, nombreTarjetahabiente } = req.body;

      // 1. Validar campos de pago obligatorios
      if (!usuarioId || !numeroTarjeta || !fechaExpiracion || !cvv || !nombreTarjetahabiente) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Los datos de facturación y de la tarjeta de pago son requeridos"
        });
      }

      // 2. Validaciones con expresiones regulares de los datos de pago (Requisito o, r)
      const cleanCard = numeroTarjeta.replace(/\s/g, '');
      if (!cardRegex.test(cleanCard)) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Número de tarjeta inválido. Debe contener exactamente 16 dígitos."
        });
      }

      if (!expiryRegex.test(fechaExpiracion)) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Fecha de expiración inválida. Debe tener formato MM/YY."
        });
      }

      if (!cvvRegex.test(cvv)) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Código CVV inválido. Debe contener exactamente 3 dígitos."
        });
      }

      // 3. Buscar el usuario
      const usuario = await Usuario.findByPk(usuarioId, { transaction: t });
      if (!usuario || !usuario.activo) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: "El usuario que realiza la compra no existe o está inactivo."
        });
      }

      // 4. Buscar el carrito del usuario con sus productos asociados
      const carrito = await Carrito.findOne({
        where: { usuarioId },
        include: [{
          model: Producto,
          where: { activo: true },
          through: { attributes: ['cantidad'] }
        }],
        transaction: t
      });

      if (!carrito || !carrito.Productos || carrito.Productos.length === 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "El carrito está vacío. No se puede realizar el checkout."
        });
      }

      // 5. Verificar stock e inventario de todos los productos del carrito (Requisito f)
      let total = 0;
      const productosAComprar = [];

      for (const prod of carrito.Productos) {
        const cantidadPedida = prod.CarritoProducto.cantidad;
        
        // Verificar stock
        if (prod.stock < cantidadPedida) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: `Stock insuficiente para '${prod.nombre}'. Stock actual: ${prod.stock}, solicitado: ${cantidadPedida}.`
          });
        }

        const subtotalProducto = prod.precio * cantidadPedida;
        total += subtotalProducto;

        productosAComprar.push({
          producto: prod,
          cantidad: cantidadPedida,
          precioUnitario: prod.precio,
          subtotal: subtotalProducto
        });
      }

      // 6. Descontar el stock e inventario en la base de datos (Requisito f)
      for (const item of productosAComprar) {
        const nuevoStock = item.producto.stock - item.cantidad;
        await item.producto.update({ stock: nuevoStock }, { transaction: t });
      }

      // 7. Crear el registro del Pedido en la base de datos (Requisito e, f)
      const nuevoPedido = await Pedido.create({
        usuarioId,
        total,
        estado: 'En proceso',
        fecha: new Date()
      }, { transaction: t });

      // 8. Vaciar el carrito de compras (Requisito q)
      await CarritoProducto.destroy({
        where: { carritoId: carrito.id },
        transaction: t
      });

      // Confirmar transacción
      await t.commit();

      // 9. Generar Factura Detallada (Facturación - Requisito f)
      const impuestoIva = total * 0.19; // IVA del 19%
      const subtotalAntesIva = total - impuestoIva;
      
      const numeroFactura = `FACT-${String(nuevoPedido.id).padStart(6, '0')}`;
      const transaccionId = `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const factura = {
        empresa: {
          nombre: "Guaya Motors S.A.S",
          nit: "901.452.123-5",
          direccion: "Av. Caracas #45-12, Bogotá, Colombia",
          telefono: "+57 312 456 7890",
          email: "contacto@guayamotors.com"
        },
        cliente: {
          nombre: usuario.nombre,
          email: usuario.email
        },
        pedido: {
          id: nuevoPedido.id,
          numeroFactura,
          transaccionId,
          fecha: nuevoPedido.fecha,
          estadoPago: "Aprobado (Simulación)",
          metodoPago: "Tarjeta de Crédito / Débito (Ficticia)"
        },
        items: productosAComprar.map(item => ({
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          precioUnitario: item.precioUnitario,
          cantidad: item.cantidad,
          subtotal: item.subtotal
        })),
        resumenValores: {
          subtotal: parseFloat(subtotalAntesIva.toFixed(2)),
          iva: parseFloat(impuestoIva.toFixed(2)),
          total: parseFloat(total.toFixed(2))
        }
      };

      return res.status(200).json({
        success: true,
        message: "Pago simulado y checkout realizado con éxito. Inventario actualizado.",
        pedido: nuevoPedido,
        factura
      });

    } catch (error) {
      if (!t.finished) {
        await t.rollback();
      }
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

};

module.exports = carritoController;