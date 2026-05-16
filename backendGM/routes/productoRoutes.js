const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

console.log('Contenido: ',productoController);
router.post('/', productoController.crearProducto);

router.get('/',productoController.obtenerProducto);

module.exports = router;