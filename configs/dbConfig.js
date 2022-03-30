const mongoose = require('mongoose');
const urlDB = process.env.LOCAL_DB || process.env.URL_DB;
//process.env.URL_DB || 
console.log(urlDB)
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

