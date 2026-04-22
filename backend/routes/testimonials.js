import { Router } from 'express';
import Testimonial from '../models/Testimonial.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/testimonials — Public: Get all active testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /api/testimonials — Admin: Create testimonial
router.post('/', auth, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /api/testimonials/:id — Admin: Update testimonial
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found.' });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/testimonials/:id — Admin: Delete testimonial
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found.' });
    res.json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
