const Order = require('../models/order');

exports.order_get_all =  (req,res,next)=>{
    // res.status(200).json({
    //     message:'orders were fetched'
    // });
    Order.find()
    .select('product quantity _id')
    .populate('product','name') // want put on before exec or then value it  is used to merge two routs
    .exec()                 // if we add any thin in populate that we get here add name as eg
    .then(docs=>{ 
        res.status(200).json({
            count:docs.length,
            // orders:docs,
            // request:{
            //     type:'GET'
         //   URL:HTTP//
            // }
            orders:docs.map(doc=> {
                return {
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/order/'+doc._id
                    }
                };
            })
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
    

};