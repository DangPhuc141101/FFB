const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');

router.get('/register', accountController.registerForm)
router.post('/register', accountController.createAccount)
router.get('/login', accountController.loginForm)
router.post('/login', accountController.login)
  
module.exports = router;
