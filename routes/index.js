
const userRouter = require('./user')
const videoRouter = require('./video')
function route(app){

    app.use('/user', userRouter)
    app.use('/video', videoRouter)
}

module.exports = route;