const { getInfoUserById } = require("../services/UserService")
const { getInfoUserByEmail } = require("../services/UserService")

exports.getInfoUser = async (req, res) => {
    const { _id, email } = req.body

    getInfoUserByEmail(email)
        .then(user => {
            res.send({ success: true, user: user })
        })
        .catch(err => {
            res.status(404).send({ success: false, err: err.message })
        })
}

exports.getInfoUserById = async (req, res) => {
    const _id = req.params.id;

    getInfoUserById(_id)
        .then(user => res.send({ success: true, user: user }))
        .catch((err) => res.status(405).send({ success: false, err: err.message }))


}

exports.updateInfoUser = (req, res) => {

}





