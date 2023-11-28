const productController = {
    admin: (req, res) => res.render("admin", { layout: 'layouts/adminLayout'}),
    create: (req, res) => res.render("create"),
    edit: (req, res) => res.render("edit"),
    destroy: (req, res) => res.send("Producto borrado")  
};

module.exports = productController;