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
router.get('/', getAllProducts); // Público para búsqueda y visualización
router.get('/:id', getByIdProduct); // Público para ver detalle de producto

// Protegidas, se maneja al middleware para que solo personas con Token puedan modificar productos
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;