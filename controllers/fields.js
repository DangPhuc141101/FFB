const Fields = require('../models/fields');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

// return json field detail
module.exports.show =  async(req, res) => {
    console.log("show page")
    try {
        const { id } = req.params;
        const field = await Fields.findById(id);
        //res.json(field);
        console.log(`show page ${id}`)
        res.render('fields/show', {field});
    }
    catch (e)  {
        console.log("err show page")
    }
}

// return json fields index
module.exports.index = async(req, res) => {
    const fields = await Fields.find({});
    console.log("index page");
    await res.render('fields/index', {fields});
    console.log("index page3");
}

const getGeometry = async(input) => {
    let coordinates = [];
    const url = encodeURI(`https://rsapi.goong.io/Place/AutoComplete?api_key=DUdJgN4L4Gvdvr2R2OhzfdBVATMJr0P9AMAnVMzi&location=21.013715429594125,%20105.79829597455202&input=${input}`);
    await axios({
        url
    })
    .then(async (response) => {
        const place_id = response.data.predictions[0].place_id;
        await axios({
            url: `https://rsapi.goong.io/Place/Detail?place_id=${place_id}&api_key=${API_KEY}`
        })
        .then(response => {
            const location = response.data.result.geometry.location;
            coordinates = [location.lat, location.lng];
        })
    })
    return coordinates;
}

// create field
module.exports.createField = async(req, res) =>{ 
    const { start, end, price } = req.body.price;
    const prices = [];
    for (let i = 0; i<price.length; i++)
    {
        prices.push({start:start[i], end:end[i], price:price[i]});
    }
    console.log(prices);
    const input = req.body.field.address;
    const coordinates = await getGeometry(input);
    const geometry = {
        type: 'Point',
        coordinates : coordinates
    }
    const field = new Fields(req.body.field);
    field.prices.push(...prices);
    field.geometry = geometry;
    field.images = req.files.map(f => ({url: f.path, filename: f.filename }));
    field.author = req.user_id;
    await field.save();
}

module.exports.deleteField = async(req, res) =>{
    const { id } = req.params;
    const field = await Fields.findByIdAndDelete(id);
    res.redirect('/');
}

module.exports.editField = async(req, res) => {
    const { price } = req.body;
    const { address } = req.body;
    const { name, category, description} = req.body.field;
}