// Requerir tipos de datos que vamos a usar de sequelize
const {DataTypes} = require('sequelize');
// Requerir la conexion de sequelize
const sequelize = require('./connection');

// Definir un elemento (producto)
const Product = sequelize.define('Product', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
});

// Sincronizacion, crear la tabla si no existe
(async() => {
    //await sequelize.sync({force: true}); 
    await sequelize.sync(); 
})();

// Exportar modulo
module.exports = Product;
