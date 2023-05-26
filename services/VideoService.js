/* eslint-disable class-methods-use-this */
const User = require('../models/User');
const Video = require('../models/Video');

const PAGE_SIZE = 2;

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
