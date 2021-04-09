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

/**
 * @param  {Schema.Types.ObjectId} creatorId
 * @param  {[Schema.Types.ObjectId]} memberIds
 */
chatRoomSchema.statics.createRoom = async function createRoom(creatorId, memberIds) {
  const User = require('mongoose').model('User')
  const members = await User.find({
    _id: {
      $in: memberIds,
    },
  }).exec()
  if (members.length === 0) return Promise.reject(new Error('Users not found'))
  return new Promise((resolve, reject) => {
    ChatRoomModel.create(
      {
        members: [
          {
            userId: creatorId,
            role: 'creator',
          },
          ...members.map(user => ({
            userId: user._id,
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
