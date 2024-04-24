const express = require('express')
const {UserController}  =  require('../../controllers')
const router = express.Router();


const {AuthRequestMiddlewares} = require('../../middlewares')

// {localhost:3001/api/v1/user/signup}
router.post('/signup',AuthRequestMiddlewares.validateAuthentication,UserController.signUp)
// {localhost:3001/api/user/v1/signin}
router.post('/signin',AuthRequestMiddlewares.validateAuthentication,UserController.signIn)
router.post('/role',AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin,UserController.addRoleToUser)

module.exports = router;

// 