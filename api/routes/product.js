const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
 const storage = multer.diskStorage({
    destination: function(req, file,cb){ 
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,  file.originalname,null); // isostrng used for currnt date
    }
});

const fileFilter = (req,file,cb)=>{
    //reject file
    if(file.mimetype ==='image/jpeg' || file.mimetype==='image/png'){
    cb(null,true);
  }  else {
    cb(null,false);
}
};
 
const upload = multer({
    storage:storage, 
    limits:{ 
        fileSize:  1024 * 1024 * 5
        // mailbox_size_limit = 0,
   
    },
    fileFilter:fileFilter
}); // to create specfc storage

const Product  = require("../models/product");

router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message:'handling get request to /products'
    // });
    Product.find()
   .select("name price _id productImage") //select use chythal ath matram kittum unwanted okke povum
    .exec()
    .then(docs  =>{
        const response = {
            count:docs.length,
            product:docs.map(doc =>{
                
                return {
                    name:doc.name,
                    price:doc.price,
                    _id:doc._id,
                    image:doc.productImage,
                    request:{
                        type:'GET', //GET use chythal ippo lla database ulla itemm id vch ee url vazhi edkan pattum
                        url:'http://localhost:3000/product/' + doc._id
                    }
                }
            })
        };
           // console.log(docs); ith vere aaan
        // if (docs.length>=0){ avde data inenkil data full ayt get optionl print chyyum allel no entries found kannikium
        //     res.status(200).json(docs);
        // }else{
        //     res.status(404).json({
        //         message:'no entries found'
        //     });   semicolon idan marakalla illel wrk avula
        // }
        res.status(200).json(response); //ithil docs aan frst prnt chythath pinne aa docs responsl aaki response p 
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

 });
 
router.post('/',checkAuth, upload.single('productImage'),(req,res,next)=>{
    console.log(req.file); // check wth postman by body and form
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });
    product.save().then(result=>{
      console.log( Date())

        res.status(201).json({
            message:'created product succesfully',
            // createdProduct:result 
   
            createdProduct:{
                name:result.name,
                price:result.price,
                productImage:result.productImage,
                _id:result._id,
                request:{
                    type:'GET',
                    url:"http://localhost:3000/product/" +result._id
                }
            }
        });
 
    })
    .catch(err =>{
        console.log(err); 
        res.status(500).json({
            error:err
        });

    // res.status(201).json({
    //     message:'handling post request to /products',
    //     createdProduct:product
    // });
});
});

router.get('/:productId',(req,res,next)=>{  // sdlash nte apprum same name ulla route kodkan paadilaa
    const id=req.params.productId;
    // if(id==='special'){
    //     res.status(200).json({
    //         message:"you discovered the special id",
    //         id:id
    //     });
    // }else {
    //     res.status(200).json({
    //         message:"you passed an id"
    //     });
    // }
    // Product.find().then(p=>res.json(p)).catch(err=>res.json(err)) // ippo id kittan productum include aytt itre code mtrm mthy
    Product.findById(id) //product check ny id
    .select("name price _id productImage")
    .exec()
    .then(doc =>{
        console.log("from database",doc);
        if(doc){
        res.status(200).json( {
            product:doc,
            request:{
                type:'GET',
                url:'http://localhost:3000/product'
            }
        });
    }else{
        res.status(404).json({message:'no valid entry found for provided ID'});
        
    }
    })
    .catch(err=> {
        console.log(err);
    res.status(500).json({error:err});
});
});
router.patch('/:productId',checkAuth,(req,res,next)=>{
    // res.status(200).json({
    //     message:"updated product"

    // });
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;  
    }
    Product.update({_id:id},{ $set:updateOps}) // postman l bracket and curly brace vch propname um value kodth patch chyynm ynnit get chyynm appol update avum databasel propname schemal illath anne avanm allthathy not allowd
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json({
             message:'product updated',
             request:{
                 type:'GET',
                 url:'http://localhost:3000/product/'+ id
             }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

router.delete('/:productId',checkAuth,(req,res,next)=>{
    // res.status(200).json({
    //     message:"delete product"

    // });
    const id = req.params.productId;
    Product.remove({ _id:id })
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'product deleted',
            request:{
                type:'POST',
                url:'http//localhost:3000/product',
                body:{name:'String',price:'Number'}
            }
        }); 
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

    
});

module.exports = router;