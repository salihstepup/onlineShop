const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    try{
        const token= req.headers.authorization.split(" ")[1]; //ithil 0 aan bearer ullath nmmk vndath token aan ath space kazhj lle one aan locate chythtt llath athaan ee pgm illath appoo ath matram edth
    
        // console.log("hii")
        // console.log(token)
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData= decoded;
        next();
    }catch(error) {
        return res.status(401).json({
            message:'auth failed'
        });
    }
}