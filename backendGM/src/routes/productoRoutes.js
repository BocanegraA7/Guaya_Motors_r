const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const {
    createProduct,
    getAllProducts,
    getByIdProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productoController')

//RUTAS PARA LOS PRODUCTOS
router.get('/', authMiddleware, getAllProducts);

// Protegidas, se maneja al middleware para que solo personas con Token pueda ejecutar acciones sobre productos
router.post('/', authMiddleware, createProduct);
router.get('/:id', authMiddleware, getByIdProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;