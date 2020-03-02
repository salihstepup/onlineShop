const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // name:String,
    // price:Number
    name:{ type:String, required:true}, //requid means name and price is must if there is not any of them we add it is not wrk and also spelling is incorrect also it ias not work
    price:{type:Number, required:true} ,// if we add extra any beside name and price it will work wth price and name becoz we introduce name and price only
    productImage: { type:String, required:true}
})  ;

module.exports=mongoose.model('Product',productSchema);
