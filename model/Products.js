const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    code: {
        type:String
    },
    name: {
        type:String
    },
    quantity: {
        type:String
    },
    price:{
        type:String
    },
    status : {
        type:String
    },
    date_added: {
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("product",Product);