
const {StatusCodes} = require('http-status-codes')
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class crudRepository {

    constructor(model) {
        this.model = model;
    }


    async create(data) {
        console.log("data : " +data )
        const response = await this.model.create(data);
       
            return response;
    }

    async destroy(data)
     {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            if(!response){
                throw new AppError("The airplane you want to delete is not present or already deleted",StatusCodes.NOT_FOUND)
            }
            return response;
    }



    // select * from airplane where primary key = data;

    async get(data) {

            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppError("Not able to find the required resource",StatusCodes.NOT_FOUND)
            }
            return response;
    }

    //    select *

    async getAll() {
            const response = await this.model.findAll();
            return response;
    }


    // update
    // data is an oject like -> {col:val, ......}

    async update(id, data) {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            console.log("response from update service  =>" + response)
            console.log("data =>" + data)
            return response;
        }



       
}


module.exports = crudRepository;












