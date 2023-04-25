const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes')
require('dotenv').config()

const app = express();

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

app.use(express.json())
app.use(cors())

route(app);
app.listen(3000);
