const express = require('express');
const router = express.Router();
const fields = require('../controllers/fields');

router.get('/map', async (req, res) => {
    res.render('map');
})

// router all field
router.get('/', fields.index);

// router detail field
router.get('/:id',fields.show)

// router add field
router.post('/', fields.createField)
router.put('/', fields.editField)
router.delete('/', fields.deleteField)

module.exports = router;
