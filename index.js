const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const firebase = require("firebase/app")

const userRoute = require('./routes/userRoute')
const videoRoute = require('./routes/videoRoute')

const app = express();

//Connect mongoDB
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

//Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCs3NZdOrOcVISTQRdy3gQSE3lpeQX3rhs",
    authDomain: "fluid-keyword-350807.firebaseapp.com",
    projectId: "fluid-keyword-350807",
    storageBucket: "fluid-keyword-350807.appspot.com",
    messagingSenderId: "1001391890079",
    appId: "1:1001391890079:web:b4343c52f436f5b52accaa",
    measurementId: "G-TCRL4L10F8"
};

firebase.initializeApp(firebaseConfig)

app.use(express.json())
app.use(cors())

//route
app.use("/user", userRoute)
app.use("/video", videoRoute)

//Start Server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
