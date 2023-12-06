// Requerir tipos de datos que vamos a usar de sequelize
const {DataTypes} = require('sequelize');
// Requerir la conexion de sequelize
const sequelize = require('./connection');

// Definir un elemento (producto)
const Category = sequelize.define('Category', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


// Exportar modulo
module.exports = Category;
