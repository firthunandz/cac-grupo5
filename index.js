// app.js = LOGICA DE CREACION DEL SERVIDOR WEB

const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');

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

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use("/admin", productRoutes);
app.use("/admin", authRoutes);

// ERROR 404

app.use((req, res, next) => {
    res.status(404).send("La pagina no existe");
});

// PUERTO
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));