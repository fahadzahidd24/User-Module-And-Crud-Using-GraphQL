const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async function (args, req) {
        const errors = [];
        if(!validator.isEmail(args.userInput.email))
            errors.push({message:"Invalid Email"})
        else if(validator.isEmpty(args.userInput.password) || !validator.isLength(args.userInput.password, {min: 5}))
            errors.push({message: "Invalid Password"})
        if(errors.length>0){
            const error = new Error('Invalid Input');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: args.userInput.email })
        if(existingUser){
            const error = new Error('This Email Already Exists');
      
            throw error;
        }
        const hashedPw = await bcrypt.hash(args.userInput.password,12);
        const user = new User({
            name: args.userInput.name,
            email: args.userInput.email,
            password: hashedPw
        });
        const createdUser = await user.save();
        return createdUser;      
    },

    login: async function (args,req){
        const userFound = await User.findOne({email: args.userLoginInput.email})
        if(!userFound){
            const error = new Error("User Not Found");
            error.code = 401;
            throw error;
        }
        const isMatched = await bcrypt.compare(args.userLoginInput.password, userFound.password);
        if(!isMatched){
            const error = new Error("Wrong Password");
            error.code = 401;
            throw error;
        }
        const token = jwt.sign({userId: userFound._id, email: userFound.email}, "oiausdoiasudpaosidp0aiseq", {expiresIn: '1h'});
        return {token:token, userId: userFound._id};
    }
}