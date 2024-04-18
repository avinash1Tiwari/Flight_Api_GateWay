
const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');




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

module.exports = {validateAuthentication};