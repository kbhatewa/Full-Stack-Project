exports.getHomePage = (req, res) => {
    res.render('index');
};

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getContactPage = (req, res) => {
    res.render('contact');
};