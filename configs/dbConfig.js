const mongoose = require('mongoose');
const urlDB = process.env.URL_DB || 'mongodb://localhost:27017/field-foot-ball';

const connectDB = ()=>{
    mongoose.connect(urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("DB connection success!");
    })
    .catch(e =>{
        console.log("DB connection error! ", e);
    })  
} 

module.exports = connectDB;

