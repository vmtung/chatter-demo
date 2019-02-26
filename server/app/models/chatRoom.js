const mongoose = require('mongoose')

const { Schema } = mongoose

const questionSchema = new Schema({
  members: {
    type: [
      new Schema({
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        role: {
          type: String,
          enum: ['creator', 'admin', 'member'],
        },
      }),
    ],
    required: true,
  },

  storedMessages: {
    type: [
      new Schema({
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        _created_at: {
          type: Date,
          default: Date.now,
        },
      }),
    ],
    // required: true,
  },

  _created_at: {
    type: Date,
    default: Date.now,
  },
})

mongoose.model('question', questionSchema)
