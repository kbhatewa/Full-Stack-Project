const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getHomePage);
router.get('/about', mainController.getAboutPage);
router.get('/contact', mainController.getContactPage);

module.exports = router;