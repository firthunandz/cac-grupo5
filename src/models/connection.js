// Requerir Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'firthunandz_cac23573_g1', //nombre BD
    '337747_usuario',          //usuario
    'cac23753',                //password
    {
        host: 'mysql-firthunandz.alwaysdata.net',  //host
        dialect: 'mysql',                         //dialecto
    }
);


// Exportar modulo
module.exports = sequelize;