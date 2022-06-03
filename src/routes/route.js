const express = require('express');
// const myHelper = require('../util/helper')
// const formatter = require('../validator/formatter')
const x = require('lodash');
// const underscore = require('underscore')
 const router = express.Router();

// router.get('/test-me', function (req, res) {
//      myHelper.printDate()
//      myHelper.printMonth() 
//     myHelper.getBatchInfo()
//      formatter.trim()
//      formatter.lower()
//     formatter.upper()
//     res.send('My first ever API')
  
//});

 router.get('/hello', function (req, res) {
            
     let array1 = ['jan','feb','march', 'april','may','june ','july','aug','sep','oct','nov','dec']
        console.log(x.chunk(array1, 4))

      
        let z = [1,3,5,7,9,11,13,15,17,19]
        let arr1 = x.tail(z)
        console.log(arr1)

        var unionArr = x.union([34,35,45,48,49], [48,55], [35, 36], [50,56], [51,52,53,55])
        console.log(unionArr)

        let pairs = [["horror","The Shining"], ["drama","Titanic"] ,["thriller","Shutter Island"] ,["fantasy","Pans Labyrinth"]]
        console.log(x.fromPairs(pairs))
        
     res.send('Hello there')
 });

    module.exports = router;
// adding this comment for no reason