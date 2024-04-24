const {Role} = require('../models');

const {Sequelize} = require('sequelize')
const crudRepository = require('./crud-operations');


class RoleRepository extends crudRepository{
   
    constructor(){
        super(Role);
    }

    async getUserByName(name)
    {
        // console.log("repo : " + email)
        const role = await Role.findOne({where : {name:name}})
        // console.log("role repo " )
        // console.log(role)
        return role;
    }


}


module.exports = RoleRepository