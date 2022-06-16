const jwt = require("jsonwebtoken");

const validateToken = function(req, res, next) {
  try{
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
    console.log(token);
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message})
  }
    next()
}

const authorise = function(req, res, next) {
  try{
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(token, "functionup-thorium");
    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId
    if(userToBeModified != userLoggedIn) return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message})
  }
  next()
}

module.exports.validateToken = validateToken
module.exports.authorise = authorise