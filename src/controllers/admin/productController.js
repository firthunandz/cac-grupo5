const productController = {
    admin: (req, res) => res.send("Listado de productos"),
    create: (req, res) => res.send("Crear Producto"),
    edit: (req, res) => res.send("Producto modificado"),
    destroy: (req, res) => res.send("Producto borrado")  
};

module.exports = productController;