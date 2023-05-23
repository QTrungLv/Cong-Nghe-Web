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
        const video = await Video.findById({ _id: _id }).populate('comments').populate('viewers')
        if (!video) {
            throw new Error("Video not found")
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

                const comments = video.comments

                comments.push(newComment)

                await Video.findByIdAndUpdate({ _id: videoId }, { comments: comments })

                await newComment.save()

                return video.populate("comments")
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.addViewer = async (userId, videoId) => {
    try {

        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found!")
        } else {
            const video = await Video.findById(videoId)

            if (!video) {
                throw new Error("Video not found!")
            } else {
                video.viewers.push(user)

                await video.save()

                return video

            }
        }
    } catch (error) {
        throw new Error(err.message)
    }



}


exports.deleteComment = async (commentId, videoId) => {
    try {
        const video = await Video.findById(videoId)

        if (!video) {
            throw new Error("Cannot find video")
        } else {
            const commentIndex = video.comments.indexOf(commentId)

            if (commentIndex === - 1) {
                throw new Error("Comment not found")
            } else {
                video.comments.splice(commentIndex, 1)

                await video.save()

                return video
            }
        }

    } catch (error) {
        throw new Error(error.message)
    }
}