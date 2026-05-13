import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import inquiryRoutes from './routes/inquiries.js';
import projectRoutes from './routes/projects.js';
import testimonialRoutes from './routes/testimonials.js';
import founderRoutes from './routes/founders.js';
import statRoutes from './routes/stats.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS origins list
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

// Connect to MongoDB
connectDB();

// Middleware — CORS must run BEFORE helmet so preflight OPTIONS requests
// get Access-Control-Allow-Origin headers before helmet blocks them.
const corsConfig = { origin: corsOrigins, credentials: true };
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SVNR Backend API is running.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.statusCode || err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SVNR Backend running on http://localhost:${PORT}`);
  console.log('🔒 CORS origins:', corsOrigins.map(o => o instanceof RegExp ? o.toString() : o));
});
