const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    isavailable:{
        type:Boolean,
        required: true,
        default:false
    },
   
    owner:{
        type:String,
        required: true
    },
    videolink:{
        type:String,
        required: true
    },
    file:{
        type:Object,
        required: true
    },
},
    {
        timestamps:true,
    }

);

const Course = mongoose.model('Course',courseSchema);
module.exports= Course;