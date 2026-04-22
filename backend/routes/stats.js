import { Router } from 'express';
import Stat from '../models/Stat.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/stats — Public: Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ sortOrder: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /api/stats/:id — Admin: Update a stat
router.put('/:id', auth, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stat) return res.status(404).json({ message: 'Stat not found.' });
    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /api/stats — Admin: Create a stat
router.post('/', auth, async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/stats/:id — Admin: Delete a stat
router.delete('/:id', auth, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Stat not found.' });
    res.json({ message: 'Stat deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
