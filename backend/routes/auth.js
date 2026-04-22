import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register — Create admin account
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any admin already exists (only allow one initial registration)
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    const admin = new Admin({ username, email, password });
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Admin registered successfully.',
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already taken.' });
    }
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /api/auth/login — Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful.',
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /api/auth/me — Get current admin
router.get('/me', auth, async (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
