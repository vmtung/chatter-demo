const mongoose = require('mongoose')

const { Schema } = mongoose

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: String,
    required: true,
  },
})

mongoose.model('question', questionSchema)
