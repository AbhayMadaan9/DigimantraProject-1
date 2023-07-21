const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const new_pass = await bcrypt.hash(password, 10);
        const reg = await User.create({
            name: name,
            email: email,
            password: new_pass
        })

        const data = await reg.save();
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send(error.message)
    }


}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email: email });

        if (user !== null) {
            //compare passowords
            const isvalid = await bcrypt.compare(password, user.password);
            if(isvalid) {
                // Here, you can send only necessary data, excluding the password
                const userDataToSend = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                };
                
                return res.status(200).send(userDataToSend);
            }
        }

        // If user doesn't exist or password is incorrect, return an error
        return res.status(401).send({ message: "Invalid credentials" });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const logout = () => {
    window.localStorage.removeItem('User');
}
module.exports = { register, login, logout }