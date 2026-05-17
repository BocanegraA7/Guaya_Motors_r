const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

//RUTAS PARA LOS PRODUCTOS
router.post('/', productoController.create);
router.get('/', productoController.getAll);
router.get('/:id', productoController.getById);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.delete);

module.exports = router;