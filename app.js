if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const Account = require('./models/accounts');
const path = require('path');
const app = express();

// Create server
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

const ExpressError = require('./utils/ExpressError');
const connectDB = require('./configs/dbConfig');
connectDB();

app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'Thisisscret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  // hết hạn sau 7 ngày.
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(flash());

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const fieldRouter = require('./routers/fields');
const accountRouter = require('./routers/accounts');
const bookingRouter = require('./routers/bookings');

// Test here 
// app.get('/test', (req, res) => {
//     res.render('fields/show');
// })

app.use('/fields', fieldRouter);
app.use('/:id/bookings', bookingRouter);
app.use('/accounts', accountRouter);

app.get('/', (req, res) => {
    res.render('home');
})
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {console.log(err)
    const {statusCode = 500, message = 'Something went wrong'} = err;
    if (!err.message) error.message = 'Oh no, Something went wrong!';
    res.status(statusCode).render('error', {err});
});

io.on('connection', function(socket) {
    console.log('user connected');
})

const PORT = process.env.PORT || 333; 
server.listen(333, ()=>{
    console.log("Severs listening on PORT ", PORT);
})