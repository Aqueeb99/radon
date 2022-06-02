const express = require('express');
const myHelper = require('../util/helper')
const formatter = require('../validator/formatter')
const lodash = require('lodash');

const router = express.Router();

router.get('/test-me', function (req, res) {
     myHelper.printDate()
     myHelper.printMonth() 
    myHelper.getBatchInfo()
     formatter.trim()
     formatter.lower()
    formatter.upper()
    res.send('My first ever API')
  
});

//  router.get('/hello', function (req, res) {
//      function chunk (){
//      let array1 = chunk['jan','feb','march', 'april','may','june ','july','aug','sep','oct','nov','dec']
//     return(chunk(array1,4))
//      }

//     console.log(_.chunk())
//      res.send('Hello there')
//  });

    module.exports = router;
// adding this comment for no reason