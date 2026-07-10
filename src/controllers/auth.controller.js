const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @name registerUserController
 * @description Register a new user expecting username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: 'Username, email and password are required' 
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
         $or: [{ username }, { email }] 
        })

    if (isUserAlreadyExists) {
        return res.status(400).json({ 
            message: 'User already exists' 
        })
    }

    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.HASH_ITERATIONS)
    )

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { id: newUser._id, username: newUser.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    )

    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 day

    res.status(201).json({ 
        message: 'User registered successfully',
        user : {
            id : newUser._id,
            username : newUser.username,
            email : newUser.email
        } 
    })
}


/**
 * @name loginUserController
 * @description Login a user expecting email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ 
            message: 'Invalid credentials' 
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        return res.status(400).json({ 
            message: 'Invalid credentials' 
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    )

    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 day

    res.status(200).json({ 
        message: 'User logged in successfully',
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        } 
    })
}

module.exports = {
    registerUserController,
    loginUserController
}