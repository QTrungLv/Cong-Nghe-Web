
const User = require('../models/User');
const PAGE_SIZE = 2;

class UserService{
 searchUserService = (name, page) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(page){
                page = parseInt(page)
                var skipNumber = (page-1)*PAGE_SIZE
                const findName = await User.find({
                    name:{$regex:name}
                })
                .skip(skipNumber)
                .limit(PAGE_SIZE)
                if(findName){
                    resolve({
                        status: 'OK', 
                        data: findName
                    })
                }
            }
            resolve({
                status: 'OK',
                message: 'the user is not defined'
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
module.exports = new UserService;