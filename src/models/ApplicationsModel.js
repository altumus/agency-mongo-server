import mongoose, { Schema } from 'mongoose'

const ApplicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    responsibleUser: {
      type: Schema.Types.ObjectId || null,
      ref: 'User',
    },
    tasks: [
      {
        type: Number,
        required: true,
      },
    ],
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Applications', ApplicationSchema)
