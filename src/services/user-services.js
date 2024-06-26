const { StatusCodes } = require('http-status-codes');
const { UserRepository,RoleRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const {Auth} = require('../utils/common') 
const {Enums} = require('../utils/common')
const userRepository = new UserRepository();
const roleRepo = new RoleRepository();

async function createUser(data) {
    try {
        // console.log("inside service")
        const user = await userRepository.create(data);

        // role=> it returns id corresponding to role paased as parameter
        const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER)

        // addRole method in sequelize
        user.addRole(role)

        console.log("urole")
        console.log(role)
        return user;

    }
    catch (error) {
        // console.log("error aya bhai : " + error)
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);

            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('cannot create a new User object ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function signin(data)
{
    try{
        const user = await userRepository.getUserByEmail(data.email);

        // if email not matches
        if(!user)
        {
            throw new AppError('No user found for the given email ',StatusCodes.NOT_FOUND)
        }
        // console.log("service repo ") 
        // console.log(user.email)
        // if email matches => check password

        // console.log("password => "+ data.password + "    " + user.password)
        const passwordMatch = Auth.checkPassword(data.password,user.password)
        if(!passwordMatch)
        {
            throw new AppError('Invalid password ', StatusCodes.BAD_REQUEST)
        }

        // if email,password both matches => return jwt token
        const jwt = Auth.createToken({id:user.id,email:user.email});
        return jwt;

    }
    catch(error)
    {
        // instanceOf function is used to check whether it is "object of perticular class or not" 
        if(error instanceof AppError) throw error;
        console.log(error)
        throw new AppError('something went wrong ', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function isAuthenticated(token){
    try{

        if(!token){
            throw new AppError('Missing JWT-token ', StatusCodes.BAD_REQUEST)

        }

        const response = Auth.verifyToken(token);
        // response = {id : '1',email : 'abc@gmail.com'}

        const user = await userRepository.get(response.id)

        if(!user){
            throw new AppError('No user found ', StatusCodes.NOT_FOUND)
        }

        return user.id;
    }
    catch(error){

        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token ', StatusCodes.BAD_REQUEST)
        }
        if(error.name == 'TokenExpiredError')
        {
            throw new AppError('JWT token expired ', StatusCodes.BAD_REQUEST)
        }

        console.log(error)
         throw new AppError('Something went wrong ', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function addRoleToUser(data){

    try{
        const user = await userRepository.get(data.id)

        console.log("user")
        console.log(user)
        if(!user)
        {
            throw new AppError('No user found for the given id ',StatusCodes.NOT_FOUND)
        }
       
       
        const role = await roleRepo.getRoleByName(data.role)
       
        if(!role)
        {
            throw new AppError('No user found for the given role ',StatusCodes.NOT_FOUND)
        }
       console.log("pp")
        user.addRole(role)

        return user;
    }
    catch(error)
    {
        if(error instanceof AppError) throw error;
        // console.log(error)
        throw new AppError('something went wrong ', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



async function isAdmin(id){

    try{
        const user = await userRepository.get(id)

        // console.log("user")
        // console.log(user)
        if(!user)
        {
            throw new AppError('No user found for the given id ',StatusCodes.NOT_FOUND)
        }
       
       
        const admin_role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN)
       
        if(!admin_role)
        {
            throw new AppError('No user found for the given role ',StatusCodes.NOT_FOUND)
        }
       console.log("pp")

        return user.hasRole(admin_role);
    }
    catch(error)
    {
        if(error instanceof AppError) throw error;
        // console.log(error)
        throw new AppError('something went wrong ', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports={
    createUser,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}
