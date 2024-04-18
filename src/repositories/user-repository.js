const {User} = require('../models');

const {Sequelize} = require('sequelize')
const crudRepository = require('./crud-operations');


class UserRepository extends crudRepository{
   
    constructor(){
        super(User);
    }

    async getUserByEmail(email)
    {
        // console.log("repo : " + email)
        const user = await User.findOne({where : {email:email}})
        // console.log("user repo " )
        // console.log(user.email)
        return user;
    }



    // return User
}


module.exports = UserRepository