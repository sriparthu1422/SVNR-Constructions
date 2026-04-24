import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/inquiries — Public: Create a new inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const inquiry = new Inquiry({ name, email, subject, message });
    await inquiry.save();
    console.log('✅ Inquiry saved:', inquiry._id, '–', name, email);

    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /api/inquiries — Admin: Get all inquiries
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PATCH /api/inquiries/:id — Admin: Update inquiry status
router.patch('/:id', auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/inquiries/:id — Admin: Delete an inquiry
router.delete('/:id', auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
