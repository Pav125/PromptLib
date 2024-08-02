const User = require('../models/AuthModels')

module.exports.signIn = async(req, res, next) => {
    try {
        const {email, name, picture} = req.body
        const isExisting = await User.findOne({ email })

        if(isExisting){
            return res.status(200).json({ message: 'Successfully signed in', isExisting })
        }else{
            const user = await User.create({ email, name, picture })
            return res.status(201).json({ message: 'User created successfully', user })
        }

        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}