const jwt = require("jsonwebtoken");

const validateToken = function(req, res, next) {

    let token = req.headers["x-Auth-token"];
   
    if (!token) token = req.headers["x-auth-token"];
  
  
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
    
    
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) {
      return res.send({ status: false, msg: "token is invalid" });
    }
    next()
}

const authorise = function(req, res, next) {
  let token = req.headers["x-Auth-token"];
   
  if (!token) token = req.headers["x-auth-token"];


  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  
  
  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken) {
    return res.send({ status: false, msg: "token is invalid" });
  }
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

  next()
}

module.exports.validateToken = validateToken
module.exports.authorise = authorise