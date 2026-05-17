const Desarrollador = require('../../models/Desarrollador');

const desarrolladorController = {
    // CREAR un desarrollador
    create: async (req, res) => {
        try {
            const nuevoDev = await Desarrollador.create(req.body);
            return res.status(201).json({ success: true, data: nuevoDev });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },

    // LEER todos los desarrolladores
    getAll: async (req, res) => {
        try {
            const devs = await Desarrollador.findAll();
            return res.status(200).json({ success: true, data: devs });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // LEER uno por uno los ID desarrolladores
    getById: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ success: false, message: 'Desarrollador no encontrado' });
            return res.status(200).json({ success: true, data: dev });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // ACTUALIZAR datos del desarrollador
    update: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ success: false, message: 'Desarrollador no encontrado' });
            
            await dev.update(req.body);
            return res.status(200).json({ success: true, data: dev });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },

    // ELIMINAR borrar al desarrollador
    delete: async (req, res) => {
        try {
            const dev = await Desarrollador.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ success: false, message: 'Desarrollador no encontrado' });
            
            await dev.destroy();
            return res.status(200).json({ success: true, message: 'Desarrollador eliminado de la base de datos' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = desarrolladorController;