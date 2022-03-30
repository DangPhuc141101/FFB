const Fields = require('../models/fields');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

// return json field detail
module.exports.show =  async(req, res) => {
    console.log("show page")
    try {
        const { id } = req.params;
        console.log(id)
        const field = await Fields.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');
        //res.json(field);
        console.log(`show page ${id}`)
        res.render('fields/show', {field});
    }
    catch (e)  {
        console.log("err show page" + e)
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

const getTime = (start, end) => {
    const result = [];
    const startHour = start.split(':')[0], startMinute = start.split(':')[1];
    const endHour = end.split(':')[0], endMinute = end.split(':')[1];
    for (let i = parseInt(startHour); i != parseInt(endHour); i++)
    {
        const hour = (i) % 24;
        const strHour = (hour>=10) ? hour.toString() : '0'+hour.toString();
        const temp = ((hour+1)>=10) ? (hour+1).toString() : '0'+(hour+1).toString();
        if (hour + 1 == parseInt(endHour)) {
            if (parseInt(startMinute) <= parseInt(endMinute)) result.push(`${strHour}:${startMinute} - ${endHour}:${startMinute}`);
        }
        else result.push(`${strHour}:${startMinute} - ${temp}:${startMinute}`);
    }
    return result;
}

// create field
module.exports.createField = async(req, res) =>{ 
    const { start, end, price } = req.body.price;
    const prices = [];
    const times = [];
    for (let i = 0; i<price.length; i++)
    {
        prices.push({start:start[i], end:end[i], price:price[i]});
        const time = getTime(start[i], end[i]);
        times.push(...time);
    }
    const lastTime = [... new Set(times)];
    const input = req.body.field.address;
    const coordinates = await getGeometry(input);
    console.log(prices);
    const geometry = {
        type: 'Point',
        coordinates : coordinates
    }
    const field = new Fields(req.body.field);
    field.prices.push(...prices);
    field.geometry = geometry;
   
    field.times.push(...lastTime);
    field.images = req.files.map(f => ({url: f.path, filename: f.filename }));
    field.author = req.user_id;
    await field.save();
    req.flash('success', 'Successfully made a new field!');
    res.redirect(`/fields/${field._id}`);
}
  
module.exports.deleteField = async(req, res) =>{
    const { id } = req.params;
    const field = await Fields.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Camground!')
    res.redirect('/fields/owner');
}

module.exports.editField = async(req, res) => {
    const { price } = req.body;
    const { address } = req.body;
    const { name, category, description} = req.body.field;
}