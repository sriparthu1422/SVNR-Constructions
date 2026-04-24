import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import ChatSession from './models/ChatSession.js';

// Route imports
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import inquiryRoutes from './routes/inquiries.js';
import projectRoutes from './routes/projects.js';
import testimonialRoutes from './routes/testimonials.js';
import founderRoutes from './routes/founders.js';
import statRoutes from './routes/stats.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// CORS origins list (shared between Express and Socket.IO)
// Hardcoded production URLs ensure CORS works even if env vars are not set on Render.
const corsOrigins = [
  /^http:\/\/localhost:517\d$/,
  'https://www.svnrconstructions.com',
  'https://svnrconstructions.com',
  'https://svnr-admin.vercel.app',
];
// Also add env-var origins if they differ from the hardcoded ones
if (process.env.FRONTEND_URL && !corsOrigins.includes(process.env.FRONTEND_URL)) {
  corsOrigins.push(process.env.FRONTEND_URL);
}
if (process.env.ADMIN_URL && !corsOrigins.includes(process.env.ADMIN_URL)) {
  corsOrigins.push(process.env.ADMIN_URL);
}

// Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Middleware — CORS must run BEFORE helmet so preflight OPTIONS requests
// get Access-Control-Allow-Origin headers before helmet blocks them.
const corsConfig = { origin: corsOrigins, credentials: true };
app.options('*', cors(corsConfig));          // explicit preflight handler
app.use(cors(corsConfig));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SVNR Backend API is running.' });
});

// ── SOCKET.IO CHAT ───────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // ── Visitor joins / creates a chat session ──
  socket.on('visitor:join', async ({ sessionId, visitorName }) => {
    try {
      let session = await ChatSession.findOne({ sessionId });

      if (!session) {
        const welcomeMsg = {
          sender: 'admin',
          text: `Welcome ${visitorName || 'Visitor'}. Our team will connect with you quickly, please wait for a moment.`,
          timestamp: new Date()
        };
        session = new ChatSession({
          sessionId,
          visitorName: visitorName || 'Visitor',
          messages: [welcomeMsg],
          status: 'active'
        });
        await session.save();
      }

      socket.join(`chat:${sessionId}`);
      socket.emit('chat:history', session.messages);

      // Notify admins of new/active session
      io.to('admins').emit('chat:session_update', {
        _id: session._id,
        sessionId: session.sessionId,
        visitorName: session.visitorName,
        status: session.status,
        lastMessage: session.messages.length > 0
          ? session.messages[session.messages.length - 1]
          : null,
        updatedAt: session.updatedAt,
      });
    } catch (err) {
      console.error('visitor:join error:', err.message);
    }
  });

  // ── Visitor sends a message ──
  socket.on('visitor:message', async ({ sessionId, text }) => {
    try {
      const msg = { sender: 'visitor', text, timestamp: new Date() };
      const session = await ChatSession.findOneAndUpdate(
        { sessionId },
        { $push: { messages: msg }, status: 'active' },
        { new: true }
      );

      if (session) {
        // Broadcast to everyone in the room (admin included)
        io.to(`chat:${sessionId}`).emit('chat:message', msg);
        // Notify admin room of update
        io.to('admins').emit('chat:new_message', {
          sessionId: session.sessionId,
          _id: session._id,
          visitorName: session.visitorName,
          message: msg,
        });
      }
    } catch (err) {
      console.error('visitor:message error:', err.message);
    }
  });

  // ── Admin joins the admin notification room ──
  socket.on('admin:join', () => {
    socket.join('admins');
    console.log(`👑 Admin joined: ${socket.id}`);
  });

  // ── Admin joins a specific chat session ──
  socket.on('admin:join_session', ({ sessionId }) => {
    socket.join(`chat:${sessionId}`);
  });

  // ── Admin sends a reply ──
  socket.on('admin:message', async ({ sessionId, text }) => {
    try {
      const msg = { sender: 'admin', text, timestamp: new Date() };
      await ChatSession.findOneAndUpdate(
        { sessionId },
        { $push: { messages: msg } }
      );

      io.to(`chat:${sessionId}`).emit('chat:message', msg);
    } catch (err) {
      console.error('admin:message error:', err.message);
    }
  });

  // ── Admin closes a session ──
  socket.on('admin:close_session', async ({ sessionId }) => {
    try {
      await ChatSession.findOneAndUpdate({ sessionId }, { status: 'closed' });
      io.to(`chat:${sessionId}`).emit('chat:closed');
      io.to('admins').emit('chat:session_closed', { sessionId });
    } catch (err) {
      console.error('admin:close error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 SVNR Backend running on http://localhost:${PORT}`);
  console.log('🔒 CORS origins:', corsOrigins.map(o => o instanceof RegExp ? o.toString() : o));
});
