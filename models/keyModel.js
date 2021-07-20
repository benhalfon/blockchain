const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    privateKey: {
        type: String,
        require: true
    },
    publicKey: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('KeyModel', schema)