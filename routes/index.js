
const loginRouter = require('./user')

function route(app){

    app.use('/login', loginRouter)

}

module.exports = route;