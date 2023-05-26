const {
  searchVideoService,
  getAllVideoService,
  getVideoService,
  deleteVideoService,
  updateVideoService,
} = require('../services/VideoService');

exports.searchVideoController = async (req, res) => {
  const { title, page } = req.query;
  searchVideoService(title, page)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};

exports.getAllVideoController = async (req, res) => {
  const { page } = req.query;
  getAllVideoService(page)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};

exports.getVideoController = async (req, res) => {
  const { id } = req.params;
  getVideoService(id)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};

exports.deleteVideoController = async (req, res) => {
  const _id = req.params.id;
  videoService
    .deleteVideoService(_id)
    .then((video) => {
      res.send({ success: true, video });
    })
    .catch((err) => {
      s;
      res.status(404).send({ success: false, err: err.message });
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
