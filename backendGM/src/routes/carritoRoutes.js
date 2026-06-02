const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    agregarProducto,
    obtenerCarrito,
    eliminarProducto,
    vaciarCarrito,
    checkout
} = require('../controllers/carritoController');

// Todas las rutas de carrito están protegidas con el token de API
router.post('/agregar', authMiddleware, agregarProducto);
router.get('/:usuarioId', authMiddleware, obtenerCarrito);
router.delete('/:carritoId/producto/:productoId', authMiddleware, eliminarProducto);
router.delete('/vaciar/:usuarioId', authMiddleware, vaciarCarrito);
router.post('/checkout', authMiddleware, checkout);

module.exports = router;
