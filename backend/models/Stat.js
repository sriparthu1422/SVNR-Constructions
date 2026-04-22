import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Label is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Value is required'],
    trim: true,
  },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

const Stat = mongoose.model('Stat', statSchema);
export default Stat;
