const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const {
    createDesarrollador,
    getAllDesarrollador,
    getDesarrolladorById,
    updateDesarrollador,
    deleteDesarrollador
} = require('../controllers/desarrolladorController'); 

// Rutas para desarrolladores
router.post('/', authMiddleware, createDesarrollador);
router.get('/', getAllDesarrollador); // Permitir GET público para mostrar en el frontend
router.get('/:id', getDesarrolladorById); // Permitir GET público
router.put('/:id', authMiddleware, updateDesarrollador);
router.delete('/:id', authMiddleware, deleteDesarrollador);

module.exports = router;