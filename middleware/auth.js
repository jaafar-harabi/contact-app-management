const jwt = require('jsonwebtoken')


const sign=async(req,res,next)=>{
    const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1] // Bearer XXXXXX
    jwt.verify(token, process.env.key_secret, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
}


   




module.exports={sign}