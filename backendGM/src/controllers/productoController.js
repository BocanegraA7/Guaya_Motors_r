const Producto = require('../../models/Producto');

const productoController = {
    //CREAR un producto
    create: async (req,res) => {
        try{
            const nuevoProducto = await Producto.create(req.body);
            return res.status(201).json({success: true, data: nuevoProducto});
        }catch(error){
            return res.status(400).json({sucess:false, message: error.message});
        }
    },
    //LEER todos los productos
    getAll: async (req, res) => {
        try{
            const productos = await Producto.findAll({where: {activo: true}});
            return res.status(200).json({success: true, data: productos});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    },
    //LEER uno por uno los ID productos
    getById: async (req, res) =>{
        try{
            const producto = await Producto.findOne({where: {id: req.params.id,activo:true}});
            if(!producto)return res.status(404).json({ success: false,message:'Producto no encontrado'});
            
            await producto.update(req.body);
            return res.status(200).json({success: true,data :producto});
        }catch(error){
            return res.status(500).json({success: false,message: error.message});
        }
    },
    //ACTUALIZAR los productos
    update: async(req, res) => {
        try{
            const producto = await Producto.findByPk(req.params.id);
            if (!producto) return res.status(404).json({ success:false, message: 'Producto no encontrado'});

            await producto.update(req.body);
            return res.status(200).json({success: true,data: producto});
        }catch(error){
            return res.status(400).json({success: false, message: error.message});
        }
    },
    //ELIMINA borrar producto
    delete: async(req, res) => {
        try{
            const producto = await Producto.findByPk(req.params.id);
            if(!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado'});

            await producto.destroy({ activo: false});
            return res.status(200).json({success: true, message: 'Producto eliminado'});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    }
};
module.exports = productoController;