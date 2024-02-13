const mongoose = require('mongoose');
const Options = require('./Options');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Options'
    }
  ]
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;
