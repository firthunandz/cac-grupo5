const express = require("express");

const router = express.Router();

const shopController = require("../../controllers/shop/shopController");

router.get('/', shopController.shop);
router.get('/item/:id', shopController.item);
router.post('/item/:id/add', shopController.itemAdd);
router.get('/cart', shopController.cart);
router.post('/cart', shopController.cart);


module.exports = router;