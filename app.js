// app.js = LOGICA DE CREACION DEL SERVIDOR WEB

const express = require("express");
const app = express();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false}));

const mainRoutes = require("./src/routes/mainRoutes");
const shopRoutes = require("./src/routes/shop/shopRoutes");
const productRoutes = require("./src/routes/admin/productRoutes");
const authRoutes = require("./src/routes/auth/authRoutes");
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use("/admin", productRoutes);
app.use("/admin", authRoutes);

app.use((req, res, next) => {
    res.status(404).send("La pagina no existe");
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));