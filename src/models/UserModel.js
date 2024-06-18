import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      hash: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
      role: {
        type: Number,
        required: true
      }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
