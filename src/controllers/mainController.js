const mainController = {
    index: (req, res) => res.render('index'),
    contact: (req, res) => res.send('Contact'),
    about: (req, res) => res.send('About'),
    faqs: (req, res) => res.send('Faqs')
};

module.exports = mainController;