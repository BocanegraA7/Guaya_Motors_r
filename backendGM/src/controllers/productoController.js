const Producto = require('../../models/Producto');
const { Op } = require('sequelize');

const productoController = {
    //CREAR un producto
    createProduct: async (req,res) => {
        try{
            const { nombre, categoria, precio, descripcion, stock, imagenURL } = req.body;

            // Validaciones básicas
            if (!nombre || !categoria || !precio || !imagenURL) {
                return res.status(400).json({ success: false, message: "Nombre, categoría, precio e imagenURL son requeridos" });
            }

            if (precio < 0) {
                return res.status(400).json({ success: false, message: "El precio no puede ser menor a 0" });
            }

            if (stock && stock < 0) {
                return res.status(400).json({ success: false, message: "El stock no puede ser menor a 0" });
            }

            const nuevoProducto = await Producto.create(req.body);
            return res.status(201).json({success: true, data: nuevoProducto});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    },

    //LEER todos los productos (con filtros opcionales de categoría, búsqueda por nombre e inventario bajo)
    getAllProducts: async (req, res) => {
        try{
            const { categoria, search, stockBajo } = req.query;
            const where = { activo: true };

            if (categoria) {
                where.categoria = categoria;
            }

            if (search) {
                where.nombre = {
                    [Op.substring]: search
                };
            }

            if (stockBajo === 'true') {
                where.stock = {
                    [Op.lte]: 5 // Considerar stock bajo a 5 o menos
                };
            }

            const productos = await Producto.findAll({ where });
            return res.status(200).json({success: true, data: productos});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    },

    //LEER uno por uno los ID productos
    getByIdProduct: async (req, res) =>{
        try{
            const producto = await Producto.findOne({where: {id: req.params.id, activo: true}});
            if(!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            
            return res.status(200).json({success: true, data: producto});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    },

    //ACTUALIZAR los productos
    updateProduct: async(req, res) => {
        try{
            const producto = await Producto.findOne({where: {id: req.params.id, activo: true}});
            if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado'});

            if (req.body.precio !== undefined && req.body.precio < 0) {
                return res.status(400).json({ success: false, message: "El precio no puede ser menor a 0" });
            }

            if (req.body.stock !== undefined && req.body.stock < 0) {
                return res.status(400).json({ success: false, message: "El stock no puede ser menor a 0" });
            }

            await producto.update(req.body);
            return res.status(200).json({success: true, data: producto});
        }catch(error){
            return res.status(400).json({success: false, message: error.message});
        }
    },

    //ELIMINA borrar producto (Borrado lógico)
    deleteProduct: async(req, res) => {
        try{
            const producto = await Producto.findByPk(req.params.id);
            if(!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado'});

            await producto.update({ activo: false });
            return res.status(200).json({success: true, message: 'Producto eliminado'});
        }catch(error){
            return res.status(500).json({success: false, message: error.message});
        }
    }
};
module.exports = productoController;