const Video = require('../models/Video')

exports.addVideo = async (video) => {
    try {

        const vid = new Video({
            url: video.url,
            userId: video.userId,
            title: video.title,
        })
        await vid.save()

        return vid
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.getVideo = async () => {

}

exports.changeVideoTitle = async ({ _id, title }) => {
    try {
        await Video.findByIdAndUpdate({ _id: _id, title: title })
            .then((video) => {
                return video
            })
            .catch((error) => {
                throw new Error(error.message)
            })
    } catch {
        throw new Error(error.message)
    }
}

exports.getVideoById = async (_id) => {
    try {
        const video = await Video.findById({ _id: _id })
        if (!video) {
            throw new Error("Video not foung")
        }
        return video
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.deleteVideo = async (id) => {
    try {

    } catch (error) {
        throw new Error(error.message)
    }
}