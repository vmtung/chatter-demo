const mongoose = require('mongoose')

const { Schema } = mongoose

const chatRoomSchema = new Schema({
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

  _created_by: {
    type: Schema.Types.ObjectId,
  },

  _created_at: {
    type: Date,
    default: Date.now,
  },
})

const ChatRoomModel = mongoose.model('chatRoom', chatRoomSchema)

chatRoomSchema.statics.createRoom = function createRoom(creatorId, memberIds) {
  return new Promise((resolve, reject) => {
    ChatRoomModel.create(
      {
        members: [
          {
            userId: creatorId,
            role: 'creator',
          },
          ...memberIds.map(userId => ({
            userId,
            role: 'member',
          })),
        ],
        _created_by: creatorId,
      },
      (err, newRoom) => {
        if (err) reject(err)
        else resolve(newRoom)
      }
    )
  })
}
