const express = require('express');
 const myHelper = require('../util/helper')
 const formatter = require('../validator/formatter')
const x = require('lodash');
 const underscore = require('underscore')
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


router.get("/sol1", function (req, res) {
    logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let missingNumber
    let len = arr.length
    let sum = 0
for (let i=0; i<len; i++) {
sum = sum + arr[i]
}
sum1 = ((len+1)*(len+2))/2
missingNumber = sum1 - sum
    res.send(  { data: missingNumber  } ) 
     });

     router.get("/sol2", function (req, res) {
        let arr2= [33, 34, 35, 37, 38]
        let missingNumber
        let len = arr2.length
        let sum2 = 0
        let a = arr2[0]
        let l = arr2.pop()
    for (let i=0; i<len; i++) {
    sum2 = sum2 + arr2[i]
    }
    sum3 = ((len+1)*(a+l))/2
    missingNumber = sum3 - sum2
        res.send(  { data: missingNumber  } ) 
         });
     
    module.exports = router;
// adding this comment for no reason