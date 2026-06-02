const Desarrollador = require('../../models/Desarrollador');

// Expresión regular para validar teléfonos (de 7 a 15 dígitos, opcionalmente iniciando con +)
const phoneRegex = /^\+?[0-9]{7,15}$/;

// Función auxiliar para validar URLs
const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const desarrolladorController = {
    // CREAR un desarrollador
    createDesarrollador: async (req, res) => {
        try {
            const { nombre, urlFoto, celular, codigoEstudiante, rolProyecto, githubURL, linkedinURL, descripcion } = req.body;

            // Validar campos obligatorios
            if (!nombre || !urlFoto || !celular || !codigoEstudiante || !rolProyecto || !descripcion) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'Nombre, foto, celular, código, rol y descripción son campos obligatorios.'
                });
            }

            // Validar celular con regex
            if (!phoneRegex.test(celular)) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'El celular no es válido. Debe tener entre 7 y 15 dígitos numéricos.'
                });
            }

            // Validar URL de foto
            if (!isValidUrl(urlFoto)) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'La URL de la foto no es válida.'
                });
            }

            // Validar URLs opcionales si se envían
            if (githubURL && !isValidUrl(githubURL)) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'La URL de GitHub no es válida.'
                });
            }
            if (linkedinURL && !isValidUrl(linkedinURL)) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'La URL de LinkedIn no es válida.'
                });
            }

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
            
            const { celular, urlFoto, githubURL, linkedinURL } = req.body;

            // Validar celular si se actualiza
            if (celular && !phoneRegex.test(celular)) {
                return res.status(400).json({
                    successDesarrollador: false,
                    messageDesarrollador: 'El celular no es válido. Debe tener entre 7 y 15 dígitos numéricos.'
                });
            }

            // Validar URLs si se actualizan
            if (urlFoto && !isValidUrl(urlFoto)) {
                return res.status(400).json({ successDesarrollador: false, messageDesarrollador: 'La URL de la foto no es válida.' });
            }
            if (githubURL && !isValidUrl(githubURL)) {
                return res.status(400).json({ successDesarrollador: false, messageDesarrollador: 'La URL de GitHub no es válida.' });
            }
            if (linkedinURL && !isValidUrl(linkedinURL)) {
                return res.status(400).json({ successDesarrollador: false, messageDesarrollador: 'La URL de LinkedIn no es válida.' });
            }

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