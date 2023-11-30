// Requerir Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, //nombre BD
    process.env.DB_USER, //usuario
    process.env.DB_PASS, //password
    {
        host: process.env.DB_HOST,  //host
        dialect: 'mysql',           //dialecto
    }
);


// Exportar modulo
module.exports = sequelize;