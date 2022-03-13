const Field = require('../models/fields');

// return json fields index
module.exports.index = async(req, res) => {
    const fields = await Field.find({});
    res.render('fields/index')
}

// return json field detail
module.exports.show =  async(req, res) => {
    const { id } = req.params;
    //const field = await Field.findById(id);
    //res.json(field);
    res.render('fields/show');
}

// create field
module.exports.createField = async(req, res) =>{
    const { price } = req.body;
    const { address } = req.body;
    const { name, category, description} = req.body.field;
    //const field = new Field({name, category, description, price, address});

    console.log(req.body)
}

module.exports.deletefield = async(req, res) =>{
    const { id } = req.params;
    const field = await Field.findByIdAndDelete(id);
}