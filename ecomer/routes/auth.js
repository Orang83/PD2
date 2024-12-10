const express = require('express');
const authController = require('../controllers/auth'); // Import your auth controller

const router = express.Router();

// Registration route
router.post('/registration', authController.register);

// Login route (ensure that the login method exists in your authController)
router.post('/login', authController.login);

module.exports = router;
