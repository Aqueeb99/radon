const express = require('express');
const router = express.Router();
const bookController= require("../controllers/bookController")
const authorController= require("../controllers/authorController")
const publisherController= require("../controllers/publisherController.js")
//const bookController= require("../controllers/bookController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createAuthor", authorController.createAuthor  )

// router.get("/getAuthorsData", authorController.getAuthorsData)


router.post("/createBook", bookController.createBook  )
 router.post("/createAuthor", authorController.createAuthor )
router.post("/createPublisher", publisherController.createPublisher )
router.get("/getBooksWithAuthorAndPublisher", bookController.getBooksWithAuthorAndPublisher)
router.post("/getBook", bookController.getBook)
 router.put("/updateBook", bookController.updateBook)
router.put("/updateBookPrice", bookController.updateBookPrice)

module.exports = router;