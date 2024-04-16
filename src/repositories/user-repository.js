const {User} = require('../models');

const {Sequelize} = require('sequelize')
const crudRepository = require('./crud-operations');


class UserRepository extends crudRepository{
   
    constructor(){
        super(User);
    }

    // return flight
}


module.exports = UserRepository