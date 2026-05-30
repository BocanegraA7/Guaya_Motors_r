const Desarrollador = require('../../models/Desarrollador');

const desarrolladorController = {
    // CREAR un desarrollador
    createDesarrollador: async (req, res) => {
        try {
            const nuevoDev = await Desarrollador.create(req.body);
            return res.status(201).json({ successDesarrollador: true, dataDesarrollador: nuevoDev });
        } catch (error) {
            return res.status(400).json({ successDesarrollador: false, messageDesarrollador: error.message });
        }
    },

    // LEER todos los desarrolladores
    getAllDesarrollador: async (req, res) => {
        try {
            const devs = await Desarrollador.findAll();
            return res.status(200).json({ successDesarrollador: true, dataDesarrollador: devs });
        } catch (error) {
            return res.status(500).json({ successDesarrollador: false, messageDesarrollador: error.message });
        }
    },

    // LEER uno por uno los ID desarrolladores
    getDesarrolladorById: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ successDesarrollador: false, messageDesarrollador: 'Desarrollador no encontrado' });
            return res.status(200).json({ successDesarrollador: true, dataDesarrollador: dev });
        } catch (error) {
            return res.status(500).json({ successDesarrollador: false, messageDesarrollador: error.message });
        }
    },

    // ACTUALIZAR datos del desarrollador
    updateDesarrollador: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ successDesarrollador: false, messageDesarrollador: 'Desarrollador no encontrado' });
            
            await dev.update(req.body);
            return res.status(200).json({ successDesarrollador: true, dataDesarrollador: dev });
        } catch (error) {
            return res.status(400).json({ successDesarrollador: false, messageDesarrollador: error.message });
        }
    },

    // ELIMINAR borrar al desarrollador
    deleteDesarrollador: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ successDesarrollador: false, messageDesarrollador: 'Desarrollador no encontrado' });
            
            await dev.destroy();
            return res.status(200).json({ successDesarrollador: true, messageDesarrollador: 'Desarrollador eliminado de la base de datos' });
        } catch (error) {
            return res.status(500).json({ successDesarrollador: false, messageDesarrollador: error.message });
        }
    }
};

module.exports = desarrolladorController;