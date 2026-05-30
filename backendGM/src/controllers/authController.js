const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validar campos obligatorios
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y password son requeridos'
            });
        }

        // Buscar usuario
        const usuario = await Usuario.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Comparar contraseña
        if (usuario.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        // Login exitoso
        return res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token: process.env.API_TOKEN,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    login
};