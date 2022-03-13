if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

const connectDB = require('./configs/dbConfig');
connectDB();

app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const fieldRouter = require('./routers/fields');
const accountRouter = require('./routers/accounts');

app.use('/', fieldRouter);
app.use('/accounts', accountRouter);

const PORT = process.env.PORT || 333; 
app.listen(333, ()=>{
    console.log("Severs listening on PORT ", PORT);
})