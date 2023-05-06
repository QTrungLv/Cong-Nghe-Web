const Video = require('../models/Video')

exports.addVideo = async (video) => {
    try {
        const video = new Video({
            url: video.url,
            createAt: Date.now(),
            userId: video.userId,
            title: video.userId,
        })

        await video.save()

        return videoadd
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