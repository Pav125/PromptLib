const express = require('express')
const router = express.Router()
const {signIn} = require('../controllers/AuthControllers')

router.post('/signin', signIn)

module.exports = router