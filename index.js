// index.js = LOGICA DE CREACION DEL SERVIDOR WEB
// REQUERIR EXPRESS
const express = require("express");
const app = express();
// REQUERIR PATH
const path = require('path');
// REQUERIR METHOD Y EJSLAYOUTS
const methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');

// REQUERIR SEQUELIZE
const sequelize = require('./src/models/connection');

// PUBLIC FILES
app.use(express.static(path.join(__dirname, "/public")));

// EJS VISTAS Y LAYOUT
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// METHOD
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false}));

// ROUTES
const mainRoutes = require("./src/routes/mainRoutes");
const shopRoutes = require("./src/routes/shop/shopRoutes");
const productRoutes = require("./src/routes/admin/productRoutes");
const authRoutes = require("./src/routes/auth/authRoutes");
const { log } = require("console");

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use("/admin/productos", productRoutes);
app.use("/admin", authRoutes);

// ERROR 404
app.use((req, res, next) => {
    res.status(404).send("La pagina no existe");
});

// PUERTO Y CONEXION BASE DE DATOS
const PORT = 3000;
app.listen(PORT, async() => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
    console.log(`http://localhost:${PORT}`)
});