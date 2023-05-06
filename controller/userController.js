const { getInfoUserByEmail } = require("../services/UserService")

exports.getInfoUser = async (req, res) => {
    const { _id, email } = req.boby

    getInfoUserByEmail(email)
        .then(user => {
            res.send({ success: true, user: user })
        })
        .catch(err => {
            res.status(404).send({ success: false, err: err.message })
        })
}

exports.updateInfoUser = (req, res) => {
    
}





