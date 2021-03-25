const jwt = require('jsonwebtoken')

const userService = require('../services/user.sevice')
const userservice = new userService();

class userctr {
    async signup(req, res) {
        try {
            const user = await userservice.getByEmail(req.body.email)
            if (user) {
                return res.status(409).json({
                    error: "Email already exists"
                })
            } else {
                const user = await userservice.create(req.body)
                const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' })
                res.json({ token, userId: user._id, Email: user.email })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }
    async signin(req, res) {
        try {
            const user = await userservice.getByEmail(req.body.email)
            if (!user) {
                return res.status(400).json({
                    error: "Incorrect mail"
                })
            }
            if (user.password != req.body.password) {
                return res.status(400).json({
                    error: "Incorrect password"
                })
            }
            const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' })
            res.json({ token, userId: user._id, email: user.email })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }
    async changepassword(req, res) {
        req.body._id = req.auth._id;
        try {
            const newpassword = await userservice.updatePassword(req.body)
            if (!newpassword) {
                return res.status(400).json({
                    error: "User doesn't exist"
                })
            }
            res.json({
                password:newpassword.password
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }
}

module.exports = userctr