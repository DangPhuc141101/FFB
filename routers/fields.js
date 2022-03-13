const express = require('express');
const router = express.Router();
const fields = require('../controllers/fields');

// router detail field
router.get('/:id',fields.show)

// router all field
router.get('/', fields.index);

// router add field
router.post('/', fields.createField)

module.exports = router;
