const mongoose = require('mongoose');
const Questions = require('./Questions');


const optionsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    votes: {
        type: Number, 
        default: 0
    },
    link_to_vote:{
        type: String
    }
})

const Options = mongoose.model('Options', optionsSchema);

module.exports = Options;