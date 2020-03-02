 
 const mongoose= require('mongoose');
 const bcrypt = require('bcryptjs');
 const User= require('../models/user');
 const jwt = require('jsonwebtoken');
 
  
 
 exports.user_signup= (req,res,next)=>{
    User.find({email:req.body.email })
    .exec()
    .then(user => {
        if (user.length>=1) {
            return res.status(409).json({
                message:"mail exists"
            });
        }else{
            bcrypt.hash(req.body.password,10, (err,hash) => {
                if(err)
                      {
        return res.status(500).json({
            error:err
        });
        }else{const user = new User({
            _id:new mongoose.Types.ObjectId(),
            email:req.body.email, 
            password:hash
        
        });
        user.save().then(result =>{
            console.log(result);
            res.status(201).json({ 
                message:'user created'
            });
        }).catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
           
        }     
         }); 
        }
    })
   
    }

    exports.user_login=(req,res,next)=> {
        User.find({ email:req.body.email})
        .exec() 
        .then(user => {
            if (user.length < 1){
                return res.status(404).json({
                message:'mail not found user doesnt exist'
            });
        
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

        
        if(err){
            return res.status(401).json({
                message:'auth failed'
            });
        }
        if(result){
           const token=jwt.sign({  // ths sectn useful for taken token it is useful all other process
                email: user[0].email,
                userId:user[0]._id
            },process.env.JWT_KEY='SECRET',
            {
                expiresIn:'1h'  //hw much tym should the app will open that tym
                        });

            return res.status(200).json({
                message:'auth succesful',
                token:token
 
            });
            
        }
        res.status(401).json({
            message:'auth failed'
        });
    });
        
})
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    
    });
}
exports.user_delete=(req,res,next)=> {
    User.remove({ _id:req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message:"user deleted"
        });
    })

.catch(err => {
    console.log(err);
    res.status(500).json({
        error:err
    });
});
}

