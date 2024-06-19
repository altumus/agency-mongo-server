import mongoose, { Schema } from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('User', UserSchema)
