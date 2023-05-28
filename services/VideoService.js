const Comment = require('../models/Comment')
const User = require('../models/User');
const Video = require('../models/Video');

const PAGE_SIZE = 2;

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
exports.searchVideoService = async (title, page) => {
  try {
    if (page) {
      page = parseInt(page, 10);
      const skipNumber = (page - 1) * PAGE_SIZE;
      const findTitle = await Video.find({
        title: { $regex: title },
      })
        .populate('viewers')
        .populate('comments')
        .skip(skipNumber)
        .limit(PAGE_SIZE);
      if (findTitle) {
        return findTitle;
      } else {
        throw new Error('Video not found');
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllVideoService = async (page) => {
  try {
    if (page) {
      page = parseInt(page, 10);
      const skipNumber = (page - 1) * PAGE_SIZE;
      const getallvideo = await Video.find().populate('viewers').populate('comments').skip(skipNumber).limit(PAGE_SIZE);
      return getallvideo;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getVideoService = async (id) => {
  try {
    const findVideo = await Video.findById({ _id: id }).populate('viewers').populate('comments');
    if (findVideo) {
      return findVideo;
    } else {
      throw new Error('Video not defined');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteVideoService = async (_id) => {
  try {
    const deleteVideo = await Video.findByIdAndDelete(_id);
    if (deleteVideo) {
      return deleteVideo;
    } else {
      throw new Error('Video not defined');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateVideoService = async (id, data) => {
  try {
    const checkVideo = await Video.findOne(data);
    if (checkVideo) {
      throw new Error('The info of user is duplicate');
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (updatedVideo) {
      const getVideoNew = await this.getVideoService(id);
      return getVideoNew;
    } else {
      throw new Error('Video not defined');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
