const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
    }
);

User.plugin(paginate);

module.exports = mongoose.model('User', User);