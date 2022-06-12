const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const commonMW = require ("../middlewares/commonMiddlewares")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Radon-Functionup-DB:K7Hvr5aCKNlYtYry@cluster0.1huana4.mongodb.net/Aqueeb-DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
