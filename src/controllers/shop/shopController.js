const shopController = {
    shop: (req, res) => res.send('Shop'),
    item: (req, res) => res.send('Item'),
    itemAdd: (req, res) => res.send('Item Add'),
    cart: (req, res) => res.send('Cart')
};

module.exports = shopController;