import mongoose, { Schema } from 'mongoose'

const OrganizationsSchema = new mongoose.Schema(
  {
    organizationCreator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    organizationInviteCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Organizations', OrganizationsSchema)
