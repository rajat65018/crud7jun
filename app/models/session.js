const mongoose=require('mongoose');
const sessionSchema=new mongoose.Schema({
    token:{type:String,require:true},
    userId:{type:mongoose.ObjectId,require:true}
},{timestamps:true});
const sessionModel=mongoose.model('sessions',sessionSchema);
module.exports=sessionModel;