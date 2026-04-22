import { Router } from 'express';
import ChatSession from '../models/ChatSession.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/chat/sessions — Admin: Get all chat sessions
router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find()
      .sort({ updatedAt: -1 })
      .select('-messages');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /api/chat/sessions/:id — Admin: Get session with messages
router.get('/sessions/:id', auth, async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PATCH /api/chat/sessions/:id — Admin: Close a session
router.patch('/sessions/:id', auth, async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || 'closed' },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/chat/sessions/:id — Admin: Delete a session
router.delete('/sessions/:id', auth, async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json({ message: 'Chat session deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router;
