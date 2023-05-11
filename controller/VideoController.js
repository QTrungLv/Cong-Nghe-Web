


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

  getVideoController = async (req, res) => {
    try{
        const { videoId } = req.params
        if(videoId) {
            const response = await videoService.getVideoService(videoId)
            return res.json(response)
        }
        return res.json({
            status: 'err',
            message: 'The id is required'
        })
    }catch(e){
        console.log(e)
        return res.json({
            status: 'err',
        })
    }
}


 
 deleteVideoController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id){
            const response = await videoService.deleteVideoService(_id)
            return res.status(200).json(response)
        }else {
            return res.status(404).json({
                status: 'err',
                message: 'The videoId is required'
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: 'err',
            message: error
        })
    }
}
show(req, res){
    res.send('Hello');
}
}

module.exports = new VideoController;

