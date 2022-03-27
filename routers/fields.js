const express = require('express');
const router = express.Router();
const fields = require('../controllers/fields');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const catchAsync = require('../utils/catchAsyncError');
const Fields = require('../models/fields');


// router all field
router.get('/', fields.index);

router.get('/map', async (req, res) => {
    res.render('map');
})

router.get('/new', (req, res) => {
    res.render('fields/new');
})

router.get('/owner', async(req, res) => {
    const fields = await Fields.find({author : req.user._id});
    res.render('fields/owner/index', {fields})
})
// router detail field
router.get('/:id', fields.show)

// router add field
router.post('/', upload.array('images'), catchAsync(fields.createField))

router.put('/', fields.editField)

router.delete('/', fields.deleteField)

router.get('/:id/edit', (req, res) => {
    res.render('fields/edit');
})

module.exports = router;
