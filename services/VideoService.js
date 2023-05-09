

/*
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
                })
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
}
module.exports = new VideoService;

*/