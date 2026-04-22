import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Preferred date is required'],
  },
  project: {
    type: String,
    required: [true, 'Interested project is required'],
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
    default: 'new',
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
