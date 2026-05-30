const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const Carrito = require('./Carrito');
const Producto = require('./Producto');
const CarritoProducto = require('./CarritoProducto');

// Usuario -> Pedido
Usuario.hasMany(Pedido, {
    foreignKey: 'usuarioId'
});

Pedido.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

// Usuario -> Carrito
Usuario.hasOne(Carrito, {
    foreignKey: 'usuarioId'
});

Carrito.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

// Carrito <-> Producto
Carrito.belongsToMany(Producto, {
    through: CarritoProducto,
    foreignKey: 'carritoId'
});

Producto.belongsToMany(Carrito, {
    through: CarritoProducto,
    foreignKey: 'productoId'
});

module.exports = {
    Usuario,
    Pedido,
    Carrito,
    Producto,
    CarritoProducto
};