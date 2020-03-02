const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://salih:salihstepup@cluster0-i2pne.mongodb.net/test?retryWrites=true&w=majority',
//  { useNewUrlParser: true }, 
// {useUnifiedTopology: true});
//mongoose.connect("paste db link", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }));
 {
    useNewUrlParser:true ,
    useUnifiedTopology:true
 }
).then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))
// mongoose.connect(mongoConnectionString, {useUnifiedTopology: true}));
// }

//incase of password we can use + process.env.MONGO_ATLAS_PW+ and add to in new file
mongoose.Promise =global.Promise;

app.use(morgan('dev'));
// app.use(express.static('uploads'));
app.use((bodyParser.urlencoded({extended:false})));
app.use((bodyParser.json()));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Orgin.X-Requested-with,Content-Type,Accept,Authorization"
    );
    if(req.method==="OPTIONS") {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); 
});
app.use('/product',productRoutes);
app.use('/order',orderRoutes);
app.use("/user",userRoutes);

app.use((req,res,next) =>{
    const error = new Error('not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;