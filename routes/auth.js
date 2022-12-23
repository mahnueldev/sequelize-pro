const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
require('../config/passport')

router.post('/', passport.authenticate, authController.handleLogin);

module.exports = router;