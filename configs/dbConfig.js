const mongoose = require('mongoose');
const urlDB = process.env.LOCAL_DB || process.env.URL_DB;
//process.env.URL_DB || 
console.log(urlDB)
const connectDB = ()=>{
    mongoose.connect('mongodb+srv://db-FFB:Zlgyw430AJbK4dZY@cluster0.ysved.mongodb.net/field-foot-ball?retryWrites=true&w=majority', {
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

