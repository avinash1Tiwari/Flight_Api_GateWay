const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        // console.log("inside service")
        const user = await userRepository.create(data);
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

module.exports={
    createUser
}
