const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/desarrolladorController'); 
const {
    createDesarrollador,
    getAllDesarrollador,
    getDesarrolladorById,
    updateDesarollador,
    deleteDesarrollador
} = require('../controllers/pqrController'); 

// Rutas para PQRs
router.post('/', authMiddleware, createDesarrollador);
router.get('/', authMiddleware, getAllDesarrollador);
router.get('/:id', authMiddleware, getDesarrolladorById);
router.put('/:id', authMiddleware, updateDesarollador);
router.delete('/:id', authMiddleware, deleteDesarrollador);

module.exports = router;