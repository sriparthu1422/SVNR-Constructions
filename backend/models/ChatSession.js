import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['visitor', 'admin'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  visitorName: {
    type: String,
    default: 'Visitor',
    trim: true,
  },
  visitorEmail: {
    type: String,
    default: '',
    trim: true,
  },
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
}, { timestamps: true });

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
