const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cong-nghe-web.96rc9z7.mongodb.net/?retryWrites=true&w=majority`, {

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

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
