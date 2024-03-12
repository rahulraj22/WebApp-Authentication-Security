const mongoose = require('mongoose');
const config = require('../config.js');
const encrypt = require('mongoose-encryption');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// Level 2: Database Encryption (Using mongoose package: mongoose-encryption)
const secret = process.env.SECRET;
schema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
const User = mongoose.model('User', schema);
module.exports = User;