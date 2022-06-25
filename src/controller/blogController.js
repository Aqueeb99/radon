const { findOneAndUpdate } = require("../models/blogsModel")
const blogsModel = require("../models/blogsModel")
const authorModel = require("../models/authorModel")

const createBlog=async function(req, res){
    try{
        let reqData=req.body
        if (Object.keys(reqData).length == 0) return res.status(400).send({ status: false, msg: "Body is Required"});
        
        let authorId = reqData.authorId
        if (!authorId) res.status(400).send({msg:"Please enter Author Id"})
        
        let savedData = await authorModel.findById(authorId)
        if (!savedData) res.status(400).send("Author id does not exist in author collection")
        
        let checkIsPublished = req.body.isPublished
        if(checkIsPublished==='true'){
            published= new Date().toISOString();
            reqData.publishedAt= published
        }
        let Blog=await blogsModel.create(reqData)
        res.status(201).send({"data":Blog}) 
    }
    catch(err) {
        console.log("ERROR: ", err.message)
        res.status(500).send({ msg: "ERROR:", error: err.message })
    }
}

const getBlogs = async function(req, res){
    try{
        let queryData= req.query
        if (Object.keys(queryData).length !== 0) {
            let findByQuery = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, queryData] } )
            if (findByQuery.length == 0) {
            return res.status(404).send({ status: false, msg: "No such data found" })
            }
            res.status(200).send({ status: true, data: findByQuery })
        } else {
            let findData = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] })
            if (!findData) {
                return res.status(404).send({ status: false, msg: "No such data found" })
            } else {
                res.status(200).send({ status: true, data: findData })
            }
        }
    } catch (error){
        console.log(error.message)
        res.status(500).send({ err: error.message })
    }
}

const updateBlogs = async function(req, res){
    try{
        let blogId = req.params.blogId;
        if(!blogId) return res.status(400).send({status: false, msg: "Blog Id is Mandatory"})
        
        let data = req.body;
        if (Object.keys(data).length == 0)
        return res.status(400).send({ status: false, msg: "Body is Required"});
        
        let blogData = await blogsModel.findOne({ _id: blogId, isDeleted: false });
        if (!blogData) return res.status(404).send({ status: false, msg: "blogsId related data unavailable"});

        //authorization
        if(req.headers["authorId"] !== blogData.authorId.toString()) return res.status(403).send({ status: false, msg: "You are not authorized...." })

        if (data.title) blogData.title = data.title;
        if (data.category) blogData.category = data.category;
        if (data.body) blogData.body = data.body;
        
        if (data.tags) {
            if (typeof data.tags == "object") {
                blogData.tags.push(...data.tags);// How?
            } else {
                blogData.tags.push(data.tags);
                console.log(data.tags)
            }
        }
        
        if (data.subCategory) {
            if (typeof data.subCategory == "object") {
                blogData.subCategory.push(...data.subCategory);
            } else {
                blogData.subCategory.push(data.subCategory);
            }
        }
        blogData.publishedAt = Date()
        blogData.isPublished = true;
        blogData.save();
        res.status(200).send({ status: true, data: blogData});
    } catch (error){
        console.log(error.message)
        res.status(500).send({ err: error.message})
    }
}

const deleteByBlogId = async function(req, res){
    try{
        let idOfBlog = req.params.blogId
        if(!idOfBlog) return res.status(400).send({status: false, msg: "Blog Id is Mandatory"})

        let blogData = await blogsModel.findById(idOfBlog)
        if(!blogData) return res.status(404).send({status: false, msg: "Blog not found, please provide valid blogId"})
        
        //authorization
        if(req.headers["authorId"] !== blogData.authorId.toString()) return res.status(403).send({ status: false, msg: "You are not authorized...." })

        deletedTime= new Date().toISOString();

        await blogsModel.findByIdAndUpdate({_id: idOfBlog},{isDeleted: true, deletedAt:deletedTime})

        res.status(200).send({ status: true, msg: "Blog Deleted Successfully"})
    } catch(error){
        console.log(error.message)
        res.status(500).send({ err: error.message})
    }
}

const deleteByQueryParams = async function(req, res){
    try{
        let data = req.query
        if (Object.keys(data).length <= 0) return res.status(400).send({ status: false, msg: "please enter filter for deletion" })
        let query = {
            isDeleted: false,
            authorId: req.headers["authorId"] // why?
        }
        if (data.authorId){
             if(req.headers["authorId"] !== data.authorId) return res.status(403).send({ status: false, msg: "You are not authorized...." })
        }
        if (data.tags) {
            data.tags = { $in: data.tags.split(',') }
            console.log(data.tags)
        }
        if (data.subCategory) {
            data.subCategory = { $in: data.subCategory.split(',') }
        }
        query['$or'] = [
            { isPublished: data.isPublished },
            { authorId: data.authorId },
            { category: data.category },
            { subCategory: data.subCategory },
            { tags: data.tags }
        ]
        let del = await blogsModel.find(query)
        if (del.length == 0) {
            return res.status(404).send({ status: false, msg: "No such blog present"})
        }
        await blogsModel.updateMany(
            query, { $set: { isDeleted: true, DeletedAt: new Date().toLocaleString() } })
        res.status(200).send({ status: true, msg: "blogs deleted" })

    } catch(error){
        console.log(error.message)  
        res.status(500).send({ err: error.message})
    }
}

module.exports = { getBlogs, deleteByBlogId, deleteByQueryParams, createBlog, updateBlogs }