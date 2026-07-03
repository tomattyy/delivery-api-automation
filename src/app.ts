import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/order', orderRoutes);

export default app;
