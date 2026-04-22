import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['completed', 'current', 'upcoming'], default: 'upcoming' },
}, { _id: false });

const unitSchema = new mongoose.Schema({
  type: { type: String, required: true },
  size: { type: String, required: true },
  facing: { type: String, default: '' },
  status: { type: String, default: 'Available' },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  // 'live', 'delivered', 'upcoming'
  projectType: {
    type: String,
    required: true,
    enum: ['live', 'delivered', 'upcoming'],
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },

  // Live project fields
  stage: { type: String, default: '' },
  progress: { type: Number, default: 0 },
  completion: { type: String, default: '' },
  milestones: [milestoneSchema],
  approvals: [{ type: String }],
  units: [unitSchema],
  galleryImages: [{ type: String }],

  // Delivered project fields
  completionYear: { type: String, default: '' },
  totalUnits: { type: Number, default: 0 },
  area: { type: String, default: '' },
  testimonial: { type: String, default: '' },

  // Upcoming project fields
  size: { type: String, default: '' },
  launch: { type: String, default: '' },
  concept: { type: String, default: '' },

  // Ordering
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
