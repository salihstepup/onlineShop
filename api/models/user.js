const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // name:String,
    // price:Number
    // name:{ type:String, required:true}, //requid means name and price is must if there is not any of them we add it is not wrk and also spelling is incorrect also it ias not work
    // price:{type:Number, required:true} // if we add extra any beside name and price it will work wth price and name becoz we introduce name and price only

    // product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    // quantity:{type:Number,default:1}
    email: { type:String, required:true,unique:true,match:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ },
    password:{ type:String, required:true},
})  ;

module.exports=mongoose.model('User',userSchema);
