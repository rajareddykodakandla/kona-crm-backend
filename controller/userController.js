const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                message:"Unable to save user",
                error:err
            })
        }
        res.json(user);
    })
    //console.log("Iam in signup controller",typeof(req.body.password))
}

exports.signin = (req, res) => {
    User.findOne({email:req.body.email}, (err, user) => {
        if(err){
            return res.status(400).json({
                error:"No such user exist"
            })
        }
        if(user.password != req.body.password){
            return res.status(400).json({
                error:"Incorrect password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' })
        res.json({token, user})
    })
}