const User = require('../model/user.model')

class userService {
    create(userinfo){
        const user = new User(userinfo);
        return user.save();
    }
    getByEmail(email){
        return User.findOne({"email": email})
    }
    getById(id){
        return User.findOne({"_id":id})
    }
    updatePassword(data){
        return User.findByIdAndUpdate(data._id, { $set: { password: data.password } }, { new: true, useFindAndModify:false})
    }
}

module.exports = userService