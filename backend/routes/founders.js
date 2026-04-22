import { Router } from 'express';
import Founder from '../models/Founder.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/founders — Public: Get all active founders
router.get('/', async (req, res) => {
  try {
    const founders = await Founder.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json(founders);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /api/founders — Admin: Create founder
router.post('/', auth, async (req, res) => {
  try {
    const founder = new Founder(req.body);
    await founder.save();
    res.status(201).json(founder);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /api/founders/:id — Admin: Update founder
router.put('/:id', auth, async (req, res) => {
  try {
    const founder = await Founder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!founder) return res.status(404).json({ message: 'Founder not found.' });
    res.json(founder);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/founders/:id — Admin: Delete founder
router.delete('/:id', auth, async (req, res) => {
  try {
    const founder = await Founder.findByIdAndDelete(req.params.id);
    if (!founder) return res.status(404).json({ message: 'Founder not found.' });
    res.json({ message: 'Founder deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
