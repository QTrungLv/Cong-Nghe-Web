// const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { addVideo, getVideoById, addComment, deleteComment, addViewer } = require('../services/VideoService');
const { uploadImageToFirebase } = require('../services/uploadVideo');

// const storage = getStorage()

exports.addVideo = async (req, res) => {

    const { url, userId, title } = req.body;

    await addVideo({ url: url, userId: userId, title: title })
        .then(video => {
            res.send({ succees: true, message: "Upload video successfully", video })
        })
        .catch(error => res.status(402).json({ success: false, message: error.message }))
}

exports.getListVideo = async (req, res) => {

}

exports.getVideoById = async (req, res) => {
    const _id = req.params.id

    await getVideoById(_id)
        .then((video) => res.send({ success: true, video: video }))
        .catch((error) => res.status(405).json({ success: false, message: error.message }))
}

exports.changeVideoTitle = async (req, res) => {
    const _id = req.params.id
    const { title } = req.body

    await changeVideoTitle({ _id: _id, title: title })
        .then((video) => res.send({ success: true, video: video }))
        .catch((error) => res.status(406).json({ error: error.message }))


}

exports.getCommentVideo = async (req, res) => {

}

exports.updateInfoVideo = async (req, res) => {

}

exports.addCommentVideo = async (req, res) => {
    const _id = req.params.id;
    const { userId, content } = req.body

    const comment = {
        userId: userId,
        comment: content,
        _id: _id
    }

    await addComment({ comment: comment, videoId: _id })
        .then((video) => res.send({ success: true, message: "Add comment successfully", video }))
        .catch((err) => res.status(406).json(err.message))

}

exports.deleteVideo = async (req, res) => {

}

exports.uploadVideo = async (req, res) => {
    await uploadImageToFirebase(req)
        .then((url) => res.send(url))
        .catch(error => res.status(409).json(error.message))
}

exports.addViewer = async (req, res) => {
    const videoId = req.params.id

    const { userId } = req.body

    await addViewer(userId, videoId)
        .then((video) => res.send({ success: true, message: "Comment added successfully", video: video }))
        .catch((err) => res.status(410).json(err.message))
}


exports.deleteComment = async (req, res) => {
    const videoId = req.params.id

    const { commentId } = req.body

    await deleteComment(commentId, videoId)
        .then(( video) => res.send({ success: true, message: "Delete comment successfully", video: video}))
        .catch((err) => res.status(411).json({ success: false, message: err.message }))
}