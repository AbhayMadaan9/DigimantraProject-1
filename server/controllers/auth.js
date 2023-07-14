const router = require('express').Router()
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const reg = await User.create({
            name: name,
            email: email,
            password: password
        })
        const data = await reg.save();
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send(error.message)
    }


}
const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if user already exist
        let user = await User.findOne({ email: email });
        if (user !== null) {
            // check if its password is correct
            let userPass = await User.findOne({ email: email, password: password })
            if (userPass.password == password) {
                const { password, ...others } = req.body;
               // window.localStorage.setItem('User', others);
                return res.status(200).send(others)
            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }

}
const logout = () => {
    window.localStorage.removeItem('User');
}
module.exports = { register, login, logout }