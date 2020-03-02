const express = require('express');
const router=express.Router();
const mongoose= require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/order');


router.get('/',checkAuth,  OrdersController.order_get_all);
//     // res.status(200).json({
//     //     message:'orders were fetched' 
//     // });
//     Order.find()
//     .select('product quantity _id')
//     .populate('product','name') // want put on before exec or then value it  is used to merge two routs
//     .exec()                 // if we add any thin in populate that we get here add name as eg
//     .then(docs=>{
//         res.status(200).json({
//             count:docs.length,
//             // orders:docs,
//             // request:{
//             //     type:'GET'
//          //   URL:HTTP//
//             // }
//             orders:docs.map(doc=> {
//                 return {
//                     _id:doc._id,
//                     product:doc.product,
//                     quantity:doc.quantity,
//                     request:{
//                         type:'GET',
//                         url:'http://localhost:3000/order/'+doc._id
//                     }
//                 }
//             })
//         });
//     })
//     .catch(err =>{
//         res.status(500).json({
//             error:err
//         });
//     });
    

// });
router.post('/',checkAuth,(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{
        if(!product){
            return res.status(404).json({
                message:'Product not found'
            });
        }
        
    const order = new Order({
        _id:mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        product:req.body.productId //  
    });
   return  order
            .save();
})
        //   .exec()
          .then(result => {
              console.log(result);
              res.status(201).json({
                  message:'order stored',
                  createdOrder:{ // chyethe sadanm print chyth kannikaan
                      _id:result._id,
                      product:result.product,
                      quantity:result.quantity
                  },
                  request:{
                      type:'GET',
                      url:'http://localhost:3000/order/' + result._id
                      
                  }
              });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  error:err
              });
          });
        });


    // const order = {
    //     productId:req.body.productId,
    //     quantity:req.body. quantity
    // };

   
            
              
    // res.status(201).json({
    //     message:'orders was created',
    //     order:order
   

router.get('/:orderId',checkAuth,(req,res,next)=>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message:'order not found'
            });

        }
        res.status(200).json({
            order:order,
            request:{
                type:'GET',
                url:'http://localhost:3000/order'//appo yllam orderum verum
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
    // res.status(200).json({
    //     message:'orders were fetched',
    //     orderId:req.params.orderId
    // });

});
router.delete('/:orderId',checkAuth,(req,res,next)=>{
   Order.remove({_id:req.params.orderId})
   .exec()
   .then(result =>{
       res.status(200).json({
       message:'order is deleted',
       request:{
           type:"POST",
           url:"http://localhost:3000/order",
           body:{productId:"ID",quantity:"Number"}
       }
   });
})
   .catch(err => {
       res.status(500).json({
           error:err
       });
   })
});
module.exports = router; 