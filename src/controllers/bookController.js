const { eventNames } = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
        let book = req.body   
     let authorId = book.author
     let publisherId = req.body.publisher
     if (!authorId) res.send({error:"author id is required"})
     let getAuthor = await AuthorModel.findById(authorId)
     if (!getAuthor) res.send({error:"enter valid author Id"})
     if (!publisherId) res.send({error:"publisher id is required"})
     let getPublisher = await publisherModel.findById(publisherId)
     if (!getPublisher) res.send({error:"enter valid publisher Id"})
     let bookCreated = await bookModel.create(book)
     res.send({data: bookCreated})
}

const getBooksWithAuthorAndPublisher = async function (req,res) {
    let book = await bookModel.find().populate(["author", "publisher"])
    res.send({data: book})
}

const getBook= async function (req, res) {
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const updateBook= async function (req, res) {
    let data= await publisherModel.find({$or:[{name:{$eq:'HarperColins'}}, {name:{$eq:'Penguin'}}]}).select('_id')
    let book = await bookModel.updateMany({author:data}, {$set:{isHardCover:true}},{new:true})
    //let book = req.body
    //let bookCreated = await bookModel.create(book)
    res.send({data: book})
}

const updateBookPrice= async function (req, res) {
    let data= await AuthorModel.find({rating:{$gt:3.5}}).select("_id")
    let book = await bookModel.updateMany({author:data}, {$inc:{price:10}},{new:true})
    //let book = req.body
    //let bookCreated = await bookModel.create(book)
    res.send({data: book})
}

module.exports.createBook= createBook
 module.exports.getBook= getBook
module.exports.getBooksWithAuthorAndPublisher = getBooksWithAuthorAndPublisher
module.exports.updateBook= updateBook
module.exports.updateBookPrice= updateBookPrice