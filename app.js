import express from 'express';
import sweetRoutes from './routes/sweetRoutes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// all routes for sweet management
app.use('/api/v1', sweetRoutes);
export default app;
