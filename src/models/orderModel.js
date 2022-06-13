const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema( {
    userId: {
        type:objectId,
        ref:"User2"
        
            },
    productId:{
type:objectId,
ref:"product2"

    },
    amount:Number,
    isFreeAppUser:Boolean,
    date:String

}, { timestamps: true });

module.exports = mongoose.model('order2', orderSchema)