
/*

const videoService = require('../services/VideoService')

class VideoController{

 searchVideoController = async (req, res) => {
    try{
        const { title, page } = req.query
        if(title, page){
            const response = await videoService.searchVideoService(title, page)
            return res.json(response)
        }else {
            return res.json({
                status: 'err',
                message: 'The name is required'
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            status: 'err',
            message: err
        })
    }
  }
}

module.exports = new VideoController;

*/