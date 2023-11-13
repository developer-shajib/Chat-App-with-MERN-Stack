import mongoose, { mongo } from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    },
    senderName: {
      type: String,
      required: true
    },
    reseverId: {
      type: String,
      required: true
    },

    text: {
      type: String
    },
    image: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: 'unseen'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Message', messageSchema);
