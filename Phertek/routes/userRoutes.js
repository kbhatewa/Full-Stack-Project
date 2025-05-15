const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validator');

// Note: using /new instead of /register
router.get('/new', userController.showRegister);     
router.post('/new', validateUser, userController.register);       
router.get('/login', userController.showLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/profile', userController.isLoggedIn, userController.profile);

module.exports = router;