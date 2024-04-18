const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ServerConfig} = require('../../config');
const serverConfig = require('../../config/server-config');


 function checkPassword(plainpassword,encryptedpassword)
{
    try{

        return bcrypt.compareSync(plainpassword,encryptedpassword);

    }
    catch(error)
    {
        console.log(error)
        throw error;
    }
}

 function createToken(input)
{
    try{
        return jwt.sign(input , ServerConfig.JWT_SECRET_KEY , {expiresIn : serverConfig.JWT_EXPIRE_TIME});
    }
    catch(error){

        console.log(error)
        throw error;
    }
}

module.exports={
    checkPassword,
    createToken
}