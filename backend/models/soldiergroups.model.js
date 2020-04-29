const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoldierGroupsSchema = new Schema({
     
    name:{
        required:true, 
        type:String,
        unique:true,
        trim:true,
    }

},{
    timestamps: true
})

const SoldierGroups = mongoose.model('soldiergroups',SoldierGroupsSchema)

module.exports = SoldierGroups