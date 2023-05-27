require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute')
const videoRoute = require('./routes/videoRoute')
const route = require('./routes');

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


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

//route
app.use("/user", userRoute)
app.use("/video", videoRoute)

//route(app);
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
