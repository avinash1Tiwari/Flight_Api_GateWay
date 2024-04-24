
const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const {UserServices}  = require('../services')



function validateAuthentication(req,res,next) {

    if(!req.body.email){
        // if you want to customize the response and error format do like below
        ErrorResponse.message = "something went wrong while authenticating user",
        // ErrorResponse.error = {explaination : "modle not not found in the incomming request "}

        // ErrorResponse.error =  "modle not not found in the incomming request "

        ErrorResponse.error = new AppError(["User-email not found in the incomming request "],StatusCodes.BAD_REQUEST)



        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    if(!req.body.password){
        // if you want to customize the response and error format do like below
        ErrorResponse.message = "something went wrong while authenticating user",
        // ErrorResponse.error = {explaination : "modle not not found in the incomming request "}

        // ErrorResponse.error =  "modle not not found in the incomming request "

        ErrorResponse.error = new AppError(["User-password not found in the incomming request "],StatusCodes.BAD_REQUEST)



        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    next();
}

async function checkAuth(req,res,next){
    try{

        const response = await UserServices.isAuthenticated(req.headers['x-access-token']);

        if(response){
            req.user = response;
            next();
        }
    }
    catch(error){
        return res
                  .status(error.statusCode)
                  .json(error)
    }
}

async function isAdmin(req,res,next)
{
    const response = await UserServices.isAdmin(req.user)

    if(!response){

        return res.
                    status(StatusCodes.UNAUTHORIZED)
                    .json({message : 'User not authorised for this action'})
    }
    next();
}

module.exports = {
    validateAuthentication,
    checkAuth,
    isAdmin
};