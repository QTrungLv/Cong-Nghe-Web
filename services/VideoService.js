const Comment = require('../models/Comment')
const User = require('../models/User')
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

exports.addComment = async ({ comment, videoId }) => {
    try {

        const user = await User.findOne({ _id: comment.userId })

        if (!user) {
            throw new Error("User not found: " + comment.userId)
        } else {

            const video = await Video.findById({ _id: videoId })

            if (!video) {
                throw new Error("Video not found: " + videoId)
            } else {

                const newComment = new Comment({
                    id: 1,
                    content: comment.comment,
                    author: user
                })

                Video.findByIdAndUpdate({ _id: videoId }, { comments: { ...video.comments, newComment } })
                await newComment.save()
                await video.save()

                return video
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}