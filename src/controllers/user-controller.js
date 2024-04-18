

const {StatusCodes} = require('http-status-codes');

const {UserServices} = require('../services');

const{ErrorResponse,SuccessResponse} = require('../utils/common')




async function signUp(req,res) {


        try{
            // const airplane = req.body.modelNumber + req.body.capacity;
            const user = await UserServices.createUser({
                email : req.body.email,
                password : req.body.password
            });
        
            SuccessResponse.data = user;
            return res
                    .status(StatusCodes.CREATED)
                    .json(SuccessResponse);
                     

        }
        catch(error)
        {    
            // console.log(error.statusCode)

            ErrorResponse.error = error;
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);

        }
   
}


async function signIn(req,res) {


    try{
        // const airplane = req.body.modelNumber + req.body.capacity;
        const user = await UserServices.signin({
            email : req.body.email,
            password : req.body.password
        });
    
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
                 

    }
    catch(error)
    {    
        // console.log(error.statusCode)

        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

    }

}

module.exports={
    signUp,
    signIn
}