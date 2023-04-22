require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

require('./config/passport')(passport);
const app = express();

const morgan = require('morgan');

 
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DB_Test', {

        })
        console.log("Connected to database successfully")
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

connectDB()

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(morgan('dev'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }, 
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/DB_Test'})
}));


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next)=>{
    if(req.isAuthenticated){
        console.log("Now we can set global variable");
        res.locals.user = req.user;
        next();
    }else{
        console.log("Now we can not set global variable");
        res.locals.user = null;
        next();
    }
});







app.use('/', indexRoute);
app.use('/auth', userRoute);






const PORT = 5000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));