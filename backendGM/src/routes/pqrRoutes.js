const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const {
    createPqr,
    getAllPqr,
    getPqrById,
    updatePqr,
    deletePqr
} = require('../controllers/pqrController'); 

// Rutas para PQRs
router.post('/', authMiddleware, createPqr);
router.get('/', authMiddleware, getAllPqr);
router.get('/:id', authMiddleware, getPqrById);
router.put('/:id', authMiddleware, updatePqr);
router.delete('/:id', authMiddleware, deletePqr);

module.exports = router;