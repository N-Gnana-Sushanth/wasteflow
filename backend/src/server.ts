import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CONFIG } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

// Security & Utility Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'WasteFlow Smart Municipal API Backend',
    version: '1.0.0',
    mode: 'MOCK_DATABASE_MODE',
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounted at /api
app.use('/api', apiRouter);

// Centralized Error Handler
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(CONFIG.PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 WasteFlow Full-Stack API Server running on port ${CONFIG.PORT}`);
    console.log(`📡 Base URL: http://localhost:${CONFIG.PORT}/api`);
    console.log(`🛡️ Auth: JWT + Role-Based Access Control`);
    console.log(`💾 Database: In-Memory Seeded Mock Database (No SQL/No Docker)`);
    console.log(`====================================================`);
  });
}

export default app;
