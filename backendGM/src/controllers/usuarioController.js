const Usuario = require('../../models/Usuario');

const usuarioController = {
    //CREAR usuario
    create: async(req, res) =>{
        try{
            const nuevoUsuario = await Usuario.create(req.body);
            return res.status(201).json({ success: true, data: nuevoUsuario});
        }catch(error){
            return res.status(400).json({ success: true, message: error.message});
        }
    },
    //LEER todos los usuarios
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json({ success: true, data: usuarios });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    //LEER uno por ID
    getById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            return res.status(200).json({ success: true, data: usuario });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    //ACTUALIZAR usuario
    update: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            
            await usuario.update(req.body);
            return res.status(200).json({ success: true, data: usuario });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },
    //ELIMINAR usuario
    delete: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            
            await usuario.update();
            return res.status(200).json({ success: true, message: 'Usuario eliminado de la base de datos' });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
};
module.exports = usuarioController;