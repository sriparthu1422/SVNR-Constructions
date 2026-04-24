import { Router } from 'express';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/bookings — Public: Create a new booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, project, message } = req.body;

    if (!name || !email || !phone || !date || !project) {
      return res.status(400).json({ message: 'Name, email, phone, date, and project are required.' });
    }

    const booking = new Booking({ name, email, phone, date, project, message });
    await booking.save();
    console.log('✅ Booking saved:', booking._id, '–', name, email);

    res.status(201).json({ message: 'Booking submitted successfully!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /api/bookings — Admin: Get all bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PATCH /api/bookings/:id — Admin: Update booking status
router.patch('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/bookings/:id — Admin: Delete a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
