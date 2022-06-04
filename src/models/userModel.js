const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
      Book4: {
    bookName: String,
        authorName: String,
        category: String,
        year: Number
      }
}, { timestamps: true });

module.exports = mongoose.model('user5', userSchema) //users



