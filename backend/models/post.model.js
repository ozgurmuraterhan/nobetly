const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String
    },
    due_note:{
        type:String
    },
    risk:{
        type:Number
    },
    person:{
        type:Number,
        required:true

    },
    group_id:{
        type:Array,
        trim:true
    },
    times:{
        type:Object,
        required:true
    },
    posts:{
        type:Array
    }
},{
    timestamps: true
})

const Post = mongoose.model('post',PostSchema)

module.exports = Post