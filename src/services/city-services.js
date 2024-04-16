const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const cityrepository = new CityRepository();

async function createCity(data) {
    try {
        console.log("inside service")
        const city = await cityrepository.create(data);
        return city;
    }
    catch (error) {
        console.log("error aya bhai : " + error)
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);

            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('cannot create a new City object ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



async function getCities(){
    try{

        const cities = await cityrepository.getAll();
        return cities;
    }
    catch(error){

        throw new AppError("Can not fetch the data of all cities ",StatusCodes.INTERNAL_SERVER_ERROR)

    }
}


// taking only one city data
async function getCity(id){
    try{

        const city = await cityrepository.get(id);
        return city;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND)
        {
            throw new AppError("The city you have requested is not present",error.statusCode)
        }
        throw new AppError("Can not fetch the data of all cities ",StatusCodes.INTERNAL_SERVER_ERROR)

    }
}


async function DestroyCity(id){
    try{

        const city = await cityrepository.destroy(id);
        return city;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND)
        {
            throw new AppError("The city you want to delete is not present OR deleted already",error.statusCode)
        }
        throw new AppError("Can not fetch the data of all cities ",StatusCodes.INTERNAL_SERVER_ERROR)

    }
}


async function UpdateCity(id,data){
    try{

        const city = await cityrepository.update(id,data);
        return city;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND)
        {
            throw new AppError("The city you want to update is not present OR deleted already",error.statusCode)
        }
        throw new AppError("Can not update the data of  city ",StatusCodes.INTERNAL_SERVER_ERROR)

    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    DestroyCity,
    UpdateCity
}