const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')



const Schema = mongoose.Schema

const LearnerSchema = new Schema({
    
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    pw:{
        type:String,
        required:true
    },
    
    
}, {timestamps:true})

LearnerSchema.statics.creatingStudent = async function(Name,email,username,pw)  {
    //validations
        
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(pw))
        {
            throw Error('Password not strong enough')
        }
    
        const exist = await this.findOne({username})
        
    
       
        if(exist) {
            throw Error('Username in use')
        }
    
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pw,salt)
        
    
        const Student = await this.create({Name,email,username,pw:hash})
        return Student
    
    }
    
    //static login method
    
    LearnerSchema.statics.login = async function(username,pw){
        if(!username || !pw)
        {
            throw Error('Fill all the fields')
        }
    
        const user = await  this.findOne({username})
    
        if(!user)
        {
            throw Error("Incorrect username")
        }
    
        const match = await bcrypt.compare(pw, user.pw)
    
        if(!match)
        {
            throw Error('Incorrect password')
        }
    
        return user
    }

module.exports = mongoose.model('Learner', LearnerSchema )