const mid = function (req,res,next) {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }
   
    let token = req.headers["x-auth-token"]
    if (!token) return res.send({ status: false, msg: "token must be present" });
else{
next()}

}
module.exports.mid = mid;