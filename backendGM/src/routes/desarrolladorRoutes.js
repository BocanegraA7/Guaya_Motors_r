const express = require('express');
const router = express.Router();
const desarrolladorController = require('../controllers/desarrolladorController')

//RUTAS PARA LOS DESARROLLADORES
router.post('/', desarrolladorController.create);
router.get('/', desarrolladorController.getAll);
router.get('/:id', desarrolladorController.getById);
router.put('/:id', desarrolladorController.update);
router.delete('/:id', desarrolladorController.delete);

module.exports = router;