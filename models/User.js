const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    city: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, 'City can only contain letters and spaces']
    },
    website: {
        type: String,
        required: true,
        validate: [validator.isURL, 'Invalid URL format']
    },
    zip_code: {
        type: String,
        required: true,
        match: [/^\d{5}-\d{4}$/, 'Zip code must be in the format 12345-1234']
    },
    phone: {
        type: String,
        required: true,
        match: [/^1-\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the format 1-123-123-1234']
    }
});

module.exports = mongoose.model('User', UserSchema);
