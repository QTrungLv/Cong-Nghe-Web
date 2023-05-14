


const User = require('../models/User');
const Video = require('../models/Video');
const PAGE_SIZE = 2;

class VideoService{
 searchVideoService = (title, page) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(page){
                page = parseInt(page)
                var skipNumber = (page-1)*PAGE_SIZE
                const findTitle = await Video.find({
                    title:{$regex:title}
                }).populate('viewers').populate('comments')
                .skip(skipNumber)
                .limit(PAGE_SIZE)
                if(findTitle){
                    resolve({
                        status: 'OK', 
                        data: findTitle
                    })
                }
            }
            resolve({
                status: 'OK',
                message: 'the video is not defined'
            })
        }catch(e){
            console.log(e)
            reject({
                message: e,
                status: 'err'
            })
        }
    }).catch(e => e)
}

getAllVideoService = (page) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(page){
                page = parseInt(page)
                var skipNumber = (page-1)*PAGE_SIZE
                const getallvideo = await Video.find().populate('viewers').populate('comments')
                .skip(skipNumber)
                .limit(PAGE_SIZE)
                if(getallvideo){
                    resolve({
                        status: 'OK', 
                        data: getallvideo
                    })
                }
            }
            resolve({
                status: 'OK',
                message: 'the  is not defined'
            })
        }catch(err){
            reject({
                message: err,
                status: 'err'
            })
        }
    }).catch(e => e)
}

getVideoService = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const findVideo = await Video.findById({_id: id}).populate('viewers').populate('comments')
            if(findVideo){
                resolve({
                    status: 'OK', 
                    data: findVideo
                })
            }
            resolve({
                status: 'OK',
                message: 'the user is not defined'
            })
        }catch(err){
            reject({
                message: err,
                status: 'err'
            })
        }
    }).catch(e => e)
}


 deleteVideoService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteVideo = await Video.findByIdAndDelete(_id)
            if(deleteVideo){
                resolve({
                    status: 'OK',
                    data: deleteVideo
                })
            }else {
                resolve({
                    status: 'err',
                    message: 'the video is not defied'
                })
            }
        }catch(e){
            reject({
                status: 'err',
                message: e
            })
        }
    })
}

 updateVideoService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkVideo = await Video.findOne(data)
            if(checkVideo){
                resolve({
                    status: 'err',
                    message: 'The info of video is duplicate'
                })
            }
            const updatedVideo = await Video.findByIdAndUpdate(id, data, {new : true})
            
            if(updatedVideo) {
                const getVideoNew = await this.getVideoService(id)
                resolve({
                    status: 'OK',
                    data: getVideoNew
                })
            }else {
                resolve({
                    status: 'err',
                    message: 'The video is not define'
                })
            }
        }catch(e){
            console.log(e)
            reject({
                status: 'err',
                message: e
            })
        }
    })
}
}
module.exports = new VideoService;

