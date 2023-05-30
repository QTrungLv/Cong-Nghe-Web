const {
  searchVideoService,
  getAllVideoService,
  getVideoService,
  deleteVideoService,
  updateVideoService,
  addVideo,
  getVideoById,
  addComment,
  deleteComment,
  addViewer
} = require('../services/VideoService');

exports.searchVideoController = async (req, res) => {
  const { title, page } = req.query;
  searchVideoService(title, page)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, message: err.message });
    });
};

exports.getAllVideoController = async (req, res) => {
  const { page } = req.query;
  getAllVideoService(page)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, message: err.message });
    });
};

exports.getVideoController = async (req, res) => {
  const { id } = req.params;
  getVideoService(id)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, message: err.message });
    });
};

exports.deleteVideoController = async (req, res) => {
  const _id = req.params.id;
  deleteVideoService(_id)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, message: err.message });
    });
};

exports.updateVideoController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  updateVideoService(id, data)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};

exports.show = (req, res) => {
  res.send('Hello');
};

exports.addVideo = async (req, res) => {

  const { url, userId, title } = req.body;

  await addVideo({ url: url, userId: userId, title: title })
    .then(video => {
      res.send({ succees: true, message: "Upload video successfully", video })
    })
    .catch(error => res.status(402).json({ success: false, message: error.message }))
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
    .catch((error) => res.status(406).json({ success: false, message: error.message }))


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
    .catch((error) => res.status(406).json({ success: false, message: error.message }))

}

exports.uploadVideo = async (req, res) => {
  await uploadImageToFirebase(req)
    .then((url) => res.send(url))
    .catch(error => res.status(409).json({ success: false, message: error.message }))
}

exports.addViewer = async (req, res) => {
  const videoId = req.params.id

  const { userId } = req.body

  await addViewer(userId, videoId)
    .then((video) => res.send({ success: true, message: "Comment added successfully", video: video }))
    .catch((error) => res.status(410).json({ success: false, message: error.message }))
}


exports.deleteComment = async (req, res) => {
  const videoId = req.params.id

  const { commentId } = req.body

  await deleteComment(commentId, videoId)
    .then((video) => res.send({ success: true, message: "Delete comment successfully", video: video }))
    .catch((err) => res.status(411).json({ success: false, message: err.message }))
}