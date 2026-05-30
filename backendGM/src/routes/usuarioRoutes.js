const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {
    createUser,
    getAllUsers,
    getByIdUser,
    updateUser,
    deleteUser
} = require('../controllers/usuarioController')


//RUTAS PARA LOS USUARIOS
router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getByIdUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;