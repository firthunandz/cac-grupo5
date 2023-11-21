const shopController = {
    shop: (req, res) => res.render('shop'),
    item: (req, res) => res.render('item'),
    itemAdd: (req, res) => res.send('Item Add'),
    cart: (req, res) => res.render('carrito')
};

module.exports = shopController;