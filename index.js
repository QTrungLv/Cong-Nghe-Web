require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes')


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
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))