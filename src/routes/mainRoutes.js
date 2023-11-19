const express = require("express");

const router = express.Router();

const mainController = require("../controllers/mainController");


router.get('/', (req, res) =>{
    res.redirect('/home');
})
router.get('/home', mainController.index);
router.get('/contact', mainController.contact);
router.get('/about', mainController.about);
router.get('/faqs', mainController.faqs);

module.exports = router;






