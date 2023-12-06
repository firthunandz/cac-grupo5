// Requerir tipos de datos que vamos a usar de sequelize
const {DataTypes} = require('sequelize');
// Requerir la conexion de sequelize
const sequelize = require('./connection');
// Requerir bcrypt
const bcryptjs = require('bcryptjs');


// Usuario que se guarda en la BD
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Aplicar bcryptjs antes de guardar
User.beforeSave(async (user, options) => {
    const {password} = user;
    const hash= await bcryptjs.hash(password, 8);
    user.password = hash;
});

// Si no existe la BD la crea.
// (async () => {
//     await sequelize.sync();
// })();

// Exportar modulo
module.exports = User;
