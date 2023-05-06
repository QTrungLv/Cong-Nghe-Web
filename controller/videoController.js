const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { addVideo } = require('../services/VideoService');

const storage = getStorage()

function uploadImageToFirebas(file) {
    const contentType = file.mimetype
    const name = file.originalname
    const buffer = file.buffer

    const StorageRef = ref(storage, name)

    uploadBytes(storage, buffer, { contentType: contentType })
        .then(() => {
            getDownloadURL(StorageRef)
                .then(() => {
                    return { success: true, message: url }
                })
                .catch((err) => {
                    return { success: false, message: err }
                });
        })
}


exports.addVideo = async (req, res) => {
    if (!req.file) {
        response.status(401).send({ message: "No file found!" })
    }
    const { success, message } = uploadImageToFirebase(req.file)

    if (!success) {
        res.status(402).send({ message: "Error while uploading image" })
    }

    addVideo({ url: message, userId: req.userId, title: req.file.originalname })
        .then(video => {
            res.send({ succees: true, message: "Upload video successfully", video: video })
        })
        .catch(error => res.status(402).json({ success: false, message: error.message }))
}

exports.getVideo = async (req, res) => {

}

exports.getVideoById = async (req, res) => {

}

exports.updateVideo = async (req, res) => {

}

exports.commentVideo = async (req, res) => {

}
