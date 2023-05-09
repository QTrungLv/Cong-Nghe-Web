const { use } = require('passport')
const userService = require('../services/UserService')

class UserController{

 searchUserController = async (req, res) => {
    try{
        const { name, page } = req.query
        if(name, page){
            const response = await userService.searchUserService(name, page)
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

   detailsUserController = async (req, res) => {
    try{
            const response = await userService.getDetailsUserService()
            return res.json(response)
        
    }catch(e){
        console.log(e)
        return res.json({
            status: 'err',
        })
    }
}
}

module.exports = new UserController;