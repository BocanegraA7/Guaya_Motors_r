const Producto = require('../models/Producto');

exports.crearProducto = async (req, res) => {
    try{
        const nuevoProducto = await Producto.create(req.body);

        res.status(201).json({
            mensaje: 'Producto o servicio registrado con éxito en Guaya Motors',
            data: nuevoProducto
        });
    }catch(error){
        console.log(error)
        res.status(400).json({error: 'No se pudo guardar el producto. Revisa los datos'});
    }
};
exports.obtenerProducto = async (req, res) => {
    try{
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({error: 'Error al obtener el catálogo.'});
    }
};