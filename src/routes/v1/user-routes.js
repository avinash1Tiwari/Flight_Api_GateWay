const express = require('express')
const {UserController}  =  require('../../controllers')
const router = express.Router();

const {ValidateAuthentication} = require('../../middlewares')

router.post('/signup',ValidateAuthentication.validateAuthentication,UserController.signUp)

router.post('/signin',ValidateAuthentication.validateAuthentication,UserController.signIn)

module.exports = router;