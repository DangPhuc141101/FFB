const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');

router.post('/', accountController.createAccount)

  
module.exports = router;
