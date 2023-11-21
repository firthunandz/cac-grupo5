const productController = {
    admin: (req, res) => res.render("admin"),
    create: (req, res) => res.send("Crear Producto"),
    edit: (req, res) => res.send("Producto modificado"),
    destroy: (req, res) => res.send("Producto borrado")  
};

module.exports = productController;