const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostGroupsSchema = new Schema({
     
    name:{
        required:true, 
        type:String,
        unique:true,
        trim:true,
    }

},{
    timestamps: true
})

const PostGroups = mongoose.model('postgroups',PostGroupsSchema)

module.exports = PostGroups