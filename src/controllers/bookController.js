const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


const authorDetails= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

const booksByChetanBhagat =  async function (req, res) {
    let savedData= await AuthorModel.findOne({author_name:"Chetan Bhagat"})
    let id = savedData.author_id
    let bookData = await BookModel.find({author_id:id})
 res.send({msg: bookData})
}

const bookAuthor =  async function (req, res) {
    let savedData= await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:200}},{new:true})
    let authorData = await AuthorModel.find({author_id:savedData.author_id}).select("author_name")
    let price = savedData.price
 res.send({msg:authorData,price})
}

const bookRange =  async function (req, res) {
    let savedData= await BookModel.find({price:{$gte:50, $lte:100}}).select({author_id:1, _id:0})
    let authorData = await AuthorModel.find({author_id:savedData.map(x=>x.author_id)}).select({author_name:1,_id:0})
    console.log(savedData)
 res.send({msg:authorData})
}

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.authorDetails= authorDetails
module.exports.booksByChetanBhagat= booksByChetanBhagat
module.exports.bookAuthor= bookAuthor
 module.exports.bookRange= bookRange

// module.exports.getBooksData= getBooksData

// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
