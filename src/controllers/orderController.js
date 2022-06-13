const { count } = require("console")
const OrderModel= require("../models/orderModel")
const UserModel= require("../models/userModel")


    const createOrder= async function (req, res) {
        let data= req.body
        let userId = data.userId
        let productId = data.productId
        if (!userId || !productId)
        res.send("Either userid or product id is not present")
        else{
        let savedData= await OrderModel.create(data)
        res.send({msg: savedData})
        }
    }

    const getOrder= async function (req, res) {
             // let savedData= await OrderModel.find().populate("userId").populate("productId")
            //   let userId = await UserModel.find().select({id:1})
            //   let orderData = await  OrderModel.find(userId)
            //   if(orderData)
           if(req.headers["isFreeAppUser"] = "true"){
            req.userId.balance = "default",
            req.amount = 0,
            req.isFreeAppUser= true
            let savedData= await OrderModel.find().populate("userId").populate("productId")
            res.send({msg: savedData})
           }
        res.send({msg: savedData})
        res.send(orderData)
    }


module.exports.createOrder= createOrder
module.exports.getOrder= getOrder