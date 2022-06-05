const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});

router.get('/movies', function(req, res){
    let moviesarray = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(moviesarray)
})



router.get('/movies/:indexNumber', function(req, res){
    let moviesarray = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let indexNumber = req.params.indexNumber
    let indexno = moviesarray[indexNumber]
    res.send(indexno)
})



router.get('/movies/:indexNumber', function(req, res){
    let moviesarray = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let indexNumber = req.params.indexNumber
        if (indexNumber>=0 && indexNumber<moviesarray.length)
        {
            indexno = moviesarray[indexNumber]
            res.send(indexno)
        }    
    else if (indexNumber>=moviesarray.length)
     {
    indexNumber = "please use the valid index"

         res.send( indexNumber)
      }
})



router.get('/films', function(req, res){
let movies = [ {"id":1, "name":"The Shining"}, {"id":2, "name":"Incendies"}, {"id":3, "name":"Rang de Basanti"}, {"id":3, "name":"Rang de Basanti"}]       
res.send( movies)   
})



router.get('/films/:filmId', function(req, res){
    let movies = [ {"id":1, "name":"The Shining"}, {"id":2, "name":"Incendies"}, {"id":3, "name":"Rang de Basanti"}, {"id":4, "name":"Finding Nemo"}] 
    let Id = req.params.filmId
if (Id>0 && Id<=movies.length){
res.send(movies[Id-1])
}
else {

    res.send("No movie exists with this id")   
}
 })
module.exports = router;
// adding this comment for no reason