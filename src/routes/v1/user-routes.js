const express = require('express')
const {UserController}  =  require('../../controllers')
const router = express.Router();

const {AuthRequestMiddlewares} = require('../../middlewares')

router.post('/signup',AuthRequestMiddlewares.validateAuthentication,UserController.signUp)

router.post('/signin',AuthRequestMiddlewares.validateAuthentication,UserController.signIn)

module.exports = router;