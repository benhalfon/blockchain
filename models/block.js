const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    num: {
        type: Number,
        require: true
    },
    nonce: {
        type: Number,
        require: true
    },
    data: {
        type: Object,
        require: true
    },
    hash: {
        type: String,
        require: true
    },
    prev: {
        type: String,
        require: false
    },
    peer: {
        type: String,
        require: false
    },
    type_code: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('Block', schema)