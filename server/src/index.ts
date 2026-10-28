import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Bahut sare anurodh, kripya baad mein prayas karein' }
});
app.use('/api', limiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GAON SAATHI API chal raha hai', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('GAON SAATHI Server chal raha hai port ' + PORT + ' par');
});
