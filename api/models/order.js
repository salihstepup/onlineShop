const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // name:String,
    // price:Number
    // name:{ type:String, required:true}, //requid means name and price is must if there is not any of them we add it is not wrk and also spelling is incorrect also it ias not work
    // price:{type:Number, required:true} // if we add extra any beside name and price it will work wth price and name becoz we introduce name and price only

    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    quantity:{type:Number,default:1}
})  ;

module.exports=mongoose.model('Order',orderSchema);
